import React from 'react';
import { ArrowRight, ArrowLeft, Loader2, Save } from 'lucide-react';

export interface StepActionBarProps {
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  isPrimaryDisabled?: boolean;
  isLoading?: boolean;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  showSecondary?: boolean;
  auxiliaryLabel?: string;
  onAuxiliaryClick?: () => void;
  className?: string;
}

export const StepActionBar: React.FC<StepActionBarProps> = ({
  primaryLabel = 'Continue',
  onPrimaryClick,
  isPrimaryDisabled = false,
  isLoading = false,
  secondaryLabel = 'Back',
  onSecondaryClick,
  showSecondary = true,
  auxiliaryLabel,
  onAuxiliaryClick,
  className = '',
}) => {
  return (
    <div
      className={`ds-step-action-bar ${className}`}
      role="group"
      aria-label="Step navigation actions"
      style={{
        marginTop: 'var(--ds-primitive-space-8)',
        paddingTop: 'var(--ds-primitive-space-6)',
        borderTop: '1px solid var(--ds-color-border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      {/* Secondary (Back) Button */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {showSecondary && onSecondaryClick && (
          <button
            type="button"
            onClick={onSecondaryClick}
            disabled={isLoading}
            style={{
              minHeight: '48px',
              padding: '0 20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px solid var(--ds-color-border-default)',
              backgroundColor: '#FFFFFF',
              color: 'var(--ds-color-text-secondary)',
              fontSize: 'var(--ds-primitive-font-size-base)',
              fontWeight: 500,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span>{secondaryLabel}</span>
          </button>
        )}

        {auxiliaryLabel && onAuxiliaryClick && (
          <button
            type="button"
            onClick={onAuxiliaryClick}
            disabled={isLoading}
            style={{
              minHeight: '48px',
              padding: '0 16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px dashed var(--ds-color-border-default)',
              backgroundColor: 'transparent',
              color: 'var(--ds-color-text-muted)',
              fontSize: 'var(--ds-primitive-font-size-sm)',
              fontWeight: 500,
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            <Save size={16} aria-hidden="true" />
            <span>{auxiliaryLabel}</span>
          </button>
        )}
      </div>

      {/* Primary Action Button */}
      {onPrimaryClick && (
        <button
          type="button"
          onClick={onPrimaryClick}
          disabled={isPrimaryDisabled || isLoading}
          style={{
            minHeight: '48px',
            minWidth: '180px',
            padding: '0 28px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            border: 'none',
            backgroundColor: isPrimaryDisabled || isLoading
              ? 'var(--ds-color-action-disabled-bg)'
              : 'var(--ds-color-action-primary)',
            color: isPrimaryDisabled || isLoading
              ? 'var(--ds-color-action-disabled-text)'
              : '#FFFFFF',
            fontSize: 'var(--ds-primitive-font-size-base)',
            fontWeight: 600,
            cursor: isPrimaryDisabled || isLoading ? 'not-allowed' : 'pointer',
            boxShadow: isPrimaryDisabled || isLoading
              ? 'none'
              : '0 2px 4px rgba(6, 111, 123, 0.25)',
            transition: 'all 150ms ease',
          }}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="ds-spin" aria-hidden="true" />
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span>{primaryLabel}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
      )}

      <style>{`
        @keyframes ds-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .ds-spin {
          animation: ds-spin 1s linear infinite;
        }
        @media (max-width: 600px) {
          .ds-step-action-bar {
            flex-direction: column-reverse !important;
            align-items: stretch !important;
          }
          .ds-step-action-bar button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};

