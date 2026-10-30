import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Info } from 'lucide-react';

export interface AccessibleDisclosureTriggerProps {
  id: string;
  triggerLabel: string;
  children: React.ReactNode;
  icon?: 'info' | 'help' | 'none';
  defaultOpen?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DoctorShield Accessible Disclosure Trigger Molecule
 * Progressively reveals educational context and regulatory notes without modal popups.
 * Adheres to WAI-ARIA Disclosure pattern.
 */
export const AccessibleDisclosureTrigger: React.FC<AccessibleDisclosureTriggerProps> = ({
  id,
  triggerLabel,
  children,
  icon = 'info',
  defaultOpen = false,
  className = '',
  style,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`ds-disclosure ${className}`}
      style={{
        marginTop: 'var(--ds-primitive-space-2)',
        marginBottom: 'var(--ds-primitive-space-3)',
        ...style,
      }}
    >
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          padding: '4px 0',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--ds-primitive-color-teal-800)',
          fontFamily: 'var(--ds-primitive-font-body)',
          fontSize: 'var(--ds-primitive-font-size-xs)',
          fontWeight: 500,
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {icon === 'info' && <Info size={14} color="var(--ds-color-brand-primary)" aria-hidden="true" />}
        {icon === 'help' && <HelpCircle size={14} color="var(--ds-color-brand-primary)" aria-hidden="true" />}
        <span>{triggerLabel}</span>
        <ChevronDown
          size={14}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
          }}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={`${id}-content`}
          role="region"
          aria-labelledby={`${id}-trigger`}
          style={{
            marginTop: '6px',
            padding: 'var(--ds-primitive-space-3) var(--ds-primitive-space-4)',
            backgroundColor: 'var(--ds-color-surface-subtle)',
            borderLeft: '3px solid var(--ds-color-brand-primary)',
            borderRadius: '0 6px 6px 0',
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-xs)',
            lineHeight: 1.55,
            color: 'var(--ds-color-text-secondary)',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

