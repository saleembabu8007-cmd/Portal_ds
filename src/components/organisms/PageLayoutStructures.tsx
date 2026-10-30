import React from 'react';
import { Heading, Text } from '../ui/Typography';

/* ========================================================================
   3. MAIN APPLICATION PAGE LAYOUT
   ======================================================================== */
export interface ApplicationPageLayoutProps {
  children: React.ReactNode;
  summaryRail?: React.ReactNode;
  isTwoColumn?: boolean;
  maxWidth?: string;
  className?: string;
}

/**
 * DoctorShield Application Page Layout
 * Replaces monolithic dashboard cards with an open, high-trust canvas composition.
 * Dynamically switches between single centered column (e.g. Underwriting/Referral)
 * and two-column layout (Main Form + 340px sticky summary rail) for quotation stages.
 */
export const ApplicationPageLayout: React.FC<ApplicationPageLayoutProps> = ({
  children,
  summaryRail,
  isTwoColumn = true,
  maxWidth = '1200px',
  className = '',
}) => {
  return (
    <div
      className={`ds-page-layout ${className}`}
      style={{
        maxWidth,
        margin: '0 auto',
        padding: '24px 20px 80px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {isTwoColumn && summaryRail ? (
        <div
          className="ds-two-column-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 340px',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* Left Primary Form Canvas */}
          <div className="ds-primary-canvas" style={{ minWidth: 0 }}>
            {children}
          </div>

          {/* Right Sticky Summary Rail */}
          <aside
            className="ds-summary-rail"
            aria-label="Policy Quotation Summary"
            style={{
              position: 'sticky',
              top: '72px',
              minWidth: 0,
            }}
          >
            {summaryRail}
          </aside>
        </div>
      ) : (
        <div
          className="ds-single-canvas"
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            minWidth: 0,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

/* ========================================================================
   4. FORM SECTION ORGANISM
   ======================================================================== */
export interface FormSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actionAffordance?: React.ReactNode;
  divider?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DoctorShield Form Section Organism
 * Establishes predictable vertical rhythm between form groups without nested card wrappers.
 */
export const FormSection: React.FC<FormSectionProps> = ({
  id,
  title,
  subtitle,
  children,
  actionAffordance,
  divider = true,
  className = '',
  style,
}) => {
  return (
    <section
      id={id}
      className={`ds-form-section ${className}`}
      style={{
        marginBottom: '36px',
        paddingBottom: divider ? '28px' : 0,
        borderBottom: divider ? '1px solid var(--ds-color-border-subtle)' : 'none',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: '1.25rem', // 20px
              fontWeight: 500,
              color: 'var(--ds-primitive-color-navy-900)',
              margin: '0 0 4px 0',
              lineHeight: 1.25,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: '13px',
                color: 'var(--ds-color-text-secondary)',
                margin: 0,
                lineHeight: 1.45,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {actionAffordance && (
          <div style={{ flexShrink: 0 }}>
            {actionAffordance}
          </div>
        )}
      </div>

      <div className="ds-form-section-body">
        {children}
      </div>
    </section>
  );
};

/* ========================================================================
   5. CONDITIONAL QUESTION GROUP ORGANISM
   ======================================================================== */
export interface ConditionalQuestionGroupProps {
  id: string;
  triggerQuestion: React.ReactNode;
  isVisible: boolean;
  children: React.ReactNode;
  onHidden?: () => void;
  className?: string;
}

/**
 * DoctorShield Conditional Question Group Organism
 * Unifies triggering choice with immediate adjacent revealed fields.
 * Distinguishes dependent questions with a clean left border affordance.
 */
export const ConditionalQuestionGroup: React.FC<ConditionalQuestionGroupProps> = ({
  id,
  triggerQuestion,
  isVisible,
  children,
  onHidden,
  className = '',
}) => {
  return (
    <div
      id={id}
      className={`ds-conditional-group ${className}`}
      style={{
        marginBottom: '24px',
      }}
    >
      <div className="ds-conditional-trigger">
        {triggerQuestion}
      </div>

      {isVisible && (
        <div
          role="region"
          aria-live="polite"
          className="ds-conditional-content"
          style={{
            marginTop: '12px',
            paddingLeft: '18px',
            borderLeft: '2px solid var(--ds-color-brand-primary)',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

