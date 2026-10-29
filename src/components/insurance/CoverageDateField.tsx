import React, { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/FeedbackModals';
import { Button } from '../ui/Button';

export interface CoverageDateFieldProps {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  isProrata?: boolean;
  onStartDateChange: (newDate: string, isBackdateAccepted: boolean) => void;
  onApcToggle?: (alignWithApc: boolean) => void;
  className?: string;
}

export const CoverageDateField: React.FC<CoverageDateFieldProps> = ({
  id,
  startDate,
  endDate,
  isProrata = false,
  onStartDateChange,
  onApcToggle,
  className = '',
}) => {
  const [showClauseModal, setShowClauseModal] = useState(false);
  const [pendingBackdate, setPendingBackdate] = useState('');
  const [alignApc, setAlignApc] = useState(false);

  // Compute 9-month forward ceiling
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 9);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleDateChange = (val: string) => {
    if (!val) return;

    if (val < todayStr) {
      // Past date -> trigger Clause 6.12 modal
      setPendingBackdate(val);
      setShowClauseModal(true);
    } else {
      onStartDateChange(val, false);
    }
  };

  const handleAgreeClause = () => {
    // Mutate to 01/01/CurrentYear
    const currentYear = new Date().getFullYear();
    const mutatedDate = `${currentYear}-01-01`;
    setShowClauseModal(false);
    onStartDateChange(mutatedDate, true);
  };

  const handleDisagreeClause = () => {
    setShowClauseModal(false);
    setPendingBackdate('');
  };

  const handleApcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlignApc(e.target.checked);
    if (onApcToggle) onApcToggle(e.target.checked);
  };

  return (
    <div className={`ds-coverage-date-field ${className}`} style={{ marginBottom: 'var(--ds-primitive-space-6)' }}>
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
        Coverage Inception Date <span style={{ color: 'var(--ds-primitive-color-rose-700)' }}>*</span>
      </label>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Calendar
          size={18}
          color="var(--ds-color-text-muted)"
          style={{ position: 'absolute', left: '16px', pointerEvents: 'none' }}
          aria-hidden="true"
        />
        <input
          id={id}
          type="date"
          value={startDate}
          max={maxDateStr}
          onChange={(e) => handleDateChange(e.target.value)}
          style={{
            width: '100%',
            height: 'var(--ds-comp-input-height)',
            paddingLeft: '44px',
            paddingRight: 'var(--ds-comp-input-padding-x)',
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-base)',
            color: 'var(--ds-color-text-primary)',
            backgroundColor: 'var(--ds-comp-input-bg)',
            border: '1px solid var(--ds-color-border-default)',
            borderRadius: 'var(--ds-comp-input-radius)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {endDate && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
          <span style={{ fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-color-text-muted)' }}>
            Policy Period Expiry: <strong>{endDate}</strong>
          </span>
          {isProrata && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: 'var(--ds-primitive-color-amber-50)',
                color: 'var(--ds-primitive-color-amber-800)',
              }}
            >
              Pro-Rated Period
            </span>
          )}
        </div>
      )}

      {/* APC Co-Termination Option */}
      <div style={{ marginTop: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-color-text-secondary)' }}>
          <input
            type="checkbox"
            checked={alignApc}
            onChange={handleApcChange}
            style={{ width: '16px', height: '16px', accentColor: 'var(--ds-primitive-color-teal-700)' }}
          />
          <span>Align coverage expiry with Annual Practicing Certificate (APC) on 31st December</span>
        </label>
      </div>

      {/* Clause 6.12 Backdating Interception Modal */}
      <Modal
        isOpen={showClauseModal}
        onClose={handleDisagreeClause}
        title="Notice on Backdated Coverage (Clause 6.12)"
        footer={
          <>
            <Button variant="ghost" onClick={handleDisagreeClause}>
              Cancel & Pick Future Date
            </Button>
            <Button variant="primary" onClick={handleAgreeClause}>
              I Agree to Clause 6.12 Terms
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <AlertCircle size={24} color="var(--ds-primitive-color-amber-500)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
          <div style={{ fontSize: 'var(--ds-primitive-font-size-sm)', lineHeight: 1.5, color: 'var(--ds-color-text-primary)' }}>
            <p style={{ margin: '0 0 12px 0' }}>
              You have selected a backdated start date (<strong>{pendingBackdate}</strong>). Under Chubb Policy Wording <strong>Clause 6.12</strong>, backdating does not provide retroactive protection for claims or inquiries arising from medical acts, errors, or omissions committed prior to the commencement date of this policy.
            </p>
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--ds-color-text-heading)' }}>
              By selecting "I Agree", your official inception date will be recorded as <strong>01/01/{new Date().getFullYear()}</strong>, and you accept that known or unknown prior acts preceding continuous coverage remain excluded.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

