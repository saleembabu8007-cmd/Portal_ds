import React, { useState, useEffect } from 'react';
import { SkipLink } from './SkipLink';
import { BrandHeader } from './BrandHeader';
import { AppFooter } from './AppFooter';
import { SummarySidebar } from './SummarySidebar';
import { MobileSummaryDrawer } from './MobileSummaryDrawer';
import { LiveAnnouncer } from './LiveAnnouncer';
import { SessionTimeoutManager } from './SessionTimeoutManager';
import { DocumentCenterModal, DocumentTab } from './DocumentCenterModal';
import { RenewalFlowModal } from '../../features/renewal/RenewalFlowModal';
import { RetrieveQuoteModal } from '../../features/quote/RetrieveQuoteModal';
import { InsuranceStepProgress } from '../insurance/InsuranceStepProgress';
import { useWorkflow } from '../../core/state/WorkflowContext';
import './layout.css';

export interface AppShellProps {
  children: React.ReactNode;
  onCatalogToggle?: () => void;
  isCatalogActive?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  onCatalogToggle,
  isCatalogActive = false,
}) => {
  const { currentStage, goToStage, announcement } = useWorkflow();

  // Secondary Workflows Modal States
  const [isRenewOpen, setIsRenewOpen] = useState(() => {
    return window.location.pathname === '/renew' || window.location.search.includes('renew');
  });
  const [isRetrieveOpen, setIsRetrieveOpen] = useState(() => {
    return window.location.pathname === '/retrieve-quote' || window.location.search.includes('retrieve');
  });
  const [isDocCenterOpen, setIsDocCenterOpen] = useState(false);
  const [docCenterTab, setDocCenterTab] = useState<DocumentTab>('notices');

  const isTerminal = currentStage === 'referral' || currentStage === 'confirmation';
  const numericStep = typeof currentStage === 'number' ? currentStage : 1;

  // Listen to custom global events for opening document center from anywhere in the app
  useEffect(() => {
    const handleOpenDocCenter = (e: any) => {
      const tab = e.detail?.tab || 'notices';
      setDocCenterTab(tab);
      setIsDocCenterOpen(true);
    };

    window.addEventListener('open-document-center', handleOpenDocCenter);
    return () => window.removeEventListener('open-document-center', handleOpenDocCenter);
  }, []);

  return (
    <div className="ds-app-shell">
      {/* 1. Skip to Content Link (WCAG 2.4.1) */}
      <SkipLink targetId="main-content" />

      {/* 2. Accessible Live Region Announcer (WCAG 4.1.3) */}
      <LiveAnnouncer message={announcement} />

      {/* 3. Session Timeout Manager (25m warning, 30m expiry MODAL-14) */}
      <SessionTimeoutManager />

      {/* 4. Brand Header */}
      <BrandHeader
        onCatalogToggle={onCatalogToggle}
        isCatalogActive={isCatalogActive}
        onRenewClick={() => setIsRenewOpen(true)}
        onRetrieveQuoteClick={() => setIsRetrieveOpen(true)}
        onDocumentCenterClick={() => {
          setDocCenterTab('notices');
          setIsDocCenterOpen(true);
        }}
      />

      {/* 5. Main Application Region */}
      <main id="main-content" className="ds-shell-main" tabIndex={-1}>
        {/* Step Progress Indicator (Stages 1-4) */}
        {!isTerminal && (
          <InsuranceStepProgress
            currentStep={numericStep}
            onStepClick={(stepId) => {
              // Doctors can navigate to already reached or prior steps
              if (stepId <= numericStep) {
                goToStage(stepId as any);
              }
            }}
          />
        )}

        {/* Dynamic Responsive Grid Layout */}
        <div className={!isTerminal ? 'ds-shell-grid' : 'ds-shell-single'}>
          {/* Main Stage Content */}
          <div className={`ds-main-card ${numericStep === 1 || numericStep === 2 || numericStep === 3 ? 'ds-main-card-open' : ''}`}>
            {children}
          </div>

          {/* Contextual Summary Rail (Desktop: Stages 1-4) */}
          {!isTerminal && (
            <SummarySidebar />
          )}
        </div>
      </main>

      {/* 6. Mobile Contextual Drawer (Mobile: Stages 1-4) */}
      {!isTerminal && <MobileSummaryDrawer />}

      {/* 7. Legal & Regulatory Footer */}
      <AppFooter />

      {/* 8. Policy Renewal Hub Modal (MODAL-12, SMS & WhatsApp OTP, /renew) */}
      <RenewalFlowModal
        isOpen={isRenewOpen}
        onClose={() => setIsRenewOpen(false)}
      />

      {/* 9. Retrieve Quotation Modal (MODAL-17, MODAL-20, MODAL-21, /retrieve-quote) */}
      <RetrieveQuoteModal
        isOpen={isRetrieveOpen}
        onClose={() => setIsRetrieveOpen(false)}
      />

      {/* 10. Document & Statutory Notices Center (MODAL-08, MODAL-05, MODAL-15, MODAL-19, PDS) */}
      <DocumentCenterModal
        isOpen={isDocCenterOpen}
        onClose={() => setIsDocCenterOpen(false)}
        initialTab={docCenterTab}
      />
    </div>
  );
};

