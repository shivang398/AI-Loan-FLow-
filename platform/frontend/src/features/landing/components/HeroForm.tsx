import React from 'react';
import { ClipboardList, User, MapPin, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';

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
    background: '#ffffff',
    borderRadius: 14,
    padding: '32px 28px 26px',
    boxShadow: '0 20px 60px rgba(0,0,0,.22), 0 2px 8px rgba(0,0,0,.08)',
    border: '1px solid #E5E7EB',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Navy top accent */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#0A1F44' }} />

    {/* Header */}
    <div style={{ marginBottom: 22 }}>
      <div style={{
        display: 'inline-block', background: '#EFF6FF', borderRadius: 4,
        padding: '3px 10px', marginBottom: 12,
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#2563EB', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
          Free · No Obligation
        </span>
      </div>
      <h3 style={{
        margin: 0,
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 800, fontSize: 20,
        color: '#0A1F44', lineHeight: 1.25,
      }}>
        Apply in 4 Simple Steps
      </h3>
      <p style={{ margin: '6px 0 0', fontSize: 13, color: '#6B7280', lineHeight: 1.55 }}>
        Complete once — get matched with the best lender for your profile
      </p>
    </div>

    {/* Steps */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
      {STEPS.map(({ icon: Icon, label, desc }, i) => (
        <div key={label} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 12px', borderRadius: 10,
          background: '#F9FAFB', border: '1px solid #E5E7EB',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: '#0A1F44',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={15} color="#ffffff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
              Step {i + 1} — {label}
            </div>
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>{desc}</div>
          </div>
          <ArrowRight size={12} color="#D1D5DB" />
        </div>
      ))}
    </div>

    {/* CTA */}
    <button
      onClick={scrollToForm}
      style={{
        width: '100%', padding: '14px 20px', borderRadius: 8, border: 'none',
        background: '#2563EB',
        color: '#ffffff', fontSize: 14, fontWeight: 700,
        cursor: 'pointer', letterSpacing: '0.01em',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        transition: 'background 150ms',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1D4ED8'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#2563EB'; }}
    >
      Begin My Application →
    </button>

    {/* Trust line */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 }}>
      <ShieldCheck size={12} color="#10B981" />
      <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>
        256-bit encrypted · No spam · Approx. 5 minutes
      </span>
    </div>
  </div>
);

export default HeroForm;
