import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Calendar,
  Mail,
  Tag,
  CheckCircle2,
  Info,
  ArrowRight,
  Clock,
  Sparkles,
  Check,
  ChevronDown,
  Building2,
  PhoneCall,
  SlidersHorizontal,
} from 'lucide-react';

export const ArtDirectionShowcase: React.FC = () => {
  const [direction, setDirection] = useState<'A' | 'B'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/direction-b') return 'B';
      if (window.location.pathname === '/direction-a') return 'A';
    }
    return 'A';
  });

  const [selectedLimit, setSelectedLimit] = useState<string>('1m');
  const [classification, setClassification] = useState<string>('General Practitioner (Private Practice / Clinic)');
  const [promoCode, setPromoCode] = useState<string>('MMA2026');
  const [promoApplied, setPromoApplied] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>('2026-03-01');
  const [email, setEmail] = useState<string>('dr.siti@klinikaminah.com');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: direction === 'A' ? '#FAFCFD' : '#F1F5F9', fontFamily: "'Inter', sans-serif" }}>
      {/* Visual Direction Switcher Toolbar (Top Bar for Reviewers) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#132766',
          color: '#FFFFFF',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #08A5B5',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 500, fontSize: '15px', color: '#08A5B5', letterSpacing: '0.02em' }}>
            DOCTORSHIELD ART DIRECTION EXPLORATION
          </span>
          <span style={{ fontSize: '12px', color: '#CBD5E1', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
            Phase 03 Studio
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={() => setDirection('A')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: direction === 'A' ? '1.5px solid #08A5B5' : '1px solid rgba(255,255,255,0.2)',
              backgroundColor: direction === 'A' ? '#08A5B5' : 'transparent',
              color: '#FFFFFF',
              transition: 'all 0.15s ease',
            }}
          >
            Direction A: Editorial Premium
          </button>
          <button
            type="button"
            onClick={() => setDirection('B')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: direction === 'B' ? '1.5px solid #08A5B5' : '1px solid rgba(255,255,255,0.2)',
              backgroundColor: direction === 'B' ? '#08A5B5' : 'transparent',
              color: '#FFFFFF',
              transition: 'all 0.15s ease',
            }}
          >
            Direction B: Structured Premium
          </button>
        </div>
      </div>

      {/* Render the Active Visual Direction */}
      {direction === 'A' ? (
        <DirectionAEditorial
          selectedLimit={selectedLimit}
          setSelectedLimit={setSelectedLimit}
          classification={classification}
          setClassification={setClassification}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          promoApplied={promoApplied}
          startDate={startDate}
          setStartDate={setStartDate}
          email={email}
          setEmail={setEmail}
        />
      ) : (
        <DirectionBStructured
          selectedLimit={selectedLimit}
          setSelectedLimit={setSelectedLimit}
          classification={classification}
          setClassification={setClassification}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          promoApplied={promoApplied}
          startDate={startDate}
          setStartDate={setStartDate}
          email={email}
          setEmail={setEmail}
        />
      )}
    </div>
  );
};

/* =========================================================================
 * DIRECTION A: EDITORIAL PREMIUM
 * Inspired by Ditto Insurance + Swiss Editorial Precision
 * Clean single-surface foundation, minimal visual chrome, generous whitespace,
 * subtle hairlines, high-contrast typography, restrained teal highlights.
 * ========================================================================= */
