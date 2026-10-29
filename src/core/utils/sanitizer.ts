/**
 * Input Sanitization and Boundary Validation Utility
 * Governed by AGENTS.md §4.3 (Security & Input Validation) and SECURITY_DESIGN.md
 * 
 * Prevents Cross-Site Scripting (XSS), Carriage Return/Line Feed (CRLF) injection,
 * and oversized payload denial-of-service attempts.
 */

export class InputSanitizer {
  /**
   * Strips HTML tags, script contents, event handlers, and script payloads from free-form user text
   */
  static sanitizeText(input?: string, maxLength: number = 2000): string {
    if (!input) return '';
    let sanitized = input
      // Remove script tags and their inner code completely
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      // Remove style tags and their inner css
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Remove script/javascript: references
      .replace(/javascript:/gi, '')
      // Remove data: URLs
      .replace(/data:\s*text\/html/gi, '')
      // Remove common control characters
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      // Normalize whitespace
      .trim();

    if (sanitized.length > maxLength) {
      sanitized = sanitized.substring(0, maxLength);
    }
    return sanitized;
  }

  /**
   * Escapes dangerous HTML characters to prevent XSS in HTML contexts
   */
  static sanitizeHtml(input?: string): string {
    if (!input) return '';
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  /**
   * Detects whether an input string contains potential XSS or script injection vectors
   */
  static detectPotentialXSS(input?: string): boolean {
    if (!input) return false;
    const xssPatterns = [
      /<script\b[^>]*>/i,
      /<\/script>/i,
      /javascript:/i,
      /on\w+\s*=/i, // onload=, onerror=, onmouseover=, onclick=
      /<iframe\b[^>]*>/i,
      /<svg\b[^>]*>/i,
      /data:\s*text\/html/i,
      /expression\s*\(/i,
    ];
    return xssPatterns.some((pattern) => pattern.test(input));
  }

  /**
   * Sanitizes Malaysian NRIC input
   */
  static sanitizeNric(input?: string): string {
    if (!input) return '';
    return input.replace(/[^0-9\-]/g, '').trim().substring(0, 14);
  }

  /**
   * Sanitizes Malaysian Phone Number input
   */
  static sanitizePhone(input?: string): string {
    if (!input) return '';
    return input.replace(/[^0-9\+\-\s]/g, '').trim().substring(0, 20);
  }

  /**
   * Sanitizes email address
   */
  static sanitizeEmail(input?: string): string {
    if (!input) return '';
    return input.trim().toLowerCase().substring(0, 100);
  }

  /**
   * Validates if a string contains potential injection tokens (XSS + SQLi)
   */
  static hasInjectionVectors(input?: string): boolean {
    if (!input) return false;
    const injectionPatterns = [
      /<script\b[^>]*>/i,
      /on\w+\s*=/i, // onload=, onerror=, onclick=
      /javascript:/i,
      /<iframe\b[^>]*>/i,
      /<svg\b[^>]*>/i,
      /union\s+select/i,
      /--\s*$/m,
    ];
    return injectionPatterns.some((pattern) => pattern.test(input));
  }
}
