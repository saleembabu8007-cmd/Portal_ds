import React from 'react';
import { SelectCombobox, SelectOption } from '../ui/SelectCombobox';

export interface SearchableSpecializationSelectorProps {
  id?: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
}

export const MMC_SPECIALIZATIONS: SelectOption[] = [
  // Medical Specialties
  { value: 'anaesthesiology', label: 'Anaesthesiology', group: 'Surgical & Critical Care' },
  { value: 'cardiology', label: 'Cardiology', group: 'Internal Medicine Specialties' },
  { value: 'clinical_oncology', label: 'Clinical Oncology', group: 'Internal Medicine Specialties' },
  { value: 'dermatology', label: 'Dermatology', group: 'General & Ambulatory' },
  { value: 'emergency_medicine', label: 'Emergency Medicine', group: 'Acute & Critical Care' },
  { value: 'endocrinology', label: 'Endocrinology', group: 'Internal Medicine Specialties' },
  { value: 'gastroenterology', label: 'Gastroenterology & Hepatology', group: 'Internal Medicine Specialties' },
  { value: 'general_internal_medicine', label: 'General Internal Medicine', group: 'Internal Medicine Specialties' },
  { value: 'general_surgery', label: 'General Surgery', group: 'Surgical & Critical Care' },
  { value: 'nephrology', label: 'Nephrology', group: 'Internal Medicine Specialties' },
  { value: 'neurology', label: 'Neurology', group: 'Internal Medicine Specialties' },
  { value: 'neurosurgery', label: 'Neurosurgery', group: 'Surgical & Critical Care' },
  { value: 'obstetrics_gynaecology', label: 'Obstetrics & Gynaecology', group: 'Surgical & Critical Care' },
  { value: 'ophthalmology', label: 'Ophthalmology', group: 'Surgical & Critical Care' },
  { value: 'orthopaedic_surgery', label: 'Orthopaedic Surgery', group: 'Surgical & Critical Care' },
  { value: 'otorhinolaryngology', label: 'Otorhinolaryngology (ENT)', group: 'Surgical & Critical Care' },
  { value: 'paediatrics', label: 'General Paediatrics', group: 'Paediatric Specialties' },
  { value: 'paediatric_surgery', label: 'Paediatric Surgery', group: 'Paediatric Specialties' },
  { value: 'plastic_surgery', label: 'Plastic & Reconstructive Surgery', group: 'Surgical & Critical Care' },
  { value: 'psychiatry', label: 'Psychiatry', group: 'General & Ambulatory' },
  { value: 'radiology', label: 'Diagnostic Radiology', group: 'Diagnostic & Pathology' },
  { value: 'respiratory_medicine', label: 'Respiratory Medicine', group: 'Internal Medicine Specialties' },
  { value: 'urology', label: 'Urology', group: 'Surgical & Critical Care' },
];

/**
 * DoctorShield Searchable Specialization Selector
 * Searchable combobox for MMC-registered clinical specialties.
 */
export const SearchableSpecializationSelector: React.FC<SearchableSpecializationSelectorProps> = ({
  id = 'specialization_id',
  label = 'Clinical Specialization (NSR Registered)',
  value,
  onChange,
  required = true,
  disabled = false,
  errorMessage,
  helperText = 'Select your National Specialist Register (NSR) recognized specialty.',
}) => {
  return (
    <SelectCombobox
      id={id}
      label={label}
      options={MMC_SPECIALIZATIONS}
      value={value}
      onChange={onChange}
      placeholder="Type to search MMC / NSR specialty..."
      required={required}
      disabled={disabled}
      errorMessage={errorMessage}
      helperText={helperText}
    />
  );
};

