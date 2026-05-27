import React from 'react';
import { ClipboardList, User, MapPin, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';

const STEPS = [
  { icon: ClipboardList, label: 'Loan Info',   desc: 'Amount, type & salary' },
  { icon: User,          label: 'Personal',     desc: 'Identity & contacts' },
  { icon: MapPin,        label: 'Address',      desc: 'Current & permanent' },
  { icon: Briefcase,     label: 'Employment',   desc: 'Company & EMI details' },
];

const scrollToForm = () => {
  const el = document.getElementById('customer-register');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const HeroForm: React.FC = () => (
  <div style={{
    background: '#fff',
    borderRadius: 24,
    padding: '28px 26px 24px',
    boxShadow: '0 32px 80px rgba(10,31,68,.28), 0 0 0 1px rgba(212,175,55,.12)',
    border: '1px solid rgba(212,175,55,.15)',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Top accent bar */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(to right, #D4AF37, #f5d16a, #D4AF37)' }} />

    {/* Header */}
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
          Free · Instant Decision
        </span>
      </div>
      <h3 style={{ margin: 0, fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 21, color: '#0A1F44', lineHeight: 1.2 }}>
        Apply in 4 Simple Steps
      </h3>
      <p style={{ margin: '5px 0 0', fontSize: 12.5, color: '#64748B', lineHeight: 1.5 }}>
        Fill once — get matched with the best lender for you
      </p>
    </div>

    {/* Steps */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
      {STEPS.map(({ icon: Icon, label, desc }, i) => (
        <div key={label} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 14px', borderRadius: 12,
          background: '#f8fafc', border: '1px solid #f1f5f9',
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg,#0A1F44,#1e3a6e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={15} color="#D4AF37" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
              Step {i + 1} — {label}
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>{desc}</div>
          </div>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowRight size={10} color="#cbd5e1" />
          </div>
        </div>
      ))}
    </div>

    {/* CTA */}
    <button
      onClick={scrollToForm}
      style={{
        width: '100%', padding: '15px', borderRadius: 12, border: 'none',
        background: 'linear-gradient(135deg,#D4AF37,#B8960C)',
        color: '#0A1F44', fontSize: 14, fontWeight: 900,
        cursor: 'pointer', letterSpacing: '-0.01em',
        boxShadow: '0 6px 24px rgba(212,175,55,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        transition: 'transform 150ms, box-shadow 150ms',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 32px rgba(212,175,55,0.5)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'none';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 24px rgba(212,175,55,0.4)';
      }}
    >
      Start My Application →
    </button>

    {/* Trust line */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 }}>
      <ShieldCheck size={12} color="#10B981" />
      <span style={{ fontSize: 10.5, color: '#94A3B8', fontWeight: 500 }}>
        Data encrypted · No spam · Takes ~5 minutes
      </span>
    </div>
  </div>
);

export default HeroForm;
