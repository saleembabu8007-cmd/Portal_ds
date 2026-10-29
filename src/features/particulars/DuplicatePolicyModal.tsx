import React, { useState } from 'react';
import { CustomerPolicyRecord } from '../../core/api/renewalService';
import {
  ShieldAlert,
  Download,
  ExternalLink,
  CheckCircle2,
  X,
  FileText,
  AlertTriangle,
  Mail,
} from 'lucide-react';

export interface DuplicatePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyRecord: CustomerPolicyRecord;
  onProceedAnyway?: () => void;
}

export const DuplicatePolicyModal: React.FC<DuplicatePolicyModalProps> = ({
  isOpen,
  onClose,
  policyRecord,
  onProceedAnyway,
}) => {
  const [downloadingCoi, setDownloadingCoi] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadCoi = () => {
    setDownloadingCoi(true);
    setTimeout(() => {
      setDownloadingCoi(false);
      setDownloadSuccess(true);
      // Simulate real browser download trigger for Chubb Certificate of Insurance
      const blob = new Blob(
        [
          `CHUBB INSURANCE MALAYSIA BERHAD\nCERTIFICATE OF INSURANCE\nPolicy: ${policyRecord.policyNumber}\nCertificate: ${policyRecord.certificateNumber}\nInsured: ${policyRecord.insuredName}\nNRIC: ${policyRecord.nric}\nLimit: ${policyRecord.limitFormatted}\nPeriod: ${policyRecord.startDate} to ${policyRecord.endDate}\nStatus: IN FORCE`,
        ],
        { type: 'text/plain' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${policyRecord.certificateNumber}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="duplicate-policy-title"
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
          maxWidth: '560px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          padding: '28px',
          boxShadow: 'var(--ds-primitive-shadow-xl)',
          border: '1px solid var(--ds-color-border-subtle)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close duplicate policy notification"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--ds-color-text-secondary)',
            padding: '6px',
            borderRadius: '6px',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ds-color-state-error)',
            }}
          >
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2
              id="duplicate-policy-title"
              style={{
                fontFamily: 'Kanit, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: 'var(--ds-color-secondary)',
                margin: 0,
              }}
            >
              Active In-Force Policy Detected
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--ds-color-text-secondary)' }}>
              Legacy Check: MODAL-18 (#jsAlreadyBoughtModal)
            </p>
          </div>
        </div>

        {/* Alert Body */}
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: 'var(--ds-primitive-radius-md)',
            padding: '14px',
            marginBottom: '18px',
            fontSize: '13px',
            lineHeight: 1.5,
            color: 'var(--ds-color-text-primary)',
          }}
        >
          Our underwriting records indicate that practitioner <strong>{policyRecord.insuredName}</strong> (NRIC: {policyRecord.nric}) already holds an active DoctorShield Medical Professional Indemnity Policy underwritten by Chubb Insurance Malaysia Berhad.
        </div>

        {/* In-Force Policy Summary Card */}
        <div
          style={{
            backgroundColor: 'var(--ds-color-surface-muted)',
            border: '1px solid var(--ds-color-border-subtle)',
            borderRadius: 'var(--ds-primitive-radius-lg)',
            padding: '16px',
            marginBottom: '20px',
            fontSize: '13px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--ds-color-text-secondary)' }}>Policy Number:</span>
            <span style={{ fontWeight: 600, color: 'var(--ds-color-secondary)' }}>{policyRecord.policyNumber}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--ds-color-text-secondary)' }}>Certificate Number:</span>
            <span style={{ fontWeight: 500 }}>{policyRecord.certificateNumber}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--ds-color-text-secondary)' }}>In-Force Coverage Period:</span>
            <span style={{ fontWeight: 500 }}>
              {policyRecord.startDate} to {policyRecord.endDate}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--ds-color-text-secondary)' }}>Limit of Liability:</span>
            <span style={{ fontWeight: 500 }}>{policyRecord.limitFormatted}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--ds-color-border-subtle)', paddingTop: '8px' }}>
            <span style={{ color: 'var(--ds-color-text-secondary)' }}>Status:</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600,
                color: policyRecord.status === 'ALREADY_RENEWED' ? '#059669' : '#D97706',
              }}
            >
              <CheckCircle2 size={14} />
              {policyRecord.status === 'ALREADY_RENEWED' ? 'Already Renewed for Next Year' : 'In Force / Active'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={handleDownloadCoi}
            disabled={downloadingCoi}
            style={{
              width: '100%',
              padding: '11px',
              backgroundColor: 'var(--ds-color-primary)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--ds-primitive-radius-md)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Download size={16} />
            {downloadingCoi
              ? 'Generating Certificate...'
              : downloadSuccess
              ? 'Certificate Downloaded ✓'
              : 'Download Current Certificate of Insurance (COI)'}
          </button>

          <a
            href="mailto:endorsement@doctorshield.com?subject=DoctorShield%20Policy%20Endorsement%20Request"
            style={{
              width: '100%',
              padding: '11px',
              backgroundColor: '#FFFFFF',
              color: 'var(--ds-color-secondary)',
              border: '1px solid var(--ds-color-border-subtle)',
              borderRadius: 'var(--ds-primitive-radius-md)',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxSizing: 'border-box',
            }}
          >
            <Mail size={16} />
            Request Mid-Term Endorsement / Scope Change
          </a>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            {onProceedAnyway && (
              <button
                type="button"
                onClick={onProceedAnyway}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '12px',
                  color: 'var(--ds-color-text-muted)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: '4px',
                }}
              >
                Proceed with separate application anyway
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              style={{
                marginLeft: 'auto',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--ds-color-primary)',
                cursor: 'pointer',
              }}
            >
              Back to Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

