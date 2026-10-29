import React from 'react';
import { Check } from 'lucide-react';

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
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--ds-primitive-space-3)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          minHeight: '44px',
          padding: '4px 0',
          userSelect: 'none',
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
              borderRadius: 'var(--ds-primitive-radius-sm)',
              border: hasError
                ? '2px solid var(--ds-color-border-error)'
                : checked
                ? '2px solid var(--ds-primitive-color-teal-700)'
                : '2px solid var(--ds-color-border-default)',
              backgroundColor: checked
                ? 'var(--ds-primitive-color-teal-700)'
                : disabled
                ? 'var(--ds-primitive-color-slate-100)'
                : 'var(--ds-color-surface-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 150ms ease',
            }}
          >
            {checked && <Check size={14} color="#FFFFFF" strokeWidth={3} aria-hidden="true" />}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: 'var(--ds-primitive-font-size-sm)',
              fontWeight: 500,
              color: disabled ? 'var(--ds-primitive-color-slate-400)' : 'var(--ds-color-text-primary)',
              lineHeight: 1.4,
              display: 'block',
            }}
          >
            {label}
          </span>
          {description && (
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: 'var(--ds-primitive-font-size-xs)',
                color: 'var(--ds-color-text-muted)',
                marginTop: '2px',
                display: 'block',
                lineHeight: 1.4,
              }}
            >
              {description}
            </span>
          )}
        </div>
      </label>

      {errorMessage && (
        <p role="alert" style={{ fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-primitive-color-rose-700)', margin: '4px 0 0 32px' }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
});
Checkbox.displayName = 'Checkbox';

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
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--ds-primitive-space-3)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          minHeight: '44px',
          padding: '4px 0',
          userSelect: 'none',
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
                ? '2px solid var(--ds-primitive-color-teal-700)'
                : '2px solid var(--ds-color-border-default)',
              backgroundColor: disabled
                ? 'var(--ds-primitive-color-slate-100)'
                : 'var(--ds-color-surface-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 150ms ease',
            }}
          >
            {checked && (
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: 'var(--ds-primitive-radius-full)',
                  backgroundColor: 'var(--ds-primitive-color-teal-700)',
                }}
              />
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: 'var(--ds-primitive-font-size-sm)',
              fontWeight: 500,
              color: disabled ? 'var(--ds-primitive-color-slate-400)' : 'var(--ds-color-text-primary)',
              lineHeight: 1.4,
              display: 'block',
            }}
          >
            {label}
          </span>
          {description && (
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: 'var(--ds-primitive-font-size-xs)',
                color: 'var(--ds-color-text-muted)',
                marginTop: '2px',
                display: 'block',
                lineHeight: 1.4,
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

export interface SelectorCardProps {
  id: string;
  name: string;
  value: string;
  selected: boolean;
  title: string;
  subtitle?: string;
  badge?: string;
  priceDelta?: string;
  disabled?: boolean;
  onSelect: (value: string) => void;
  children?: React.ReactNode;
}

export const SelectorCard: React.FC<SelectorCardProps> = ({
  id,
  name,
  value,
  selected,
  title,
  subtitle,
  badge,
  priceDelta,
  disabled = false,
  onSelect,
  children,
}) => {
  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onSelect(value)}
      onKeyDown={(e) => {
        if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
          e.preventDefault();
          onSelect(value);
        }
      }}
      style={{
        display: 'block',
        padding: 'var(--ds-primitive-space-5)',
        backgroundColor: selected
          ? 'var(--ds-color-surface-brand-tint)' // #F0FAFA
          : 'var(--ds-color-surface-card)',      // #FFFFFF
        border: selected
          ? '2px solid var(--ds-color-border-selected)' // #08A5B5
          : '1px solid var(--ds-color-border-default)',
        borderRadius: 'var(--ds-primitive-radius-lg)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 150ms ease',
        outline: 'none',
        opacity: disabled ? 0.6 : 1,
        position: 'relative',
        boxSizing: 'border-box',
      }}
      className={`ds-selector-card ${selected ? 'ds-selected' : ''}`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: 'var(--ds-primitive-font-size-base)',
              fontWeight: 600,
              color: 'var(--ds-color-text-heading)',
            }}
          >
            {title}
          </span>
          {badge && (
            <span
              style={{
                fontSize: 'var(--ds-primitive-font-size-xs)',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 'var(--ds-primitive-radius-full)',
                backgroundColor: 'var(--ds-primitive-color-teal-100)',
                color: 'var(--ds-primitive-color-teal-800)',
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {priceDelta && (
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-mono)',
              fontSize: 'var(--ds-primitive-font-size-sm)',
              fontWeight: 600,
              color: 'var(--ds-primitive-color-teal-800)',
            }}
          >
            {priceDelta}
          </span>
        )}
      </div>

      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            color: 'var(--ds-color-text-secondary)',
            margin: '0 0 var(--ds-primitive-space-2) 0',
            lineHeight: 1.45,
          }}
        >
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
};

