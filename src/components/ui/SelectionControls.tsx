import React from 'react';
import { Check } from 'lucide-react';

/**
 * DoctorShield Selection Control Atoms
 * Includes:
 * 1. Checkbox: 20px control within 44px touch envelope (WCAG 2.2 SC 2.5.8)
 * 2. RadioButton: 20px circular control with 8px inner teal dot
 * 3. SegmentedControl: Pill/tab button switcher (e.g., Yes/No choice pairs)
 * 4. SelectorCard / SelectorTile: Interactive choice cards with 2px teal active stroke
 * Compliance: WAI-ARIA role="checkbox", role="radio", role="radiogroup"
 */

/* ==========================================================================
   1. CHECKBOX ATOM
   ========================================================================== */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  id,
  label,
  description,
  errorMessage,
  checked,
  disabled = false,
  className = '',
  style,
  onChange,
  ...props
}, ref) => {
  const hasError = Boolean(errorMessage);

  return (
    <div className={`ds-checkbox-wrapper ${className}`} style={{ marginBottom: 'var(--ds-primitive-space-3, 12px)', ...style }}>
      <label
        htmlFor={id}
        className="ds-touch-target"
        style={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          gap: 'var(--ds-primitive-space-3, 12px)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          minHeight: 'var(--ds-comp-touch-target-min, 44px)',
          padding: '6px 0',
          userSelect: 'none',
          width: '100%',
        }}
      >
        <div style={{ position: 'relative', marginTop: '2px', flexShrink: 0 }}>
          <input
            ref={ref}
            type="checkbox"
            id={id}
            checked={checked}
            disabled={disabled}
            aria-invalid={hasError}
            onChange={onChange}
            style={{
              position: 'absolute',
              opacity: 0,
              width: '100%',
              height: '100%',
              margin: 0,
              cursor: disabled ? 'not-allowed' : 'pointer',
              zIndex: 1,
            }}
            {...props}
          />
          <div
            className="ds-checkbox-box"
            style={{
              width: 'var(--ds-comp-checkbox-size, 20px)',
              height: 'var(--ds-comp-checkbox-size, 20px)',
              borderRadius: 'var(--ds-primitive-radius-sm, 4px)',
              border: hasError
                ? '2px solid var(--ds-color-border-error, #EF4444)'
                : checked
                ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                : '1.5px solid var(--ds-color-border-default, #CBD5E1)',
              backgroundColor: checked
                ? 'var(--ds-color-brand-primary, #08A5B5)'
                : disabled
                ? 'var(--ds-primitive-color-slate-100, #F1F5F9)'
                : 'var(--ds-color-surface-card, #FFFFFF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: checked ? '0 1px 3px rgba(8, 165, 181, 0.25)' : 'none',
              transition: 'all var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default)',
            }}
          >
            {checked && <Check size={14} color="#FFFFFF" strokeWidth={3} aria-hidden="true" />}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
              fontSize: 'var(--ds-primitive-font-size-base, 0.875rem)', // 14px
              fontWeight: 'var(--ds-primitive-font-weight-medium, 500)',
              color: disabled ? 'var(--ds-color-text-disabled, #94A3B8)' : 'var(--ds-color-text-primary, #17253B)',
              lineHeight: 1.43,
              display: 'block',
            }}
          >
            {label}
          </span>
          {description && (
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
                fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)', // 12px
                color: 'var(--ds-color-text-muted, #64748B)',
                lineHeight: 1.4,
                marginTop: '3px',
                display: 'block',
              }}
            >
              {description}
            </span>
          )}
        </div>
      </label>

      {errorMessage && (
        <p
          role="alert"
          style={{
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)',
            color: 'var(--ds-primitive-color-rose-700, #B91C1C)',
            marginTop: '2px',
            marginLeft: '32px',
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

/* ==========================================================================
   2. RADIO BUTTON ATOM
   ========================================================================== */
export interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  name: string;
  label: React.ReactNode;
  description?: React.ReactNode;
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(({
  id,
  name,
  label,
  description,
  checked,
  disabled = false,
  className = '',
  style,
  onChange,
  ...props
}, ref) => {
  return (
    <div className={`ds-radio-wrapper ${className}`} style={{ marginBottom: 'var(--ds-primitive-space-2, 8px)', ...style }}>
      <label
        htmlFor={id}
        className="ds-touch-target"
        style={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          gap: 'var(--ds-primitive-space-3, 12px)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          minHeight: 'var(--ds-comp-touch-target-min, 44px)',
          padding: '6px 0',
          userSelect: 'none',
          width: '100%',
        }}
      >
        <div style={{ position: 'relative', marginTop: '2px', flexShrink: 0 }}>
          <input
            ref={ref}
            type="radio"
            id={id}
            name={name}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            style={{
              position: 'absolute',
              opacity: 0,
              width: '100%',
              height: '100%',
              margin: 0,
              cursor: disabled ? 'not-allowed' : 'pointer',
              zIndex: 1,
            }}
            {...props}
          />
          <div
            className="ds-radio-circle"
            style={{
              width: 'var(--ds-comp-radio-size, 20px)',
              height: 'var(--ds-comp-radio-size, 20px)',
              borderRadius: 'var(--ds-primitive-radius-full, 9999px)',
              border: checked
                ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                : '1.5px solid var(--ds-color-border-default, #CBD5E1)',
              backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100, #F1F5F9)' : 'var(--ds-color-surface-card, #FFFFFF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default)',
            }}
          >
            {checked && (
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: 'var(--ds-primitive-radius-full, 9999px)',
                  backgroundColor: 'var(--ds-color-brand-primary, #08A5B5)',
                }}
              />
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
              fontSize: 'var(--ds-primitive-font-size-base, 0.875rem)',
              fontWeight: 'var(--ds-primitive-font-weight-medium, 500)',
              color: disabled ? 'var(--ds-color-text-disabled, #94A3B8)' : 'var(--ds-color-text-primary, #17253B)',
              lineHeight: 1.43,
              display: 'block',
            }}
          >
            {label}
          </span>
          {description && (
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
                fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)',
                color: 'var(--ds-color-text-muted, #64748B)',
                lineHeight: 1.4,
                marginTop: '3px',
                display: 'block',
              }}
            >
              {description}
            </span>
          )}
        </div>
      </label>
    </div>
  );
});

