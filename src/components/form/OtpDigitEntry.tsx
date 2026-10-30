import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/FieldFeedback';

export interface OtpDigitEntryProps {
  id?: string;
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  onComplete?: (otp: string) => void;
  onResend?: () => void;
  resendCountdown?: number;
  disabled?: boolean;
  errorMessage?: string;
  channel?: 'SMS' | 'WHATSAPP';
  mobileNumber?: string;
}

/**
 * DoctorShield OTP Digit-Entry Composition Molecule
 * Features 6 discrete 48px digit boxes, auto-focus forward/back, clipboard paste support,
 * mobile numeric keyboard, and 60-second resend cooldown timer.
 */
export const OtpDigitEntry: React.FC<OtpDigitEntryProps> = ({
  id = 'otp_entry',
  length = 6,
  value,
  onChange,
  onComplete,
  onResend,
  resendCountdown = 0,
  disabled = false,
  errorMessage,
  channel = 'SMS',
  mobileNumber,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  // Handle single digit input
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.slice(-1).replace(/\D/g, '');
    const newDigits = [...digits];
    newDigits[index] = char;
    const combined = newDigits.join('');
    onChange(combined);

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (combined.length === length) {
      onComplete?.(combined);
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle paste full OTP
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pasted) {
      onChange(pasted);
      const nextFocus = Math.min(pasted.length, length - 1);
      inputsRef.current[nextFocus]?.focus();
      if (pasted.length === length) {
        onComplete?.(pasted);
      }
    }
  };

  return (
    <div className="ds-otp-entry" style={{ marginBottom: 'var(--ds-primitive-space-6)' }}>
      {mobileNumber && (
        <p
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            color: 'var(--ds-color-text-secondary)',
            lineHeight: 1.5,
            marginBottom: 'var(--ds-primitive-space-4)',
          }}
        >
          A 6-digit security code has been sent via <strong>{channel === 'WHATSAPP' ? 'WhatsApp' : 'SMS'}</strong> to{' '}
          <strong>+60 {mobileNumber}</strong>.
        </p>
      )}

      {/* 6 Digit Input Group */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          marginBottom: 'var(--ds-primitive-space-3)',
        }}
        role="group"
        aria-label="6-digit verification code"
      >
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputsRef.current[idx] = el;
            }}
            id={`${id}_${idx}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(idx, e)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={idx === 0 ? handlePaste : undefined}
            aria-label={`Digit ${idx + 1}`}
            style={{
              width: '44px',
              height: '48px',
              fontSize: '1.25rem',
              fontFamily: 'var(--ds-primitive-font-mono)',
              fontWeight: 600,
              textAlign: 'center',
              backgroundColor: disabled ? 'var(--ds-color-surface-sunken)' : 'var(--ds-color-surface-base)',
              color: 'var(--ds-color-text-primary)',
              border: `1px solid ${
                errorMessage
                  ? 'var(--ds-color-border-error)'
                  : digit
                  ? 'var(--ds-color-brand-primary)'
                  : 'var(--ds-color-border-default)'
              }`,
              borderRadius: 'var(--ds-comp-input-radius)',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--ds-color-border-focus)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(8, 165, 181, 0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errorMessage
                ? 'var(--ds-color-border-error)'
                : digit
                ? 'var(--ds-color-brand-primary)'
                : 'var(--ds-color-border-default)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        ))}
      </div>

      {errorMessage && (
        <div style={{ textAlign: 'center', marginBottom: 'var(--ds-primitive-space-3)' }}>
          <ErrorMessage message={errorMessage} />
        </div>
      )}

      {/* Resend Action & Countdown */}
      {onResend && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: 'var(--ds-primitive-font-size-xs)',
            color: 'var(--ds-color-text-tertiary)',
            marginTop: 'var(--ds-primitive-space-2)',
          }}
        >
          {resendCountdown > 0 ? (
            <span>Resend code in {resendCountdown}s</span>
          ) : (
            <button
              type="button"
              onClick={onResend}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ds-primitive-color-teal-800)',
                fontSize: 'var(--ds-primitive-font-size-xs)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
            >
              <RotateCcw size={13} />
              <span>Resend Verification Code</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

