import React, { useState } from 'react';
import { AlertTriangle, Info, Shield, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Heading, Text } from '../../components/ui/Typography';

export interface BackdateAgreementModalProps {
  isOpen: boolean;
  startDate: string;
  onAgree: () => void;
  onDisagree: () => void;
}

export const BackdateAgreementModal: React.FC<BackdateAgreementModalProps> = ({
  isOpen,
  startDate,
  onAgree,
  onDisagree,
}) => {
  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString('en-GB');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="backdate-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(19, 39, 102, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          padding: '32px 28px',
          boxShadow: 'var(--ds-primitive-shadow-xl)',
          border: '1px solid var(--ds-primitive-color-amber-500)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--ds-primitive-color-amber-50)',
              color: 'var(--ds-primitive-color-amber-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={24} />
          </div>

          <Heading
            level={3}
            id="backdate-modal-title"
            weight={500}
            style={{ margin: 0, fontSize: '1.25rem' }}
          >
            Policy Backdate Agreement (Clause 6.12)
          </Heading>
        </div>

        {/* Verbatim Statutory Copy from LEG-BACKDATE-001 */}
        <div
          style={{
            fontSize: 'var(--ds-primitive-font-size-sm)',
            color: 'var(--ds-color-text-secondary)',
            lineHeight: 1.6,
            marginBottom: '24px',
            backgroundColor: 'var(--ds-primitive-color-slate-50)',
            padding: '16px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            border: '1px solid var(--ds-color-border-subtle)',
          }}
        >
          <Text
            variant="small"
            weight={500}
            style={{ margin: '0 0 12px 0', color: 'var(--ds-primitive-color-navy-900)' }}
          >
            CHUBB ELITE MEDICAL MALPRACTICE INSURANCE FOR PERIOD OF INSURANCE. NON-CONTINUOUS RETROACTIVE COVERAGE PERIOD.
          </Text>
          <Text variant="small" color="secondary" style={{ margin: 0 }}>
            Pursuant to Clause 6.12 Licensing of Medical Professionals & Maintenance of Records under this Policy, I hereby acknowledge that Chubb shall not be liable for any Loss or any other payment under this Policy directly or indirectly caused by, arising out of or in any way connected with any Medical Incident occurring from <strong>{startDate}</strong> until <strong>{todayStr}</strong>.
          </Text>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button
            type="button"
            variant="secondary"
            onClick={onDisagree}
          >
            Disagree & Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={onAgree}
          >
            I Agree & Acknowledge
          </Button>
        </div>
      </div>
    </div>
  );
};

export interface PeriodEndDateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PeriodEndDateModal: React.FC<PeriodEndDateModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="period-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(19, 39, 102, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          maxWidth: '540px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          padding: '28px',
          boxShadow: 'var(--ds-primitive-shadow-xl)',
          border: '1px solid var(--ds-color-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={22} color="var(--ds-primitive-color-teal-700)" />
            <Heading
              level={3}
              id="period-modal-title"
              weight={500}
              style={{ margin: 0, fontSize: '1.25rem' }}
            >
              Why Does My Policy End on 31st December?
            </Heading>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ds-color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: 'var(--ds-primitive-radius-sm)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Text variant="body" color="secondary" style={{ margin: 0, lineHeight: 1.6 }}>
            In accordance with the <strong>Malaysian Medical Council (MMC)</strong> guidelines, Annual Practicing Certificates (APC) operate strictly on a calendar year cycle expiring every <strong>31st December</strong>.
          </Text>
          <Text variant="body" color="secondary" style={{ margin: 0, lineHeight: 1.6 }}>
            To ensure continuous, uninterrupted indemnity certificate submission during your annual MMC APC renewal, DoctorShield policy periods co-terminate on 31st December. If your start date is mid-year, your premium is calculated on a fair, server-verified pro-rata basis.
          </Text>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onClose}
          >
            Understood
          </Button>
        </div>
      </div>
    </div>
  );
};

export interface SpecializationModalProps {
  isOpen: boolean;
  classificationName: string;
  initialSpecialties: Array<{ specialtyId: string; specialtyName: string; percentage: number }>;
  onSave: (specialties: Array<{ specialtyId: string; specialtyName: string; percentage: number }>) => void;
  onClose: () => void;
}