RadioButton.displayName = 'RadioButton';

/* ==========================================================================
   3. SEGMENTED CONTROL ATOM (Yes/No or Button Choice Pairs)
   ========================================================================== */
export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  id?: string;
  name?: string;
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <div
      role="radiogroup"
      className={`ds-segmented-control ${className}`}
      style={{
        display: 'inline-flex',
        backgroundColor: 'var(--ds-primitive-color-slate-100, #F1F5F9)',
        padding: '3px',
        borderRadius: 'var(--ds-comp-btn-radius, 6px)',
        border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
        gap: '3px',
      }}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            style={{
              minHeight: '38px',
              padding: '0 16px',
              borderRadius: 'var(--ds-primitive-radius-sm, 4px)',
              border: 'none',
              backgroundColor: isSelected ? 'var(--ds-color-surface-card, #FFFFFF)' : 'transparent',
              color: isSelected ? 'var(--ds-color-text-heading, #132766)' : 'var(--ds-color-text-secondary, #475569)',
              fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
              fontSize: 'var(--ds-primitive-font-size-base, 0.875rem)', // 14px
              fontWeight: isSelected ? 'var(--ds-primitive-font-weight-medium, 500)' : 400,
              cursor: disabled ? 'not-allowed' : 'pointer',
              boxShadow: isSelected ? '0 1px 3px rgba(19, 39, 102, 0.08)' : 'none',
              transition: 'all var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default)',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

/* ==========================================================================
   4. SELECTOR CARD / TILE ATOM (For Coverage Limits & Choice Cards)
   ========================================================================== */
export interface SelectorCardProps {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const SelectorCard: React.FC<SelectorCardProps> = ({
  id,
  title,
  subtitle,
  badge,
  selected = false,
  disabled = false,
  onClick,
  className = '',
  children,
}) => {
  return (
    <div
      id={id}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`ds-tile ${selected ? 'ds-tile-selected' : ''} ${className}`}
      style={{
        minHeight: '46px',
        backgroundColor: selected
          ? 'var(--ds-comp-tile-selected-bg, #F0FAFA)'
          : 'var(--ds-comp-tile-bg, #FFFFFF)',
        border: selected
          ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
          : '1px solid var(--ds-color-border-subtle, #DFE6EC)',
        borderRadius: 'var(--ds-comp-tile-radius, 6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        userSelect: 'none',
        transition: 'all var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span
          className="ds-tile-amount"
          style={{
            fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
            fontSize: 'var(--ds-primitive-font-size-base, 0.875rem)',
            fontWeight: 'var(--ds-primitive-font-weight-medium, 500)',
            color: selected ? 'var(--ds-color-text-heading, #132766)' : 'var(--ds-color-text-primary, #17253B)',
          }}
        >
          {title}
        </span>
        {subtitle && (
          <span style={{ fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)', color: 'var(--ds-color-text-muted, #64748B)' }}>
            {subtitle}
          </span>
        )}
      </div>

      {badge && (
        <span
          className="ds-tile-tag"
          style={{
            fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)',
            fontWeight: 'var(--ds-primitive-font-weight-medium, 500)',
            color: 'var(--ds-color-text-link, #066F7B)',
            backgroundColor: 'var(--ds-color-surface-brand-tint, #F0FAFA)',
            border: '1px solid var(--ds-primitive-color-teal-200, #AEE7EB)',
            padding: '2px 8px',
            borderRadius: 'var(--ds-primitive-radius-sm, 4px)',
          }}
        >
          {badge}
        </span>
      )}
      {children}
    </div>
  );
};
