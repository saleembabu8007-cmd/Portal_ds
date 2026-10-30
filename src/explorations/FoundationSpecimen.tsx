import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Calendar,
  Mail,
  Tag,
  CheckCircle2,
  AlertCircle,
  Info,
  ArrowRight,
  Clock,
  ChevronDown,
  Building2,
  Check,
} from 'lucide-react';
import { primitiveColors, semanticColors, typography, layout, radii, controls } from '../design-system/tokens';

export const FoundationSpecimen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specimen' | 'stage1'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/stage1-foundation') return 'stage1';
    }
    return 'specimen';
  });

  const [selectedLimit, setSelectedLimit] = useState<string>('1m');
  const [promoCode, setPromoCode] = useState<string>('MMA2026');
  const [classification, setClassification] = useState<string>('General Practitioner (Private Practice / Clinic)');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--ds-color-surface-canvas)', fontFamily: "var(--ds-primitive-font-body)" }}>
      {/* Top View Switcher Toolbar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'var(--ds-primitive-color-navy-900)',
          color: '#FFFFFF',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid var(--ds-primitive-color-teal-500)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: "var(--ds-primitive-font-heading)", fontWeight: 500, fontSize: '15px', color: 'var(--ds-primitive-color-teal-500)' }}>
            DOCTORSHIELD VISUAL FOUNDATIONS SPECIMEN
          </span>
          <span style={{ fontSize: '12px', color: '#CBD5E1', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
            Phase 04 System Authority
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('specimen')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: activeTab === 'specimen' ? '1.5px solid #08A5B5' : '1px solid rgba(255,255,255,0.2)',
              backgroundColor: activeTab === 'specimen' ? '#08A5B5' : 'transparent',
              color: '#FFFFFF',
            }}
          >
            Design Tokens & Component Specimen
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stage1')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: activeTab === 'stage1' ? '1.5px solid #08A5B5' : '1px solid rgba(255,255,255,0.2)',
              backgroundColor: activeTab === 'stage1' ? '#08A5B5' : 'transparent',
              color: '#FFFFFF',
            }}
          >
            Stage 1 Bounded Adoption Proof
          </button>
        </div>
      </div>

      {activeTab === 'specimen' ? (
        <SpecimenGallery />
      ) : (
        <Stage1AdoptionProof
          selectedLimit={selectedLimit}
          setSelectedLimit={setSelectedLimit}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          classification={classification}
          setClassification={setClassification}
        />
      )}
    </div>
  );
};

/* =========================================================================
 * 1. DESIGN TOKENS & COMPONENT SPECIMEN GALLERY
 * ========================================================================= */
const SpecimenGallery: React.FC = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="ds-heading-display">Foundational Design System Specimen</h1>
        <p className="ds-body">
          Complete, coherent token architecture governing color contrast, typographic scale, 4px spacing, control geometry, and tactile states.
        </p>
      </div>

      {/* Part 1: Color Engineering & Contrast Matrix */}
      <section className="ds-card" style={{ marginBottom: '32px' }}>
        <div className="ds-section-bar">
          <h2 className="ds-heading-section">1. Color Engineering & WCAG 2.2 AA Contrast Compliance</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { name: 'Primary Teal', hex: '#08A5B5', role: 'Functional Accent / CTAs', contrast: '2.82:1 (Graphics / UI)', bg: '#08A5B5', text: '#FFFFFF' },
            { name: 'Interactive Teal', hex: '#066F7B', role: 'Interactive Text & Links', contrast: '5.89:1 (Passes AA)', bg: '#066F7B', text: '#FFFFFF' },
            { name: 'High-Contrast Teal', hex: '#055C66', role: 'Small Text Links', contrast: '7.69:1 (Passes AAA)', bg: '#055C66', text: '#FFFFFF' },
            { name: 'Secondary Navy', hex: '#132766', role: 'Headers & Display Titles', contrast: '13.91:1 (Passes AAA)', bg: '#132766', text: '#FFFFFF' },
            { name: 'Primary Dark Text', hex: '#17253B', role: 'Primary Body Text', contrast: '13.25:1 (Passes AAA)', bg: '#17253B', text: '#FFFFFF' },
            { name: 'Form Labels Text', hex: '#334155', role: 'Input Field Labels', contrast: '7.88:1 (Passes AAA)', bg: '#334155', text: '#FFFFFF' },
            { name: 'Secondary Body Text', hex: '#475569', role: 'Explanatory Descriptions', contrast: '5.64:1 (Passes AA)', bg: '#475569', text: '#FFFFFF' },
            { name: 'Muted Helper Text', hex: '#64748B', role: 'Input Helper & Dates', contrast: '4.62:1 (Passes AA)', bg: '#64748B', text: '#FFFFFF' },
          ].map((swatch) => (
            <div key={swatch.name} style={{ borderRadius: '6px', border: '1px solid var(--ds-color-border-subtle)', overflow: 'hidden' }}>
              <div style={{ backgroundColor: swatch.bg, color: swatch.text, padding: '16px 14px' }}>
                <div style={{ fontWeight: 500, fontSize: '14px' }}>{swatch.name}</div>
                <div style={{ fontSize: '12px', opacity: 0.9, fontFamily: "var(--ds-primitive-font-mono)" }}>{swatch.hex}</div>
              </div>
              <div style={{ padding: '10px 14px', backgroundColor: '#FFFFFF', fontSize: '11px', color: '#475569' }}>
                <div><strong>Role:</strong> {swatch.role}</div>
                <div style={{ color: '#065F46', fontWeight: 500, marginTop: '2px' }}>✓ {swatch.contrast}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Semantic Feedback Banners */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <div style={{ padding: '12px 14px', borderRadius: '6px', backgroundColor: 'var(--ds-color-feedback-success-bg)', border: '1px solid var(--ds-color-feedback-success-border)', color: 'var(--ds-color-text-success)', fontSize: '12px' }}>
            <strong>Success:</strong> Policy bound & certificate active.
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '6px', backgroundColor: 'var(--ds-color-feedback-warning-bg)', border: '1px solid var(--ds-color-feedback-warning-border)', color: 'var(--ds-color-text-warning)', fontSize: '12px' }}>
            <strong>Warning:</strong> Rate lock expires in 03:42.
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '6px', backgroundColor: 'var(--ds-color-feedback-error-bg)', border: '1px solid var(--ds-color-feedback-error-border)', color: 'var(--ds-color-text-error)', fontSize: '12px' }}>
            <strong>Error:</strong> Please enter a valid NRIC number.
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '6px', backgroundColor: 'var(--ds-color-feedback-info-bg)', border: '1px solid var(--ds-color-feedback-info-border)', color: 'var(--ds-color-text-info)', fontSize: '12px' }}>
            <strong>Info:</strong> Governed by MMC Section 42.
          </div>
        </div>
      </section>

      {/* Part 2: Typographic Hierarchy & Scale */}
      <section className="ds-card" style={{ marginBottom: '32px' }}>
        <div className="ds-section-bar">
          <h2 className="ds-heading-section">2. Typography Hierarchy (Strict Kanit & Inter &lt;= 500)</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--ds-color-border-subtle)' }}>
            <div style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
              Page Display Title — Kanit 500, 32px / 2.0rem, Line-height: 1.2
            </div>
            <div className="ds-heading-display" style={{ margin: 0 }}>
              Individual Medical Professional Indemnity
            </div>
          </div>

          <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--ds-color-border-subtle)' }}>
            <div style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
              Section Heading with 3px Accent Bar — Kanit 500, 18px / 1.125rem
            </div>
            <div className="ds-section-bar" style={{ margin: 0 }}>
              <h3 className="ds-heading-section">1. Practitioner Classification & Scope of Practice</h3>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--ds-color-border-subtle)' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Field Label — Inter 500, 13px / 0.8125rem
              </div>
              <label className="ds-label">
                Practitioner Classification <span className="ds-label-required">*</span>
              </label>
              <div className="ds-meta">
                Helper / APC Alignment Text — Inter 400, 12px / 0.75rem (4.62:1)
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Hero Financial Price — Kanit 500, 24px / 1.5rem (Tabular Figures)
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)' }}>MYR</span>
                <span className="ds-price-hero">539.64</span>
                <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)' }}>/ period</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part 3 & 4: Control Geometry & Interactive States */}
      <section className="ds-card">
        <div className="ds-section-bar">
          <h2 className="ds-heading-section">3. Control Geometry (46px Standard) & Micro-States</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '28px' }}>
          {/* Inputs Column */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ds-color-text-heading)', marginBottom: '12px' }}>
              Text Inputs (46px Height, 6px Radius)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="ds-label">Default State</label>
                <input className="ds-input" defaultValue="Dr. Siti Aminah binti Razali" readOnly />
              </div>
              <div>
                <label className="ds-label">Focused State (Active Ring)</label>
                <input
                  className="ds-input"
                  style={{ borderColor: 'var(--ds-color-focus-border)', boxShadow: '0 0 0 3px var(--ds-color-focus-ring)' }}
                  defaultValue="dr.siti@klinikaminah.com"
                  readOnly
                />
              </div>
              <div>
                <label className="ds-label">Error State</label>
                <input className="ds-input ds-input-error" defaultValue="invalid-email@" readOnly />
                <div className="ds-helper ds-helper-error">Please enter a valid practitioner email.</div>
              </div>
            </div>
          </div>

          {/* Buttons Column */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ds-color-text-heading)', marginBottom: '12px' }}>
              Button System (46px Primary, 38px Compact)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button type="button" className="ds-btn ds-btn-primary" style={{ width: '100%' }}>
                <span>Primary Action (Teal 500)</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="ds-btn"
                style={{ width: '100%', backgroundColor: 'var(--ds-primitive-color-navy-900)', color: '#FFFFFF' }}
              >
                <span>Institutional Action (Navy 900)</span>
              </button>
              <button type="button" className="ds-btn ds-btn-secondary" style={{ width: '100%' }}>
                <span>Secondary Outlined Action</span>
              </button>
              <button type="button" className="ds-btn ds-btn-compact ds-btn-secondary" style={{ width: '100%' }}>
                <span>Compact 38px Action</span>
              </button>
            </div>
          </div>

          {/* Selection Tiles Column */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ds-color-text-heading)', marginBottom: '12px' }}>
              Selection Tiles (Default vs Selected 2px)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Unselected Tile */}
              <div className="ds-tile">
                <div className="ds-tile-title">RM 500,000</div>
                <div className="ds-tile-sub">RM 400.00 / year</div>
              </div>

              {/* Selected Tile */}
              <div className="ds-tile ds-tile-selected">
                <div
                  style={{
                    position: 'absolute',
                    top: '-9px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--ds-primitive-color-teal-500)',
                    color: '#FFFFFF',
                    fontSize: '9px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '10px',
                  }}
                >
                  RECOMMENDED
                </div>
                <div className="ds-tile-title" style={{ color: 'var(--ds-primitive-color-teal-700)' }}>
                  RM 1,000,000
                </div>
                <div className="ds-tile-sub">RM 650.00 / year</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* =========================================================================
 * 2. BOUNDED REAL STAGE 1 ADOPTION PROOF
 * ========================================================================= */