const DirectionAEditorial: React.FC<any> = ({
  selectedLimit,
  setSelectedLimit,
  classification,
  setClassification,
  promoCode,
  setPromoCode,
  promoApplied,
  startDate,
  setStartDate,
  email,
  setEmail,
}) => {
  return (
    <div style={{ backgroundColor: '#FAFCFD', minHeight: 'calc(100vh - 52px)' }}>
      {/* Direction A Header: Minimalist, Refined, Light Aesthetic */}
      <header
        style={{
          height: '56px',
          borderBottom: '1px solid #E5ECEF',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                backgroundColor: '#08A5B5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Shield size={18} strokeWidth={2.2} />
            </div>
            <span style={{ fontFamily: "'Kanit', sans-serif", fontSize: '18px', fontWeight: 500, color: '#132766', letterSpacing: '-0.01em' }}>
              DoctorShield
            </span>
          </div>

          <span style={{ height: '14px', width: '1px', backgroundColor: '#CBD5E1' }} />

          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 400 }}>
            Underwritten by <strong>Chubb Insurance</strong>
          </span>
        </div>

        {/* Minimal Editorial Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <span style={{ fontWeight: 500, color: '#066F7B', borderBottom: '2px solid #08A5B5', paddingBottom: '2px' }}>
              01 Coverage
            </span>
            <span style={{ color: '#94A3B8' }}>/</span>
            <span style={{ color: '#94A3B8' }}>02 Quote</span>
            <span style={{ color: '#94A3B8' }}>/</span>
            <span style={{ color: '#94A3B8' }}>03 Particulars</span>
            <span style={{ color: '#94A3B8' }}>/</span>
            <span style={{ color: '#94A3B8' }}>04 Checkout</span>
          </div>

          <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <PhoneCall size={13} color="#066F7B" />
            <span>03-2772 0922</span>
          </div>
        </div>
      </header>

      {/* Main Container: Focused Editorial Column with Subtle Right Summary */}
      <main style={{ maxWidth: '1160px', margin: '0 auto', padding: '48px 24px 80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '64px', alignItems: 'start' }}>
          
          {/* Left Form: Open, Breathable, Typographic Form */}
          <div>
            {/* Stage Title & Editorial Introduction */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#066F7B', fontWeight: 500, marginBottom: '8px' }}>
                Individual Medical Indemnity
              </div>
              <h1 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '2.25rem', fontWeight: 500, color: '#132766', margin: '0 0 12px 0', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Configure your professional indemnity coverage
              </h1>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: 0, maxWidth: '620px' }}>
                Compliant with Malaysian Medical Council (MMC) registration guidelines. Select your practice category and liability limit to receive an instant actuarial quote.
              </p>
            </div>

            {/* Field Section 1: Medical Classification */}
            <section style={{ marginBottom: '36px', paddingBottom: '36px', borderBottom: '1px solid #E5ECEF' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#1E293B', marginBottom: '8px' }}>
                Practitioner Classification <span style={{ color: '#08A5B5' }}>*</span>
              </label>
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #DFE6EC',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Building2 size={18} color="#066F7B" />
                  <span style={{ fontSize: '15px', color: '#1E293B', fontWeight: 500 }}>
                    {classification}
                  </span>
                </div>
                <ChevronDown size={18} color="#64748B" />
              </div>
              <div style={{ fontSize: '13px', color: '#64748B', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info size={14} color="#08A5B5" />
                <span>Standard Category 7 (Physicians & Non-Surgical GPs). Includes complimentary locum protection.</span>
              </div>
            </section>

            {/* Field Section 2: Liability Limit Selector (Editorial Minimalist Grid) */}
            <section style={{ marginBottom: '36px', paddingBottom: '36px', borderBottom: '1px solid #E5ECEF' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#1E293B' }}>
                  Limit of Liability (Any One Claim & In The Aggregate) <span style={{ color: '#08A5B5' }}>*</span>
                </label>
                <span style={{ fontSize: '12px', color: '#066F7B', fontWeight: 500 }}>
                  MMC Minimum: RM 1,000,000
                </span>
              </div>

              {/* 4-Tile Minimal Pill Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {[
                  { id: '500k', label: 'RM 500,000', rate: 'RM 400/yr', popular: false },
                  { id: '1m', label: 'RM 1,000,000', rate: 'RM 650/yr', popular: true },
                  { id: '2m', label: 'RM 2,000,000', rate: 'RM 1,100/yr', popular: false },
                  { id: '5m', label: 'RM 5,000,000', rate: 'RM 2,350/yr', popular: false },
                ].map((tier) => {
                  const isSelected = selectedLimit === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedLimit(tier.id)}
                      style={{
                        padding: '16px 14px',
                        borderRadius: '8px',
                        backgroundColor: isSelected ? '#F0FAFA' : '#FFFFFF',
                        border: isSelected ? '1.5px solid #08A5B5' : '1px solid #DFE6EC',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        position: 'relative',
                      }}
                    >
                      {tier.popular && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-9px',
                            right: '12px',
                            backgroundColor: '#066F7B',
                            color: '#FFFFFF',
                            fontSize: '10px',
                            fontWeight: 500,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            letterSpacing: '0.02em',
                          }}
                        >
                          POPULAR
                        </div>
                      )}
                      <div style={{ fontFamily: "'Kanit', sans-serif", fontSize: '16px', fontWeight: 500, color: isSelected ? '#066F7B' : '#1E293B', marginBottom: '4px' }}>
                        {tier.label}
                      </div>
                      <div style={{ fontSize: '12px', color: isSelected ? '#04464D' : '#64748B' }}>
                        Base: {tier.rate}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Field Section 3: Period Dates & Partner Promo */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '36px', paddingBottom: '36px', borderBottom: '1px solid #E5ECEF' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#1E293B', marginBottom: '8px' }}>
                  Coverage Inception Date <span style={{ color: '#08A5B5' }}>*</span>
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DFE6EC',
                    borderRadius: '8px',
                    padding: '12px 14px',
                  }}
                >
                  <Calendar size={18} color="#066F7B" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#1E293B', width: '100%', fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                  Coverage concludes 31 Dec 2026 (MMC APC Alignment)
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#1E293B', marginBottom: '8px' }}>
                  Professional Association Promo Code
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DFE6EC',
                    borderRadius: '8px',
                    padding: '12px 14px',
                  }}
                >
                  <Tag size={18} color="#08A5B5" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#1E293B', width: '100%', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase' }}
                  />
                  {promoApplied && (
                    <span style={{ fontSize: '11px', color: '#065F46', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '4px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      10% Applied
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#066F7B', marginTop: '6px' }}>
                  Malaysian Medical Association (MMA) Member Benefit
                </div>
              </div>
            </div>

            {/* Field Section 4: Email & PIDM Notice */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#1E293B', marginBottom: '8px' }}>
                Practitioner Email Address <span style={{ color: '#08A5B5' }}>*</span>
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DFE6EC',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  maxWidth: '440px',
                }}
              >
                <Mail size={18} color="#64748B" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#1E293B', width: '100%', fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                Your formal quotation and Chubb schedule will be transmitted to this address.
              </div>
            </div>

            {/* PIDM Statutory Declaration (Editorial Subtle Callout) */}
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                fontSize: '12px',
                color: '#475569',
                lineHeight: 1.5,
              }}
            >
              <ShieldCheck size={18} color="#066F7B" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>PIDM Protection:</strong> The benefit(s) payable under eligible certificate/policy is(are) protected by PIDM up to limits. Please refer to PIDM's TIPS Brochure or visit www.pidm.gov.my.
              </div>
            </div>
          </div>

          {/* Right Floating Summary Rail (Editorial Restrained Precision) */}
          <aside style={{ position: 'sticky', top: '88px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #DFE6EC',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(19, 39, 102, 0.03)',
              }}
            >
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748B', fontWeight: 500, marginBottom: '4px' }}>
                Indicative Summary
              </div>
              <h2 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1.25rem', fontWeight: 500, color: '#132766', margin: '0 0 16px 0' }}>
                Your Quotation
              </h2>

              {/* Coverage Attributes */}
              <div style={{ fontSize: '13px', color: '#475569', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Indemnity Limit:</span>
                  <strong style={{ color: '#1E293B' }}>RM 1,000,000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Period (306 days):</span>
                  <span>01 Mar – 31 Dec 2026</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Partner Discount:</span>
                  <span style={{ color: '#065F46', fontWeight: 500 }}>-10% (MMA)</span>
                </div>
              </div>

              {/* Financial Calculation Table */}
              <div style={{ padding: '16px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#64748B' }}>
                  <span>Gross Annual Equivalent</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 650.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#64748B' }}>
                  <span>Pro-Rata Net Base</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 490.41</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#64748B' }}>
                  <span>SST (8.0%)</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 39.23</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                  <span>Stamp Duty</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 10.00</span>
                </div>
              </div>

              {/* Total Payable */}
              <div style={{ paddingTop: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#1E293B' }}>Total Payable</span>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748B', marginRight: '4px' }}>MYR</span>
                    <strong style={{ fontFamily: "'Kanit', sans-serif", fontSize: '24px', fontWeight: 500, color: '#132766' }}>
                      539.64
                    </strong>
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'right', marginTop: '2px' }}>
                  Guaranteed rate for 15 minutes
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  backgroundColor: '#08A5B5',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(8, 165, 181, 0.25)',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <span>Continue to Quote Review</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '12px', color: '#066F7B', cursor: 'pointer', fontWeight: 500 }}>
                  Email this quotation to me
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

/* =========================================================================
 * DIRECTION B: STRUCTURED PREMIUM
 * Inspired by QIC Online + Enterprise Structural Precision
 * Stronger surface hierarchy, elevated crisp white cards on slate canvas,
 * disciplined 65/35 dual-column grid, prominent status badges, structured fields.
 * ========================================================================= */
const DirectionBStructured: React.FC<any> = ({
  selectedLimit,
  setSelectedLimit,
  classification,
  setClassification,
  promoCode,
  setPromoCode,
  promoApplied,
  startDate,
  setStartDate,
  email,
  setEmail,
}) => {
  return (
    <div style={{ backgroundColor: '#F4F7F9', minHeight: 'calc(100vh - 52px)' }}>
      {/* Direction B Header: Institutional Deep Navy Header */}
      <header
        style={{
          height: '60px',
          backgroundColor: '#132766',
          borderBottom: '2px solid rgba(8, 165, 181, 0.4)',
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
                backgroundColor: '#08A5B5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Shield size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div style={{ fontFamily: "'Kanit', sans-serif", fontSize: '18px', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
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

        {/* Structured Step Progress Rail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: '#08A5B5',
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                2
              </span>
              <span style={{ fontSize: '13px', color: '#CBD5E1' }}>Quote</span>
            </div>

            <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                3
              </span>
              <span style={{ fontSize: '13px', color: '#CBD5E1' }}>Particulars</span>
            </div>

            <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                4
              </span>
              <span style={{ fontSize: '13px', color: '#CBD5E1' }}>Payment</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container: 65/35 Disciplined Grid */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px 80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Main Form: Elevated Structured Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header Banner Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #DFE6EC',
                padding: '28px 32px',
                boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ backgroundColor: '#D6F3F5', color: '#066F7B', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  STEP 1 OF 4
                </span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>Chubb Policy Form CI-MPI-2026</span>
              </div>
              <h1 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '2rem', fontWeight: 500, color: '#132766', margin: '0 0 10px 0' }}>
                Coverage Configuration & Rating Parameters
              </h1>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                Please specify your clinical practice category, indemnity limit, and policy dates to generate an official insurance quote underwritten by Chubb Insurance Malaysia Berhad.
              </p>
            </div>

            {/* Card 1: Medical Classification & Scope */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #DFE6EC',
                padding: '24px 32px',
                boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '3px solid #08A5B5', paddingLeft: '10px', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1.125rem', fontWeight: 500, color: '#132766', margin: 0 }}>
                  1. Practitioner Classification
                </h2>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#334155', marginBottom: '6px' }}>
                  Select Specialization / Practice Profile <span style={{ color: '#08A5B5' }}>*</span>
                </label>
                <div
                  style={{
                    position: 'relative',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    padding: '11px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Building2 size={16} color="#08A5B5" />
                    <span style={{ fontSize: '14px', color: '#1E293B' }}>{classification}</span>
                  </div>
                  <ChevronDown size={16} color="#64748B" />
                </div>
              </div>

              {/* Specialization Risk Breakdown Badge */}
              <div
                style={{
                  backgroundColor: '#F8FAFB',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                  <Info size={15} color="#066F7B" />
                  <span>Approved Rating Category 7: 100% General Practice (Non-Surgical)</span>
                </div>
                <span style={{ color: '#066F7B', fontWeight: 500, cursor: 'pointer' }}>
                  Modify Sub-specialties
                </span>
              </div>
            </div>

            {/* Card 2: Limit of Liability Selection (Disciplined Structured Tiles) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #DFE6EC',
                padding: '24px 32px',
                boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '3px solid #08A5B5', paddingLeft: '10px', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1.125rem', fontWeight: 500, color: '#132766', margin: 0 }}>
                  2. Limit of Liability Selection
                </h2>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  Aggregate Limit = Claim Limit
                </span>
              </div>

              {/* 4-Tile Structured Selection Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
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
                      style={{
                        padding: '16px 12px',
                        borderRadius: '6px',
                        backgroundColor: isSelected ? '#F0FAFA' : '#FFFFFF',
                        border: isSelected ? '2px solid #08A5B5' : '1px solid #CBD5E1',
                        cursor: 'pointer',
                        textAlign: 'center',
                        position: 'relative',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {tier.rec && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-9px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: '#08A5B5',
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
                      <div style={{ fontFamily: "'Kanit', sans-serif", fontSize: '15px', fontWeight: 500, color: isSelected ? '#066F7B' : '#1E293B', marginBottom: '4px' }}>
                        {tier.amount}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        {tier.annual} / year
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#08A5B5" />
                <span>Selected limit satisfies statutory MMC Section 42 requirements for private practitioners.</span>
              </div>
            </div>

            {/* Card 3: Policy Dates & Partner Codes */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #DFE6EC',
                padding: '24px 32px',
                boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '3px solid #08A5B5', paddingLeft: '10px', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1.125rem', fontWeight: 500, color: '#132766', margin: 0 }}>
                  3. Inception Period & Affinity Discount
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#334155', marginBottom: '6px' }}>
                    Inception Date <span style={{ color: '#08A5B5' }}>*</span>
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      padding: '10px 12px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <Calendar size={16} color="#64748B" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#1E293B', width: '100%', fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748B', marginTop: '4px', display: 'block' }}>
                    Standard Period ends 31 Dec 2026
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#334155', marginBottom: '6px' }}>
                    Promo / Affinity Code
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      padding: '10px 12px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <Tag size={16} color="#08A5B5" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#1E293B', width: '100%', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase' }}
                    />
                    <span style={{ fontSize: '11px', color: '#065F46', backgroundColor: '#ECFDF5', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      -10%
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#066F7B', marginTop: '4px', display: 'block' }}>
                    Verified MMA Privilege
                  </span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#334155', marginBottom: '6px' }}>
                  Practitioner Primary Email <span style={{ color: '#08A5B5' }}>*</span>
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    backgroundColor: '#FFFFFF',
                    maxWidth: '460px',
                  }}
                >
                  <Mail size={16} color="#64748B" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#1E293B', width: '100%', fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
              </div>
            </div>

            {/* PIDM Callout Box */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #DFE6EC',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '12px',
                color: '#475569',
              }}
            >
              <ShieldCheck size={20} color="#08A5B5" style={{ flexShrink: 0 }} />
              <div>
                <strong>PIDM Protection:</strong> Eligible insurance benefits are protected by PIDM up to statutory limits. Co-underwritten by Chubb Insurance Malaysia Berhad.
              </div>
            </div>
          </div>

          {/* Right Main Rail: Structured Financial Summary Sidebar */}
          <aside style={{ position: 'sticky', top: '92px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #DFE6EC',
                padding: '24px',
                boxShadow: '0 2px 10px rgba(19, 39, 102, 0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ fontFamily: "'Kanit', sans-serif", fontSize: '16px', fontWeight: 500, color: '#132766' }}>
                  Rating Breakdown
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: '#B45309',
                    backgroundColor: '#FFFBEB',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontWeight: 500,
                  }}
                >
                  <Clock size={12} />
                  <span>14:58 Lock</span>
                </span>
              </div>

              {/* Scope Parameters */}
              <div style={{ fontSize: '12px', color: '#475569', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Indemnity Tier:</span>
                  <strong style={{ color: '#1E293B' }}>RM 1,000,000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Covered Days:</span>
                  <span>306 days (Pro-rata)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Affinity Discount:</span>
                  <span style={{ color: '#047857', fontWeight: 600 }}>10% MMA Promo</span>
                </div>
              </div>

              {/* Itemized Calculation */}
              <div style={{ padding: '14px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#64748B' }}>
                  <span>Gross Annual Base</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 650.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#64748B' }}>
                  <span>Pro-Rata Net Base</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 490.41</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#64748B' }}>
                  <span>SST (8.0%)</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 39.23</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                  <span>Stamp Duty</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 10.00</span>
                </div>
              </div>

              {/* Grand Total */}
              <div style={{ padding: '16px 0 20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Total Payable
                  </span>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748B', marginRight: '4px' }}>MYR</span>
                    <strong style={{ fontFamily: "'Kanit', sans-serif", fontSize: '24px', fontWeight: 500, color: '#132766' }}>
                      539.64
                    </strong>
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'right', marginTop: '2px' }}>
                  All statutory taxes and duties included
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  backgroundColor: '#08A5B5',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(8, 165, 181, 0.3)',
                }}
              >
                <span>Continue to Step 2</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '12px', color: '#066F7B', cursor: 'pointer', fontWeight: 500 }}>
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

