import React from 'react';
import { Zap, ShieldCheck, Users, Clock, TrendingUp, BadgeCheck } from 'lucide-react';

const CARDS = [
  {
    icon: <Zap size={22} color="#D4AF37" />,
    title: 'Instant Pre-Approval',
    desc: 'Know your eligibility in under 2 minutes — no credit score impact.',
    tag: '2-min check',
  },
  {
    icon: <Users size={22} color="#6366f1" />,
    title: '15+ Bank Partners',
    desc: 'We match your profile with the lender offering the best rate for you.',
    tag: 'Best rates',
  },
  {
    icon: <BadgeCheck size={22} color="#059669" />,
    title: 'Dedicated Advisor',
    desc: 'A Real Money ops agent is assigned to every application within minutes.',
    tag: '1-on-1 support',
  },
  {
    icon: <Clock size={22} color="#f59e0b" />,
    title: '24-hr Disbursal',
    desc: 'Approved loans are disbursed directly to your bank account in 24 hours.',
    tag: 'Same-day possible',
  },
  {
    icon: <ShieldCheck size={22} color="#3b82f6" />,
    title: 'Bank-grade Security',
    desc: 'Your PAN, Aadhaar and financial data is AES-256 encrypted end-to-end.',
    tag: 'Encrypted',
  },
  {
    icon: <TrendingUp size={22} color="#ec4899" />,
    title: '₹50 Cr+ Disbursed',
    desc: 'Trusted by 4,000+ borrowers across India since launch.',
    tag: 'Proven track record',
  },
];

const EligibilityWidget: React.FC = () => (
  <section id="why-us" style={{ background: '#0A1F44', padding: '88px 0' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <span style={{
          display: 'inline-block', background: 'rgba(212,175,55,0.15)', color: '#D4AF37',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '5px 16px', borderRadius: 100, marginBottom: 14, border: '1px solid rgba(212,175,55,0.3)',
        }}>
          Why Real Money
        </span>
        <h2 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800,
          fontSize: 'clamp(26px, 3vw, 38px)', color: '#fff', margin: '0 0 14px', lineHeight: 1.25,
        }}>
          Everything you need, nothing you don't
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
          Real Money is built exclusively for salaried &amp; self-employed Indians who deserve a better loan experience.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
        gap: 20,
      }}>
        {CARDS.map((c, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: 18,
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '28px 24px',
              display: 'flex', flexDirection: 'column', gap: 12,
              transition: 'border-color 200ms, background 200ms',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.35)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: 'rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {c.icon}
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: '#64748b',
                background: 'rgba(255,255,255,0.05)', borderRadius: 100,
                padding: '3px 10px', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {c.tag}
              </span>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#f1f5f9', margin: '0 0 6px' }}>{c.title}</h3>
              <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 52 }}>
        <a
          href="#customer-register"
          style={{
            display: 'inline-block', padding: '16px 40px', borderRadius: 14,
            background: 'linear-gradient(135deg,#D4AF37,#B8960C)',
            color: '#0A1F44', fontSize: 15, fontWeight: 800,
            textDecoration: 'none', letterSpacing: '-0.01em',
            boxShadow: '0 8px 32px rgba(212,175,55,0.3)',
            transition: 'transform 150ms, box-shadow 150ms',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 40px rgba(212,175,55,0.4)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 32px rgba(212,175,55,0.3)';
          }}
        >
          Apply for Free →
        </a>
        <p style={{ fontSize: 12, color: '#475569', marginTop: 12, fontWeight: 500 }}>
          No fees · No spam · 100% secure
        </p>
      </div>
    </div>
  </section>
);

export default EligibilityWidget;
