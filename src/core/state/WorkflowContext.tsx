import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  StageId,
  WorkflowState,
  DoctorProfile,
  CoverageParameters,
  QuoteBreakdown,
  INITIAL_COVERAGE_STATE,
  INITIAL_DOCTOR_PROFILE,
  INITIAL_QUOTE,
} from './types';

export { INITIAL_COVERAGE_STATE, INITIAL_COVERAGE_STATE as INITIAL_COVERAGE, INITIAL_DOCTOR_PROFILE } from './types';

export interface WorkflowContextValue extends WorkflowState {
  // Navigation actions
  goToStage: (stage: StageId) => void;
  nextStage: () => void;
  prevStage: () => void;
  
  // State mutations
  updateDoctorProfile: (partial: Partial<DoctorProfile>) => void;
  updateCoverage: (partial: Partial<CoverageParameters>) => void;
  toggleAddon: (addonKey: keyof CoverageParameters['addons']) => void;
  recalculateQuote: () => Promise<void>;
  setQuote: (quote: QuoteBreakdown) => void;
  
  // Terminal state actions
  triggerReferral: (reason: string) => void;
  confirmPolicy: (details?: any) => void;
  resetWorkflow: () => void;
  setPaymentTransaction: (tx: any) => void;
  setPolicyDetails: (policy: any) => void;
  
  // UI Controls
  setMobileSummaryOpen: (open: boolean) => void;
  toggleMobileSummary: () => void;
  announce: (message: string) => void;
}

const STORAGE_KEY = 'ds_workflow_draft_v1';

const STAGE_ROUTE_MAP: Record<StageId, string> = {
  1: '/buy/coverage',
  2: '/buy/quote',
  3: '/buy/underwrite',
  4: '/buy/review',
  referral: '/referral',
  confirmation: '/confirmation',
};

const ROUTE_STAGE_MAP: Record<string, StageId> = {
  '/': 1,
  '/buy/coverage': 1,
  '/buy/quote': 2,
  '/buy/underwrite': 3,
  '/buy/review': 4,
  '/referral': 'referral',
  '/confirmation': 'confirmation',
};

