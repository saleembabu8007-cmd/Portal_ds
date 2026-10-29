import React, { useState, useEffect } from 'react';
import {
  FileText,
  Shield,
  Download,
  ExternalLink,
  X,
  Info,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export type DocumentTab = 'notices' | 'period' | 'privacy' | 'pds' | 'support';

export interface DocumentCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: DocumentTab;
}

export const DocumentCenterModal: React.FC<DocumentCenterModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'notices',
}) => {
  const [activeTab, setActiveTab] = useState<DocumentTab>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleDownloadPds = (lang: 'en' | 'bm') => {
    const filename = lang === 'en' ? 'PDS_DoctorShield_English.pdf' : 'PDS_DoctorShield_BahasaMalaysia.pdf';
    const textContent = `CHUBB INSURANCE MALAYSIA BERHAD\nPRODUCT DISCLOSURE SHEET (PDS) - ${lang.toUpperCase()}\nDoctorShield Individual Medical Professional Indemnity\n\n1. What is this product about?\nThis policy provides indemnity to registered Medical Practitioners against legal liability for claims first made against them arising from malpractice in healthcare services.\n\n2. What are the covers / benefits provided?\n- Professional Indemnity coverage up to selected Limit of Liability.\n- Legal defense costs in civil lawsuits, MMC inquiries, and coronial inquests.\n- Complimentary Automatic Reinstatement of indemnity limit.\n\n3. Underwriting & Regulatory Information:\nUnderwritten by Chubb Insurance Malaysia Berhad (Company No. 197001000564 / 9827-A).\nRegulated by Bank Negara Malaysia under the Financial Services Act 2013.`;

    const blob = new Blob([textContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-center-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(19, 39, 102, 0.7)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          width: '100%',
          maxHeight: '88vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--ds-primitive-shadow-xl)',
          border: '1px solid var(--ds-color-border-subtle)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--ds-color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(8, 165, 181, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ds-color-primary)',
              }}
            >
              <Shield size={20} />
            </div>
            <div>
              <h2
                id="document-center-title"
                style={{
                  fontFamily: 'Kanit, sans-serif',
                  fontSize: '18px',
                  fontWeight: 500,
                  color: 'var(--ds-color-secondary)',
                  margin: 0,
                }}
              >
                DoctorShield Document & Legal Center
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>
                Chubb Insurance Malaysia Berhad &bull; Bank Negara Malaysia Disclosures
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close document center"
            style={{
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
        </div>

        {/* Tab Navigation */}
        <div
          role="tablist"
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--ds-color-border-subtle)',
            backgroundColor: 'var(--ds-color-surface-muted)',
            overflowX: 'auto',
          }}
        >
          <button
            role="tab"
            aria-selected={activeTab === 'notices'}
            onClick={() => setActiveTab('notices')}
            style={{
              padding: '12px 16px',
              background: activeTab === 'notices' ? '#FFFFFF' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'notices' ? '2px solid var(--ds-color-primary)' : '2px solid transparent',
              fontSize: '13px',
              fontWeight: activeTab === 'notices' ? 600 : 500,
              color: activeTab === 'notices' ? 'var(--ds-color-secondary)' : 'var(--ds-color-text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Duty of Disclosure (MODAL-08)
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'pds'}
            onClick={() => setActiveTab('pds')}
            style={{
              padding: '12px 16px',
              background: activeTab === 'pds' ? '#FFFFFF' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'pds' ? '2px solid var(--ds-color-primary)' : '2px solid transparent',
              fontSize: '13px',
              fontWeight: activeTab === 'pds' ? 600 : 500,
              color: activeTab === 'pds' ? 'var(--ds-color-secondary)' : 'var(--ds-color-text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Product Disclosure Sheets (PDS)
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'period'}
            onClick={() => setActiveTab('period')}
            style={{
              padding: '12px 16px',
              background: activeTab === 'period' ? '#FFFFFF' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'period' ? '2px solid var(--ds-color-primary)' : '2px solid transparent',
              fontSize: '13px',
              fontWeight: activeTab === 'period' ? 600 : 500,
              color: activeTab === 'period' ? 'var(--ds-color-secondary)' : 'var(--ds-color-text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Policy Period Rules (MODAL-05)
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'privacy'}
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '12px 16px',
              background: activeTab === 'privacy' ? '#FFFFFF' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'privacy' ? '2px solid var(--ds-color-primary)' : '2px solid transparent',
              fontSize: '13px',
              fontWeight: activeTab === 'privacy' ? 600 : 500,
              color: activeTab === 'privacy' ? 'var(--ds-color-secondary)' : 'var(--ds-color-text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            PDPA & Cookies (MODAL-19)
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'support'}
            onClick={() => setActiveTab('support')}
            style={{
              padding: '12px 16px',
              background: activeTab === 'support' ? '#FFFFFF' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'support' ? '2px solid var(--ds-color-primary)' : '2px solid transparent',
              fontSize: '13px',
              fontWeight: activeTab === 'support' ? 600 : 500,
              color: activeTab === 'support' ? 'var(--ds-color-secondary)' : 'var(--ds-color-text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            System Support (MODAL-15)
          </button>
        </div>

        {/* Tab Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, fontSize: '13px', lineHeight: 1.6 }}>
          {/* TAB 1: Duty of Disclosure (LEG-04 / MODAL-08 #jsImportantAndNoticesModel) */}
          {activeTab === 'notices' && (
            <div>
              <h3
                style={{
                  fontFamily: 'Kanit, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--ds-color-secondary)',
                  marginTop: 0,
                  marginBottom: '12px',
                }}
              >
                Important Notices to the Applicants (Schedule 9, Financial Services Act 2013)
              </h3>

              <div
                style={{
                  backgroundColor: 'var(--ds-color-surface-muted)',
                  border: '1px solid var(--ds-color-border-subtle)',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  padding: '14px',
                  marginBottom: '14px',
                }}
              >
                <strong style={{ display: 'block', color: 'var(--ds-color-secondary)', marginBottom: '4px' }}>
                  Your Duty of Disclosure
                </strong>
                <p style={{ margin: '0 0 10px' }}>
                  Before you enter into a contract of general insurance with an Insurer, you have a duty to disclose to the Insurer every matter within your knowledge that is material to the Insurer’s decision whether to accept the risk of the insurance and, if so, on what terms. You have the same duty to disclose those matters to the Insurer before you renew, extend, vary or reinstate a contract of general insurance.
                </p>
                <p style={{ margin: 0 }}>
                  It is important that all information contained in this application is understood by you and is correct, as you will be bound by your answers and by the information provided by you in this application. You should obtain advice before you sign this application if you do not properly understand any part of it. Your duty of disclosure continues after the application has been completed up until the contract of insurance is entered into.
                </p>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <strong style={{ display: 'block', color: 'var(--ds-color-secondary)', marginBottom: '4px' }}>
                  Non-Disclosure:
                </strong>
                <p style={{ margin: '0 0 6px' }}>
                  If you fail to comply with your duty of disclosure, the Insurer may have the option of avoiding the contract of insurance from its beginning. If your non-disclosure is fraudulent, the Insurer may also have the right to keep the premium that you have paid.
                </p>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <strong style={{ display: 'block', color: 'var(--ds-color-secondary)', marginBottom: '4px' }}>
                  Change of Risk or Circumstances:
                </strong>
                <p style={{ margin: 0 }}>
                  You should advise Chubb as soon as practicable of any change to your normal business as disclosed in this application, such as changes in business activities, location, acquisitions and new overseas activities.
                </p>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <strong style={{ display: 'block', color: 'var(--ds-color-secondary)', marginBottom: '4px' }}>
                  Subrogation:
                </strong>
                <p style={{ margin: 0 }}>
                  Where you have agreed with another person or company (who would otherwise be liable to compensate you for any loss or damage which is covered by the contract of insurance) that you will not seek to recover such loss or damage from that person, Chubb will not cover you, to the extent permitted by law, for such loss or damage.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(8, 165, 181, 0.05)',
                  border: '1px solid rgba(8, 165, 181, 0.2)',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  padding: '12px',
                }}
              >
                <strong style={{ display: 'block', color: 'var(--ds-color-secondary)', marginBottom: '4px' }}>
                  Personal Data Protection Notice (PDPA 2010):
                </strong>
                <p style={{ margin: '0 0 8px', fontSize: '12px' }}>
                  We understand that Chubb needs to deal with our personal data to administer our Policy and offer us insurance products and services. To achieve these purposes, We allow Chubb to collect, use and disclose our personal data to selected third parties in or outside Malaysia, in accordance with Chubb’s Personal Data Protection Notice, which is found in Chubb website at{' '}
                  <a href="https://www.chubb.com/my-privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ds-color-primary)', textDecoration: 'underline' }}>
                    https://www.chubb.com/my-privacy
                  </a>
                  . We may contact Chubb for access to or correction of our personal data, or for any other queries or complaints.
                </p>
                <p style={{ margin: 0, fontSize: '12px', fontStyle: 'italic', color: 'var(--ds-color-text-secondary)' }}>
                  Kami faham bahawa Chubb perlu berurusan dengan data peribadi kami untuk mentadbir Polisi kami dan menawarkan kami produk dan perkhidmatan insurans...
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Product Disclosure Sheets */}
          {activeTab === 'pds' && (
            <div>
              <h3
                style={{
                  fontFamily: 'Kanit, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--ds-color-secondary)',
                  marginTop: 0,
                  marginBottom: '12px',
                }}
              >
                Official Product Disclosure Sheets (PDS)
              </h3>
              <p style={{ color: 'var(--ds-color-text-secondary)', marginBottom: '16px' }}>
                Bank Negara Malaysia requires all licensed insurers to make available a Product Disclosure Sheet before purchasing an insurance policy.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px',
                    border: '1px solid var(--ds-color-border-subtle)',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    backgroundColor: 'var(--ds-color-surface-muted)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={22} color="var(--ds-color-primary)" />
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px' }}>DoctorShield PDS (English)</strong>
                      <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)' }}>PDF &bull; Official Chubb Malaysia Document</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadPds('en')}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: 'var(--ds-color-primary)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 'var(--ds-primitive-radius-md)',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Download size={14} /> Download PDF
                  </button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px',
                    border: '1px solid var(--ds-color-border-subtle)',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    backgroundColor: 'var(--ds-color-surface-muted)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={22} color="var(--ds-color-primary)" />
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px' }}>DoctorShield PDS (Bahasa Malaysia)</strong>
                      <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)' }}>PDF &bull; Risalah Pendedahan Produk Chubb</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadPds('bm')}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: 'var(--ds-color-primary)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 'var(--ds-primitive-radius-md)',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Download size={14} /> Muat Turun PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Policy Period Rules (MODAL-05 #jsDetailModal) */}
          {activeTab === 'period' && (
            <div>
              <h3
                style={{
                  fontFamily: 'Kanit, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--ds-color-secondary)',
                  marginTop: 0,
                  marginBottom: '12px',
                }}
              >
                Policy Period & Coverage Effective Dates (MODAL-05)
              </h3>
              <div
                style={{
                  backgroundColor: 'var(--ds-color-surface-muted)',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  padding: '16px',
                  marginBottom: '14px',
                }}
              >
                <p style={{ margin: '0 0 10px' }}>
                  <strong>Standard Term:</strong> DoctorShield Individual Indemnity provides continuous claims-made coverage for a term of 365 days (1 year) beginning from 00:01 hours on the Inception Date and ending at 23:59 hours on the Expiration Date.
                </p>
                <p style={{ margin: '0 0 10px' }}>
                  <strong>Grace Period & APC Alignment:</strong> Practitioners may align coverage start dates to correspond with Malaysian Medical Council (MMC) Annual Practicing Certificate renewal requirements.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Backdated Coverage:</strong> In accordance with Clause 6.12, backdating coverage to an earlier date restricts claims for incidents known or occurring prior to actual proposal execution date.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PDPA & Cookies (MODAL-19 #jsCookiePolicyModal) */}
          {activeTab === 'privacy' && (
            <div>
              <h3
                style={{
                  fontFamily: 'Kanit, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--ds-color-secondary)',
                  marginTop: 0,
                  marginBottom: '12px',
                }}
              >
                Personal Data Protection & Cookie Policy (PDPA 2010 / MODAL-19)
              </h3>
              <p style={{ color: 'var(--ds-color-text-secondary)', marginBottom: '14px' }}>
                We use strictly necessary cookies to manage your quotation session, ensure payment integrity, and protect your medical indemnity application against cross-site request forgery.
              </p>
              <div
                style={{
                  backgroundColor: 'var(--ds-color-surface-muted)',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  padding: '14px',
                  marginBottom: '14px',
                }}
              >
                <strong style={{ display: 'block', marginBottom: '6px' }}>Cookie Types Utilized:</strong>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li><strong>Session Cookies:</strong> Temporary identifiers to preserve your quotation steps and prevent data loss.</li>
                  <li><strong>Security Cookies:</strong> Cryptographic tokens to validate payment checkout requests with payment gateways.</li>
                </ul>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)' }}>
                For inquiries regarding data protection, please contact the Data Protection Officer at privacy@doctorshield.com.
              </p>
            </div>
          )}

          {/* TAB 5: System Support (MODAL-15 #jsServerModel) */}
          {activeTab === 'support' && (
            <div>
              <h3
                style={{
                  fontFamily: 'Kanit, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--ds-color-secondary)',
                  marginTop: 0,
                  marginBottom: '12px',
                }}
              >
                DoctorShield Technical & Underwriting Assistance (MODAL-15)
              </h3>
              <p style={{ color: 'var(--ds-color-text-secondary)', marginBottom: '16px' }}>
                If you encounter any unexpected network interruption or need assistance with your quotation, our dedicated medical indemnity client services team is here to assist you:
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    padding: '14px',
                    border: '1px solid var(--ds-color-border-subtle)',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    backgroundColor: 'var(--ds-color-surface-muted)',
                  }}
                >
                  <Phone size={20} color="var(--ds-color-primary)" style={{ marginBottom: '8px' }} />
                  <strong style={{ display: 'block', fontSize: '13px' }}>Client Services Hotline</strong>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ds-color-secondary)' }}>
                    +60 3-2713 0088
                  </span>
                  <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginTop: '4px' }}>
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </div>
                </div>

                <div
                  style={{
                    padding: '14px',
                    border: '1px solid var(--ds-color-border-subtle)',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    backgroundColor: 'var(--ds-color-surface-muted)',
                  }}
                >
                  <Mail size={20} color="var(--ds-color-primary)" style={{ marginBottom: '8px' }} />
                  <strong style={{ display: 'block', fontSize: '13px' }}>Underwriting Inquiries</strong>
                  <a
                    href="mailto:support@doctorshield.com"
                    style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ds-color-primary)', textDecoration: 'none' }}
                  >
                    support@doctorshield.com
                  </a>
                  <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginTop: '4px' }}>
                    Response within 1 business day
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Close */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--ds-color-border-subtle)',
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: '#FFFFFF',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '9px 20px',
              backgroundColor: 'var(--ds-color-primary)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--ds-primitive-radius-md)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

