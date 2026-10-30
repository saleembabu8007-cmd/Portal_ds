import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Search, Check, AlertCircle } from 'lucide-react';

/**
 * DoctorShield Select & Combobox Atoms
 * Includes:
 * 1. Select: Standard dropdown select trigger (46px height, 6px radius, customized chevron)
 * 2. SelectCombobox: Searchable listbox with keyboard navigation and groups
 * Compliance: WAI-ARIA 1.2 Combobox pattern & WCAG 2.2 AA Contrast
 */

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
  description?: string;
  disabled?: boolean;
}

/* ==========================================================================
   1. ACCESSIBLE SELECT ATOM
   ========================================================================== */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  id?: string;
  label?: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  id: providedId,
  label,
  options,
  value,
  placeholder = 'Select an option...',
  helperText,
  errorMessage,
  required = false,
  disabled = false,
  onChange,
  className = '',
  style,
  ...props
}) => {
  const generatedId = useId();
  const id = providedId || generatedId;
  const hasError = Boolean(errorMessage);

  return (
    <div className={`ds-select-wrapper ${className}`} style={{ marginBottom: 'var(--ds-space-field-to-field, 20px)' }}>
      {label && (
        <label
          htmlFor={id}
          className="ds-label"
          style={{
            display: 'block',
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: 'var(--ds-font-field-label-size, 0.8125rem)', // 13px
            fontWeight: 'var(--ds-primitive-font-weight-medium, 500)',
            color: 'var(--ds-color-text-label, #334155)',
            marginBottom: 'var(--ds-space-label-to-control, 6px)',
          }}
        >
          {label}
          {required && (
            <span style={{ color: 'var(--ds-primitive-color-rose-700, #B91C1C)', marginLeft: '4px', fontWeight: 500 }} aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
        <select
          id={id}
          value={value || ''}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          onChange={(e) => onChange(e.target.value)}
          className={`ds-select ${hasError ? 'ds-input-error' : ''}`}
          style={{
            width: '100%',
            height: 'var(--ds-comp-input-height, 46px)',
            paddingLeft: 'var(--ds-comp-input-padding-x, 14px)',
            paddingRight: '38px',
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: 'var(--ds-comp-input-font-size, 1rem)',
            color: value ? 'var(--ds-color-text-primary, #17253B)' : 'var(--ds-primitive-color-slate-400, #94A3B8)',
            backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100, #F1F5F9)' : 'var(--ds-comp-input-bg, #FFFFFF)',
            border: hasError
              ? '2px solid var(--ds-color-border-error, #EF4444)'
              : '1px solid var(--ds-color-border-default, #CBD5E1)',
            borderRadius: 'var(--ds-comp-input-radius, 6px)',
            outline: 'none',
            appearance: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'border-color var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default), box-shadow 150ms',
            ...style,
          }}
          onFocus={(e) => {
            if (!hasError && !disabled) {
              e.currentTarget.style.borderColor = 'var(--ds-color-focus-border, #08A5B5)';
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--ds-color-focus-ring, rgba(8, 165, 181, 0.18))';
            }
          }}
          onBlur={(e) => {
            if (!hasError && !disabled) {
              e.currentTarget.style.borderColor = 'var(--ds-color-border-default, #CBD5E1)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          color="var(--ds-color-text-secondary, #475569)"
          style={{
            position: 'absolute',
            right: '14px',
            pointerEvents: 'none',
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      </div>

      {helperText && !hasError && (
        <p style={{ fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)', fontSize: '0.75rem', color: 'var(--ds-color-text-muted, #64748B)', marginTop: '4px', marginBottom: 0 }}>
          {helperText}
        </p>
      )}

      {hasError && (
        <p role="alert" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)', fontSize: '0.75rem', color: 'var(--ds-primitive-color-rose-700, #B91C1C)', marginTop: '4px', marginBottom: 0 }}>
          <AlertCircle size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
};

/* ==========================================================================
   2. SEARCHABLE COMBOBOX ATOM
   ========================================================================== */
export interface SelectComboboxProps {
  id: string;
  label?: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export const SelectCombobox: React.FC<SelectComboboxProps> = ({
  id,
  label,
  options,
  value,
  placeholder = 'Select an option...',
  helperText,
  errorMessage,
  required = false,
  disabled = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opt.group && opt.group.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group filtered options
  const groupedOptions = filteredOptions.reduce<Record<string, SelectOption[]>>((acc, opt) => {
    const groupName = opt.group || 'General';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(opt);
    return acc;
  }, {});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const hasError = Boolean(errorMessage);

  return (
    <div ref={containerRef} className="ds-combobox-wrapper" style={{ marginBottom: 'var(--ds-space-field-to-field, 20px)', position: 'relative' }}>
      {label && (
        <label
          htmlFor={id}
          className="ds-label"
          style={{
            display: 'block',
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: 'var(--ds-font-field-label-size, 0.8125rem)', // 13px
            fontWeight: 'var(--ds-primitive-font-weight-medium, 500)',
            color: 'var(--ds-color-text-label, #334155)',
            marginBottom: 'var(--ds-space-label-to-control, 6px)',
          }}
        >
          {label}
          {required && (
            <span style={{ color: 'var(--ds-primitive-color-rose-700, #B91C1C)', marginLeft: '4px', fontWeight: 500 }} aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      {/* Combobox Trigger (46px height) */}
      <div
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        style={{
          height: 'var(--ds-comp-input-height, 46px)',
          backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100, #F1F5F9)' : 'var(--ds-comp-input-bg, #FFFFFF)',
          border: hasError
            ? '2px solid var(--ds-color-border-error, #EF4444)'
            : isOpen
            ? '1px solid var(--ds-color-focus-border, #08A5B5)'
            : '1px solid var(--ds-color-border-default, #CBD5E1)',
          boxShadow: isOpen ? '0 0 0 3px var(--ds-color-focus-ring, rgba(8, 165, 181, 0.18))' : 'none',
          borderRadius: 'var(--ds-comp-input-radius, 6px)',
          padding: '0 var(--ds-comp-input-padding-x, 14px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
          fontSize: 'var(--ds-comp-input-font-size, 1rem)',
          color: selectedOption ? 'var(--ds-color-text-primary, #17253B)' : 'var(--ds-primitive-color-slate-400, #94A3B8)',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default), box-shadow 150ms',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          color="var(--ds-color-text-secondary, #475569)"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default)',
            flexShrink: 0,
            marginLeft: '8px',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Dropdown Popover Listbox */}
      {isOpen && (
        <div
          id={`${id}-listbox`}
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--ds-color-surface-card, #FFFFFF)',
            border: '1px solid var(--ds-color-border-default, #CBD5E1)',
            borderRadius: 'var(--ds-comp-input-radius, 6px)',
            boxShadow: 'var(--ds-primitive-shadow-modal, 0 8px 24px rgba(19, 39, 102, 0.12))',
            zIndex: 100,
            maxHeight: '280px',
            overflowY: 'auto',
            padding: '4px 0',
          }}
        >
          {/* Quick Search Filter */}
          {options.length > 5 && (
            <div style={{ padding: '8px', borderBottom: '1px solid var(--ds-primitive-color-slate-100, #F1F5F9)' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={14} color="var(--ds-color-text-muted, #64748B)" style={{ position: 'absolute', left: '10px' }} aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Type to filter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    height: '34px',
                    paddingLeft: '32px',
                    paddingRight: '12px',
                    borderRadius: 'var(--ds-primitive-radius-sm, 4px)',
                    border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
                    fontSize: '0.8125rem',
                    outline: 'none',
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          {/* Grouped Options */}
          {Object.entries(groupedOptions).map(([groupName, groupOpts]) => (
            <div key={groupName}>
              {Object.keys(groupedOptions).length > 1 && (
                <div
                  style={{
                    padding: '8px 14px 4px',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: 'var(--ds-color-text-muted, #64748B)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {groupName}
                </div>
              )}
              {groupOpts.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    style={{
                      padding: '8px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: isSelected ? 'var(--ds-color-text-heading, #132766)' : 'var(--ds-color-text-primary, #17253B)',
                      backgroundColor: isSelected ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--ds-primitive-color-slate-100, #F1F5F9)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={15} color="var(--ds-color-brand-primary, #08A5B5)" aria-hidden="true" />}
                  </div>
                );
              })}
            </div>
          ))}

          {filteredOptions.length === 0 && (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--ds-color-text-muted, #64748B)', fontSize: '0.8125rem' }}>
              No matches found
            </div>
          )}
        </div>
      )}

      {helperText && !hasError && (
        <p style={{ fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)', fontSize: '0.75rem', color: 'var(--ds-color-text-muted, #64748B)', marginTop: '4px', marginBottom: 0 }}>
          {helperText}
        </p>
      )}

      {hasError && (
        <p role="alert" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)', fontSize: '0.75rem', color: 'var(--ds-primitive-color-rose-700, #B91C1C)', marginTop: '4px', marginBottom: 0 }}>
          <AlertCircle size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
};
