/**
 * Authoritative Medical Practitioner Classifications and Liability Tiers
 * Sourced from FIELD_DICTIONARY.md (FLD-CALC-CLASS-001) and BUSINESS_RULE_CATALOG.md (RULE-ELIG-01, RULE-LIAB-01)
 * Underwriter: Chubb Insurance Malaysia Berhad | Distributor: JA Assure
 */

export interface ClassificationOption {
  id: string;
  name: string;
  category: 'primary_care' | 'surgical' | 'non_surgical' | 'government' | 'dental' | 'allied_other';
  requiresSpecialtySplit?: boolean;
  defaultSpecialties?: Array<{ id: string; name: string; defaultPercentage: number }>;
  availableLiabilityTiers: string[]; // e.g. ['250k', '500k', '1m', '1.5m', '2m', '3m', '5m', '10m']
  recommendedTier?: string;
  minLimitAmount: number;
}

export interface LiabilityLimitOption {
  id: string;
  amount: number;
  label: string; // e.g. "RM 1,000,000"
  indicativeBaseAnnualRate: number; // Audited baseline gross rate
  recommendedFor?: string[];
  description?: string;
}

export const ALL_LIABILITY_TIERS: Record<string, LiabilityLimitOption> = {
  '250k': {
    id: '250k',
    amount: 250000,
    label: 'RM 250,000',
    indicativeBaseAnnualRate: 250.0,
    description: 'Government Medical Officer & Allied Health Baseline',
  },
  '500k': {
    id: '500k',
    amount: 500000,
    label: 'RM 500,000',
    indicativeBaseAnnualRate: 400.0,
    description: 'Entry-Level General Practice',
  },
  '1m': {
    id: '1m',
    amount: 1000000,
    label: 'RM 1,000,000',
    indicativeBaseAnnualRate: 650.0,
    description: 'Standard Recommended Medical Indemnity',
  },
  '1.5m': {
    id: '1.5m',
    amount: 1500000,
    label: 'RM 1,500,000',
    indicativeBaseAnnualRate: 850.0,
    description: 'Enhanced Primary Care Protection',
  },
  '2m': {
    id: '2m',
    amount: 2000000,
    label: 'RM 2,000,000',
    indicativeBaseAnnualRate: 1100.0,
    description: 'Recommended for High Patient Volume',
  },
  '3m': {
    id: '3m',
    amount: 3000000,
    label: 'RM 3,000,000',
    indicativeBaseAnnualRate: 1600.0,
    description: 'Surgical & Procedural Risk Coverage',
  },
  '5m': {
    id: '5m',
    amount: 5000000,
    label: 'RM 5,000,000',
    indicativeBaseAnnualRate: 2400.0,
    description: 'Comprehensive Specialist Exposure Limit',
  },
  '10m': {
    id: '10m',
    amount: 10000000,
    label: 'RM 10,000,000',
    indicativeBaseAnnualRate: 4200.0,
    description: 'Maximum Institutional Indemnity Limit',
  },
};

/**
 * 23 Approved Authoritative Practitioner Classifications from FLD-001
 */
