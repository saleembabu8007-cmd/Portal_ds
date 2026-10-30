import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface PercentageAllocationRowProps {
  id: string;
  name: string;
  percentage: number;
  onChange: (newPercentage: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

/**
 * DoctorShield Percentage Allocation Row Molecule
 * Standard: Clean single-row layout for specialization splits.
 * Includes precise numeric input, step buttons, and tabular figures.
 */
export const PercentageAllocationRow: React.FC<PercentageAllocationRowProps> = ({
  id,
  name,
  percentage,
  onChange,
  disabled = false,
  min = 0,
  max = 100,
  step = 5,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val)) {
      onChange(0);
    } else {
      onChange(Math.min(max, Math.max(min, val)));
    }
  };

  const handleStep = (delta: number) => {
    const updated = Math.min(max, Math.max(min, Math.round((percentage + delta) * 10) / 10));
    onChange(updated);
  };

  return (
    <div
      className="ds-percentage-allocation-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--ds-primitive-space-3) var(--ds-primitive-space-4)',
        backgroundColor: 'var(--ds-color-surface-base)',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-comp-input-radius)',
        marginBottom: 'var(--ds-primitive-space-2)',
        gap: 'var(--ds-primitive-space-3)',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            fontWeight: 'var(--ds-primitive-font-weight-medium)',
            color: 'var(--ds-color-text-primary)',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Decrement Button */}
        <button
          type="button"
          disabled={disabled || percentage <= min}
          onClick={() => handleStep(-step)}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '4px',
            border: '1px solid var(--ds-color-border-default)',
            backgroundColor: 'var(--ds-color-surface-base)',
            color: 'var(--ds-color-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled || percentage <= min ? 'not-allowed' : 'pointer',
            opacity: disabled || percentage <= min ? 0.5 : 1,
          }}
          aria-label={`Decrease ${name} percentage`}
        >
          <Minus size={14} />
        </button>

        {/* Numeric Input with % Suffix */}
        <div style={{ position: 'relative', width: '80px', display: 'flex', alignItems: 'center' }}>
          <input
            id={id}
            type="number"
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            value={percentage}
            onChange={handleInputChange}
            aria-label={`${name} percentage`}
            style={{
              width: '100%',
              height: '36px',
              paddingLeft: '10px',
              paddingRight: '26px',
              fontFamily: 'var(--ds-primitive-font-mono)',
              fontSize: 'var(--ds-primitive-font-size-sm)',
              fontWeight: 600,
              textAlign: 'right',
              border: '1px solid var(--ds-color-border-default)',
              borderRadius: '4px',
              backgroundColor: disabled ? 'var(--ds-color-surface-sunken)' : 'var(--ds-color-surface-base)',
              color: 'var(--ds-color-text-primary)',
              fontVariantNumeric: 'tabular-nums',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <span
            style={{
              position: 'absolute',
              right: '10px',
              fontSize: 'var(--ds-primitive-font-size-xs)',
              fontWeight: 500,
              color: 'var(--ds-color-text-tertiary)',
              pointerEvents: 'none',
            }}
          >
            %
          </span>
        </div>

        {/* Increment Button */}
        <button
          type="button"
          disabled={disabled || percentage >= max}
          onClick={() => handleStep(step)}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '4px',
            border: '1px solid var(--ds-color-border-default)',
            backgroundColor: 'var(--ds-color-surface-base)',
            color: 'var(--ds-color-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled || percentage >= max ? 'not-allowed' : 'pointer',
            opacity: disabled || percentage >= max ? 0.5 : 1,
          }}
          aria-label={`Increase ${name} percentage`}
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

