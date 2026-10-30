import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { FieldLabel, HelperText, ErrorMessage } from '../ui/FieldFeedback';

/* ========================================================================
   1. YES / NO QUESTION SELECTOR
   ======================================================================== */
export interface YesNoSelectorProps {
  id: string;
  question: string;
  value?: boolean | null;
  onChange: (val: boolean) => void;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  yesLabel?: string;
  noLabel?: string;
}

/**
 * DoctorShield Yes/No Question Selector Molecule
 * Clean binary control without oversized cards. 48px control height, clear active outline.
 */
export const YesNoSelector: React.FC<YesNoSelectorProps> = ({
  id,
  question,
  value,
  onChange,
  helperText,
  errorMessage,
  required = false,
  disabled = false,
  yesLabel = 'Yes',
  noLabel = 'No',
}) => {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  return (
    <div
      className="ds-yes-no-selector"
      style={{
        marginBottom: 'var(--ds-primitive-space-4)',
        padding: 'var(--ds-primitive-space-3) var(--ds-primitive-space-4)',
        backgroundColor: 'var(--ds-color-surface-base)',
        border: `1px solid ${errorMessage ? 'var(--ds-color-border-error)' : 'var(--ds-color-border-subtle)'}`,
        borderRadius: 'var(--ds-comp-panel-radius)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--ds-primitive-space-3)',
      }}
    >
      <div style={{ flex: '1 1 240px', minWidth: '220px' }}>
        <span
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            fontWeight: 'var(--ds-primitive-font-weight-medium)',
            color: 'var(--ds-color-text-primary)',
            display: 'block',
            lineHeight: 1.45,
          }}
        >
          {question}
          {required && <span style={{ color: 'var(--ds-primitive-color-rose-700)', marginLeft: '4px' }}>*</span>}
        </span>
        {helperText && (
          <span
            id={helperId}
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: 'var(--ds-primitive-font-size-xs)',
              color: 'var(--ds-color-text-tertiary)',
              display: 'block',
              marginTop: '2px',
            }}
          >
            {helperText}
          </span>
        )}
      </div>

      <div
        role="radiogroup"
        aria-label={question}
        style={{
          display: 'inline-flex',
          backgroundColor: 'var(--ds-color-surface-subtle)',
          padding: '3px',
          borderRadius: 'var(--ds-comp-input-radius)',
          border: '1px solid var(--ds-color-border-subtle)',
          gap: '2px',
        }}
      >
        {/* Yes Button */}
        <button
          type="button"
          role="radio"
          aria-checked={value === true}
          disabled={disabled}
          onClick={() => onChange(true)}
          style={{
            minWidth: '64px',
            height: '36px',
            padding: '0 16px',
            border: value === true ? '1px solid var(--ds-color-brand-primary)' : '1px solid transparent',
            borderRadius: '6px',
            backgroundColor: value === true ? 'var(--ds-color-surface-base)' : 'transparent',
            color: value === true ? 'var(--ds-color-text-primary)' : 'var(--ds-color-text-secondary)',
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            fontWeight: value === true ? 'var(--ds-primitive-font-weight-medium)' : 'var(--ds-primitive-font-weight-regular)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
            boxShadow: value === true ? 'var(--ds-primitive-shadow-xs)' : 'none',
          }}
        >
          {yesLabel}
        </button>

        {/* No Button */}
        <button
          type="button"
          role="radio"
          aria-checked={value === false}
          disabled={disabled}
          onClick={() => onChange(false)}
          style={{
            minWidth: '64px',
            height: '36px',
            padding: '0 16px',
            border: value === false ? '1px solid var(--ds-color-brand-primary)' : '1px solid transparent',
            borderRadius: '6px',
            backgroundColor: value === false ? 'var(--ds-color-surface-base)' : 'transparent',
            color: value === false ? 'var(--ds-color-text-primary)' : 'var(--ds-color-text-secondary)',
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            fontWeight: value === false ? 'var(--ds-primitive-font-weight-medium)' : 'var(--ds-primitive-font-weight-regular)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
            boxShadow: value === false ? 'var(--ds-primitive-shadow-xs)' : 'none',
          }}
        >
          {noLabel}
        </button>
      </div>

      {errorMessage && (
        <div style={{ width: '100%' }}>
          <ErrorMessage id={errorId} message={errorMessage} />
        </div>
      )}
    </div>
  );
};

/* ========================================================================
   2. AGREE / DISAGREE QUESTION SELECTOR (Underwriting Declarations)
   ======================================================================== */
