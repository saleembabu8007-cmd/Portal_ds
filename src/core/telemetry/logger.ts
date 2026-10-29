/**
 * DoctorShield Audit & Telemetry Logger
 * Governed by AGENTS.md §4.3 (Security & PDPA), DECISION_LOG.md, and OBSERVABILITY_PLAN.md
 * 
 * Strict PII Redaction:
 * - NRIC: Masked (e.g., "850412-14-XXXX")
 * - Mobile: Masked (e.g., "+60 12-***-6789")
 * - Email: Masked (e.g., "d***@example.com")
 * - Card / Payment Tokens: Completely Redacted ("[REDACTED]")
 */

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'AUDIT';

export interface AuditEvent {
  eventId: string;
  timestamp: string;
  level: LogLevel;
  category: 'SECURITY' | 'PAYMENT' | 'UNDERWRITING' | 'RATING' | 'RENEWAL' | 'SYSTEM';
  action: string;
  outcome: 'SUCCESS' | 'FAILURE' | 'BLOCKED' | 'PENDING';
  actorId?: string; // Masked NRIC or Session Token
  ipAddress?: string;
  details: Record<string, any>;
  errorMessage?: string;
}

export class Logger {
  private static isProduction = import.meta.env.PROD || import.meta.env.VITE_APP_ENV === 'production';

  /**
   * Masks Malaysian NRIC (YYMMDD-PB-#### -> YYMMDD-PB-XXXX)
   */
  static maskNric(nric?: string): string {
    if (!nric) return '[NONE]';
    const digits = nric.replace(/\D/g, '');
    if (digits.length === 12) {
      return `${digits.slice(0, 6)}-${digits.slice(6, 8)}-XXXX`;
    }
    const clean = nric.trim();
    if (clean.length < 4) return '***';
    return clean.slice(0, -4) + 'XXXX';
  }

  /**
   * Masks Email address (johndoe@domain.com -> j***e@domain.com)
   */
  static maskEmail(email?: string): string {
    if (!email) return '[NONE]';
    const parts = email.split('@');
    if (parts.length !== 2) return '***@***';
    const user = parts[0];
    const domain = parts[1];
    if (user.length <= 2) return `${user[0]}*@${domain}`;
    return `${user[0]}***${user[user.length - 1]}@${domain}`;
  }

  /**
   * Masks Malaysian Phone (+60 12-345 6789 or 0123456789 -> +60 12-***-6789)
   */
  static maskPhone(phone?: string): string {
    if (!phone) return '[NONE]';
    const digits = phone.replace(/\D/g, '');
    let localDigits = digits;
    if (localDigits.startsWith('60')) {
      localDigits = localDigits.substring(2);
    }
    if (localDigits.startsWith('0')) {
      localDigits = localDigits.substring(1);
    }

    if (localDigits.length < 7) {
      return '***';
    }

    const prefix = localDigits.slice(0, 2); // e.g. 12, 19, 17
    const last4 = localDigits.slice(-4);
    return `+60 ${prefix}-***-${last4}`;
  }

  /**
   * Recursively sanitizes any payload object before logging to prevent PII leakage
   */
  static sanitizePayload(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitizePayload(item));
    }

    const sanitized: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      const lower = key.toLowerCase();
      const val = obj[key];

      if (
        lower.includes('password') ||
        lower.includes('secret') ||
        lower.includes('token') ||
        lower.includes('cvv') ||
        lower.includes('card') ||
        lower.includes('otp') ||
        lower.includes('pin')
      ) {
        sanitized[key] = '[REDACTED]';
      } else if (lower.includes('nric') || lower.includes('ic_number')) {
        sanitized[key] = typeof val === 'string' ? this.maskNric(val) : '[REDACTED]';
      } else if (lower.includes('email')) {
        sanitized[key] = typeof val === 'string' ? this.maskEmail(val) : '[REDACTED]';
      } else if (lower.includes('phone') || lower.includes('mobile')) {
        sanitized[key] = typeof val === 'string' ? this.maskPhone(val) : '[REDACTED]';
      } else if (typeof val === 'object') {
        sanitized[key] = this.sanitizePayload(val);
      } else {
        sanitized[key] = val;
      }
    }
    return sanitized;
  }

  /**
   * Logs a structured audit event (required for legal and regulatory compliance under BNM FSA 2013)
   */
  static audit(
    category: AuditEvent['category'],
    action: string,
    outcome: AuditEvent['outcome'],
    details: Record<string, any> = {},
    actorId?: string
  ): AuditEvent {
    const event: AuditEvent = {
      eventId: `AUD-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      level: 'AUDIT',
      category,
      action,
      outcome,
      actorId: actorId ? this.maskNric(actorId) : undefined,
      details: this.sanitizePayload(details),
    };

    if (this.isProduction) {
      this.dispatchTelemetry(event);
    }

    return event;
  }

  static error(category: AuditEvent['category'], action: string, error: any, details: Record<string, any> = {}): void {
    const errorMsg = error instanceof Error ? error.message : String(error);
    const event: AuditEvent = {
      eventId: `ERR-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      category,
      action,
      outcome: 'FAILURE',
      details: this.sanitizePayload(details),
      errorMessage: errorMsg,
    };

    if (this.isProduction) {
      this.dispatchTelemetry(event);
    }
  }

  private static dispatchTelemetry(event: AuditEvent): void {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (dsn && typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureMessage(`[${event.category}] ${event.action} - ${event.outcome}`, {
        level: event.level.toLowerCase(),
        extra: event,
      });
    }
  }
}
