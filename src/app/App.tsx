import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { ErrorBoundary } from '../components/layout/ErrorBoundary';
import { useWorkflow } from '../core/state/WorkflowContext';
import { Stage1CoverageForm } from '../features/coverage/Stage1CoverageForm';
import { Stage2QuoteReview } from '../features/quote/Stage2QuoteReview';
import { Stage3ParticularsForm } from '../features/particulars/Stage3ParticularsForm';
import { Stage4ReviewAndPayment } from '../features/review/Stage4ReviewAndPayment';
import { ReferralScaffold } from '../features/scaffolds/ReferralScaffold';
import { Stage5PolicyConfirmation } from '../features/confirmation/Stage5PolicyConfirmation';

const CatalogApp = React.lazy(() =>
  import('../catalog/CatalogApp').then((m) => ({ default: m.CatalogApp }))
);

export const AppContent: React.FC = () => {
  const { currentStage } = useWorkflow();
  const [isCatalogActive, setIsCatalogActive] = useState(() => {
    return window.location.pathname === '/catalog';
  });

  const handleToggleCatalog = () => {
    const nextState = !isCatalogActive;
    setIsCatalogActive(nextState);
    if (nextState) {
      window.history.pushState(null, '', '/catalog');
    } else {
      window.history.pushState(null, '', '/buy/coverage');
    }
  };

  if (isCatalogActive) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Floating return bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'var(--ds-primitive-color-navy-900)',
            color: '#FFFFFF',
            padding: '10px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '14px',
            borderBottom: '1px solid rgba(8, 165, 181, 0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 600 }}>DoctorShield Component Catalog</span>
            <span style={{ fontSize: '12px', color: 'var(--ds-primitive-color-teal-300)' }}>
              (Design Tokens & UI Primitives)
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleCatalog}
            style={{
              padding: '6px 16px',
              borderRadius: '6px',
              backgroundColor: 'var(--ds-primitive-color-teal-500)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Return to Application Shell
          </button>
        </div>

        <React.Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading Catalog...</div>}>
          <CatalogApp />
        </React.Suspense>
      </div>
    );
  }

  // Render appropriate stage view within AppShell
  return (
    <AppShell
      onCatalogToggle={handleToggleCatalog}
      isCatalogActive={isCatalogActive}
    >
      {currentStage === 1 && <Stage1CoverageForm />}
      {currentStage === 2 && <Stage2QuoteReview />}
      {currentStage === 3 && <Stage3ParticularsForm />}
      {currentStage === 4 && <Stage4ReviewAndPayment />}
      {currentStage === 'referral' && <ReferralScaffold />}
      {currentStage === 'confirmation' && <Stage5PolicyConfirmation />}
    </AppShell>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