const WorkflowContext = createContext<WorkflowContextValue | null>(null);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from sessionStorage if available
  const [state, setState] = useState<WorkflowState>(() => {
    const initialPath = window.location.pathname;
    const initialStage = ROUTE_STAGE_MAP[initialPath] || 1;

    try {
      const saved = window.sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          currentStage: initialStage,
          path: initialPath,
          isLoading: false,
          isMobileSummaryOpen: false,
          announcement: '',
        };
      }
    } catch {
      // fallback to default
    }

    return {
      currentStage: initialStage,
      previousStage: null,
      path: initialPath,
      doctorProfile: INITIAL_DOCTOR_PROFILE,
      coverage: INITIAL_COVERAGE_STATE,
      quote: INITIAL_QUOTE,
      isQuoteStale: false,
      hasAffirmativeDeclaration: false,
      isLoading: false,
      announcement: '',
      isMobileSummaryOpen: false,
    };
  });

  // Sync to sessionStorage on changes
  useEffect(() => {
    try {
      const serialized = JSON.stringify({
        doctorProfile: state.doctorProfile,
        coverage: state.coverage,
        quote: state.quote,
        isQuoteStale: state.isQuoteStale,
        hasAffirmativeDeclaration: state.hasAffirmativeDeclaration,
        referralReason: state.referralReason,
        referralReference: state.referralReference,
      });
      window.sessionStorage.setItem(STORAGE_KEY, serialized);
    } catch {
      // storage unavailable or full
    }
  }, [state.doctorProfile, state.coverage, state.quote, state.isQuoteStale, state.hasAffirmativeDeclaration, state.referralReason, state.referralReference]);

  // Synchronize browser history / popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const matchedStage = ROUTE_STAGE_MAP[path];
      if (matchedStage) {
        setState((prev) => ({
          ...prev,
          previousStage: prev.currentStage,
          currentStage: matchedStage,
          path,
          announcement: `Navigated to Stage ${matchedStage}`,
        }));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const announce = useCallback((message: string) => {
    setState((prev) => ({ ...prev, announcement: message }));
  }, []);

  const goToStage = useCallback((stage: StageId) => {
    const targetPath = STAGE_ROUTE_MAP[stage] || '/buy/coverage';
    
    // If navigating to referral terminal state, use replaceState to trap history per DEC-009
    if (stage === 'referral') {
      window.history.replaceState({ stage }, '', targetPath);
    } else {
      window.history.pushState({ stage }, '', targetPath);
    }

    setState((prev) => ({
      ...prev,
      previousStage: prev.currentStage,
      currentStage: stage,
      path: targetPath,
      isMobileSummaryOpen: false,
      announcement: `Loaded Stage ${stage}`,
    }));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const nextStage = useCallback(() => {
    setState((prev) => {
      let next: StageId = 1;
      if (prev.currentStage === 1) next = 2;
      else if (prev.currentStage === 2) next = 3;
      else if (prev.currentStage === 3) next = 4;
      else if (prev.currentStage === 4) next = 'confirmation';

      const targetPath = STAGE_ROUTE_MAP[next];
      window.history.pushState({ stage: next }, '', targetPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      return {
        ...prev,
        previousStage: prev.currentStage,
        currentStage: next,
        path: targetPath,
        isMobileSummaryOpen: false,
        announcement: `Proceeded to Stage ${next}`,
      };
    });
  }, []);

  const prevStage = useCallback(() => {
    setState((prev) => {
      let back: StageId = 1;
      if (prev.currentStage === 2) back = 1;
      else if (prev.currentStage === 3) back = 2;
      else if (prev.currentStage === 4) back = 3;

      const targetPath = STAGE_ROUTE_MAP[back];
      window.history.pushState({ stage: back }, '', targetPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      return {
        ...prev,
        previousStage: prev.currentStage,
        currentStage: back,
        path: targetPath,
        isMobileSummaryOpen: false,
        announcement: `Returned to Stage ${back}`,
      };
    });
  }, []);

  // Tier 1: Persistent identity updates
  const updateDoctorProfile = useCallback((partial: Partial<DoctorProfile>) => {
    setState((prev) => ({
      ...prev,
      doctorProfile: { ...prev.doctorProfile, ...partial },
    }));
  }, []);

  // Tier 2: Volatile coverage updates with cascade invalidation
  const updateCoverage = useCallback((partial: Partial<CoverageParameters>) => {
    setState((prev) => {
      const updatedCoverage = { ...prev.coverage, ...partial };
      
      // Calculate recalculation indicators: only rating-critical fields invalidate quotes
      const ratingKeys: (keyof CoverageParameters)[] = [
        'classificationId',
        'limitOfLiability',
        'startDate',
        'endDate',
        'promoCode',
        'specialties',
        'clause612Accepted',
        'clinic',
        'pic',
        'addons',
      ];
      const hasRatingChange = ratingKeys.some(
        (k) => partial[k] !== undefined && JSON.stringify(partial[k]) !== JSON.stringify(prev.coverage[k])
      );
      const isStale = typeof prev.currentStage === 'number' && prev.currentStage >= 2 && hasRatingChange ? true : prev.isQuoteStale;
      
      return {
        ...prev,
        coverage: updatedCoverage,
        isQuoteStale: isStale,
        announcement: isStale ? 'Coverage options modified. Recalculation required.' : 'Coverage updated',
      };
    });
  }, []);

  const toggleAddon = useCallback((addonKey: keyof CoverageParameters['addons']) => {
    setState((prev) => {
      const currentVal = prev.coverage.addons[addonKey];
      const updatedAddons = {
        ...prev.coverage.addons,
        [addonKey]: typeof currentVal === 'boolean' ? !currentVal : currentVal,
      };

      const updatedCoverage = {
        ...prev.coverage,
        addons: updatedAddons,
      };

      // Recalculate indicative premium dynamically
      let addonCost = 0;
      if (updatedAddons.clinicPackage) addonCost += 350.0;
      if (updatedAddons.locumCover) addonCost += 120.0;
      if (updatedAddons.personInCharge) addonCost += 150.0;
      if (updatedAddons.cyberLiability) addonCost += 200.0;

      const base = prev.quote ? prev.quote.grossBasePremium : 750.0;
      const net = base + addonCost;
      const sst = net * 0.08;
      const stamp = 10.0;
      const total = net + sst + stamp;

      const updatedQuote: QuoteBreakdown = {
        ...(prev.quote || INITIAL_QUOTE),
        addonsTotal: addonCost,
        netTaxablePremium: net,
        sstAmount: Number(sst.toFixed(2)),
        totalPayable: Number(total.toFixed(2)),
      };

      return {
        ...prev,
        coverage: updatedCoverage,
        quote: updatedQuote,
        announcement: `Add-on ${String(addonKey)} updated. New total: RM ${total.toFixed(2)}`,
      };
    });
  }, []);

  const recalculateQuote = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    // Simulate debounced backend calculation
    await new Promise((resolve) => setTimeout(resolve, 350));

    setState((prev) => {
      const base = 750.0;
      let addonCost = 0;
      if (prev.coverage.addons.clinicPackage) addonCost += 350.0;
      if (prev.coverage.addons.locumCover) addonCost += 120.0;
      if (prev.coverage.addons.personInCharge) addonCost += 150.0;
      if (prev.coverage.addons.cyberLiability) addonCost += 200.0;

      const net = base + addonCost;
      const sst = Number((net * 0.08).toFixed(2));
      const total = Number((net + sst + 10.0).toFixed(2));

      return {
        ...prev,
        isLoading: false,
        isQuoteStale: false,
        quote: {
          grossBasePremium: base,
          specialtyMultiplier: 1.0,
          addonsTotal: addonCost,
          discountAmount: 0.0,
          netTaxablePremium: net,
          sstAmount: sst,
          stampDuty: 10.0,
          totalPayable: total,
          quoteToken: `QT-${Date.now().toString(36).toUpperCase()}`,
          issuedAt: Date.now(),
          expiresAt: Date.now() + 15 * 60 * 1000,
        },
        announcement: `Quote recalculated successfully. Total payable is RM ${total.toFixed(2)}.`,
      };
    });
  }, []);

  const setQuote = useCallback((newQuote: QuoteBreakdown) => {
    setState((prev) => ({
      ...prev,
      quote: newQuote,
      isQuoteStale: false,
      announcement:
        newQuote?.totalPayable !== undefined
          ? `Quotation updated. Total payable is RM ${newQuote.totalPayable.toFixed(2)}.`
          : 'Quotation updated.',
    }));
  }, []);

  const triggerReferral = useCallback((reason: string) => {
    const refNum = `REF-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    window.history.replaceState({ stage: 'referral' }, '', '/referral');

    setState((prev) => ({
      ...prev,
      hasAffirmativeDeclaration: true,
      referralReason: reason,
      referralReference: refNum,
      previousStage: prev.currentStage,
      currentStage: 'referral',
      path: '/referral',
      isMobileSummaryOpen: false,
      announcement: `Application referred to underwriting. Reference number: ${refNum}`,
    }));
  }, []);

  const confirmPolicy = useCallback((details?: any) => {
    window.history.replaceState({ stage: 'confirmation' }, '', '/confirmation');
    setState((prev) => ({
      ...prev,
      currentStage: 'confirmation',
      path: '/confirmation',
      policyDetails: details || prev.policyDetails,
      announcement: 'Policy successfully bound and issued.',
    }));
  }, []);

  const setPaymentTransaction = useCallback((tx: any) => {
    setState((prev) => ({ ...prev, paymentTransaction: tx }));
  }, []);

  const setPolicyDetails = useCallback((policy: any) => {
    setState((prev) => ({ ...prev, policyDetails: policy }));
  }, []);

  const resetWorkflow = useCallback(() => {
    window.sessionStorage.removeItem(STORAGE_KEY);
    window.history.pushState({ stage: 1 }, '', '/buy/coverage');
    setState({
      currentStage: 1,
      previousStage: null,
      path: '/buy/coverage',
      doctorProfile: INITIAL_DOCTOR_PROFILE,
      coverage: INITIAL_COVERAGE_STATE,
      quote: INITIAL_QUOTE,
      isQuoteStale: false,
      hasAffirmativeDeclaration: false,
      isLoading: false,
      announcement: 'Workflow reset to Stage 1.',
      isMobileSummaryOpen: false,
    });
  }, []);

  const setMobileSummaryOpen = useCallback((open: boolean) => {
    setState((prev) => ({ ...prev, isMobileSummaryOpen: open }));
  }, []);

  const toggleMobileSummary = useCallback(() => {
    setState((prev) => ({ ...prev, isMobileSummaryOpen: !prev.isMobileSummaryOpen }));
  }, []);

  const value: WorkflowContextValue = {
    ...state,
    goToStage,
    nextStage,
    prevStage,
    updateDoctorProfile,
    updateCoverage,
    toggleAddon,
    recalculateQuote,
    setQuote,
    triggerReferral,
    confirmPolicy,
    resetWorkflow,
    setPaymentTransaction,
    setPolicyDetails,
    setMobileSummaryOpen,
    toggleMobileSummary,
    announce,
  };

  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>;
};

export const useWorkflow = (): WorkflowContextValue => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};

