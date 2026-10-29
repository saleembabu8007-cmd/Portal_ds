import React from 'react';
import { Shield, PhoneCall, HelpCircle, Layers, RotateCcw, Search, FileText } from 'lucide-react';

export interface BrandHeaderProps {
  onCatalogToggle?: () => void;
  isCatalogActive?: boolean;
  onRenewClick?: () => void;
  onRetrieveQuoteClick?: () => void;
  onDocumentCenterClick?: () => void;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  onCatalogToggle,
  isCatalogActive = false,
  onRenewClick,
  onRetrieveQuoteClick,
  onDocumentCenterClick,
}) => {
  return (
    <header
      className="ds-brand-header"
      role="banner"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--ds-color-border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: 'var(--ds-primitive-shadow-sm)',
      }}
    >
      <div
        className="ds-header-inner"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Brand Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="/"
            aria-label="DoctorShield Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'inherit',
              outline: 'none',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'var(--ds-primitive-color-navy-900)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ds-primitive-color-teal-400)',
                boxShadow: '0 2px 4px rgba(19, 39, 102, 0.15)',
              }}
              aria-hidden="true"
            >
              <Shield size={24} strokeWidth={2.2} />
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--ds-primitive-font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ color: 'var(--ds-primitive-color-navy-900)' }}>Doctor</span>
                <span style={{ color: 'var(--ds-primitive-color-teal-700)' }}>Shield</span>
              </div>
              <div
                className="ds-header-tagline"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--ds-color-text-secondary)',
                  letterSpacing: '0.01em',
                  marginTop: '1px',
                }}
              >
                Individual Medical Professional Indemnity
              </div>
            </div>
          </a>

          {/* Institutional Co-Brand Divider & Text */}
          <div
            className="ds-header-cobrand"
            style={{
              borderLeft: '1px solid var(--ds-color-border-subtle)',
              paddingLeft: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)', lineHeight: 1.3 }}>
              Underwritten by <strong>Chubb</strong>
            </span>
            <span style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)', lineHeight: 1.3 }}>
              Distributed by <strong>JA Assure</strong>
            </span>
          </div>
        </div>

        {/* Right Navigation & Utility Actions */}
        <nav
          aria-label="Support and Quick Utilities"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {/* Renew Policy Trigger */}
          {onRenewClick && (
            <button
              type="button"
              onClick={onRenewClick}
              aria-label="Renew Existing Policy"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                color: 'var(--ds-color-secondary)',
                backgroundColor: 'transparent',
                border: '1px solid var(--ds-color-border-subtle)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                minHeight: '38px',
                transition: 'all 150ms ease',
              }}
            >
              <RotateCcw size={15} color="var(--ds-color-primary)" />
              <span className="ds-header-action-text">Renew Policy</span>
            </button>
          )}

          {/* Retrieve Quote Trigger */}
          {onRetrieveQuoteClick && (
            <button
              type="button"
              onClick={onRetrieveQuoteClick}
              aria-label="Retrieve Saved Quotation"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                color: 'var(--ds-color-secondary)',
                backgroundColor: 'transparent',
                border: '1px solid var(--ds-color-border-subtle)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                minHeight: '38px',
                transition: 'all 150ms ease',
              }}
            >
              <Search size={15} color="var(--ds-color-primary)" />
              <span className="ds-header-action-text">Find Quote</span>
            </button>
          )}

          {/* Document Center Trigger */}
          {onDocumentCenterClick && (
            <button
              type="button"
              onClick={onDocumentCenterClick}
              aria-label="Important Notices & PDS"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                color: 'var(--ds-color-secondary)',
                backgroundColor: 'transparent',
                border: '1px solid var(--ds-color-border-subtle)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                minHeight: '38px',
                transition: 'all 150ms ease',
              }}
            >
              <FileText size={15} color="var(--ds-color-primary)" />
              <span className="ds-header-action-text">Disclosures</span>
            </button>
          )}

          {/* Support Helpline Link */}
          <a
            href="tel:+60327123456"
            className="ds-header-helpline"
            aria-label="Call DoctorShield Support at +603 2712 3456"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              color: 'var(--ds-primitive-color-navy-900)',
              fontSize: 'var(--ds-primitive-font-size-sm)',
              fontWeight: 500,
              textDecoration: 'none',
              backgroundColor: 'var(--ds-primitive-color-slate-100)',
              transition: 'background-color 150ms ease',
              minHeight: '38px',
            }}
          >
            <PhoneCall size={15} color="var(--ds-primitive-color-teal-700)" aria-hidden="true" />
            <span className="ds-helpline-text">1-800-88-CHUBB</span>
          </a>

          {/* Design System Catalog Toggle */}
          {onCatalogToggle && (
            <button
              type="button"
              onClick={onCatalogToggle}
              aria-label={isCatalogActive ? 'Return to Application Shell' : 'View Component Catalog'}
              title="Toggle Component Catalog"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                color: isCatalogActive ? '#FFFFFF' : 'var(--ds-primitive-color-teal-800)',
                backgroundColor: isCatalogActive
                  ? 'var(--ds-primitive-color-navy-900)'
                  : 'var(--ds-primitive-color-teal-50)',
                border: '1px solid var(--ds-primitive-color-teal-200)',
                fontSize: 'var(--ds-primitive-font-size-sm)',
                fontWeight: 500,
                cursor: 'pointer',
                minHeight: '38px',
                transition: 'all 150ms ease',
              }}
            >
              <Layers size={15} aria-hidden="true" />
              <span className="ds-catalog-btn-text">
                {isCatalogActive ? 'Portal' : 'Catalog'}
              </span>
            </button>
          )}
        </nav>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .ds-header-inner {
            padding: 10px 16px !important;
          }
          .ds-header-cobrand {
            display: none !important;
          }
          .ds-header-tagline {
            display: none !important;
          }
          .ds-helpline-text {
            display: none !important;
          }
          .ds-header-helpline {
            padding: 8px 10px !important;
          }
          .ds-catalog-btn-text {
            display: none !important;
          }
          .ds-header-action-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

