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
  ArrowLeft,
  Clock,
  Sparkles,
  Check,
  ChevronDown,
  Building2,
  PhoneCall,
  SlidersHorizontal,
  UserCheck,
  RefreshCw,
} from 'lucide-react';

export const ArtDirectionShowcase: React.FC = () => {
  const [direction, setDirection] = useState<'A' | 'B'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/direction-b') return 'B';
      if (path === '/direction-a') return 'A';
      const params = new URLSearchParams(window.location.search);
      if (params.get('dir') === 'b') return 'B';
    }
    return 'A';
  });

  const [stage, setStage] = useState<'1' | '2'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('stage') === '2') return '2';
    }
    return '1';
  });

  const [selectedLimit, setSelectedLimit] = useState<string>('1m');
  const [classification, setClassification] = useState<string>('General Practitioner (Private Practice / Clinic)');
  const [promoCode, setPromoCode] = useState<string>('MMA2026');
  const [promoApplied, setPromoApplied] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>('2026-03-01');
  const [email, setEmail] = useState<string>('dr.siti@klinikaminah.com');

  // Stage 2 Add-ons state
  const [ownsClinic, setOwnsClinic] = useState<boolean>(false);
  const [clinicType, setClinicType] = useState<'sole_proprietor' | 'partnership'>('sole_proprietor');
  const [hiresLocums, setHiresLocums] = useState<boolean>(false);
  const [clinicCoverSelected, setClinicCoverSelected] = useState<boolean>(false);
  const [clinicLimit, setClinicLimit] = useState<string>('500k');

  const [isPic, setIsPic] = useState<boolean>(false);
  const [picCoverSelected, setPicCoverSelected] = useState<boolean>(false);

  const handleSetDirection = (d: 'A' | 'B') => {
    setDirection(d);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('dir', d.toLowerCase());
      window.history.replaceState(null, '', url.toString());
    }
  };

  const handleSetStage = (s: '1' | '2') => {
    setStage(s);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('stage', s);
      window.history.replaceState(null, '', url.toString());
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: direction === 'A' ? '#FAFCFD' : '#F4F7F9', fontFamily: "'Inter', sans-serif" }}>
      {/* Studio Toolbar (For Design Reviewers) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#132766',
          color: '#FFFFFF',
          padding: '8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #08A5B5',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 500, fontSize: '15px', color: '#08A5B5', letterSpacing: '0.02em' }}>
            DOCTORSHIELD VISUAL STUDIO
          </span>
          <span style={{ fontSize: '11px', color: '#CBD5E1', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
            Phase 04 Art Direction Reset
          </span>
        </div>

        {/* Direction & Stage Switchers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Stage Switcher */}
          <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '6px', padding: '2px' }}>
            <button
              type="button"
              onClick={() => handleSetStage('1')}
              style={{
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: stage === '1' ? '#FFFFFF' : 'transparent',
                color: stage === '1' ? '#132766' : '#CBD5E1',
                transition: 'all 0.15s ease',
              }}
            >
              Stage 1: Cover Config
            </button>
            <button
              type="button"
              onClick={() => handleSetStage('2')}
              style={{
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: stage === '2' ? '#FFFFFF' : 'transparent',
                color: stage === '2' ? '#132766' : '#CBD5E1',
                transition: 'all 0.15s ease',
              }}
            >
              Stage 2: Quotation & Add-ons
            </button>
          </div>

          <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

          {/* Direction Switcher */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleSetDirection('A')}
              style={{
                padding: '5px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                border: direction === 'A' ? '1.5px solid #08A5B5' : '1px solid rgba(255,255,255,0.2)',
                backgroundColor: direction === 'A' ? '#08A5B5' : 'transparent',
                color: '#FFFFFF',
                transition: 'all 0.15s ease',
              }}
            >
              Direction A: Editorial
            </button>
            <button
              type="button"
              onClick={() => handleSetDirection('B')}
              style={{
                padding: '5px 14px',
                borderRadius: '6px',
                fontSize: '12px',
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
      </div>

      {/* Screen Presentation */}
      {direction === 'A' ? (
        stage === '1' ? (
          <DirectionAStage1
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
            onProceed={() => handleSetStage('2')}
          />
        ) : (
          <DirectionAStage2
            selectedLimit={selectedLimit}
            classification={classification}
            startDate={startDate}
            promoCode={promoCode}
            ownsClinic={ownsClinic}
            setOwnsClinic={setOwnsClinic}
            clinicType={clinicType}
            setClinicType={setClinicType}
            hiresLocums={hiresLocums}
            setHiresLocums={setHiresLocums}
            clinicCoverSelected={clinicCoverSelected}
            setClinicCoverSelected={setClinicCoverSelected}
            clinicLimit={clinicLimit}
            setClinicLimit={setClinicLimit}
            isPic={isPic}
            setIsPic={setIsPic}
            picCoverSelected={picCoverSelected}
            setPicCoverSelected={setPicCoverSelected}
            onBack={() => handleSetStage('1')}
          />
        )
      ) : stage === '1' ? (
        <DirectionBStage1
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
          onProceed={() => handleSetStage('2')}
        />
      ) : (
        <DirectionBStage2
          selectedLimit={selectedLimit}
          classification={classification}
          startDate={startDate}
          promoCode={promoCode}
          ownsClinic={ownsClinic}
          setOwnsClinic={setOwnsClinic}
          clinicType={clinicType}
          setClinicType={setClinicType}
          hiresLocums={hiresLocums}
          setHiresLocums={setHiresLocums}
          clinicCoverSelected={clinicCoverSelected}
          setClinicCoverSelected={setClinicCoverSelected}
          clinicLimit={clinicLimit}
          setClinicLimit={setClinicLimit}
          isPic={isPic}
          setIsPic={setIsPic}
          picCoverSelected={picCoverSelected}
          setPicCoverSelected={setPicCoverSelected}
          onBack={() => handleSetStage('1')}
        />
      )}
    </div>
  );
};