export const SpecializationModal: React.FC<SpecializationModalProps> = ({
  isOpen,
  classificationName,
  initialSpecialties,
  onSave,
  onClose,
}) => {
  if (!isOpen) return null;

  const [specialties, setSpecialties] = useState(initialSpecialties);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalSum = specialties.reduce((sum, item) => sum + (Number(item.percentage) || 0), 0);
  const isSumValid = Math.abs(totalSum - 100.0) < 0.001;

  const handlePercentageChange = (index: number, val: number) => {
    setErrorMessage(null);
    const updated = [...specialties];
    updated[index].percentage = val;
    setSpecialties(updated);
  };

  const handleSave = () => {
    if (!isSumValid) {
      setErrorMessage('Sum of percentage should be 100');
      return;
    }

    const hasInvalid = specialties.some((s) => s.percentage <= 0);
    if (hasInvalid) {
      setErrorMessage('The value must be greater than zero.');
      return;
    }

    onSave(specialties);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="spec-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(19, 39, 102, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          maxWidth: '580px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          padding: '32px 28px',
          boxShadow: 'var(--ds-primitive-shadow-xl)',
          border: '1px solid var(--ds-color-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={22} color="var(--ds-primitive-color-teal-700)" />
            <Heading
              level={3}
              id="spec-modal-title"
              weight={500}
              style={{ margin: 0, fontSize: '1.25rem' }}
            >
              Allocate Practice Specialization Percentages
            </Heading>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ds-color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: 'var(--ds-primitive-radius-sm)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <Text variant="small" color="secondary" style={{ margin: '0 0 20px 0' }}>
          For <strong>{classificationName}</strong>, indicate the percentage of your clinical practice dedicated to each procedure. The total allocation must equal exactly <strong>100%</strong>.
        </Text>

        {/* Error Callout */}
        {errorMessage && (
          <div
            role="alert"
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--ds-primitive-color-rose-50)',
              border: '1px solid var(--ds-primitive-color-rose-500)',
              borderRadius: 'var(--ds-primitive-radius-md)',
              color: 'var(--ds-primitive-color-rose-700)',
              fontSize: '13px',
              fontWeight: 500,
              marginBottom: '16px',
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Specialty Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {specialties.map((item, idx) => (
            <div
              key={item.specialtyId}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: 'var(--ds-primitive-color-slate-50)',
                border: '1px solid var(--ds-color-border-default)',
                gap: '12px',
              }}
            >
              <div style={{ flex: 1, fontSize: '14px', fontWeight: 500, color: 'var(--ds-primitive-color-navy-900)' }}>
                {item.specialtyName}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={item.percentage}
                  onChange={(e) => handlePercentageChange(idx, parseFloat(e.target.value) || 0)}
                  aria-label={`Percentage for ${item.specialtyName}`}
                  style={{
                    width: '80px',
                    height: '40px',
                    padding: '0 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--ds-color-border-default)',
                    fontFamily: 'var(--ds-primitive-font-mono)',
                    fontSize: '14px',
                    fontWeight: 500,
                    textAlign: 'right',
                  }}
                />
                <span style={{ fontWeight: 500, color: 'var(--ds-color-text-secondary)' }}>%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total & Remaining Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: isSumValid
              ? 'var(--ds-primitive-color-emerald-50)'
              : 'var(--ds-primitive-color-amber-50)',
            border: `1px solid ${
              isSumValid
                ? 'var(--ds-primitive-color-emerald-500)'
                : 'var(--ds-primitive-color-amber-500)'
            }`,
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ds-color-text-heading)' }}>
            Total Allocated: <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>{totalSum}%</span>
          </div>

          <div
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: isSumValid
                ? 'var(--ds-primitive-color-emerald-700)'
                : 'var(--ds-primitive-color-amber-800)',
            }}
          >
            {isSumValid ? '100% Balanced' : `Remaining: ${100 - totalSum}%`}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={handleSave}
            disabled={!isSumValid}
          >
            Save Allocation
          </Button>
        </div>
      </div>
    </div>
  );
};

