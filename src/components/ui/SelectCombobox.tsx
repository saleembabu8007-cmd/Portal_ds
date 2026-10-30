import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, AlertCircle } from 'lucide-react';

/**
 * DoctorShield Select / Combobox Atom
 * Standard: 48px trigger height, 8px radius, accessible keyboard-navigable listbox
 * Compliance: WAI-ARIA 1.2 Combobox pattern
 */

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
  description?: string;
}

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

  const hasError = Boolean(errorMessage);

  return (
    <div ref={containerRef} className="ds-combobox-wrapper" style={{ marginBottom: 'var(--ds-space-field-to-field)', position: 'relative' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-base)', // 14px
            fontWeight: 'var(--ds-primitive-font-weight-medium)',
            color: 'var(--ds-primitive-color-slate-700)',
            marginBottom: 'var(--ds-space-label-to-control)', // 8px
          }}
        >
          {label}
          {required && (
            <span style={{ color: 'var(--ds-primitive-color-rose-700)', marginLeft: '4px', fontWeight: 500 }} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Combobox Trigger (48px height) */}
      <div
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        style={{
          height: 'var(--ds-comp-input-height)', // 48px
          backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100)' : 'var(--ds-comp-input-bg)',
          border: hasError
            ? '2px solid var(--ds-color-border-error)'
            : isOpen
            ? '2px solid var(--ds-color-focus-ring)'
            : '1px solid var(--ds-color-border-default)',
          borderRadius: 'var(--ds-comp-input-radius)', // 8px
          padding: '0 var(--ds-comp-input-padding-x)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--ds-primitive-font-body)',
          fontSize: 'var(--ds-comp-input-font-size)',
          color: selectedOption ? 'var(--ds-color-text-primary)' : 'var(--ds-primitive-color-slate-400)',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          color="var(--ds-color-text-secondary)"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
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
            backgroundColor: 'var(--ds-color-surface-card)',
            border: '1px solid var(--ds-color-border-default)',
            borderRadius: 'var(--ds-comp-input-radius)',
            boxShadow: 'var(--ds-primitive-shadow-modal)',
            zIndex: 'var(--ds-primitive-z-dropdown)',
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '4px 0',
          }}
        >
          {/* Quick Search Filter */}
          {options.length > 6 && (
            <div style={{ padding: '8px', borderBottom: '1px solid var(--ds-primitive-color-slate-100)' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={14} color="var(--ds-color-text-muted)" style={{ position: 'absolute', left: '10px' }} aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Type to filter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    height: '36px',
                    paddingLeft: '32px',
                    paddingRight: '12px',
                    borderRadius: 'var(--ds-comp-btn-radius)',
                    border: '1px solid var(--ds-color-border-subtle)',
                    fontSize: 'var(--ds-primitive-font-size-base)',
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
                    padding: '8px 16px 4px',
                    fontSize: 'var(--ds-primitive-font-size-xs)',
                    fontWeight: 500,
                    color: 'var(--ds-color-text-muted)',
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
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      fontSize: 'var(--ds-primitive-font-size-base)',
                      color: isSelected ? 'var(--ds-color-text-heading)' : 'var(--ds-color-text-primary)',
                      backgroundColor: isSelected ? 'var(--ds-color-surface-brand-tint)' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--ds-primitive-color-slate-100)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={16} color="var(--ds-color-action-teal)" aria-hidden="true" />}
                  </div>
                );
              })}
            </div>
          ))}

          {filteredOptions.length === 0 && (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--ds-color-text-muted)', fontSize: 'var(--ds-primitive-font-size-sm)' }}>
              No matches found
            </div>
          )}
        </div>
      )}

      {helperText && !hasError && (
        <p style={{ fontFamily: 'var(--ds-primitive-font-body)', fontSize: 'var(--ds-primitive-font-size-sm)', color: 'var(--ds-color-text-muted)', marginTop: 'var(--ds-space-control-to-helper)', marginBottom: 0 }}>
          {helperText}
        </p>
      )}

      {hasError && (
        <p role="alert" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--ds-primitive-font-body)', fontSize: 'var(--ds-primitive-font-size-sm)', color: 'var(--ds-primitive-color-rose-700)', marginTop: 'var(--ds-space-control-to-helper)', marginBottom: 0 }}>
          <AlertCircle size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
};
