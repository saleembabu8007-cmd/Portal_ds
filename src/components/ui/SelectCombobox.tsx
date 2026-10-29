import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
  description?: string;
}

export interface SelectComboboxProps {
  id: string;
  label: string;
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
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opt.group && opt.group.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group filtered options
  const groupedOptions = filteredOptions.reduce<Record<string, SelectOption[]>>((acc, opt) => {
    const groupName = opt.group || 'Other';
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

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={containerRef} className="ds-combobox-wrapper" style={{ marginBottom: 'var(--ds-primitive-space-4)', position: 'relative' }}>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontFamily: 'var(--ds-primitive-font-body)',
          fontSize: 'var(--ds-primitive-font-size-sm)',
          fontWeight: 'var(--ds-primitive-font-weight-medium)',
          color: 'var(--ds-color-text-secondary)',
          marginBottom: 'var(--ds-primitive-space-2)',
        }}
      >
        {label}
        {required && <span style={{ color: 'var(--ds-primitive-color-rose-700)', marginLeft: '4px' }}>*</span>}
      </label>

      {/* Combobox Trigger */}
      <div
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
          width: '100%',
          height: 'var(--ds-comp-input-height)', // 48px
          padding: '0 var(--ds-comp-input-padding-x)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--ds-primitive-font-body)',
          fontSize: 'var(--ds-primitive-font-size-base)',
          backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100)' : 'var(--ds-comp-input-bg)',
          border: errorMessage ? '2px solid var(--ds-color-border-error)' : '1px solid var(--ds-color-border-default)',
          borderRadius: 'var(--ds-comp-input-radius)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          boxSizing: 'border-box',
        }}
        className="ds-combobox-trigger"
      >
        <span style={{ color: selectedOption ? 'var(--ds-color-text-primary)' : 'var(--ds-primitive-color-slate-400)' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={18} color="var(--ds-color-text-muted)" aria-hidden="true" />
      </div>

      {/* Dropdown Popover */}
      {isOpen && (
        <div
          id={`${id}-listbox`}
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            backgroundColor: 'var(--ds-color-surface-card)',
            border: '1px solid var(--ds-color-border-subtle)',
            borderRadius: 'var(--ds-primitive-radius-md)',
            boxShadow: 'var(--ds-primitive-shadow-lg)',
            zIndex: 40,
            maxHeight: '320px',
            overflowY: 'auto',
          }}
        >
          {/* Search Box */}
          <div style={{ padding: '8px', borderBottom: '1px solid var(--ds-color-border-subtle)', position: 'sticky', top: 0, backgroundColor: '#FFFFFF' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={16} color="var(--ds-color-text-muted)" style={{ position: 'absolute', left: '10px' }} aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px 8px 34px',
                  fontSize: 'var(--ds-primitive-font-size-sm)',
                  borderRadius: '4px',
                  border: '1px solid var(--ds-color-border-default)',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Grouped Options */}
          {Object.keys(groupedOptions).length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--ds-color-text-muted)', fontSize: '14px' }}>
              No matches found
            </div>
          ) : (
            Object.entries(groupedOptions).map(([groupName, groupOpts]) => (
              <div key={groupName}>
                <div
                  style={{
                    padding: '8px 16px 4px 16px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--ds-color-text-muted)',
                    backgroundColor: 'var(--ds-primitive-color-navy-50)',
                  }}
                >
                  {groupName}
                </div>
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
                        fontSize: 'var(--ds-primitive-font-size-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? 'var(--ds-primitive-color-teal-50)' : 'transparent',
                        color: isSelected ? 'var(--ds-primitive-color-teal-800)' : 'var(--ds-color-text-primary)',
                        fontWeight: isSelected ? 600 : 400,
                      }}
                      className="ds-combobox-option"
                    >
                      <div>
                        <div>{opt.label}</div>
                        {opt.description && (
                          <div style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)' }}>{opt.description}</div>
                        )}
                      </div>
                      {isSelected && <Check size={16} color="var(--ds-primitive-color-teal-800)" aria-hidden="true" />}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}

      {errorMessage ? (
        <p role="alert" style={{ fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-primitive-color-rose-700)', marginTop: '4px', margin: 0 }}>
          {errorMessage}
        </p>
      ) : helperText ? (
        <p style={{ fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-color-text-muted)', marginTop: '4px', margin: 0 }}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

