import React from 'react';
import { Lock, ShieldCheck, ExternalLink, HelpCircle } from 'lucide-react';

export const AppFooter: React.FC = () => {
  return (
    <footer
      className="ds-app-footer"
      role="contentinfo"
      style={{
        backgroundColor: 'var(--ds-primitive-color-navy-900)',
        color: '#FFFFFF',
        marginTop: 'auto',
        borderTop: '1px solid var(--ds-primitive-color-navy-800)',
      }}
    >
      {/* Upper Footer: Trust & Key Links */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '36px 16px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Brand & Mission Column */}
        <div>
          <div
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: '1.25rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '12px',
            }}
          >
            <span>Doctor</span>
            <span style={{ color: 'var(--ds-primitive-color-teal-400)' }}>Shield</span>
          </div>

          <p
            style={{
              fontSize: 'var(--ds-primitive-font-size-sm)',
              color: 'var(--ds-primitive-color-navy-200)',
              lineHeight: 1.6,
              margin: '0 0 16px 0',
            }}
          >
            Specialized Medical Professional Indemnity Insurance tailored for registered Malaysian doctors, specialists, and clinic operators.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              backgroundColor: 'rgba(8, 165, 181, 0.15)',
              border: '1px solid rgba(8, 165, 181, 0.3)',
              fontSize: '12px',
              color: 'var(--ds-primitive-color-teal-300)',
            }}
          >
            <Lock size={14} aria-hidden="true" />
            <span>256-Bit Bank-Grade SSL & PCI-DSS SAQ-A Secure</span>
          </div>
        </div>

        {/* Regulatory & Institutional Column */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: 'var(--ds-primitive-font-size-base)',
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '12px',
            }}
          >
            Underwriter & Distributor
          </h4>

          <p
            style={{
              fontSize: 'var(--ds-primitive-font-size-sm)',
              color: 'var(--ds-primitive-color-navy-200)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            <strong>Underwritten by:</strong><br />
            Chubb Insurance Malaysia Berhad (197001000564 / 9827-A)<br />
            Licensed Insurer under Financial Services Act 2013 and regulated by Bank Negara Malaysia (BNM).
          </p>

          <p
            style={{
              fontSize: 'var(--ds-primitive-font-size-sm)',
              color: 'var(--ds-primitive-color-navy-200)',
              lineHeight: 1.6,
              marginTop: '10px',
            }}
          >
            <strong>Distributed by:</strong><br />
            JA Assure Sdn Bhd (201701007421 / 1221586-P)
          </p>
        </div>

        {/* Legal & Regulatory Resources */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: 'var(--ds-primitive-font-size-base)',
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '12px',
            }}
          >
            Compliance & Disclosures
          </h4>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: 'var(--ds-primitive-font-size-sm)',
            }}
          >
            <li>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('open-document-center', { detail: { tab: 'privacy' } })
                  );
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: 'var(--ds-primitive-color-navy-100)',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>PDPA 2010 Privacy Notice</span>
                <ExternalLink size={12} color="var(--ds-primitive-color-teal-300)" />
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('open-document-center', { detail: { tab: 'pds' } })
                  );
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: 'var(--ds-primitive-color-navy-100)',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                }}
              >
                Product Disclosure Sheet (PDS)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('open-document-center', { detail: { tab: 'notices' } })
                  );
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: 'var(--ds-primitive-color-navy-100)',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                }}
              >
                Policy Wordings & Terms of Use
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('open-document-center', { detail: { tab: 'support' } })
                  );
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: 'var(--ds-primitive-color-navy-100)',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                }}
              >
                Ombudsman for Financial Services (OFS)
              </button>
            </li>
          </ul>
        </div>

        {/* Support & Assistance Column */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: 'var(--ds-primitive-font-size-base)',
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '12px',
            }}
          >
            Customer Care & Helpline
          </h4>

          <p
            style={{
              fontSize: 'var(--ds-primitive-font-size-sm)',
              color: 'var(--ds-primitive-color-navy-200)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            <strong>Helpdesk:</strong> +60 3 2712 3456<br />
            <strong>Toll Free:</strong> 1-800-88-CHUBB (24822)<br />
            <strong>Email:</strong> support@doctorshield.com<br />
            Operating Hours: Monday – Friday, 9:00 AM – 6:00 PM MYT (Excl. Public Holidays)
          </p>
        </div>
      </div>

      {/* Bottom Legal Disclaimer Band */}
      <div
        style={{
          borderTop: '1px solid var(--ds-primitive-color-navy-800)',
          backgroundColor: 'rgba(10, 18, 48, 0.5)',
          padding: '18px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '12px',
            color: 'var(--ds-primitive-color-navy-300)',
          }}
        >
          <div>
            © 2026 DoctorShield Malaysia. Distributed by JA Assure Sdn Bhd. All rights reserved.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
            <span>Regulated by Bank Negara Malaysia</span>
            <span>·</span>
            <span>Malaysian Medical Council (MMC) Aligned</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
