import React from 'react';

export interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId = 'main-content',
  label = 'Skip to main content',
}) => {
  return (
    <a
      href={`#${targetId}`}
      className="ds-skip-link"
      style={{
        position: 'absolute',
        top: '-100px',
        left: '16px',
        zIndex: 9999,
        padding: '12px 20px',
        backgroundColor: 'var(--ds-color-action-secondary)',
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: 'var(--ds-primitive-font-size-sm)',
        borderRadius: 'var(--ds-primitive-radius-md)',
        boxShadow: 'var(--ds-primitive-shadow-lg)',
        textDecoration: 'none',
        transition: 'top 150ms cubic-bezier(0, 0, 0.2, 1)',
        outline: 'none',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '16px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-100px';
      }}
    >
      {label}
    </a>
  );
};

