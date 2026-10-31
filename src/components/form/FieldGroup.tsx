import React from 'react';
import { Heading, Text } from '../ui/Typography';

export interface FieldGroupProps {
  id?: string;
  title: string;
  description?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  asCard?: boolean;
}

/**
 * DoctorShield FieldGroup Molecule
 * Provides structural section grouping with an authoritative 3px Teal vertical accent bar,
 * Kanit 500 section heading, and quiet whitespace rhythm without nested cards.
 * When asCard={true}, wraps section in a bounded Direction B elevated card.
 */
export const FieldGroup: React.FC<FieldGroupProps> = ({
  id,
  title,
  description,
  badge,
  action,
  children,
  className = '',
  style,
  asCard = false,
}) => {
  return (
    <section
      id={id}
      className={`ds-field-group-section ${asCard ? 'ds-card' : ''} ${className}`}
      style={{
        marginBottom: asCard ? '24px' : '28px',
        ...style,
      }}
    >
      {/* 3px Teal Accent Section Header */}
      <div
        className="ds-section-bar"
        style={{
          borderLeft: '3px solid var(--ds-color-brand-primary, #08A5B5)',
          paddingLeft: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: asCard ? '20px' : '16px',
        }}
      >
        <div>
          <Heading level={2} style={{ fontSize: asCard ? '1.125rem' : '1.0625rem', lineHeight: 1.35, fontWeight: 500 }}>
            {title}
          </Heading>
          {description && (
            <Text variant="small" color="secondary" style={{ marginTop: '3px', fontSize: '13px' }}>
              {description}
            </Text>
          )}
        </div>
        {(badge || action) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {badge && <div>{badge}</div>}
            {action && <div>{action}</div>}
          </div>
        )}
      </div>

      {/* Field Content Slot */}
      <div className="ds-field-group-content">{children}</div>
    </section>
  );
};

