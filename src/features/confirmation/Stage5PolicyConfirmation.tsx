import React, { useState } from 'react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import {
  CheckCircle2,
  Download,
  FileText,
  Mail,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  PhoneCall,
  ExternalLink,
  RotateCcw,
  Building2,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export const Stage5PolicyConfirmation: React.FC = () => {
  const { coverage, doctorProfile, quote, policyDetails, paymentTransaction, resetWorkflow, announce } = useWorkflow();
  const [copiedPolicyNumber, setCopiedPolicyNumber] = useState(false);
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

  // Resolved display attributes with safe fallbacks
  const policyNumber =
    policyDetails?.policyNumber ||
    (paymentTransaction?.status === 'SUCCESS' ? 'CHUBB-DS-2026-92841' : 'CHUBB-DS-2026-77412');

  const certificateNumber =
    policyDetails?.certificateNumber || 'COI-2026-881923';

  const invoiceNumber =
    policyDetails?.invoiceNumber || 'INV-2026-55421';

  const doctorName =
    policyDetails?.insuredDoctorName ||
    doctorProfile?.fullName ||
    'Dr. Specialist Practitioner';

  const mmcNumber =
    policyDetails?.mmcNumber ||
    doctorProfile?.mmcNumber ||
    '12345';

  const nric =
    policyDetails?.nric ||
    doctorProfile?.nric ||
    '850101-14-5555';

  const classificationName =
    policyDetails?.classificationName ||
    coverage?.classificationName ||
    'General Medical Practitioner';

  const limitFormatted =
    policyDetails?.liabilityLimitFormatted ||
    coverage?.limitFormatted ||
    'RM 1,000,000';

  const startDate = policyDetails?.startDate || coverage?.startDate || '01/01/2026';
  const endDate = policyDetails?.endDate || coverage?.endDate || '31/12/2026';

  const totalPaid =
    policyDetails?.totalPaid ??
    quote?.totalPayable ??
    paymentTransaction?.amount ??
    1598.40;

  const emailRecipient =
    policyDetails?.emailDispatchedTo ||
    doctorProfile?.email ||
    coverage?.customerEmail ||
    'doctor@example.com';

  const txRef =
    policyDetails?.transactionReference ||
    paymentTransaction?.transactionReference ||
    'TXN-CHUBB-20261029-001';

  const channelLabel =
    (policyDetails?.paymentChannel || paymentTransaction?.paymentChannel) === 'business'
      ? 'Corporate Internet Banking (B2B FPX)'
      : 'Credit/Debit Card & Online Banking (B2C FPX)';

  const handleCopyPolicyNumber = async () => {
    try {
      await navigator.clipboard.writeText(policyNumber);
      setCopiedPolicyNumber(true);
      announce(`Policy number ${policyNumber} copied to clipboard`);
      setTimeout(() => setCopiedPolicyNumber(false), 2500);
    } catch {
      // Fallback
      setCopiedPolicyNumber(true);
      setTimeout(() => setCopiedPolicyNumber(false), 2500);
    }
  };

  const handleDownloadDoc = (docType: string, filename: string) => {
    setDownloadingDoc(docType);
    announce(`Preparing download for ${filename}`);

    // Generate mock official text file representing the certified document
    setTimeout(() => {
      try {
        const dummyContent = `================================================================================
CHUBB INSURANCE MALAYSIA BERHAD (Company No. 197001000564 / 9827-A)
DOCTORSHIELD INDIVIDUAL MEDICAL PROFESSIONAL INDEMNITY
================================================================================
Document Type : ${docType.toUpperCase()}
Policy Number : ${policyNumber}
Certificate No: ${certificateNumber}
Tax Invoice No: ${invoiceNumber}
Insured Name  : ${doctorName}
MMC Number    : ${mmcNumber}
NRIC / ID     : ${nric}
Specialty     : ${classificationName}
Limit         : ${limitFormatted} Any One Claim and in the Aggregate
Period        : ${startDate} to ${endDate}
Total Paid    : RM ${totalPaid.toFixed(2)} (Inclusive of 8% SST and RM 10.00 Stamp Duty)
Tx Reference  : ${txRef}
Issue Date    : ${new Date().toLocaleDateString('en-MY')}

Official underwriting confirmation registered with Malaysian Medical Council (MMC).
Eligible policy protected by PIDM under TIPS.
================================================================================`;

        const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch {
        // Safe fallback in headless browser test environments
      }
      setDownloadingDoc(null);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        maxWidth: '840px',
        margin: '0 auto',
        padding: '24px 16px 48px',
      }}
      data-testid="stage5-policy-confirmation"
    >
      {/* Success Badge & Primary Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--ds-primitive-color-emerald-50)',
            color: 'var(--ds-primitive-color-emerald-600)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            border: '2px solid var(--ds-primitive-color-emerald-500)',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
          }}
          aria-hidden="true"
        >
          <CheckCircle2 size={44} />
        </div>

        <div
          style={{
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--ds-primitive-color-emerald-700)',
            fontWeight: 700,
            marginBottom: '6px',
          }}
        >
          Payment Successful & Policy Bound
        </div>

        <h1
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '2rem',
            fontWeight: 500,
            color: 'var(--ds-color-text-heading)',
            margin: '0 0 12px 0',
            lineHeight: 1.25,
          }}
        >
          Your Indemnity Coverage is Active
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: 'var(--ds-color-text-secondary)',
            lineHeight: 1.6,
            maxWidth: '620px',
            margin: '0 auto',
          }}
        >
          Thank you, <strong>{doctorName}</strong>. Your medical professional indemnity policy underwritten
          by <strong>Chubb Insurance Malaysia Berhad</strong> has been successfully bound. Your Certificate
          of Insurance is ready for immediate MMC submission.
        </p>
      </div>

      {/* Hero Policy Number Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          border: '1px solid var(--ds-color-border-subtle)',
          boxShadow: 'var(--ds-primitive-shadow-md)',
          padding: '24px 28px',
          marginBottom: '28px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: 'var(--ds-primitive-color-teal-500)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--ds-color-border-subtle)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ds-color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px',
              }}
            >
              Chubb Master Policy Number
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontFamily: 'var(--ds-primitive-font-mono)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--ds-primitive-color-navy-900)',
                  letterSpacing: '0.02em',
                }}
                data-testid="confirmed-policy-number"
              >
                {policyNumber}
              </span>
              <button
                type="button"
                onClick={handleCopyPolicyNumber}
                aria-label="Copy policy number to clipboard"
                title="Copy policy number"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  backgroundColor: copiedPolicyNumber
                    ? 'var(--ds-primitive-color-emerald-50)'
                    : 'var(--ds-primitive-color-navy-50)',
                  color: copiedPolicyNumber
                    ? 'var(--ds-primitive-color-emerald-700)'
                    : 'var(--ds-primitive-color-navy-700)',
                  border: '1px solid var(--ds-color-border-subtle)',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {copiedPolicyNumber ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedPolicyNumber ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '9999px',
                backgroundColor: 'var(--ds-primitive-color-emerald-50)',
                color: 'var(--ds-primitive-color-emerald-700)',
                fontSize: '13px',
                fontWeight: 600,
                border: '1px solid var(--ds-primitive-color-emerald-200)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--ds-primitive-color-emerald-500)',
                }}
              />
              Active In-Force
            </span>
          </div>
        </div>

        {/* Policy Details Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            paddingTop: '20px',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginBottom: '2px' }}>
              Insured Medical Practitioner
            </div>
            <div style={{ fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
              {doctorName}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
              MMC Reg: <strong style={{ color: 'var(--ds-color-text-primary)' }}>{mmcNumber}</strong> | NRIC: {nric}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginBottom: '2px' }}>
              Medical Specialty
            </div>
            <div style={{ fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
              {classificationName}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ds-primitive-color-teal-700)', marginTop: '2px' }}>
              Standard Practice Risk Tier
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginBottom: '2px' }}>
              Limit of Indemnity
            </div>
            <div
              style={{
                fontWeight: 700,
                color: 'var(--ds-primitive-color-teal-800)',
                fontSize: '15px',
              }}
            >
              {limitFormatted}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginTop: '2px' }}>
              Any One Claim & in the Aggregate
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginBottom: '2px' }}>
              Period of Insurance
            </div>
            <div style={{ fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
              {startDate} — {endDate}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginTop: '2px' }}>
              12 Months Annual Coverage
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginBottom: '2px' }}>
              Reinstatement Coverage
            </div>
            <div style={{ fontWeight: 600, color: 'var(--ds-primitive-color-emerald-700)' }}>
              1 Free Automatic Reinstatement
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginTop: '2px' }}>
              Clause 6.1 Complimentary Benefit
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginBottom: '2px' }}>
              Total Premium Paid
            </div>
            <div
              style={{
                fontFamily: 'var(--ds-primitive-font-mono)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--ds-primitive-color-navy-900)',
              }}
            >
              RM {totalPaid.toFixed(2)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)', marginTop: '2px' }}>
              Paid via {channelLabel}
            </div>
          </div>
        </div>

        {/* Transaction Reference & Invoice Sub-bar */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px dashed var(--ds-color-border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: 'var(--ds-color-text-muted)',
            gap: '12px',
          }}
        >
          <div>
            Certificate No: <strong style={{ color: 'var(--ds-color-text-primary)' }}>{certificateNumber}</strong> | Tax Invoice: <strong style={{ color: 'var(--ds-color-text-primary)' }}>{invoiceNumber}</strong>
          </div>
          <div>
            Payment Ref: <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>{txRef}</span>
          </div>
        </div>
      </div>

      {/* Official Documents Download Hub */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          border: '1px solid var(--ds-color-border-subtle)',
          padding: '24px 28px',
          marginBottom: '28px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '1.2rem',
            fontWeight: 500,
            color: 'var(--ds-primitive-color-navy-900)',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FileText size={20} color="var(--ds-primitive-color-teal-600)" />
          Download Policy Documents
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--ds-color-text-secondary)',
            margin: '0 0 20px 0',
          }}
        >
          Download your official Chubb underwriting documents. You require the Certificate of Insurance
          (COI) for your MMC Annual Practicing Certificate (APC) application.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          {/* Certificate of Insurance Card */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1.5px solid var(--ds-primitive-color-teal-500)',
              backgroundColor: 'var(--ds-primitive-color-teal-50)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--ds-primitive-color-teal-600)',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                Essential for MMC APC
              </div>
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--ds-primitive-color-navy-900)',
                  margin: '0 0 6px 0',
                }}
              >
                Certificate of Insurance (COI)
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                Official verification letter recognized by the Malaysian Medical Council for your APC renewal upload.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleDownloadDoc('Certificate of Insurance', `DoctorShield-COI-${policyNumber}.pdf`)
              }
              disabled={downloadingDoc === 'Certificate of Insurance'}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: 'var(--ds-primitive-color-teal-500)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: '13px',
                cursor: downloadingDoc ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: 'var(--ds-primitive-shadow-sm)',
              }}
              data-testid="download-coi-btn"
            >
              <Download size={16} />
              <span>
                {downloadingDoc === 'Certificate of Insurance' ? 'Downloading...' : 'Download COI (PDF)'}
              </span>
            </button>
          </div>

          {/* Tax Invoice Card */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px solid var(--ds-color-border-subtle)',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--ds-primitive-color-navy-100)',
                  color: 'var(--ds-primitive-color-navy-700)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                Tax Receipt
              </div>
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--ds-primitive-color-navy-900)',
                  margin: '0 0 6px 0',
                }}
              >
                Official Tax Invoice
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                Official invoice with 8% SST itemization and stamp duty receipt for your clinic income tax deduction.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleDownloadDoc('Tax Invoice', `DoctorShield-Invoice-${invoiceNumber}.pdf`)}
              disabled={downloadingDoc === 'Tax Invoice'}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: '#FFFFFF',
                color: 'var(--ds-primitive-color-navy-900)',
                border: '1px solid var(--ds-color-border-default)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: downloadingDoc ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              data-testid="download-invoice-btn"
            >
              <Download size={16} />
              <span>
                {downloadingDoc === 'Tax Invoice' ? 'Downloading...' : 'Download Invoice (PDF)'}
              </span>
            </button>
          </div>

          {/* Master Policy Wording & Schedule Card */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px solid var(--ds-color-border-subtle)',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--ds-primitive-color-navy-100)',
                  color: 'var(--ds-primitive-color-navy-700)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                Contract Terms
              </div>
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--ds-primitive-color-navy-900)',
                  margin: '0 0 6px 0',
                }}
              >
                Policy Schedule & Wording
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                Master Chubb policy contract wording, definitions, exclusions, and statutory terms.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleDownloadDoc('Policy Wording', `Chubb-Policy-Wording-${policyNumber}.pdf`)}
              disabled={downloadingDoc === 'Policy Wording'}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: '#FFFFFF',
                color: 'var(--ds-primitive-color-navy-900)',
                border: '1px solid var(--ds-color-border-default)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: downloadingDoc ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              data-testid="download-schedule-btn"
            >
              <Download size={16} />
              <span>
                {downloadingDoc === 'Policy Wording' ? 'Downloading...' : 'Download Wording (PDF)'}
              </span>
            </button>
          </div>
        </div>

        {/* Print Summary Link */}
        <div style={{ textAlign: 'right' }}>
          <button
            type="button"
            onClick={handlePrint}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ds-primitive-color-teal-700)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Printer size={15} />
            <span>Print Confirmation Summary</span>
          </button>
        </div>
      </div>

      {/* Email Dispatch Notice */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          padding: '20px',
          borderRadius: 'var(--ds-primitive-radius-md)',
          backgroundColor: 'var(--ds-primitive-color-navy-50)',
          border: '1px solid var(--ds-color-border-subtle)',
          marginBottom: '28px',
          alignItems: 'flex-start',
        }}
      >
        <Mail size={22} color="var(--ds-primitive-color-teal-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--ds-color-text-secondary)' }}>
          <strong style={{ color: 'var(--ds-primitive-color-navy-900)' }}>
            Digital Policy Pack Dispatched:
          </strong>{' '}
          A copy of your Certificate of Insurance, official tax receipt, and policy wording has been emailed to{' '}
          <strong style={{ color: 'var(--ds-primitive-color-navy-900)' }}>{emailRecipient}</strong>. If
          you do not see it in your inbox within 5 minutes, please check your spam folder or add{' '}
          <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>noreply@doctorshield.com</span> to
          your trusted contacts.
        </div>
      </div>

      {/* MMC Submission Guidance Card */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: 'var(--ds-primitive-radius-md)',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle)',
          marginBottom: '28px',
        }}
      >
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--ds-primitive-color-navy-900)',
            margin: '0 0 10px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Building2 size={18} color="var(--ds-primitive-color-navy-700)" />
          How to Submit to MMC for Your APC
        </h3>
        <ol
          style={{
            margin: '0',
            paddingLeft: '20px',
            fontSize: '13px',
            color: 'var(--ds-color-text-secondary)',
            lineHeight: 1.7,
          }}
        >
          <li>
            Download your <strong>Certificate of Insurance (COI) PDF</strong> using the button above.
          </li>
          <li>
            Log in to the official <strong>Medical Register System (MeRITS)</strong> portal at{' '}
            <a
              href="https://merits.mmc.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--ds-primitive-color-teal-600)', textDecoration: 'underline' }}
            >
              merits.mmc.gov.my
            </a>
            .
          </li>
          <li>
            Navigate to <strong>APC Application / Renewal</strong> and upload the downloaded Chubb COI PDF in the
            Professional Indemnity Insurance attachment section.
          </li>
          <li>
            Enter your Chubb Policy Number <strong>{policyNumber}</strong> and coverage dates.
          </li>
        </ol>
      </div>

      {/* Medico-Legal Support & PIDM Protection */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '36px',
        }}
      >
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--ds-color-border-subtle)',
            fontSize: '12px',
            lineHeight: 1.6,
            color: 'var(--ds-color-text-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <PhoneCall size={16} color="var(--ds-primitive-color-teal-600)" />
            <strong style={{ color: 'var(--ds-primitive-color-navy-900)' }}>
              24/7 Medico-Legal Claims Hotline
            </strong>
          </div>
          If you receive a letter of demand, notice of inquiry, or become aware of an adverse incident, contact Chubb
          Claims immediately at <strong style={{ color: 'var(--ds-primitive-color-navy-900)' }}>1-800-88-2808</strong>{' '}
          or <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>claims.my@chubb.com</span>.
        </div>

        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--ds-color-border-subtle)',
            fontSize: '12px',
            lineHeight: 1.6,
            color: 'var(--ds-color-text-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <ShieldCheck size={16} color="var(--ds-primitive-color-teal-600)" />
            <strong style={{ color: 'var(--ds-primitive-color-navy-900)' }}>
              PIDM Member Institution
            </strong>
          </div>
          The benefit(s) payable under eligible policy is(are) protected by Perbadanan Insurans Deposit Malaysia (PIDM)
          up to statutory limits under the Malaysian Takaful and Insurance Benefits Protection System (TIPS).
        </div>
      </div>

      {/* Return to DoctorShield Home / New Application */}
      <div style={{ textAlign: 'center', paddingTop: '12px' }}>
        <button
          type="button"
          onClick={resetWorkflow}
          style={{
            padding: '12px 28px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: 'var(--ds-primitive-color-navy-900)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--ds-primitive-shadow-sm)',
          }}
          data-testid="return-home-btn"
        >
          <RotateCcw size={16} />
          <span>Start New Application or Return Home</span>
        </button>
      </div>
    </div>
  );
};

