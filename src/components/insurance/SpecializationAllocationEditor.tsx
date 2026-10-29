import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Scale } from 'lucide-react';
import { Button } from '../ui/Button';

export interface SpecialtyItem {
  id: string;
  name: string;
  percentage: number;
}

export interface SpecializationAllocationEditorProps {
  specialties: SpecialtyItem[];
  onSave: (allocations: SpecialtyItem[]) => void;
  onCancel?: () => void;
}

export const SpecializationAllocationEditor: React.FC<SpecializationAllocationEditorProps> = ({
  specialties: initialSpecialties,
  onSave,
  onCancel,
}) => {
  const [specialties, setSpecialties] = useState<SpecialtyItem[]>(initialSpecialties);

  const currentSum = specialties.reduce((sum, item) => sum + (Number(item.percentage) || 0), 0);
  const remaining = 100 - currentSum;
  const isBalanced = Math.abs(remaining) < 0.01;
  const isOver = currentSum > 100;
  const hasZeroOrNegative = specialties.some((item) => (Number(item.percentage) || 0) <= 0);

  const handlePercentageChange = (id: string, value: string) => {
    const num = parseFloat(value);
    setSpecialties((prev) =>
      prev.map((item) => (item.id === id ? { ...item, percentage: isNaN(num) ? 0 : num } : item))
    );
  };

  const handleAutoBalance = () => {
    if (specialties.length === 0) return;
    const equalShare = Math.floor((100 / specialties.length) * 10) / 10;
    const remainder = Math.round((100 - equalShare * specialties.length) * 10) / 10;

    setSpecialties((prev) =>
      prev.map((item, index) => ({
        ...item,
        percentage: index === 0 ? equalShare + remainder : equalShare,
      }))
    );
  };

  return (
    <div className="ds-specialty-allocation-editor">
      {/* Live Balance Status Meter */}
      <div
        role="status"
        aria-live="polite"
        style={{
          padding: 'var(--ds-primitive-space-4)',
          borderRadius: 'var(--ds-primitive-radius-md)',
          marginBottom: 'var(--ds-primitive-space-4)',
          backgroundColor: isBalanced
            ? 'var(--ds-primitive-color-emerald-50)'
            : isOver
            ? 'var(--ds-primitive-color-rose-50)'
            : 'var(--ds-primitive-color-amber-50)',
          borderLeft: `4px solid ${
            isBalanced
              ? 'var(--ds-primitive-color-emerald-500)'
              : isOver
              ? 'var(--ds-primitive-color-rose-500)'
              : 'var(--ds-primitive-color-amber-500)'
          }`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isBalanced ? (
            <CheckCircle size={18} color="var(--ds-primitive-color-emerald-500)" aria-hidden="true" />
          ) : (
            <AlertCircle
              size={18}
              color={isOver ? 'var(--ds-primitive-color-rose-500)' : 'var(--ds-primitive-color-amber-500)'}
              aria-hidden="true"
            />
          )}
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: 'var(--ds-primitive-font-size-sm)',
              fontWeight: 600,
              color: isBalanced
                ? 'var(--ds-primitive-color-emerald-700)'
                : isOver
                ? 'var(--ds-primitive-color-rose-700)'
                : 'var(--ds-primitive-color-amber-800)',
            }}
          >
            {isBalanced
              ? 'Allocation Balanced (100.0%)'
              : isOver
              ? `Total exceeds 100% by ${Math.abs(remaining).toFixed(1)}%`
              : `Remaining to allocate: ${remaining.toFixed(1)}%`}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAutoBalance}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 'var(--ds-primitive-font-size-xs)',
            fontWeight: 600,
            color: 'var(--ds-primitive-color-teal-800)',
          }}
        >
          <Scale size={14} aria-hidden="true" />
          <span>Distribute Evenly</span>
        </button>
      </div>

      {/* Specialty Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-primitive-space-3)' }}>
        {specialties.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--ds-primitive-space-3) var(--ds-primitive-space-4)',
              backgroundColor: 'var(--ds-primitive-color-navy-50)',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px solid var(--ds-color-border-subtle)',
            }}
          >
            <label
              htmlFor={`spec-${item.id}`}
              style={{
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: 'var(--ds-primitive-font-size-sm)',
                fontWeight: 500,
                color: 'var(--ds-color-text-primary)',
              }}
            >
              {item.name}
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                id={`spec-${item.id}`}
                type="number"
                min="1"
                max="100"
                step="0.5"
                value={item.percentage || ''}
                onChange={(e) => handlePercentageChange(item.id, e.target.value)}
                style={{
                  width: '80px',
                  height: '38px',
                  padding: '4px 8px',
                  textAlign: 'right',
                  fontFamily: 'var(--ds-primitive-font-mono)',
                  fontSize: 'var(--ds-primitive-font-size-base)',
                  fontWeight: 600,
                  color: 'var(--ds-color-text-primary)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--ds-color-border-default)',
                  borderRadius: 'var(--ds-primitive-radius-sm)',
                  outline: 'none',
                }}
              />
              <span style={{ fontFamily: 'var(--ds-primitive-font-mono)', fontSize: 'var(--ds-primitive-font-size-sm)', color: 'var(--ds-color-text-muted)' }}>
                %
              </span>
            </div>
          </div>
        ))}
      </div>

      {hasZeroOrNegative && (
        <p style={{ fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-primitive-color-rose-700)', marginTop: '8px' }}>
          * Every active specialization must be allocated greater than 0%.
        </p>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: 'var(--ds-primitive-space-6)' }}>
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          variant="primary"
          disabled={!isBalanced || hasZeroOrNegative}
          onClick={() => onSave(specialties)}
        >
          Confirm Allocation (100%)
        </Button>
      </div>
    </div>
  );
};

