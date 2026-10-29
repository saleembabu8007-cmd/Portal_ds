import React, { useState } from 'react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import { RenewalService, RetrieveQuoteResponse } from '../../core/api/renewalService';
import { RatingService } from '../../core/api/ratingService';
import {
  Search,
  FileText,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  RotateCcw,
  X,
  ExternalLink,
  Mail,
  Shield,
} from 'lucide-react';

export interface RetrieveQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  isStandalonePage?: boolean;
}

export const RetrieveQuoteModal: React.FC<RetrieveQuoteModalProps> = ({
  isOpen,
  onClose,
  isStandalonePage = false,
}) => {
  const {
    updateCoverage,
    updateDoctorProfile,
    setQuote,
    goToStage,
    announce,
  } = useWorkflow();

  const [reference, setReference] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retrievedResult, setRetrievedResult] = useState<RetrieveQuoteResponse | null>(null);

  if (!isOpen && !isStandalonePage) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setRetrievedResult(null);

    const cleanRef = reference.trim();
    if (!cleanRef) {
      setErrorMessage('Please enter your Quotation Number or Quote Reference Token (e.g. QTN-2026-001).');
      return;
    }

    setIsLoading(true);
    try {
      const resp = await RenewalService.retrieveQuote(cleanRef, email);
      setRetrievedResult(resp);
      announce(resp.message || 'Quotation retrieved successfully.');
    } catch (err: any) {
      // Legacy MODAL-17: jsReIndicativeQuoteErrorModel
      setErrorMessage(
        err.message || 'We were unable to locate an indicative quotation with that reference. Please check your reference or contact DoctorShield support.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Continue to Stage 2 (or Stage 3 if already complete)
  const handleProceedWithQuote = () => {
    if (!retrievedResult) return;

    updateCoverage(retrievedResult.coverage);
    if (retrievedResult.doctorProfile) {
      updateDoctorProfile(retrievedResult.doctorProfile);
    }
    setQuote(retrievedResult.pricing);

    if (retrievedResult.isIncomplete) {
      // Legacy MODAL-20: jsReIncompleteQuoteErrorModel -> route directly to Stage 3
      goToStage(3);
    } else {
      goToStage(2);
    }
    onClose();
  };

  // Re-rate expired quote (Legacy MODAL-21: jsExpireContactusQuoteErrorModel)
  const handleRerateExpiredQuote = async () => {
    if (!retrievedResult) return;
    setIsLoading(true);

    try {
      // Calculate today's date formatted DD/MM/YYYY
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const newStartDate = `${dd}/${mm}/${yyyy}`;

      // End date 1 year later minus 1 day
      const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate() - 1);
      const endDd = String(nextYear.getDate()).padStart(2, '0');
      const endMm = String(nextYear.getMonth() + 1).padStart(2, '0');
      const endYyyy = nextYear.getFullYear();
      const newEndDate = `${endDd}/${endMm}/${endYyyy}`;

      const updatedCoverage = {
        ...retrievedResult.coverage,
        startDate: newStartDate,
        endDate: newEndDate,
      };

      // Call live rating calculation with updated dates
      const newQuote = await RatingService.calculatePremium(updatedCoverage);

      updateCoverage(updatedCoverage);
      if (retrievedResult.doctorProfile) {
        updateDoctorProfile(retrievedResult.doctorProfile);
      }
      if (newQuote.pricing) {
        setQuote({
          grossBasePremium: newQuote.pricing.gross_base,
          annualGrossEquivalent: newQuote.pricing.gross_base,
          individualNet: newQuote.pricing.net_gross,
          specialtyMultiplier: 1.0,
          addonsTotal: 0.0,
          discountAmount: newQuote.pricing.discount_amount,
          netTaxablePremium: newQuote.pricing.net_gross,
          sstAmount: newQuote.pricing.sst_amount,
          stampDuty: newQuote.pricing.stamp_duty,
          totalPayable: newQuote.pricing.total_payable,
          quoteToken: newQuote.quote_token,
          quotationNumber: newQuote.quotation_number,
          issuedAt: Date.now(),
          expiresAt: newQuote.expires_at,
          isProrata: newQuote.pricing.is_prorata,
          daysCount: newQuote.pricing.days_count,
        });
      }

      announce('Quotation refreshed and re-rated with current Chubb schedules.');
      goToStage(2);
      onClose();
    } catch (err: any) {
      setErrorMessage('Failed to recalculate quote: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="retrieve-quote-modal-title"
      style={{
        position: isStandalonePage ? 'relative' : 'fixed',
        inset: isStandalonePage ? 'auto' : 0,
        zIndex: 100,
        backgroundColor: isStandalonePage ? 'transparent' : 'rgba(19, 39, 102, 0.65)',
        backdropFilter: isStandalonePage ? 'none' : 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isStandalonePage ? '24px 16px' : '16px',
        minHeight: isStandalonePage ? '70vh' : 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '620px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          padding: '28px',
          boxShadow: isStandalonePage ? 'var(--ds-primitive-shadow-md)' : 'var(--ds-primitive-shadow-xl)',
          border: '1px solid var(--ds-color-border-subtle)',
          position: 'relative',
        }}
      >
        {/* Header Close */}
        {!isStandalonePage && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote lookup"
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
        )}

        {/* Modal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(8, 165, 181, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ds-color-primary)',
            }}
          >
            <FileText size={22} />
          </div>
          <div>
            <h2
              id="retrieve-quote-modal-title"
              style={{
                fontFamily: 'Kanit, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: 'var(--ds-color-secondary)',
                margin: 0,
              }}
            >
              Retrieve Saved Quotation
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--ds-color-text-secondary)' }}>
              Enter your Quotation Number or Reference Token from your email
            </p>
          </div>
        </div>

        {/* Search Form */}
        {!retrievedResult && (
          <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label
                htmlFor="quote-ref-input"
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--ds-color-text-primary)',
                  marginBottom: '6px',
                }}
              >
                Quotation Number or Reference Code <span style={{ color: 'var(--ds-color-state-error)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--ds-color-text-muted)',
                  }}
                />
                <input
                  id="quote-ref-input"
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value.toUpperCase())}
                  placeholder="e.g. QTN-2026-48192 or TOKEN-ABCD"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    border: '1px solid var(--ds-color-border-subtle)',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--ds-color-text-primary)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginTop: '4px', display: 'block' }}>
                Found in your DoctorShield Indicative Quotation email or SMS confirmation.
              </span>
            </div>

            <div>
              <label
                htmlFor="quote-email-input"
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--ds-color-text-primary)',
                  marginBottom: '6px',
                }}
              >
                Registered Email Address (Optional)
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--ds-color-text-muted)',
                  }}
                />
                <input
                  id="quote-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. doctor@clinic.com.my"
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    border: '1px solid var(--ds-color-border-subtle)',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--ds-color-text-primary)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Error Notice (Legacy MODAL-17) */}
            {errorMessage && (
              <div
                role="alert"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid var(--ds-color-state-error)',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  padding: '14px',
                  display: 'flex',
                  gap: '12px',
                }}
              >
                <AlertCircle size={20} color="var(--ds-color-state-error)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 600, color: 'var(--ds-color-state-error)' }}>
                    Quotation Reference Not Found
                  </h4>
                  <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.4 }}>
                    {errorMessage}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href="mailto:support@doctorshield.com?subject=DoctorShield%20Quotation%20Assistance"
                      style={{
                        fontSize: '12px',
                        color: 'var(--ds-color-primary)',
                        textDecoration: 'underline',
                        fontWeight: 500,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <ExternalLink size={12} /> Contact Client Services
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
              {!isStandalonePage && (
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--ds-color-border-subtle)',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    color: 'var(--ds-color-text-secondary)',
                  }}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: '10px 22px',
                  backgroundColor: 'var(--ds-color-primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {isLoading ? 'Locating Quote...' : 'Retrieve Quotation'}
                {!isLoading && <ArrowRight size={16} />}
              </button>
            </div>
          </form>
        )}

        {/* Found Result Display */}
        {retrievedResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Case A: Expired Quotation (MODAL-21) */}
            {retrievedResult.isExpired ? (
              <div
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid #F59E0B',
                  borderRadius: 'var(--ds-primitive-radius-lg)',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Clock size={24} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3
                      style={{
                        margin: '0 0 6px',
                        fontFamily: 'Kanit, sans-serif',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#92400E',
                      }}
                    >
                      Quotation Price Guarantee Expired
                    </h3>
                    <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.5 }}>
                      Quotation <strong>{retrievedResult.quotationNumber}</strong> was issued over 30 days ago. Under Chubb underwriting regulations, premium rates are locked for 30 days. You may recalculate and re-rate this quotation using current Chubb underwriting tables without re-entering your practice details.
                    </p>
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        borderRadius: 'var(--ds-primitive-radius-md)',
                        padding: '12px',
                        fontSize: '13px',
                        marginBottom: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--ds-color-text-muted)' }}>Practitioner:</span>
                        <span style={{ fontWeight: 500 }}>{retrievedResult.doctorProfile?.fullName || 'General Medical Practitioner'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--ds-color-text-muted)' }}>Liability Limit:</span>
                        <span style={{ fontWeight: 500 }}>{retrievedResult.coverage.limitFormatted}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--ds-color-text-muted)' }}>Previous Indicative Rate:</span>
                        <span style={{ fontWeight: 600, color: 'var(--ds-color-secondary)' }}>
                          RM {retrievedResult.pricing.totalPayable.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={handleRerateExpiredQuote}
                        disabled={isLoading}
                        style={{
                          padding: '9px 18px',
                          backgroundColor: 'var(--ds-color-primary)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: 'var(--ds-primitive-radius-md)',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <RotateCcw size={15} />
                        {isLoading ? 'Recalculating...' : 'Refresh & Re-Rate Quotation'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setRetrievedResult(null)}
                        style={{
                          padding: '9px 16px',
                          backgroundColor: 'transparent',
                          border: '1px solid var(--ds-color-border-subtle)',
                          borderRadius: 'var(--ds-primitive-radius-md)',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          color: 'var(--ds-color-text-secondary)',
                        }}
                      >
                        Search Different Reference
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : retrievedResult.isIncomplete ? (
              /* Case B: Incomplete Quotation (MODAL-20) */
              <div
                style={{
                  backgroundColor: 'rgba(8, 165, 181, 0.08)',
                  border: '1px solid var(--ds-color-primary)',
                  borderRadius: 'var(--ds-primitive-radius-lg)',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <AlertTriangle size={24} color="var(--ds-color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3
                      style={{
                        margin: '0 0 6px',
                        fontFamily: 'Kanit, sans-serif',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'var(--ds-color-secondary)',
                      }}
                    >
                      Quotation Incomplete — Practitioner Information Required
                    </h3>
                    <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.5 }}>
                      Quotation <strong>{retrievedResult.quotationNumber}</strong> has been saved with your verified coverage parameters ({retrievedResult.coverage.limitFormatted} limit), but your applicant identity details (NRIC, MMC Number, and Practice Address) still need to be completed before payment checkout.
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={handleProceedWithQuote}
                        style={{
                          padding: '9px 18px',
                          backgroundColor: 'var(--ds-color-primary)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: 'var(--ds-primitive-radius-md)',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        Complete Practitioner Particulars <ArrowRight size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setRetrievedResult(null)}
                        style={{
                          padding: '9px 14px',
                          backgroundColor: 'transparent',
                          border: '1px solid var(--ds-color-border-subtle)',
                          borderRadius: 'var(--ds-primitive-radius-md)',
                          fontSize: '13px',
                          cursor: 'pointer',
                          color: 'var(--ds-color-text-secondary)',
                        }}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Case C: Active Valid Quotation */
              <div
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid #10B981',
                  borderRadius: 'var(--ds-primitive-radius-lg)',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={24} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ width: '100%' }}>
                    <h3
                      style={{
                        margin: '0 0 6px',
                        fontFamily: 'Kanit, sans-serif',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'var(--ds-color-secondary)',
                      }}
                    >
                      Active Quotation Found
                    </h3>
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: 'var(--ds-primitive-radius-md)',
                        padding: '12px',
                        fontSize: '13px',
                        marginBottom: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--ds-color-text-muted)' }}>Quotation No:</span>
                        <span style={{ fontWeight: 600 }}>{retrievedResult.quotationNumber}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--ds-color-text-muted)' }}>Practitioner:</span>
                        <span style={{ fontWeight: 500 }}>{retrievedResult.doctorProfile?.fullName || 'Dr. Siti Aminah'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--ds-color-text-muted)' }}>Coverage:</span>
                        <span>{retrievedResult.coverage.classificationName} ({retrievedResult.coverage.limitFormatted})</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #E5E7EB', paddingTop: '6px', marginTop: '6px' }}>
                        <span style={{ fontWeight: 600 }}>Total Premium Payable:</span>
                        <span style={{ fontWeight: 700, color: 'var(--ds-color-primary)', fontSize: '15px' }}>
                          RM {retrievedResult.pricing.totalPayable.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={handleProceedWithQuote}
                        style={{
                          padding: '9px 20px',
                          backgroundColor: 'var(--ds-color-primary)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: 'var(--ds-primitive-radius-md)',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        Load Quotation & Review <ArrowRight size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setRetrievedResult(null)}
                        style={{
                          padding: '9px 14px',
                          backgroundColor: 'transparent',
                          border: '1px solid var(--ds-color-border-subtle)',
                          borderRadius: 'var(--ds-primitive-radius-md)',
                          fontSize: '13px',
                          cursor: 'pointer',
                          color: 'var(--ds-color-text-secondary)',
                        }}
                      >
                        Search Another
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
