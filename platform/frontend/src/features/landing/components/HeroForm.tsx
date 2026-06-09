import React from 'react';
import { ClipboardList, User, MapPin, Briefcase, Lock } from 'lucide-react';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';

const STEPS = [
  { icon: ClipboardList, label: 'Loan Information',   desc: 'Amount, type & monthly income' },
  { icon: User,          label: 'Personal Details',    desc: 'Identity & contact information' },
  { icon: MapPin,        label: 'Address Details',     desc: 'Current & permanent address' },
  { icon: Briefcase,     label: 'Employment Details',  desc: 'Employer, designation & EMI' },
];

const scrollToForm = () => {
  const el = document.getElementById('customer-register');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const HeroForm: React.FC = () => (
  <div style={{
    background: '#FFFFFF',
    borderRadius: 4,
    padding: '0 0 28px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    overflow: 'hidden',
  }}>

    {/* Gold top bar */}
    <div style={{
      background: `linear-gradient(90deg, ${NAVY} 0%, #1A3A6B 100%)`,
      padding: '22px 28px',
      borderBottom: `3px solid ${GOLD}`,
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Inter' }}>
        Free · No Obligation · 5 Minutes
      </div>
      <h3 style={{
        margin: 0,
        fontFamily: '"Playfair Display", Georgia, serif',
        fontWeight: 700, fontSize: 22,
        color: '#FFFFFF', lineHeight: 1.25,
      }}>
        Apply in 4 Simple Steps
      </h3>
      <p style={{ margin: '6px 0 0', fontSize: 12.5, color: 'rgba(255,255,255,0.50)', lineHeight: 1.55, fontFamily: 'Inter' }}>
        Complete once — matched with the best lender for your profile
      </p>
    </div>

    {/* Steps */}
    <div style={{ padding: '24px 28px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 24 }}>
        {STEPS.map(({ icon: Icon, label, desc }, i) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '13px 16px',
            background: i % 2 === 0 ? '#F8FAFD' : '#FFFFFF',
            borderBottom: '1px solid #EEF2F8',
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 3, flexShrink: 0,
              background: NAVY,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={14} color={GOLD} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: NAVY, lineHeight: 1.2, fontFamily: 'Inter' }}>
                Step {i + 1} — {label}
              </div>
              <div style={{ fontSize: 11, color: '#7A90A8', fontWeight: 400, marginTop: 1, fontFamily: 'Inter' }}>
                {desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={scrollToForm}
        style={{
          width: '100%', padding: '15px 20px',
          borderRadius: 3, border: 'none',
          background: GOLD,
          color: '#ffffff', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', letterSpacing: '0.03em',
          fontFamily: 'Inter', transition: 'background 150ms',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#B08830'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; }}
      >
        Begin My Application →
      </button>

      {/* Security note */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        marginTop: 14, paddingTop: 14, borderTop: '1px solid #EEF2F8',
      }}>
        <Lock size={11} color="#7A90A8" />
        <span style={{ fontSize: 11, color: '#7A90A8', fontWeight: 500, fontFamily: 'Inter' }}>
          256-bit encrypted · No spam · Data never sold
        </span>
      </div>
    </div>
  </div>
);

export default HeroForm;
