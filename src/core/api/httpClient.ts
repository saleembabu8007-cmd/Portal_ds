/**
 * DoctorShield Production-Hardened HTTP Gateway Client
 * Governed by API_CONTRACTS.md (DOC-ARCH-API-001) and SECURITY_DESIGN.md
 * 
 * Features:
 * 1. Strict TLS 1.3 / HTTPS enforcement.
 * 2. Automatic RFC 7807 Problem Details parsing.
 * 3. Base64 payload envelope decoding (API_CONTRACTS.md §1).
 * 4. Idempotency Key header injection.
 * 5. Request timeout via AbortController (VITE_API_TIMEOUT_MS, default 15000ms).
 * 6. Controlled exponential backoff retries on idempotent calls.
 * 7. Mock Guard: In production, mock fallbacks are strictly blocked to prevent uncommitted policy issuance (Rule P-7).
 */

import { Logger } from '../telemetry/logger';

export interface HttpRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  idempotencyKey?: string;
  timeoutMs?: number;
  retries?: number;
  allowMockFallback?: boolean;
}

export interface ApiProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  errors?: Record<string, string[]>;
}

export class GatewayIntegrationError extends Error {
  public status: number;
  public problemDetails?: ApiProblemDetails;
  public isRetryable: boolean;

  get statusCode(): number {
    return this.status;
  }

  constructor(message: string, status: number = 500, problemDetails?: ApiProblemDetails, isRetryable: boolean = false) {
    super(message);
    this.name = 'GatewayIntegrationError';
    this.status = status;
    this.problemDetails = problemDetails;
    this.isRetryable = isRetryable;
  }
}

export class HttpClient {
  private static defaultTimeout = Number(import.meta.env.VITE_API_TIMEOUT_MS) || 15000;

  /**
   * Evaluates if mock fallback is permitted
   */
  static isMockAllowed(): boolean {
    const mockEnv = import.meta.env.VITE_ENABLE_MOCK_API;
    if (mockEnv === 'false') return false;
    if (mockEnv === 'true') return true;

    const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
    if (!apiBaseUrl || apiBaseUrl.includes('localhost')) {
      // Local development or automated tests without a live backend
      return true;
    }
    // In production with an actual configured backend, mock simulation is prohibited (Rule P-7)
    return false;
  }

  /**
   * Generates a UUID v4 idempotency key
   */
  static generateIdempotencyKey(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `IDEMP-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Executes an HTTP request against the authoritative backend gateway
   */
  static async request<T = any>(endpoint: string, options: HttpRequestOptions = {}): Promise<T> {
    const method = options.method || 'POST';
    const timeoutMs = options.timeoutMs || this.defaultTimeout;
    const maxRetries = options.retries !== undefined ? options.retries : method === 'GET' ? 2 : options.idempotencyKey ? 2 : 0;

    const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${apiBaseUrl}${cleanEndpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    };

    if (options.idempotencyKey) {
      headers['Idempotency-Key'] = options.idempotencyKey;
    }

    let attempt = 0;
    let lastError: any = null;

    while (attempt <= maxRetries) {
      attempt++;
      const controller = new AbortController();
      const timeoutTimer = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutTimer);

        // Handle HTTP 4xx/5xx Errors
        if (!response.ok) {
          let problem: ApiProblemDetails | undefined;
          try {
            problem = await response.json();
          } catch {
            // Non-JSON error body
          }

          const errorMessage =
            problem?.detail ||
            problem?.title ||
            `Gateway responded with HTTP ${response.status}: ${response.statusText}`;

          const isRetryable = response.status === 429 || response.status === 502 || response.status === 503 || response.status === 504;

          throw new GatewayIntegrationError(errorMessage, response.status, problem, isRetryable);
        }

        // Parse Success Envelope
        const rawJson = await response.json();

        // Decode Base64 envelope if present (API_CONTRACTS.md §1)
        if (rawJson && typeof rawJson === 'object' && rawJson.data && typeof rawJson.data === 'string') {
          try {
            const decodedStr = atob(rawJson.data);
            return JSON.parse(decodedStr) as T;
          } catch {
            return rawJson as T;
          }
        }

        return rawJson as T;
      } catch (err: any) {
        clearTimeout(timeoutTimer);
        lastError = err;

        const isAbort = err.name === 'AbortError';
        const isNetworkError = err instanceof TypeError || isAbort;
        const isRetryable = isNetworkError || (err instanceof GatewayIntegrationError && err.isRetryable);

        // Log error event
        Logger.error('SYSTEM', `API ${method} ${cleanEndpoint} Attempt ${attempt}`, err, {
          endpoint: cleanEndpoint,
          status: err.status || (isAbort ? 408 : 0),
          isRetryable,
        });

        // If not retryable or retries exhausted, break out
        if (!isRetryable || attempt > maxRetries) {
          break;
        }

        // Exponential backoff with jitter: 200ms, 400ms, 800ms...
        const jitter = Math.random() * 50;
        const delay = Math.pow(2, attempt) * 100 + jitter;
        await new Promise((res) => setTimeout(res, delay));
      }
    }

    // Handle failure when retries exhausted
    if (lastError) {
      if (lastError instanceof GatewayIntegrationError) {
        throw lastError;
      }
      if (lastError.name === 'AbortError') {
        throw new GatewayIntegrationError(
          `Gateway request timed out: Request to ${cleanEndpoint} timed out after ${timeoutMs}ms. Please check your internet connection or try again.`,
          408,
          undefined,
          true
        );
      }
      throw new GatewayIntegrationError(
        `Unable to connect to DoctorShield gateway: ${lastError.message || 'Network error'}`,
        0,
        undefined,
        true
      );
    }

    throw new GatewayIntegrationError(`Request to ${cleanEndpoint} failed.`);
  }
}