/* =========================================================================
 * DIRECTION A — STAGE 1: EDITORIAL INSURANCE
 * Calm single-surface canvas, generous whitespace, subtle hairlines,
 * high-contrast typography, understated teal accents, human clarity.
 * ========================================================================= */
const DirectionAStage1: React.FC<any> = ({
  selectedLimit,
  setSelectedLimit,
  classification,
  setClassification,
  promoCode,
  setPromoCode,
  startDate,
  setStartDate,
  email,
  setEmail,
  onProceed,
}) => {
  return (
    <div style={{ backgroundColor: '#FAFCFD', minHeight: 'calc(100vh - 48px)' }}>
      {/* Direction A Header: Minimalist Editorial Navigation */}
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
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: '#08A5B5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Shield size={16} strokeWidth={2.4} />
            </div>
            <span style={{ fontFamily: "'Kanit', sans-serif", fontSize: '18px', fontWeight: 500, color: '#132766', letterSpacing: '-0.01em' }}>
              DoctorShield
            </span>
          </div>
          <span style={{ height: '14px', width: '1px', backgroundColor: '#CBD5E1' }} />
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Underwritten by <strong>Chubb Insurance</strong>
          </span>
        </div>

        {/* Minimalist Editorial Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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

      {/* Main Content Layout */}
      <main style={{ maxWidth: '1160px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '56px', alignItems: 'start' }}>
          
          {/* Left Form: Open, Breathable, Typographic Form */}
          <div>
            <div style={{ marginBottom: '36px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#066F7B', fontWeight: 600, marginBottom: '6px' }}>
                INDIVIDUAL MEDICAL INDEMNITY
              </div>
              <h1 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '2.1rem', fontWeight: 500, color: '#132766', margin: '0 0 10px 0', lineHeight: 1.2 }}>
                Configure your professional indemnity coverage
              </h1>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: 0, maxWidth: '620px' }}>
                Compliant with Malaysian Medical Council (MMC) registration guidelines. Select your practice category and liability limit to view your instant actuarial rate.
              </p>
            </div>

            {/* Field 1: Classification */}
            <section style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #E5ECEF' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#1E293B', marginBottom: '8px' }}>
                Practitioner Classification <span style={{ color: '#08A5B5' }}>*</span>
              </label>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #DFE6EC',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1E293B' }}>{classification}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    Non-procedural outpatient primary care & consultation
                  </div>
                </div>
                <ChevronDown size={18} color="#64748B" />
              </div>
            </section>

            {/* Field 2: Liability Limit */}
            <section style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #E5ECEF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#1E293B' }}>
                  Limit of Indemnity <span style={{ color: '#08A5B5' }}>*</span>
                </label>
                <span style={{ fontSize: '12px', color: '#64748B' }}>Any One Claim & Aggregate</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {[
                  { id: '500k', label: 'RM 500,000', sub: 'Primary tier' },
                  { id: '1m', label: 'RM 1,000,000', sub: 'Most chosen', badge: 'Recommended' },
                  { id: '2m', label: 'RM 2,000,000', sub: 'Specialist tier' },
                  { id: '5m', label: 'RM 5,000,000', sub: 'High protection' },
                ].map((tier) => {
                  const isSelected = selectedLimit === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedLimit(tier.id)}
                      style={{
                        position: 'relative',
                        padding: '16px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        backgroundColor: isSelected ? '#FFFFFF' : '#FFFFFF',
                        border: isSelected ? '2px solid #08A5B5' : '1px solid #DFE6EC',
                        boxShadow: isSelected ? '0 2px 10px rgba(8, 165, 181, 0.12)' : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {tier.badge && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-9px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: '#066F7B',
                            color: '#FFFFFF',
                            fontSize: '10px',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '10px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {tier.badge}
                        </div>
                      )}
                      <div style={{ fontSize: '14px', fontWeight: isSelected ? 600 : 500, color: isSelected ? '#066F7B' : '#1E293B', marginBottom: '4px' }}>
                        {tier.label}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{tier.sub}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#066F7B' }}>
                <Sparkles size={14} color="#08A5B5" />
                <span>Includes 1x Complimentary Automatic Reinstatement of aggregate limit</span>
              </div>
            </section>

            {/* Field 3: Coverage Period & Alignment */}
            <section style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #E5ECEF' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#1E293B', marginBottom: '8px' }}>
                Policy Coverage Period <span style={{ color: '#08A5B5' }}>*</span>
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>Inception Date</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DFE6EC', backgroundColor: '#FFFFFF' }}>
                    <Calendar size={16} color="#64748B" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#1E293B', width: '100%', fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>Expiry Date (Fixed)</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                    <Calendar size={16} color="#94A3B8" />
                    <span style={{ fontSize: '13px', color: '#64748B' }}>31 Dec 2026 (MMC Co-term)</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '8px' }}>
                All policies align with the Malaysian Medical Council (MMC) annual renewal cycle. Pro-rata premium applies for 306 active days.
              </div>
            </section>

            {/* Field 4: Affinity Promo & Email */}
            <section style={{ marginBottom: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1E293B', marginBottom: '6px' }}>
                    Partner Promo Code
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DFE6EC', backgroundColor: '#FFFFFF' }}>
                    <Tag size={16} color="#08A5B5" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#1E293B', width: '100%', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase' }}
                    />
                    <span style={{ fontSize: '11px', color: '#065F46', backgroundColor: '#ECFDF5', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      -10% MMA
                    </span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1E293B', marginBottom: '6px' }}>
                    Practitioner Email <span style={{ color: '#08A5B5' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DFE6EC', backgroundColor: '#FFFFFF' }}>
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
            </section>

            {/* PIDM Notice */}
            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <ShieldCheck size={18} color="#08A5B5" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>PIDM Protection Statement:</strong> Eligible insurance benefits are protected by PIDM up to statutory limits. Co-underwritten by Chubb Insurance Malaysia Berhad.
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar: Floating Minimal Card */}
          <aside style={{ position: 'sticky', top: '80px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #DFE6EC',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(19, 39, 102, 0.04)',
              }}
            >
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>
                INDICATIVE QUOTATION
              </div>
              <h2 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1.25rem', fontWeight: 500, color: '#132766', margin: '0 0 16px 0' }}>
                Summary
              </h2>

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
                  <span>Affinity Rebate:</span>
                  <span style={{ color: '#065F46', fontWeight: 500 }}>-10% (MMA)</span>
                </div>
              </div>

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

              <div style={{ paddingTop: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#1E293B' }}>Total Payable</span>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748B', marginRight: '4px' }}>MYR</span>
                    <strong style={{ fontFamily: "'Kanit', sans-serif", fontSize: '26px', fontWeight: 500, color: '#132766' }}>
                      539.64
                    </strong>
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'right', marginTop: '2px' }}>
                  Guaranteed rate for 15 minutes
                </div>
              </div>

              <button
                type="button"
                onClick={onProceed}
                style={{
                  width: '100%',
                  padding: '13px',
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
 * DIRECTION A — STAGE 2: EDITORIAL QUOTATION & ADD-ONS
 * Narrative layout, calm questions with pill selectors, subtle add-on tiles,
 * tabular calculation, zero nested bordered card stack.
 * ========================================================================= */
const DirectionAStage2: React.FC<any> = ({
  selectedLimit,
  classification,
  startDate,
  promoCode,
  ownsClinic,
  setOwnsClinic,
  clinicType,
  setClinicType,
  hiresLocums,
  setHiresLocums,
  clinicCoverSelected,
  setClinicCoverSelected,
  clinicLimit,
  setClinicLimit,
  isPic,
  setIsPic,
  picCoverSelected,
  setPicCoverSelected,
  onBack,
}) => {
  return (
    <div style={{ backgroundColor: '#FAFCFD', minHeight: 'calc(100vh - 48px)' }}>
      {/* Direction A Header with active Step 02 */}
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
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: '#08A5B5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Shield size={16} strokeWidth={2.4} />
            </div>
            <span style={{ fontFamily: "'Kanit', sans-serif", fontSize: '18px', fontWeight: 500, color: '#132766' }}>
              DoctorShield
            </span>
          </div>
          <span style={{ height: '14px', width: '1px', backgroundColor: '#CBD5E1' }} />
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Underwritten by <strong>Chubb Insurance</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <span style={{ color: '#047857', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} /> 01 Coverage
            </span>
            <span style={{ color: '#94A3B8' }}>/</span>
            <span style={{ fontWeight: 500, color: '#066F7B', borderBottom: '2px solid #08A5B5', paddingBottom: '2px' }}>
              02 Quotation & Add-ons
            </span>
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

      {/* Main Layout */}
      <main style={{ maxWidth: '1160px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '56px', alignItems: 'start' }}>
          
          {/* Left Flow: Quotation Review & Optional Extensions */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <button
                type="button"
                onClick={onBack}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#066F7B',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <ArrowLeft size={14} /> Back to Coverage
              </button>
              <span style={{ color: '#CBD5E1' }}>•</span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Quote Ref: DS-QUO-89104</span>
            </div>

            <h1 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '2.1rem', fontWeight: 500, color: '#132766', margin: '0 0 10px 0', lineHeight: 1.2 }}>
              Your Indicative Quotation
            </h1>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: '0 0 32px 0', maxWidth: '620px' }}>
              Your premium has been computed based on your practice classification and pro-rata calendar period. Explore optional practice extensions below before providing personal particulars.
            </p>

            {/* Core Coverage Attribute Highlight */}
            <div style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #DFE6EC', marginBottom: '36px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>Classification</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#1E293B', marginTop: '4px' }}>General Practitioner</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>Limit of Indemnity</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#066F7B', marginTop: '4px' }}>RM 1,000,000</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>Period of Insurance</div>
                  <div style={{ fontSize: '13px', color: '#1E293B', marginTop: '4px' }}>01 Mar – 31 Dec 2026</div>
                </div>
              </div>
            </div>

            {/* Section: Optional Practice Extensions */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1.4rem', fontWeight: 500, color: '#132766', margin: '0 0 6px 0' }}>
                Practice & Facility Extensions
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
                Tailor coverage for clinic entity liabilities and statutory Person-in-Charge obligations.
              </p>
            </div>

            {/* Extension 1: Clinic Entity */}
            <section style={{ marginBottom: '28px', padding: '24px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #DFE6EC' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E293B' }}>
                    Do you own, operate, or partner in a private healthcare clinic?
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                    Protects against vicarious liability arising from clinic premises and staff.
                  </div>
                </div>

                <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '6px', padding: '2px', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setOwnsClinic(false);
                      setClinicCoverSelected(false);
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: !ownsClinic ? '#FFFFFF' : 'transparent',
                      color: !ownsClinic ? '#132766' : '#64748B',
                      boxShadow: !ownsClinic ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    }}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => setOwnsClinic(true)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: ownsClinic ? '#08A5B5' : 'transparent',
                      color: ownsClinic ? '#FFFFFF' : '#64748B',
                      boxShadow: ownsClinic ? '0 1px 3px rgba(8,165,181,0.2)' : 'none',
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>

              {ownsClinic && (
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#475569', marginBottom: '6px' }}>
                        Clinic Registration Type
                      </label>
                      <select
                        value={clinicType}
                        onChange={(e: any) => setClinicType(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#1E293B', backgroundColor: '#FFFFFF' }}
                      >
                        <option value="sole_proprietor">Sole Proprietorship</option>
                        <option value="partnership">Partnership / Sdn Bhd</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#475569', marginBottom: '6px' }}>
                        Do you engage locum doctors?
                      </label>
                      <div style={{ display: 'flex', gap: '12px', paddingTop: '6px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                          <input type="radio" checked={!hiresLocums} onChange={() => setHiresLocums(false)} /> No locums
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                          <input type="radio" checked={hiresLocums} onChange={() => setHiresLocums(true)} /> Yes, engages locums
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Add-on opt-in toggle card */}
                  <div
                    onClick={() => setClinicCoverSelected(!clinicCoverSelected)}
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      border: clinicCoverSelected ? '1.5px solid #08A5B5' : '1px solid #DFE6EC',
                      backgroundColor: clinicCoverSelected ? '#F0FDF4' : '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: clinicCoverSelected ? 'none' : '1px solid #CBD5E1', backgroundColor: clinicCoverSelected ? '#08A5B5' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                        {clinicCoverSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#1E293B' }}>Add Clinic Malpractice Package</div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>Extends coverage to clinic entity and staff vicarious liability</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#066F7B' }}>+RM 280.00 / yr</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>RM 235.00 pro-rata</div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Extension 2: Person-In-Charge */}
            <section style={{ marginBottom: '32px', padding: '24px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #DFE6EC' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E293B' }}>
                    Are you designated as Person-in-Charge (PIC) under Act 586?
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                    Provides statutory legal defense coverage under the Private Healthcare Facilities and Services Act 1998.
                  </div>
                </div>

                <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '6px', padding: '2px', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPic(false);
                      setPicCoverSelected(false);
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: !isPic ? '#FFFFFF' : 'transparent',
                      color: !isPic ? '#132766' : '#64748B',
                      boxShadow: !isPic ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    }}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPic(true)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: isPic ? '#08A5B5' : 'transparent',
                      color: isPic ? '#FFFFFF' : '#64748B',
                      boxShadow: isPic ? '0 1px 3px rgba(8,165,181,0.2)' : 'none',
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>

              {isPic && (
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
                  <div
                    onClick={() => setPicCoverSelected(!picCoverSelected)}
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      border: picCoverSelected ? '1.5px solid #08A5B5' : '1px solid #DFE6EC',
                      backgroundColor: picCoverSelected ? '#F0FDF4' : '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: picCoverSelected ? 'none' : '1px solid #CBD5E1', backgroundColor: picCoverSelected ? '#08A5B5' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                        {picCoverSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#1E293B' }}>Add PIC Defense Extension</div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>Dedicated RM 500,000 legal defense costs and statutory penalty cover</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#066F7B' }}>+RM 190.00 / yr</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>RM 159.00 pro-rata</div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Summary Sidebar */}
          <aside style={{ position: 'sticky', top: '80px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #DFE6EC',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(19, 39, 102, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748B', fontWeight: 600 }}>
                  QUOTATION REVIEW
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#B45309', backgroundColor: '#FFFBEB', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>
                  <Clock size={12} /> 14:58 Lock
                </span>
              </div>

              <h2 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1.25rem', fontWeight: 500, color: '#132766', margin: '0 0 16px 0' }}>
                Financial Breakdown
              </h2>

              <div style={{ paddingBottom: '16px', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#64748B' }}>
                  <span>Pro-Rata Net Base</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 490.41</span>
                </div>
                {clinicCoverSelected && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#066F7B' }}>
                    <span>Clinic Malpractice Extension</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 235.00</span>
                  </div>
                )}
                {picCoverSelected && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#066F7B' }}>
                    <span>PIC Defense Extension</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 159.00</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#64748B' }}>
                  <span>SST (8.0%)</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                    RM {( (490.41 + (clinicCoverSelected ? 235 : 0) + (picCoverSelected ? 159 : 0)) * 0.08 ).toFixed(2)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                  <span>Stamp Duty</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 10.00</span>
                </div>
              </div>

              <div style={{ paddingTop: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#1E293B' }}>Total Premium</span>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748B', marginRight: '4px' }}>MYR</span>
                    <strong style={{ fontFamily: "'Kanit', sans-serif", fontSize: '26px', fontWeight: 500, color: '#132766' }}>
                      {(
                        (490.41 + (clinicCoverSelected ? 235 : 0) + (picCoverSelected ? 159 : 0)) * 1.08 + 10
                      ).toFixed(2)}
                    </strong>
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'right', marginTop: '2px' }}>
                  Guaranteed until 31 Dec 2026
                </div>
              </div>

              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '13px',
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
                }}
              >
                <span>Continue to Step 3: Particulars</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '12px', color: '#066F7B', cursor: 'pointer', fontWeight: 500 }}>
                  Email this quotation PDF to me
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
 * DIRECTION B — STAGE 1: STRUCTURED PREMIUM INSURANCE
 * Institutional navy header (#132766), structured 65/35 dual-column grid,
 * elevated white container cards on slate canvas (#F4F7F9),
 * high-definition selection tiles, structured status badges.
 * ========================================================================= */
const DirectionBStage1: React.FC<any> = ({
  selectedLimit,
  setSelectedLimit,
  classification,
  setClassification,
  promoCode,
  setPromoCode,
  startDate,
  setStartDate,
  email,
  setEmail,
  onProceed,
}) => {
  return (
    <div style={{ backgroundColor: '#F4F7F9', minHeight: 'calc(100vh - 48px)' }}>
      {/* Direction B Header: Deep Institutional Navy */}
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
              <div style={{ fontFamily: "'Kanit', sans-serif", fontSize: '18px', fontWeight: 500, lineHeight: 1.1 }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#08A5B5', color: '#FFFFFF', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              1
            </span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#FFFFFF' }}>Coverage</span>
          </div>
          <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              2
            </span>
            <span style={{ fontSize: '13px', color: '#CBD5E1' }}>Quote</span>
          </div>
          <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              3
            </span>
            <span style={{ fontSize: '13px', color: '#CBD5E1' }}>Particulars</span>
          </div>
          <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              4
            </span>
            <span style={{ fontSize: '13px', color: '#CBD5E1' }}>Payment</span>
          </div>
        </div>
      </header>

      {/* Main 65/35 Disciplined Grid */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px 80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Main Form: Elevated Structured Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Header Banner Card */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #DFE6EC', padding: '24px 28px', boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ backgroundColor: '#D6F3F5', color: '#066F7B', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  STEP 1 OF 4
                </span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>Chubb Policy Form CI-MPI-2026</span>
              </div>
              <h1 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1.9rem', fontWeight: 500, color: '#132766', margin: '0 0 8px 0' }}>
                Coverage Configuration & Rating Parameters
              </h1>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                Please specify your clinical practice category, indemnity limit, and policy dates to generate an official insurance quote underwritten by Chubb Insurance Malaysia Berhad.
              </p>
            </div>

            {/* Card 1: Medical Classification */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #DFE6EC', padding: '24px 28px', boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                1. Medical Specialty & Practice Scope <span style={{ color: '#08A5B5' }}>*</span>
              </label>
              <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1E293B' }}>{classification}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Class 7: Non-Procedural Outpatient Care</div>
                </div>
                <ChevronDown size={18} color="#64748B" />
              </div>
            </div>

            {/* Card 2: Limit of Indemnity Grid */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #DFE6EC', padding: '24px 28px', boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  2. Limit of Indemnity <span style={{ color: '#08A5B5' }}>*</span>
                </label>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Any One Claim / In Aggregate</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {[
                  { id: '500k', label: 'RM 500,000', rate: 'RM 500/yr', sub: 'Primary tier' },
                  { id: '1m', label: 'RM 1,000,000', rate: 'RM 650/yr', sub: 'Most chosen', badge: 'POPULAR' },
                  { id: '2m', label: 'RM 2,000,000', rate: 'RM 950/yr', sub: 'Specialist' },
                  { id: '5m', label: 'RM 5,000,000', rate: 'RM 1,850/yr', sub: 'High risk' },
                ].map((tier) => {
                  const isSelected = selectedLimit === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedLimit(tier.id)}
                      style={{
                        position: 'relative',
                        padding: '14px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        backgroundColor: isSelected ? '#F0FDF4' : '#FFFFFF',
                        border: isSelected ? '2px solid #08A5B5' : '1px solid #CBD5E1',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {tier.badge && (
                        <span style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#066F7B', color: '#FFFFFF', fontSize: '9px', fontWeight: 700, padding: '1px 6px', borderRadius: '4px' }}>
                          {tier.badge}
                        </span>
                      )}
                      <div style={{ fontSize: '14px', fontWeight: 600, color: isSelected ? '#066F7B' : '#1E293B' }}>{tier.label}</div>
                      <div style={{ fontSize: '12px', color: '#64748B', margin: '2px 0' }}>{tier.rate}</div>
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>{tier.sub}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '14px', padding: '10px 14px', borderRadius: '6px', backgroundColor: '#F0FDFA', border: '1px solid #CCFBF1', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#0F766E' }}>
                <CheckCircle2 size={16} color="#0D9488" />
                <span>Complimentary 1x Automatic Reinstatement of limit included with all DoctorShield policies.</span>
              </div>
            </div>

            {/* Card 3: Policy Dates & Promo Code */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #DFE6EC', padding: '24px 28px', boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                3. Period of Insurance & Practitioner Verification <span style={{ color: '#08A5B5' }}>*</span>
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Inception Date</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '8px 12px' }}>
                    <Calendar size={16} color="#64748B" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#1E293B', width: '100%', fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Expiry Date</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 12px', backgroundColor: '#F8FAFC' }}>
                    <Calendar size={16} color="#94A3B8" />
                    <span style={{ fontSize: '13px', color: '#64748B' }}>31 Dec 2026 (Fixed)</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Affinity Partner Code</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '8px 12px' }}>
                    <Tag size={16} color="#08A5B5" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#1E293B', width: '100%', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase' }}
                    />
                    <span style={{ fontSize: '11px', color: '#065F46', backgroundColor: '#ECFDF5', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      -10% MMA
                    </span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Practitioner Email</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '8px 12px' }}>
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
            </div>

            {/* PIDM Notice Card */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #DFE6EC', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#475569' }}>
              <ShieldCheck size={20} color="#08A5B5" style={{ flexShrink: 0 }} />
              <div>
                <strong>PIDM Protection:</strong> Eligible insurance benefits are protected by PIDM up to statutory limits. Co-underwritten by Chubb Insurance Malaysia Berhad.
              </div>
            </div>
          </div>

          {/* Right Main Rail: Structured Financial Summary Sidebar */}
          <aside style={{ position: 'sticky', top: '92px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #DFE6EC', padding: '24px', boxShadow: '0 2px 10px rgba(19, 39, 102, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ fontFamily: "'Kanit', sans-serif", fontSize: '16px', fontWeight: 500, color: '#132766' }}>
                  Rating Breakdown
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#B45309', backgroundColor: '#FFFBEB', padding: '3px 8px', borderRadius: '4px', fontWeight: 500 }}>
                  <Clock size={12} /> 14:58 Lock
                </span>
              </div>

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

              <button
                type="button"
                onClick={onProceed}
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

/* =========================================================================
 * DIRECTION B — STAGE 2: STRUCTURED PREMIUM QUOTATION & ADD-ONS
 * Precise card surfaces on slate background, structured segmented controls,
 * explicit rate lock banner, itemized financial summary, robust CTA.
 * ========================================================================= */
const DirectionBStage2: React.FC<any> = ({
  selectedLimit,
  classification,
  startDate,
  promoCode,
  ownsClinic,
  setOwnsClinic,
  clinicType,
  setClinicType,
  hiresLocums,
  setHiresLocums,
  clinicCoverSelected,
  setClinicCoverSelected,
  clinicLimit,
  setClinicLimit,
  isPic,
  setIsPic,
  picCoverSelected,
  setPicCoverSelected,
  onBack,
}) => {
  return (
    <div style={{ backgroundColor: '#F4F7F9', minHeight: 'calc(100vh - 48px)' }}>
      {/* Direction B Header with Step 2 Active */}
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
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#08A5B5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
              <Shield size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div style={{ fontFamily: "'Kanit', sans-serif", fontSize: '18px', fontWeight: 500, lineHeight: 1.1 }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#047857', color: '#FFFFFF', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              ✓
            </span>
            <span style={{ fontSize: '13px', color: '#CBD5E1' }}>Coverage</span>
          </div>
          <span style={{ width: '20px', height: '1px', backgroundColor: '#08A5B5' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#08A5B5', color: '#FFFFFF', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              2
            </span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#FFFFFF' }}>Quote</span>
          </div>
          <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              3
            </span>
            <span style={{ fontSize: '13px', color: '#CBD5E1' }}>Particulars</span>
          </div>
          <span style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              4
            </span>
            <span style={{ fontSize: '13px', color: '#CBD5E1' }}>Payment</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px 80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Rate Lock & Status Banner Card */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #DFE6EC', padding: '24px 28px', boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <button
                  type="button"
                  onClick={onBack}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'transparent', border: 'none', color: '#066F7B', fontSize: '13px', fontWeight: 500, cursor: 'pointer', padding: 0 }}
                >
                  <ArrowLeft size={14} /> Back to Coverage Parameters
                </button>
                <span style={{ fontSize: '12px', color: '#64748B', fontFamily: 'monospace' }}>
                  REF: DS-QUO-89104
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1.9rem', fontWeight: 500, color: '#132766', margin: '0 0 6px 0' }}>
                    Indicative Quotation & Add-on Packages
                  </h1>
                  <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>
                    Official actuarial rating locked for your practice. Configure clinic and statutory extensions below.
                  </p>
                </div>
                <div style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', padding: '8px 14px', borderRadius: '6px', textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#B45309' }}>
                    <Clock size={14} /> 14:58
                  </div>
                  <div style={{ fontSize: '10px', color: '#78350F', marginTop: '2px' }}>Rate Lock Active</div>
                </div>
              </div>
            </div>

            {/* Card 1: Primary Coverage Summary */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #DFE6EC', padding: '24px 28px', boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>
                Selected Policy Schedule
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>Classification</span>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1E293B', marginTop: '2px' }}>General Practitioner</div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>Indemnity Limit</span>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#066F7B', marginTop: '2px' }}>RM 1,000,000</div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>Coverage Period</span>
                  <div style={{ fontSize: '14px', color: '#1E293B', marginTop: '2px' }}>01 Mar – 31 Dec 2026</div>
                </div>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#0F766E' }}>
                <CheckCircle2 size={16} color="#0D9488" />
                <span>1x Free Automatic Reinstatement of Limit included at zero extra cost.</span>
              </div>
            </div>

            {/* Card 2: Clinic Entity Extension */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #DFE6EC', padding: '24px 28px', boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#132766' }}>
                    Clinic Healthcare Facility Extension
                  </div>
                  <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>
                    Does your clinical practice own, operate, or partner in a healthcare clinic?
                  </div>
                </div>

                {/* Structured Segmented Control */}
                <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '6px', padding: '2px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setOwnsClinic(false);
                      setClinicCoverSelected(false);
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: !ownsClinic ? '#FFFFFF' : 'transparent',
                      color: !ownsClinic ? '#132766' : '#64748B',
                      boxShadow: !ownsClinic ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => setOwnsClinic(true)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: ownsClinic ? '#08A5B5' : 'transparent',
                      color: ownsClinic ? '#FFFFFF' : '#64748B',
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>

              {ownsClinic && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#475569', marginBottom: '4px' }}>
                        Clinic Registration Entity
                      </label>
                      <select
                        value={clinicType}
                        onChange={(e: any) => setClinicType(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFFFFF' }}
                      >
                        <option value="sole_proprietor">Sole Proprietorship</option>
                        <option value="partnership">Partnership / Sdn Bhd</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#475569', marginBottom: '4px' }}>
                        Locum Practitioners Engaged?
                      </label>
                      <div style={{ display: 'flex', gap: '12px', paddingTop: '6px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                          <input type="radio" checked={!hiresLocums} onChange={() => setHiresLocums(false)} /> No
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                          <input type="radio" checked={hiresLocums} onChange={() => setHiresLocums(true)} /> Yes, engages locums
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Add-on Card Box */}
                  <div
                    onClick={() => setClinicCoverSelected(!clinicCoverSelected)}
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      border: clinicCoverSelected ? '2px solid #08A5B5' : '1px solid #CBD5E1',
                      backgroundColor: clinicCoverSelected ? '#F0FDFA' : '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '4px', border: clinicCoverSelected ? 'none' : '1px solid #CBD5E1', backgroundColor: clinicCoverSelected ? '#08A5B5' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                        {clinicCoverSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#132766' }}>Include Clinic Entity Malpractice Package</div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>Covers premises liability & employee nursing vicarious liabilities</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#066F7B' }}>+RM 280.00 / yr</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>RM 235.00 pro-rata</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Card 3: Person-in-Charge Extension */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #DFE6EC', padding: '24px 28px', boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#132766' }}>
                    Person-in-Charge (PIC) Statutory Defense
                  </div>
                  <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>
                    Are you designated as Person-in-Charge (PIC) under Act 586?
                  </div>
                </div>

                <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '6px', padding: '2px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPic(false);
                      setPicCoverSelected(false);
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: !isPic ? '#FFFFFF' : 'transparent',
                      color: !isPic ? '#132766' : '#64748B',
                      boxShadow: !isPic ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPic(true)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: isPic ? '#08A5B5' : 'transparent',
                      color: isPic ? '#FFFFFF' : '#64748B',
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>

              {isPic && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                  <div
                    onClick={() => setPicCoverSelected(!picCoverSelected)}
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      border: picCoverSelected ? '2px solid #08A5B5' : '1px solid #CBD5E1',
                      backgroundColor: picCoverSelected ? '#F0FDFA' : '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '4px', border: picCoverSelected ? 'none' : '1px solid #CBD5E1', backgroundColor: picCoverSelected ? '#08A5B5' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                        {picCoverSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#132766' }}>Include PIC Statutory Liability Package</div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>RM 500,000 legal defense costs for statutory inquiries & Ministry audits</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#066F7B' }}>+RM 190.00 / yr</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>RM 159.00 pro-rata</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <aside style={{ position: 'sticky', top: '92px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #DFE6EC', padding: '24px', boxShadow: '0 2px 10px rgba(19, 39, 102, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ fontFamily: "'Kanit', sans-serif", fontSize: '16px', fontWeight: 500, color: '#132766' }}>
                  Quotation Schedule
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#B45309', backgroundColor: '#FFFBEB', padding: '3px 8px', borderRadius: '4px', fontWeight: 500 }}>
                  <Clock size={12} /> 14:58 Lock
                </span>
              </div>

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
                  <span>Partner Rebate:</span>
                  <span style={{ color: '#047857', fontWeight: 600 }}>-10% MMA Privilege</span>
                </div>
              </div>

              <div style={{ padding: '14px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#64748B' }}>
                  <span>Pro-Rata Net Base</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 490.41</span>
                </div>
                {clinicCoverSelected && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#066F7B' }}>
                    <span>Clinic Malpractice</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 235.00</span>
                  </div>
                )}
                {picCoverSelected && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#066F7B' }}>
                    <span>PIC Defense</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 159.00</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#64748B' }}>
                  <span>SST (8.0%)</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                    RM {( (490.41 + (clinicCoverSelected ? 235 : 0) + (picCoverSelected ? 159 : 0)) * 0.08 ).toFixed(2)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                  <span>Stamp Duty</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM 10.00</span>
                </div>
              </div>

              <div style={{ padding: '16px 0 20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Total Premium
                  </span>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748B', marginRight: '4px' }}>MYR</span>
                    <strong style={{ fontFamily: "'Kanit', sans-serif", fontSize: '24px', fontWeight: 500, color: '#132766' }}>
                      {(
                        (490.41 + (clinicCoverSelected ? 235 : 0) + (picCoverSelected ? 159 : 0)) * 1.08 + 10
                      ).toFixed(2)}
                    </strong>
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'right', marginTop: '2px' }}>
                  Official Chubb quotation
                </div>
              </div>

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
                <span>Continue to Step 3</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '12px', color: '#066F7B', cursor: 'pointer', fontWeight: 500 }}>
                  Save & Email Quote PDF
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
