import React from 'react';
import { SelectCombobox, SelectOption } from '../ui/SelectCombobox';

export interface SearchableClassificationSelectorProps {
  id?: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
}

export const DOCTORSHIELD_CLASSIFICATIONS: SelectOption[] = [
  // Primary Care
  { value: '7', label: 'General Medical Practitioner', group: 'Primary Care' },
  { value: '20', label: 'General Medical Practitioner with Cosmetic and Aesthetic', group: 'Primary Care' },
  { value: '8', label: 'General Medical Practitioner Obstetrics', group: 'Primary Care' },

  // Specialist Practice
  { value: '15', label: 'Specialist (Private sector)', group: 'Specialist Practice' },
  { value: '17', label: 'Part-time Specialist', group: 'Specialist Practice' },
  { value: '18', label: 'Semi-retired Specialist', group: 'Specialist Practice' },

  // Dental Services
  { value: '13', label: 'General Dentist', group: 'Dental Services' },
  { value: '25', label: 'Dentist (Private sector)', group: 'Dental Services' },

  // Public Sector & Locum Exposure
  { value: '5', label: 'Government Doctor/Dentist', group: 'Public Sector' },
  { value: '19', label: 'Government Medical officer with locum exposure', group: 'Public Sector' },
  { value: '16', label: 'Government Specialist with locum exposure', group: 'Public Sector' },
  { value: '21', label: 'Government General Dentist with locum exposure', group: 'Public Sector' },
  { value: '26', label: 'Government Dentist (with specialisation) locum exposure', group: 'Public Sector' },

  // Allied & Institutional
  { value: '9', label: 'Allied Health Practitioner', group: 'Allied & Academic' },
  { value: '4', label: 'Lecturer', group: 'Allied & Academic' },
  { value: '3', label: 'Hospital Staff', group: 'Allied & Academic' },
  { value: '2', label: 'Nurses', group: 'Allied & Academic' },
  { value: '1', label: 'Medical Assistant', group: 'Allied & Academic' },
  { value: '14', label: 'Student', group: 'Allied & Academic' },
  { value: '22', label: 'Non-practising, Fully Retired & Non-clinical Doctors', group: 'Special Status' },
  { value: '23', label: 'Chiropractor', group: 'Allied & Academic' },
  { value: '24', label: 'Optometrist', group: 'Allied & Academic' },
];

/**
 * DoctorShield Searchable Classification Selector
 * Groups all 23 verified portal classifications, supports real-time text filter and keyboard listbox.
 */
export const SearchableClassificationSelector: React.FC<SearchableClassificationSelectorProps> = ({
  id = 'classification_id',
  label = 'Professional Classification',
  value,
  onChange,
  required = true,
  disabled = false,
  errorMessage,
  helperText = 'Select your primary medical or dental risk classification.',
}) => {
  return (
    <SelectCombobox
      id={id}
      label={label}
      options={DOCTORSHIELD_CLASSIFICATIONS}
      value={value}
      onChange={onChange}
      placeholder="Search classification (e.g. General Medical, Specialist, Dentist)..."
      required={required}
      disabled={disabled}
      errorMessage={errorMessage}
      helperText={helperText}
    />
  );
};

