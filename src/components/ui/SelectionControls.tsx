import React from 'react';
import { Check } from 'lucide-react';

/**
 * DoctorShield Selection Control Atoms
 * Includes: Checkbox, RadioButton, SegmentedControl, SelectorTile
 * Standard: 44px minimum touch bounding box (WCAG 2.2 SC 2.5.8), unmistakable active states
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
    <div className={`ds-checkbox-wrapper ${className}`} style={{ marginBottom: 'var(--ds-primitive-space-3)', ...style }}>
      <label
        htmlFor={id}
        className="ds-touch-target"
        style={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          gap: 'var(--ds-primitive-space-3)', // 12px
          cursor: disabled ? 'not-allowed' : 'pointer',
          minHeight: 'var(--ds-comp-touch-target-min)', // 44px
          padding: '4px 0',
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
            }}
            {...props}
          />
          <div
            className="ds-checkbox-box"
            style={{
              width: '20px',
              height: '20px',
              borderRadius: 'var(--ds-primitive-radius-sm)', // 4px
              border: hasError
                ? '2px solid var(--ds-color-border-error)'
                : checked
                ? '2px solid var(--ds-color-action-teal)' // #066F7B
                : '2px solid var(--ds-color-border-default)', // #CBD5E1
              backgroundColor: checked
                ? 'var(--ds-color-action-teal)'
                : disabled
                ? 'var(--ds-primitive-color-slate-100)'
                : 'var(--ds-color-surface-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
            }}
          >
            {checked && <Check size={14} color="#FFFFFF" strokeWidth={3} aria-hidden="true" />}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: 'var(--ds-primitive-font-size-base)', // 14px
              fontWeight: 'var(--ds-primitive-font-weight-medium)',
              color: disabled ? 'var(--ds-color-text-disabled)' : 'var(--ds-color-text-primary)',
              lineHeight: 1.43,
              display: 'block',
            }}
          >
            {label}
          </span>
          {description && (
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: 'var(--ds-primitive-font-size-sm)', // 13px
                color: 'var(--ds-color-text-muted)',
                lineHeight: 1.38,
                marginTop: '2px',
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
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            color: 'var(--ds-color-text-error)',
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
    <div className={`ds-radio-wrapper ${className}`} style={{ marginBottom: 'var(--ds-primitive-space-2)', ...style }}>
      <label
        htmlFor={id}
        className="ds-touch-target"
        style={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          gap: 'var(--ds-primitive-space-3)', // 12px
          cursor: disabled ? 'not-allowed' : 'pointer',
          minHeight: 'var(--ds-comp-touch-target-min)', // 44px
          padding: '4px 0',
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
            }}
            {...props}
          />
          <div
            className="ds-radio-circle"
            style={{
              width: '20px',
              height: '20px',
              borderRadius: 'var(--ds-primitive-radius-full)',
              border: checked
                ? '2px solid var(--ds-color-border-selected)' // #08A5B5
                : '2px solid var(--ds-color-border-default)', // #CBD5E1
              backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100)' : 'var(--ds-color-surface-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
            }}
          >
            {checked && (
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: 'var(--ds-primitive-radius-full)',
                  backgroundColor: 'var(--ds-color-border-selected)',
                }}
              />
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: 'var(--ds-primitive-font-size-base)',
              fontWeight: 'var(--ds-primitive-font-weight-medium)',
              color: disabled ? 'var(--ds-color-text-disabled)' : 'var(--ds-color-text-primary)',
              lineHeight: 1.43,
              display: 'block',
            }}
          >
            {label}
          </span>
          {description && (
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: 'var(--ds-primitive-font-size-sm)',
                color: 'var(--ds-color-text-muted)',
                lineHeight: 1.38,
                marginTop: '2px',
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
        backgroundColor: 'var(--ds-primitive-color-slate-100)',
        padding: '3px',
        borderRadius: 'var(--ds-comp-btn-radius)', // 6px
        border: '1px solid var(--ds-color-border-subtle)',
        gap: '2px',
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
              minHeight: '36px',
              padding: '0 16px',
              borderRadius: 'var(--ds-primitive-radius-sm)', // 4px
              border: 'none',
              backgroundColor: isSelected ? 'var(--ds-color-surface-card)' : 'transparent',
              color: isSelected ? 'var(--ds-color-text-heading)' : 'var(--ds-color-text-secondary)',
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: 'var(--ds-primitive-font-size-base)', // 14px
              fontWeight: isSelected ? 'var(--ds-primitive-font-weight-medium)' : 400,
              cursor: disabled ? 'not-allowed' : 'pointer',
              boxShadow: isSelected ? 'var(--ds-primitive-shadow-sm)' : 'none',
              transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
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
   4. SELECTOR CARD / TILE ATOM (For Coverage Limits)
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
        height: 'var(--ds-comp-tile-height)', // 48px
        backgroundColor: 'var(--ds-comp-tile-bg)',
        border: selected
          ? 'var(--ds-comp-tile-selected-border)' // 2px solid #08A5B5
          : 'var(--ds-comp-tile-border)', // 1px solid #DFE6EC
        borderRadius: 'var(--ds-comp-tile-radius)', // 8px
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--ds-primitive-space-4)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        userSelect: 'none',
        transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          className="ds-tile-amount"
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: 'var(--ds-primitive-font-size-base)',
            fontWeight: 'var(--ds-primitive-font-weight-medium)',
            color: selected ? 'var(--ds-color-text-heading)' : 'var(--ds-color-text-primary)',
          }}
        >
          {title}
        </span>
        {subtitle && (
          <span style={{ fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-color-text-muted)' }}>
            {subtitle}
          </span>
        )}
      </div>

      {badge && (
        <span
          className="ds-tile-tag"
          style={{
            fontSize: 'var(--ds-primitive-font-size-xs)',
            fontWeight: 'var(--ds-primitive-font-weight-medium)',
            color: 'var(--ds-color-text-link)',
            backgroundColor: 'var(--ds-color-surface-brand-tint)',
            padding: '2px 8px',
            borderRadius: 'var(--ds-primitive-radius-sm)',
          }}
        >
          {badge}
        </span>
      )}
      {children}
    </div>
  );
};
