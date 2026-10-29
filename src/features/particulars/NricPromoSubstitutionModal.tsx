import React from 'react';
import { Tag, Sparkles, Check, X } from 'lucide-react';

export interface NricPromoSubstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalCode: string;
  substitutedCode: string;
  discountPercentage: number;
  message?: string;
  onAccept: (newCode: string) => void;
}

export const NricPromoSubstitutionModal: React.FC<NricPromoSubstitutionModalProps> = ({
  isOpen,
  onClose,
  originalCode,
  substitutedCode,
  discountPercentage,
  message,
  onAccept,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-substitution-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(19, 39, 102, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          padding: '28px',
          boxShadow: 'var(--ds-primitive-shadow-xl)',
          border: '1px solid var(--ds-color-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'var(--ds-primitive-color-teal-50)',
                color: 'var(--ds-primitive-color-teal-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <h3
                id="promo-substitution-title"
                style={{
                  fontFamily: 'var(--ds-primitive-font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  color: 'var(--ds-color-text-heading)',
                  margin: 0,
                }}
              >
                Promotional Code Adjusted for Existing Client
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)' }}>
                Rule RULE-PROM-02 Policyholder Privilege
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ds-color-text-muted)',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Verbatim Explanation Copy */}
        <p style={{ fontSize: '14px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.6, margin: '0 0 18px 0' }}>
          {message ||
            'Kindly note that the promo code you have used is ineligible for you as you are an existing client. Nevertheless, we have replaced it with the right promo code that still ensures you enjoy the discounted premium.'}
        </p>

        {/* Code Substitution Comparison Box */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--ds-primitive-color-slate-50)',
            borderRadius: 'var(--ds-primitive-radius-lg)',
            border: '1px solid var(--ds-color-border-subtle)',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ds-color-text-muted)', fontWeight: 600 }}>
              Original Code
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ds-color-text-secondary)', textDecoration: 'line-through' }}>
              {originalCode || 'CHUBBPROMO'}
            </div>
          </div>

          <div style={{ fontSize: '18px', color: 'var(--ds-primitive-color-teal-700)' }}>➔</div>

          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ds-primitive-color-teal-700)', fontWeight: 600 }}>
              Eligible Renewal Code
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ds-primitive-color-navy-900)' }}>
              {substitutedCode} ({discountPercentage}% OFF)
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              minHeight: '44px',
              padding: '0 20px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px solid var(--ds-color-border-default)',
              backgroundColor: '#FFFFFF',
              color: 'var(--ds-color-text-primary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Keep Original
          </button>

          <button
            type="button"
            onClick={() => onAccept(substitutedCode)}
            style={{
              minHeight: '44px',
              padding: '0 24px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: 'none',
              backgroundColor: 'var(--ds-color-action-primary)',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--ds-primitive-shadow-sm)',
            }}
          >
            <Check size={16} />
            <span>Apply Renewal Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

