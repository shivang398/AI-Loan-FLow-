import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Users, Clock, TrendingUp, BadgeCheck } from 'lucide-react';

const CARDS = [
  {
    icon: Zap,
    color: '#2563EB',
    bg: '#EFF6FF',
    title: 'Instant Pre-Approval Check',
    desc: 'Know your loan eligibility in under 2 minutes — no impact on your credit score.',
  },
  {
    icon: Users,
    color: '#0A1F44',
    bg: '#F0F4FF',
    title: '15+ Lending Partners',
    desc: 'We match your profile against multiple lenders to surface the most competitive rate.',
  },
  {
    icon: BadgeCheck,
    color: '#059669',
    bg: '#ECFDF5',
    title: 'Dedicated Case Manager',
    desc: 'A Real Money advisor is assigned to your application within minutes of submission.',
  },
  {
    icon: Clock,
    color: '#D97706',
    bg: '#FFFBEB',
    title: '48-Hour Disbursal',
    desc: 'Approved loan amounts are credited directly to your bank account within 48 hours.',
  },
  {
    icon: ShieldCheck,
    color: '#2563EB',
    bg: '#EFF6FF',
    title: 'Bank-Grade Data Security',
    desc: 'Your PAN, Aadhaar and financial information is protected with AES-256 encryption.',
  },
  {
    icon: TrendingUp,
    color: '#0A1F44',
    bg: '#F0F4FF',
    title: '₹50 Cr+ Disbursed',
    desc: 'Trusted by 4,000+ borrowers across India since inception — with a 4.8-star rating.',
  },
];

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const EligibilityWidget: React.FC = () => (
  <section id="why-us" style={{ background: '#ffffff', padding: '96px 0' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <span style={{
          display: 'inline-block', background: '#EFF6FF', color: '#2563EB',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 4, marginBottom: 14,
        }}>
          Why Real Money
        </span>
        <h2 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800,
          fontSize: 'clamp(26px, 3vw, 38px)', color: '#0A1F44', margin: '0 0 14px', lineHeight: 1.25,
        }}>
          A Better Borrowing Experience
        </h2>
        <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
          Real Money is designed exclusively for salaried and self-employed Indians who expect transparency, speed, and professional guidance.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
        gap: '1.25rem',
      }}>
        {CARDS.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            style={{
              background: '#ffffff',
              borderRadius: 12,
              border: '1.5px solid #E5E7EB',
              padding: '24px 22px',
              display: 'flex', flexDirection: 'column', gap: 14,
              transition: 'box-shadow 200ms, border-color 200ms',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 24px rgba(37,99,235,.08)';
              (e.currentTarget as HTMLDivElement).style.borderColor = '#BFDBFE';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLDivElement).style.borderColor = '#E5E7EB';
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: c.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <c.icon size={20} color={c.color} />
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0A1F44', margin: '0 0 6px' }}>{c.title}</h3>
              <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 52 }}>
        <button
          onClick={() => scrollTo('#customer-register')}
          style={{
            display: 'inline-block', padding: '14px 40px', borderRadius: 8,
            background: '#2563EB',
            color: '#ffffff', fontSize: 15, fontWeight: 700,
            border: 'none', cursor: 'pointer',
            transition: 'background 150ms',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1D4ED8'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#2563EB'; }}
        >
          Apply for Free — No Fees, Ever
        </button>
        <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 10, fontWeight: 500 }}>
          No processing fee · No spam · 100% secure
        </p>
      </div>
    </div>
  </section>
);

export default EligibilityWidget;
