import React from 'react';
import { MinimalStepNavigation, DEFAULT_DOCTORSHIELD_STEPS, StepDefinition } from '../organisms/HeaderAndNavigation';

export interface StepItem {
  id: number;
  label: string;
  path: string;
}

export interface InsuranceStepProgressProps {
  currentStep: number; // 1, 2, 3, 4
  onStepClick?: (stepId: number) => void;
  className?: string;
}

export const defaultSteps: StepItem[] = [
  { id: 1, label: 'Coverage', path: '/buy/coverage' },
  { id: 2, label: 'Quotation', path: '/buy/quote' },
  { id: 3, label: 'Details & Underwriting', path: '/buy/underwrite' },
  { id: 4, label: 'Review & Payment', path: '/buy/review' },
];

/**
 * DoctorShield Minimal Step Progress Component
 * Refactored to delegate to MinimalStepNavigation organism (Direction B: Structured Minimal).
 */
export const InsuranceStepProgress: React.FC<InsuranceStepProgressProps> = ({
  currentStep,
  onStepClick,
  className = '',
}) => {
  return (
    <MinimalStepNavigation
      currentStep={currentStep}
      steps={defaultSteps}
      onStepClick={onStepClick}
      className={className}
    />
  );
};