export interface AgreeDisagreeSelectorProps {
  id: string;
  declarationNumber?: string | number;
  statement: string;
  value?: boolean | null; // true = Agree, false = Disagree
  onChange: (agreed: boolean) => void;
  disagreeWarning?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * DoctorShield Agree/Disagree Declaration Selector Molecule
 * Designed for statutory underwriting questions. Features generous reading width, comfortable line height,
 * and immediate referral indication when Disagree is selected.
 */
export const AgreeDisagreeSelector: React.FC<AgreeDisagreeSelectorProps> = ({
  id,
  declarationNumber,
  statement,
  value,
  onChange,
  disagreeWarning = 'Disagreeing with this declaration requires an underwriting referral and relationship manager review.',
  required = true,
  disabled = false,
}) => {
  return (
    <div
      className="ds-agree-disagree-selector"
      style={{
        marginBottom: 'var(--ds-primitive-space-4)',
        padding: 'var(--ds-primitive-space-4)',
        backgroundColor: value === false ? 'var(--ds-primitive-color-amber-50)' : 'var(--ds-color-surface-base)',
        border: `1px solid ${
          value === false
            ? 'var(--ds-primitive-color-amber-300)'
            : value === true
            ? 'var(--ds-color-border-subtle)'
            : 'var(--ds-color-border-default)'
        }`,
        borderRadius: 'var(--ds-comp-panel-radius)',
        transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        {declarationNumber && (
          <span
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'var(--ds-color-surface-subtle)',
              color: 'var(--ds-color-text-secondary)',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            {declarationNumber}
          </span>
        )}

        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: 'var(--ds-primitive-font-size-sm)',
              fontWeight: 'var(--ds-primitive-font-weight-regular)',
              color: 'var(--ds-color-text-primary)',
              lineHeight: 1.55,
              margin: '0 0 var(--ds-primitive-space-3) 0',
            }}
          >
            {statement}
            {required && <span style={{ color: 'var(--ds-primitive-color-rose-700)', marginLeft: '4px' }}>*</span>}
          </p>

          <div
            role="radiogroup"
            aria-label={statement}
            style={{
              display: 'inline-flex',
              gap: '8px',
            }}
          >
            <button
              type="button"
              role="radio"
              aria-checked={value === true}
              disabled={disabled}
              onClick={() => onChange(true)}
              style={{
                height: '38px',
                padding: '0 18px',
                borderRadius: '6px',
                border: `1px solid ${value === true ? 'var(--ds-color-brand-primary)' : 'var(--ds-color-border-default)'}`,
                backgroundColor: value === true ? 'var(--ds-primitive-color-teal-50)' : 'var(--ds-color-surface-base)',
                color: value === true ? 'var(--ds-color-brand-secondary)' : 'var(--ds-color-text-primary)',
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: 'var(--ds-primitive-font-size-sm)',
                fontWeight: value === true ? 600 : 400,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              {value === true && <Check size={16} color="var(--ds-color-brand-primary)" />}
              <span>I Agree / Confirm</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={value === false}
              disabled={disabled}
              onClick={() => onChange(false)}
              style={{
                height: '38px',
                padding: '0 18px',
                borderRadius: '6px',
                border: `1px solid ${value === false ? 'var(--ds-primitive-color-amber-500)' : 'var(--ds-color-border-default)'}`,
                backgroundColor: value === false ? '#FFFBEB' : 'var(--ds-color-surface-base)',
                color: value === false ? 'var(--ds-primitive-color-amber-900)' : 'var(--ds-color-text-primary)',
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: 'var(--ds-primitive-font-size-sm)',
                fontWeight: value === false ? 600 : 400,
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              <span>Disagree</span>
            </button>
          </div>

          {value === false && (
            <div
              style={{
                marginTop: 'var(--ds-primitive-space-3)',
                padding: 'var(--ds-primitive-space-3)',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderLeft: '3px solid var(--ds-primitive-color-amber-500)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: 'var(--ds-primitive-font-size-xs)',
                color: 'var(--ds-primitive-color-amber-900)',
              }}
            >
              <AlertTriangle size={16} color="var(--ds-primitive-color-amber-600)" style={{ flexShrink: 0, marginTop: '1px' }} />
              <span>{disagreeWarning}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ========================================================================
   3. TWO-OPTION SEGMENTED CHOICE (e.g. Sole Prop vs Partnership)
   ======================================================================== */
export interface SegmentedChoiceOption {
  value: string;
  label: string;
  description?: string;
}

export interface SegmentedChoiceProps {
  id: string;
  label?: string;
  options: [SegmentedChoiceOption, SegmentedChoiceOption];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const TwoOptionSegmentedChoice: React.FC<SegmentedChoiceProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div style={{ marginBottom: 'var(--ds-primitive-space-4)' }}>
      {label && (
        <div style={{ marginBottom: 'var(--ds-primitive-space-2)' }}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
        </div>
      )}

      <div
        role="radiogroup"
        aria-label={label || 'Choice options'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          backgroundColor: 'var(--ds-color-surface-subtle)',
          padding: '4px',
          borderRadius: 'var(--ds-comp-input-radius)',
          border: '1px solid var(--ds-color-border-subtle)',
          gap: '4px',
        }}
      >
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange(opt.value)}
              style={{
                height: '48px',
                padding: '0 12px',
                borderRadius: '6px',
                border: isSelected ? '1px solid var(--ds-color-brand-primary)' : '1px solid transparent',
                backgroundColor: isSelected ? 'var(--ds-color-surface-base)' : 'transparent',
                color: isSelected ? 'var(--ds-color-text-primary)' : 'var(--ds-color-text-secondary)',
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: 'var(--ds-primitive-font-size-sm)',
                fontWeight: isSelected ? 'var(--ds-primitive-font-weight-medium)' : 'var(--ds-primitive-font-weight-regular)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
                boxShadow: isSelected ? 'var(--ds-primitive-shadow-xs)' : 'none',
              }}
            >
              <span>{opt.label}</span>
              {opt.description && (
                <span style={{ fontSize: '11px', color: 'var(--ds-color-text-tertiary)', fontWeight: 400 }}>
                  {opt.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ========================================================================
   4. MULTI-OPTION RADIO GROUP
   ======================================================================== */
export interface RadioGroupOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

export interface MultiOptionRadioGroupProps {
  id: string;
  label: string;
  options: RadioGroupOption[];
  value: string;
  onChange: (val: string) => void;
  direction?: 'vertical' | 'horizontal';
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
}

export const MultiOptionRadioGroup: React.FC<MultiOptionRadioGroupProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  direction = 'vertical',
  required = false,
  disabled = false,
  errorMessage,
  helperText,
}) => {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  return (
    <div
      role="radiogroup"
      aria-labelledby={`${id}-group-label`}
      style={{ marginBottom: 'var(--ds-primitive-space-4)' }}
    >
      <div id={`${id}-group-label`} style={{ marginBottom: 'var(--ds-primitive-space-2)' }}>
        <FieldLabel htmlFor={id} required={required}>
          {label}
        </FieldLabel>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: direction === 'vertical' ? 'column' : 'row',
          flexWrap: 'wrap',
          gap: direction === 'vertical' ? 'var(--ds-primitive-space-2)' : 'var(--ds-primitive-space-4)',
        }}
      >
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const optDisabled = disabled || opt.disabled;
          return (
            <label
              key={opt.value}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                minHeight: '44px',
                padding: '6px 12px',
                borderRadius: 'var(--ds-comp-input-radius)',
                backgroundColor: isSelected ? 'var(--ds-color-surface-subtle)' : 'transparent',
                border: `1px solid ${isSelected ? 'var(--ds-color-brand-primary)' : 'var(--ds-color-border-subtle)'}`,
                cursor: optDisabled ? 'not-allowed' : 'pointer',
                transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
              }}
            >
              <input
                type="radio"
                name={id}
                value={opt.value}
                checked={isSelected}
                disabled={optDisabled}
                onChange={() => onChange(opt.value)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--ds-color-brand-primary)',
                  margin: 0,
                  cursor: optDisabled ? 'not-allowed' : 'pointer',
                }}
              />
              <div>
                <span
                  style={{
                    fontFamily: 'var(--ds-primitive-font-body)',
                    fontSize: 'var(--ds-primitive-font-size-sm)',
                    fontWeight: isSelected ? 'var(--ds-primitive-font-weight-medium)' : 'var(--ds-primitive-font-weight-regular)',
                    color: optDisabled ? 'var(--ds-color-text-disabled)' : 'var(--ds-color-text-primary)',
                  }}
                >
                  {opt.label}
                </span>
                {opt.hint && (
                  <span
                    style={{
                      display: 'block',
                      fontSize: 'var(--ds-primitive-font-size-xs)',
                      color: 'var(--ds-color-text-tertiary)',
                    }}
                  >
                    {opt.hint}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {errorMessage ? (
        <ErrorMessage id={errorId} message={errorMessage} />
      ) : helperText ? (
        <HelperText id={helperId}>{helperText}</HelperText>
      ) : null}
    </div>
  );
};

