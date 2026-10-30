import React, { useEffect, useRef } from 'react';

export interface ConditionalFollowUpFieldProps {
  isVisible: boolean;
  onHidden?: () => void; // Callback to reset or clear downstream values when hidden
  children: React.ReactNode;
  indent?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DoctorShield Conditional Follow-Up Field Molecule
 * Immediately adjacent presentation of dependent fields.
 * Manages clean visibility transitions without jarring layout jumps,
 * and notifies parent to reset values when collapsed.
 */
export const ConditionalFollowUpField: React.FC<ConditionalFollowUpFieldProps> = ({
  isVisible,
  onHidden,
  children,
  indent = true,
  className = '',
  style,
}) => {
  const prevVisibleRef = useRef(isVisible);

  useEffect(() => {
    if (prevVisibleRef.current && !isVisible) {
      // Trigger reset callback when transitioned from visible to hidden
      onHidden?.();
    }
    prevVisibleRef.current = isVisible;
  }, [isVisible, onHidden]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`ds-conditional-followup ${className}`}
      role="region"
      aria-live="polite"
      style={{
        marginTop: 'var(--ds-primitive-space-3)',
        marginBottom: 'var(--ds-primitive-space-4)',
        paddingLeft: indent ? 'var(--ds-primitive-space-4)' : 0,
        borderLeft: indent ? '2px solid var(--ds-color-brand-primary)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

