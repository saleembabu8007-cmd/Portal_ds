import React from 'react';
import { ArrowRight, Calendar, Info } from 'lucide-react';
import { DateField } from './DateField';
import { Badge } from '../ui/FieldFeedback';

export interface InsuranceDateRangeProps {
  id?: string;
  startDate: string;
  endDate?: string;
  onStartDateChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  isProrata?: boolean;
  prorataDays?: number;
  alignWithApc?: boolean;
  errorMessage?: string;
  helperText?: string;
}

/**
 * DoctorShield Insurance Date-Range Composition Molecule
 * Displays Coverage Inception Date along with the MMC APC-aligned Expiry Date (31 December).
 * Provides clear duration calculation, pro-rata badge, and statutory alignment note.
 */
export const InsuranceDateRange: React.FC<InsuranceDateRangeProps> = ({
  id = 'coverage_date_range',
  startDate,
  endDate = `${new Date().getFullYear()}-12-31`,
  onStartDateChange,
  minDate,
  maxDate,
  isProrata = false,
  prorataDays,
  alignWithApc = true,
  errorMessage,
  helperText = 'Indemnity coverage commences at 00:01 on the inception date.',
}) => {
  // Format dates for display
  const formatDateDisplay = (dateStr?: string) => {
    if (!dateStr) return '—';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className="ds-insurance-date-range"
      style={{
        marginBottom: 'var(--ds-primitive-space-6)',
        padding: 'var(--ds-primitive-space-4)',
        backgroundColor: 'var(--ds-color-surface-subtle)',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-comp-panel-radius)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--ds-primitive-space-4)',
          alignItems: 'start',
        }}
      >
        {/* Inception Date Input */}
        <div>
          <DateField
            id={`${id}_start`}
            label="Coverage Inception Date"
            required
            value={startDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            errorMessage={errorMessage}
            helperText={helperText}
          />
        </div>

        {/* Expiry Date Display */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 'var(--ds-primitive-space-2)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: 'var(--ds-primitive-font-size-sm)',
                fontWeight: 'var(--ds-primitive-font-weight-medium)',
                color: 'var(--ds-color-text-secondary)',
              }}
            >
              Policy Expiry Date
            </span>
            {alignWithApc && (
              <Badge variant="teal">MMC APC Aligned</Badge>
            )}
          </div>

          <div
            style={{
              height: 'var(--ds-comp-input-height)',
              padding: '0 var(--ds-comp-input-padding-x)',
              backgroundColor: 'var(--ds-color-surface-base)',
              border: '1px solid var(--ds-color-border-subtle)',
              borderRadius: 'var(--ds-comp-input-radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={18} color="var(--ds-color-text-tertiary)" aria-hidden="true" />
              <span
                style={{
                  fontFamily: 'var(--ds-primitive-font-body)',
                  fontSize: 'var(--ds-primitive-font-size-sm)',
                  fontWeight: 'var(--ds-primitive-font-weight-medium)',
                  color: 'var(--ds-color-text-primary)',
                }}
              >
                {formatDateDisplay(endDate)}
              </span>
            </div>
            <span
              style={{
                fontSize: 'var(--ds-primitive-font-size-xs)',
                color: 'var(--ds-color-text-tertiary)',
              }}
            >
              23:59 MYT
            </span>
          </div>

          <div
            style={{
              marginTop: 'var(--ds-primitive-space-2)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--ds-primitive-font-size-xs)',
              color: 'var(--ds-color-text-tertiary)',
            }}
          >
            <Info size={14} color="var(--ds-color-text-tertiary)" aria-hidden="true" />
            <span>
              {isProrata && prorataDays
                ? `Pro-rata coverage active (${prorataDays} days)`
                : 'Annual 12-month policy term'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