const Stage1AdoptionProof: React.FC<any> = ({
  selectedLimit,
  setSelectedLimit,
  promoCode,
  setPromoCode,
  classification,
  setClassification,
}) => {
  return (
    <div>
      {/* Direction B 56px Institutional Header */}
      <header
        style={{
          height: 'var(--ds-layout-header-height)',
          backgroundColor: 'var(--ds-primitive-color-navy-900)',
          borderBottom: '2px solid rgba(8, 165, 181, 0.40)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          color: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: 'var(--ds-primitive-color-teal-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Shield size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--ds-primitive-font-heading)", fontSize: '18px', fontWeight: 500, lineHeight: 1.1 }}>
                DoctorShield
              </div>
              <div style={{ fontSize: '10px', color: '#97ADD3', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Medical Indemnity
              </div>
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255,255,255,0.15)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: '#97ADD3' }}>Co-branded with</span>
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: '4px' }}>
              CHUBB
            </span>
          </div>
        </div>

        {/* 4-Step Progress Rail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: 'var(--ds-primitive-color-teal-500)',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              1
            </span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#FFFFFF' }}>Coverage</span>
          </div>
          <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <span style={{ fontSize: '13px', color: '#97ADD3' }}>2. Quote</span>
          <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <span style={{ fontSize: '13px', color: '#97ADD3' }}>3. Particulars</span>
          <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <span style={{ fontSize: '13px', color: '#97ADD3' }}>4. Checkout</span>
        </div>
      </header>

      {/* Main 1200px Max-Width Layout (65/35 Split) */}
      <main style={{ maxWidth: 'var(--ds-layout-app-max-width)', margin: '0 auto', padding: '36px 24px 80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) var(--ds-layout-summary-width)', gap: 'var(--ds-layout-column-gutter)', alignItems: 'start' }}>
          
          {/* Left Column: Form Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header Stage Card */}
            <div className="ds-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ backgroundColor: 'var(--ds-primitive-color-teal-100)', color: 'var(--ds-primitive-color-teal-700)', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  STEP 1 OF 4
                </span>
                <span className="ds-meta">Chubb Policy Form CI-MPI-2026</span>
              </div>
              <h1 className="ds-heading-display">Coverage Configuration & Rating Parameters</h1>
              <p className="ds-body" style={{ margin: 0 }}>
                Please specify your clinical practice category, indemnity limit, and policy dates to generate an authoritative insurance quote underwritten by Chubb Insurance Malaysia Berhad.
              </p>
            </div>

            {/* Card 1: Classification */}
            <div className="ds-card">
              <div className="ds-section-bar">
                <h2 className="ds-heading-section">1. Practitioner Classification</h2>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="ds-label">
                  Select Specialization / Practice Profile <span className="ds-label-required">*</span>
                </label>
                <div
                  className="ds-input"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Building2 size={16} color="var(--ds-primitive-color-teal-500)" />
                    <span>{classification}</span>
                  </div>
                  <ChevronDown size={16} color="var(--ds-color-text-muted)" />
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--ds-color-surface-subtle)',
                  border: '1px solid var(--ds-color-border-subtle)',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ds-color-text-secondary)' }}>
                  <Info size={15} color="var(--ds-primitive-color-teal-700)" />
                  <span>Approved Rating Category 7: 100% General Practice (Non-Surgical)</span>
                </div>
                <span style={{ color: 'var(--ds-primitive-color-teal-700)', fontWeight: 500, cursor: 'pointer' }}>
                  Modify Sub-specialties
                </span>
              </div>
            </div>

            {/* Card 2: Limit of Liability */}
            <div className="ds-card">
              <div className="ds-section-bar">
                <h2 className="ds-heading-section">2. Limit of Liability Selection</h2>
                <span className="ds-meta">Aggregate Limit = Claim Limit</span>
              </div>

              <div className="ds-tile-grid" style={{ marginBottom: '16px' }}>
                {[
                  { id: '500k', amount: 'RM 500,000', annual: 'RM 400.00', rec: false },
                  { id: '1m', amount: 'RM 1,000,000', annual: 'RM 650.00', rec: true },
                  { id: '2m', amount: 'RM 2,000,000', annual: 'RM 1,100.00', rec: false },
                  { id: '5m', amount: 'RM 5,000,000', annual: 'RM 2,350.00', rec: false },
                ].map((tier) => {
                  const isSelected = selectedLimit === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedLimit(tier.id)}
                      className={`ds-tile ${isSelected ? 'ds-tile-selected' : ''}`}
                    >
                      {tier.rec && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-9px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'var(--ds-primitive-color-teal-500)',
                            color: '#FFFFFF',
                            fontSize: '9px',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '10px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          RECOMMENDED
                        </div>
                      )}
                      <div className="ds-tile-title" style={{ color: isSelected ? 'var(--ds-primitive-color-teal-700)' : 'var(--ds-color-text-primary)' }}>
                        {tier.amount}
                      </div>
                      <div className="ds-tile-sub">{tier.annual} / year</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="var(--ds-primitive-color-teal-500)" />
                <span>Selected limit satisfies statutory MMC Section 42 requirements for private practitioners.</span>
              </div>
            </div>

            {/* Card 3: Inception Period & Affinity */}
            <div className="ds-card">
              <div className="ds-section-bar">
                <h2 className="ds-heading-section">3. Inception Period & Affinity Discount</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label className="ds-label">
                    Inception Date <span className="ds-label-required">*</span>
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid var(--ds-color-border-default)',
                      borderRadius: '6px',
                      padding: '0 12px',
                      height: '46px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <Calendar size={16} color="var(--ds-color-text-muted)" />
                    <input
                      type="date"
                      defaultValue="2026-03-01"
                      style={{ border: 'none', outline: 'none', fontSize: '14px', color: 'var(--ds-color-text-primary)', width: '100%', fontFamily: "var(--ds-primitive-font-body)" }}
                    />
                  </div>
                  <span className="ds-meta" style={{ marginTop: '4px', display: 'block' }}>
                    Standard Period ends 31 Dec 2026
                  </span>
                </div>

                <div>
                  <label className="ds-label">Professional Association Promo</label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid var(--ds-color-border-default)',
                      borderRadius: '6px',
                      padding: '0 12px',
                      height: '46px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <Tag size={16} color="var(--ds-primitive-color-teal-500)" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '14px', color: 'var(--ds-color-text-primary)', width: '100%', fontFamily: "var(--ds-primitive-font-body)", textTransform: 'uppercase' }}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--ds-color-text-success)', backgroundColor: 'var(--ds-color-feedback-success-bg)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      -10%
                    </span>
                  </div>
                  <span className="ds-meta" style={{ color: 'var(--ds-primitive-color-teal-700)', marginTop: '4px', display: 'block' }}>
                    Verified MMA Privilege
                  </span>
                </div>
              </div>

              <div>
                <label className="ds-label">
                  Practitioner Primary Email <span className="ds-label-required">*</span>
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid var(--ds-color-border-default)',
                    borderRadius: '6px',
                    padding: '0 12px',
                    height: '46px',
                    backgroundColor: '#FFFFFF',
                    maxWidth: '460px',
                  }}
                >
                  <Mail size={16} color="var(--ds-color-text-muted)" />
                  <input
                    type="email"
                    defaultValue="dr.siti@klinikaminah.com"
                    style={{ border: 'none', outline: 'none', fontSize: '14px', color: 'var(--ds-color-text-primary)', width: '100%', fontFamily: "var(--ds-primitive-font-body)" }}
                  />
                </div>
              </div>
            </div>

            {/* PIDM Legal Notice Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid var(--ds-color-border-subtle)',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '12px',
                color: 'var(--ds-color-text-secondary)',
              }}
            >
              <ShieldCheck size={20} color="var(--ds-primitive-color-teal-500)" style={{ flexShrink: 0 }} />
              <div>
                <strong>PIDM Protection:</strong> Eligible insurance benefits are protected by PIDM up to statutory limits. Co-underwritten by Chubb Insurance Malaysia Berhad.
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary Rail */}
          <aside style={{ position: 'sticky', top: 'var(--ds-layout-sticky-offset)' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid var(--ds-color-border-subtle)',
                padding: '24px',
                boxShadow: 'var(--ds-primitive-shadow-rail)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--ds-color-border-subtle)' }}>
                <span style={{ fontFamily: "var(--ds-primitive-font-heading)", fontSize: '16px', fontWeight: 500, color: 'var(--ds-color-text-heading)' }}>
                  Rating Breakdown
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: 'var(--ds-color-text-warning)',
                    backgroundColor: 'var(--ds-color-feedback-warning-bg)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontWeight: 500,
                  }}
                >
                  <Clock size={12} />
                  <span>14:58 Lock</span>
                </span>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', paddingBottom: '14px', borderBottom: '1px solid var(--ds-color-surface-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Indemnity Tier:</span>
                  <strong style={{ color: 'var(--ds-color-text-primary)' }}>RM 1,000,000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Covered Days:</span>
                  <span>306 days (Pro-rata)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Affinity Discount:</span>
                  <span style={{ color: 'var(--ds-color-text-success)', fontWeight: 600 }}>10% MMA Promo</span>
                </div>
              </div>

              {/* Tabular Numerals Breakdown */}
              <div style={{ padding: '14px 0', borderBottom: '1px solid var(--ds-color-surface-subtle)', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--ds-color-text-muted)' }}>
                  <span>Gross Annual Base</span>
                  <span className="ds-tabular-num">RM 650.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--ds-color-text-muted)' }}>
                  <span>Pro-Rata Net Base</span>
                  <span className="ds-tabular-num">RM 490.41</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--ds-color-text-muted)' }}>
                  <span>SST (8.0%)</span>
                  <span className="ds-tabular-num">RM 39.23</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-muted)' }}>
                  <span>Stamp Duty</span>
                  <span className="ds-tabular-num">RM 10.00</span>
                </div>
              </div>

              {/* Grand Total */}
              <div style={{ padding: '16px 0 20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ds-color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Total Payable
                  </span>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginRight: '4px' }}>MYR</span>
                    <span className="ds-price-hero">539.64</span>
                  </div>
                </div>
                <div className="ds-meta" style={{ textAlign: 'right', marginTop: '2px' }}>
                  All statutory taxes and duties included
                </div>
              </div>

              {/* Action Button */}
              <button type="button" className="ds-btn ds-btn-primary" style={{ width: '100%' }}>
                <span>Continue to Step 2</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '12px', color: 'var(--ds-primitive-color-teal-700)', cursor: 'pointer', fontWeight: 500 }}>
                  Save & Email Quote
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