export const APPROVED_CLASSIFICATIONS: ClassificationOption[] = [
  // Primary Care & General Practice
  {
    id: '7',
    name: 'General Medical Practitioner',
    category: 'primary_care',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['500k', '1m', '1.5m', '2m', '3m', '5m', '10m'],
    recommendedTier: '1m',
    minLimitAmount: 500000,
  },
  {
    id: '8',
    name: 'General Medical Practitioner Obstetrics',
    category: 'primary_care',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['1m', '1.5m', '2m', '3m', '5m', '10m'],
    recommendedTier: '2m',
    minLimitAmount: 1000000,
  },
  {
    id: '20',
    name: 'General Medical Practitioner with Cosmetic and Aesthetic',
    category: 'primary_care',
    requiresSpecialtySplit: true,
    defaultSpecialties: [
      { id: 'gp_core', name: 'General Medical Consultation', defaultPercentage: 70 },
      { id: 'aesthetic_minor', name: 'Non-Invasive Aesthetic Procedures (Fillers/Botox)', defaultPercentage: 30 },
    ],
    availableLiabilityTiers: ['1m', '1.5m', '2m', '3m', '5m', '10m'],
    recommendedTier: '2m',
    minLimitAmount: 1000000,
  },

  // Specialists
  {
    id: '15',
    name: 'Specialist (Private sector)',
    category: 'surgical',
    requiresSpecialtySplit: true,
    defaultSpecialties: [
      { id: 'spec_primary', name: 'Primary Registered Specialist Field', defaultPercentage: 100 },
    ],
    availableLiabilityTiers: ['1m', '2m', '3m', '5m', '10m'],
    recommendedTier: '5m',
    minLimitAmount: 1000000,
  },
  {
    id: '17',
    name: 'Part-time Specialist',
    category: 'surgical',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['1m', '2m', '3m', '5m'],
    recommendedTier: '2m',
    minLimitAmount: 1000000,
  },
  {
    id: '18',
    name: 'Semi-retired Specialist',
    category: 'non_surgical',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['500k', '1m', '2m'],
    recommendedTier: '1m',
    minLimitAmount: 500000,
  },

  // Dental
  {
    id: '13',
    name: 'General Dentist',
    category: 'dental',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['500k', '1m', '1.5m', '2m', '3m', '5m'],
    recommendedTier: '1m',
    minLimitAmount: 500000,
  },
  {
    id: '25',
    name: 'Dentist (Private sector)',
    category: 'dental',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['500k', '1m', '2m', '3m', '5m'],
    recommendedTier: '1m',
    minLimitAmount: 500000,
  },
  {
    id: '21',
    name: 'Government General Dentist with locum exposure',
    category: 'dental',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['250k', '500k', '1m', '2m'],
    recommendedTier: '500k',
    minLimitAmount: 250000,
  },
  {
    id: '26',
    name: 'Government Dentist (with specialisation) locum exposure',
    category: 'dental',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['500k', '1m', '2m', '3m'],
    recommendedTier: '1m',
    minLimitAmount: 500000,
  },

  // Government Practitioners
  {
    id: '5',
    name: 'Government Doctor/Dentist',
    category: 'government',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['250k', '500k', '1m', '1.5m', '2m'],
    recommendedTier: '500k',
    minLimitAmount: 250000,
  },
  {
    id: '19',
    name: 'Government Medical officer with locum exposure',
    category: 'government',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['250k', '500k', '1m', '1.5m', '2m'],
    recommendedTier: '1m',
    minLimitAmount: 250000,
  },
  {
    id: '16',
    name: 'Government Specialist with locum exposure',
    category: 'government',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['500k', '1m', '2m', '3m', '5m'],
    recommendedTier: '2m',
    minLimitAmount: 500000,
  },

  // Allied & Academic
  {
    id: '9',
    name: 'Allied Health Practitioner',
    category: 'allied_other',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['250k', '500k', '1m'],
    recommendedTier: '500k',
    minLimitAmount: 250000,
  },
  {
    id: '4',
    name: 'Lecturer',
    category: 'allied_other',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['250k', '500k', '1m', '2m'],
    recommendedTier: '500k',
    minLimitAmount: 250000,
  },
  {
    id: '3',
    name: 'Hospital Staff',
    category: 'allied_other',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['250k', '500k', '1m'],
    recommendedTier: '500k',
    minLimitAmount: 250000,
  },
  {
    id: '2',
    name: 'Nurses',
    category: 'allied_other',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['250k', '500k'],
    recommendedTier: '250k',
    minLimitAmount: 250000,
  },
  {
    id: '1',
    name: 'Medical Assistant',
    category: 'allied_other',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['250k', '500k'],
    recommendedTier: '250k',
    minLimitAmount: 250000,
  },
  {
    id: '14',
    name: 'Student',
    category: 'allied_other',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['250k', '500k'],
    recommendedTier: '250k',
    minLimitAmount: 250000,
  },
  {
    id: '22',
    name: 'Non-practising, Fully Retired & Non-clinical Doctors',
    category: 'allied_other',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['250k', '500k', '1m'],
    recommendedTier: '500k',
    minLimitAmount: 250000,
  },
  {
    id: '23',
    name: 'Chiropractor',
    category: 'allied_other',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['500k', '1m', '2m'],
    recommendedTier: '1m',
    minLimitAmount: 500000,
  },
  {
    id: '24',
    name: 'Optometrist',
    category: 'allied_other',
    requiresSpecialtySplit: false,
    availableLiabilityTiers: ['500k', '1m', '2m'],
    recommendedTier: '1m',
    minLimitAmount: 500000,
  },
];

