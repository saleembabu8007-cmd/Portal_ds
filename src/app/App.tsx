import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { ErrorBoundary } from '../components/layout/ErrorBoundary';
import { useWorkflow } from '../core/state/WorkflowContext';
import { Stage1CoverageForm } from '../features/coverage/Stage1CoverageForm';
import { Stage2QuoteReview } from '../features/quote/Stage2QuoteReview';
import { Stage3ParticularsForm } from '../features/particulars/Stage3ParticularsForm';
import { Stage4ReviewAndPayment } from '../features/review/Stage4ReviewAndPayment';
import { ReferralScaffold } from '../features/scaffolds/ReferralScaffold';
import { Stage5PolicyConfirmation } from '../features/confirmation/Stage5PolicyConfirmation';

export const AppContent: React.FC = () => {
  const { currentStage } = useWorkflow();

  return (
    <AppShell>
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
