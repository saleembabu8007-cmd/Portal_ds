import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import { RatingService } from '../../core/api/ratingService';
import {
  Clock,
  AlertTriangle,
  RotateCcw,
  ShieldAlert,
  CheckCircle2,
  X,
} from 'lucide-react';

// Production session limits:
// 25 minutes = 1500000 ms (Warning)
// 30 minutes = 1800000 ms (Expired)
const DEFAULT_WARNING_MS = 25 * 60 * 1000;
const DEFAULT_EXPIRY_MS = 30 * 60 * 1000;

export interface SessionTimeoutManagerProps {
  warningTimeoutMs?: number;
  expiryTimeoutMs?: number;
}

export const SessionTimeoutManager: React.FC<SessionTimeoutManagerProps> = ({
  warningTimeoutMs = DEFAULT_WARNING_MS,
  expiryTimeoutMs = DEFAULT_EXPIRY_MS,
}) => {
  const { coverage, setQuote, updateCoverage, announce } = useWorkflow();

  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [isExpiredModalVisible, setIsExpiredModalVisible] = useState(false);
  const [secondsUntilExpired, setSecondsUntilExpired] = useState(300); // 5 minutes default
  const [isRefreshing, setIsRefreshing] = useState(false);

  const lastActivityRef = useRef<number>(Date.now());
  const warningTimerRef = useRef<any>(null);
  const expiryTimerRef = useRef<any>(null);
  const countdownIntervalRef = useRef<any>(null);

  // Extend or reset session
  const resetTimers = useCallback(() => {
    lastActivityRef.current = Date.now();
    setIsWarningVisible(false);

    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    // Schedule Warning
    warningTimerRef.current = setTimeout(() => {
      setIsWarningVisible(true);
      setSecondsUntilExpired(Math.max(1, Math.round((expiryTimeoutMs - warningTimeoutMs) / 1000)));

      // Start live countdown
      countdownIntervalRef.current = setInterval(() => {
        setSecondsUntilExpired((prev) => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, warningTimeoutMs);

    // Schedule Expiry Modal (MODAL-14 #jsStartDateValidationErrorModal)
    expiryTimerRef.current = setTimeout(() => {
      setIsWarningVisible(false);
      setIsExpiredModalVisible(true);
      announce('Your quotation session has expired. Please refresh the quotation to lock in current rates.');
    }, expiryTimeoutMs);
  }, [warningTimeoutMs, expiryTimeoutMs, announce]);

  const isWarningVisibleRef = useRef(false);
  const isExpiredModalVisibleRef = useRef(false);
  isWarningVisibleRef.current = isWarningVisible;
  isExpiredModalVisibleRef.current = isExpiredModalVisible;

  // Track user activity
  useEffect(() => {
    const handleUserActivity = () => {
      // If modal is not active, reset timer on active interactions
      if (!isExpiredModalVisibleRef.current && !isWarningVisibleRef.current) {
        lastActivityRef.current = Date.now();
      }
    };

    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((evt) => window.addEventListener(evt, handleUserActivity, { passive: true }));

    resetTimers();

    // Attach developer / testing helper hooks on window
    (window as any).__triggerSessionWarning = () => {
      setIsExpiredModalVisible(false);
      setIsWarningVisible(true);
      setSecondsUntilExpired(300);
    };
    (window as any).__triggerSessionExpired = () => {
      setIsWarningVisible(false);
      setIsExpiredModalVisible(true);
    };

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleUserActivity));
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      delete (window as any).__triggerSessionWarning;
      delete (window as any).__triggerSessionExpired;
    };
  }, [resetTimers]);

  // Handle Extend Session from Warning Banner
  const handleExtendSession = () => {
    resetTimers();
    announce('Session extended.');
  };

  // Handle Refresh from Expired Modal (MODAL-14)
  const handleRefreshAndContinue = async () => {
    setIsRefreshing(true);
    try {
      // Refresh dates to current date
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const refreshedStartDate = `${dd}/${mm}/${yyyy}`;

      const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate() - 1);
      const endDd = String(nextYear.getDate()).padStart(2, '0');
      const endMm = String(nextYear.getMonth() + 1).padStart(2, '0');
      const endYyyy = nextYear.getFullYear();
      const refreshedEndDate = `${endDd}/${endMm}/${endYyyy}`;

      const updatedCoverage = {
        ...coverage,
        classificationId: coverage.classificationId || '7',
        startDate: refreshedStartDate,
        endDate: refreshedEndDate,
      };

      // Recalculate quotation with live rating engine
      const freshQuote = await RatingService.calculatePremium(updatedCoverage);

      updateCoverage(updatedCoverage);
      if (freshQuote.pricing) {
        setQuote({
          grossBasePremium: freshQuote.pricing.gross_base,
          annualGrossEquivalent: freshQuote.pricing.gross_base,
          individualNet: freshQuote.pricing.net_gross,
          specialtyMultiplier: 1.0,
          addonsTotal: 0.0,
          discountAmount: freshQuote.pricing.discount_amount,
          netTaxablePremium: freshQuote.pricing.net_gross,
          sstAmount: freshQuote.pricing.sst_amount,
          stampDuty: freshQuote.pricing.stamp_duty,
          totalPayable: freshQuote.pricing.total_payable,
          quoteToken: freshQuote.quote_token,
          quotationNumber: freshQuote.quotation_number,
          issuedAt: Date.now(),
          expiresAt: freshQuote.expires_at,
          isProrata: freshQuote.pricing.is_prorata,
          daysCount: freshQuote.pricing.days_count,
        });
      }

      setIsExpiredModalVisible(false);
      resetTimers();
      announce('Session restored with updated Chubb quotation schedule.');
    } catch (err: any) {
      console.error('Failed to refresh expired session:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      {/* 1. Inactivity Warning Banner (25 mins) */}
      {isWarningVisible && !isExpiredModalVisible && (
        <aside
          role="region"
          aria-label="Quotation session expiry alert"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 90,
            maxWidth: '420px',
            width: 'calc(100% - 48px)',
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            borderRadius: 'var(--ds-primitive-radius-lg)',
            padding: '16px 20px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
            border: '1px solid #334155',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={20} color="#FBBF24" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ fontSize: '14px', fontWeight: 600, display: 'block' }}>
                  Session Expiring Soon
                </strong>
                <span style={{ fontSize: '12px', color: '#CBD5E1' }}>
                  Your quote session will expire in {Math.floor(secondsUntilExpired / 60)}:
                  {String(secondsUntilExpired % 60).padStart(2, '0')} due to inactivity.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsWarningVisible(false)}
              aria-label="Dismiss warning"
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '2px',
              }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleExtendSession}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--ds-color-primary)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--ds-primitive-radius-md)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Extend Session
            </button>
          </div>
        </aside>
      )}

      {/* 2. Session Expired Modal (MODAL-14 #jsStartDateValidationErrorModal) */}
      {isExpiredModalVisible && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="session-expired-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(19, 39, 102, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--ds-primitive-radius-xl)',
              padding: '28px',
              boxShadow: 'var(--ds-primitive-shadow-xl)',
              border: '1px solid var(--ds-color-border-subtle)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--ds-color-state-error)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Clock size={26} />
            </div>

            <h2
              id="session-expired-title"
              style={{
                fontFamily: 'Kanit, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: 'var(--ds-color-secondary)',
                margin: '0 0 10px',
              }}
            >
              Quotation Session Expired
            </h2>

            <p
              style={{
                fontSize: '14px',
                color: 'var(--ds-color-text-secondary)',
                lineHeight: 1.5,
                margin: '0 0 16px',
              }}
            >
              For your data security and to ensure your indemnity premium complies with the latest Chubb underwriting guidelines, your active pricing session has timed out after 30 minutes of inactivity.
            </p>

            <div
              style={{
                backgroundColor: 'rgba(8, 165, 181, 0.06)',
                border: '1px solid rgba(8, 165, 181, 0.2)',
                borderRadius: 'var(--ds-primitive-radius-md)',
                padding: '12px',
                fontSize: '13px',
                color: 'var(--ds-color-text-primary)',
                textAlign: 'left',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <CheckCircle2 size={18} color="var(--ds-color-primary)" style={{ flexShrink: 0 }} />
              <span>
                <strong>Zero Data Loss:</strong> Your entered practitioner particulars, specialty selections, and underwriting responses have been preserved.
              </span>
            </div>

            <button
              type="button"
              onClick={handleRefreshAndContinue}
              disabled={isRefreshing}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--ds-color-primary)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--ds-primitive-radius-md)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: isRefreshing ? 'not-allowed' : 'pointer',
                opacity: isRefreshing ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <RotateCcw size={16} />
              {isRefreshing ? 'Refreshing Quotation...' : 'Refresh Quotation & Continue'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
