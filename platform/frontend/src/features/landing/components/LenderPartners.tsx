import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import { PARTNERS } from '../constants/landingData';

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const PartnerCard: React.FC<{ partner: typeof PARTNERS[0]; index: number }> = ({ partner, index }) => {
  const Icon = partner.id === 'saral-vidya' ? GraduationCap : Briefcase;
  const isBlue = partner.id === 'saral-vidya';

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      style={{
        background: isBlue
          ? 'linear-gradient(145deg, #0d2a50, #1a3f70)'
          : 'linear-gradient(145deg, #071730, #0A1F44)',
        borderRadius: 28,
        padding: '44px 40px',
        border: `1.5px solid ${isBlue ? 'rgba(59,130,246,.25)' : 'rgba(212,175,55,.2)'}`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 24px 64px rgba(4,13,30,.4)',
      }}
    >
      {/* Background pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
      {/* Glow */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${isBlue ? 'rgba(59,130,246,.12)' : 'rgba(212,175,55,.1)'} 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative' }}>
        {/* Top row: icon + exclusive badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: isBlue ? 'rgba(59,130,246,.15)' : 'rgba(212,175,55,.12)',
            border: `1.5px solid ${isBlue ? 'rgba(59,130,246,.3)' : 'rgba(212,175,55,.25)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={30} color={isBlue ? '#3B82F6' : '#D4AF37'} />
          </div>
          <span style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 100,
            fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
            background: isBlue ? 'rgba(59,130,246,.15)' : 'rgba(212,175,55,.15)',
            border: `1px solid ${isBlue ? 'rgba(59,130,246,.3)' : 'rgba(212,175,55,.3)'}`,
            color: isBlue ? '#60A5FA' : '#D4AF37',
          }}>
            Exclusive Partner
          </span>
        </div>

        {/* Brand name + tagline */}
        <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 2.5vw, 36px)', color: '#FFFFFF', margin: '0 0 6px', lineHeight: 1.1 }}>
          {partner.brand}
        </h3>
        <p style={{ fontSize: 14, color: isBlue ? '#60A5FA' : '#D4AF37', fontWeight: 600, margin: '0 0 4px', letterSpacing: '0.02em' }}>
          {partner.tagline}
        </p>
        {partner.domain && (
          <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 20px' }}>
            {partner.domain}
          </p>
        )}

        {/* Lender powered-by */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,.06)', borderRadius: 10,
          padding: '8px 16px', marginBottom: 24,
          border: '1px solid rgba(255,255,255,.08)',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
          <span style={{ fontSize: 12, color: '#CBD5E1', fontWeight: 600 }}>
            {partner.lenderNote}: <strong style={{ color: '#FFFFFF' }}>{partner.lender}</strong>
          </span>
        </div>

        <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.75, margin: '0 0 28px' }}>
          {partner.description}
        </p>

        {/* Features */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', marginBottom: 28 }}>
          {partner.features.map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <CheckCircle2 size={15} color={isBlue ? '#3B82F6' : '#D4AF37'} style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 13, color: '#CBD5E1', fontWeight: 500, lineHeight: 1.4 }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Key metrics */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 32, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <div>
            <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 22, color: '#FFFFFF', lineHeight: 1 }}>{partner.highlight}</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 500 }}>Max Amount</div>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,.08)' }} />
          <div>
            <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 22, color: isBlue ? '#60A5FA' : '#D4AF37', lineHeight: 1 }}>{partner.rate}</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 500 }}>Interest Rate</div>
          </div>
        </div>

        {/* CTA */}
        {partner.url ? (
          <a href={partner.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
            <Button block size="large" style={{
              height: 52, borderRadius: 14, fontWeight: 800, fontSize: 15,
              background: isBlue ? '#3B82F6' : 'transparent',
              borderColor: isBlue ? '#3B82F6' : 'rgba(212,175,55,.5)',
              color: isBlue ? '#FFFFFF' : '#D4AF37',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: isBlue ? '0 8px 28px rgba(59,130,246,.3)' : 'none',
            }}>
              Visit {partner.brand} <ExternalLink size={15} />
            </Button>
          </a>
        ) : (
          <Button block size="large" onClick={() => scrollTo('#hero')} style={{
            height: 52, borderRadius: 14, fontWeight: 800, fontSize: 15,
            background: '#D4AF37', borderColor: '#D4AF37', color: '#0A1F44',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 8px 28px rgba(212,175,55,.3)',
          }}>
            Apply for Business Loan <ArrowRight size={15} />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

const LenderPartners: React.FC = () => (
  <section id="partners" style={{ background: '#060F1E', padding: '96px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <span style={{ display: 'inline-block', background: 'rgba(212,175,55,.12)', border: '1px solid rgba(212,175,55,.25)', color: '#D4AF37', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: 100, marginBottom: 16 }}>
          Our Brands
        </span>
        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 3.5vw, 46px)', color: '#FFFFFF', margin: '0 0 18px', lineHeight: 1.15 }}>
          Exclusive Partner Brands
        </h2>
        <p style={{ color: '#64748B', fontSize: 16, maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}>
          Beyond personal loans, we have built dedicated brands for education and business financing — each with a single, trusted lender partner for quality you can count on.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="partners-grid">
        {PARTNERS.map((partner, i) => (
          <PartnerCard key={partner.id} partner={partner} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{ textAlign: 'center', marginTop: 48 }}
      >
        <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.7 }}>
          We work exclusively with these partners for education and business loans —<br />
          <span style={{ color: '#64748B' }}>no other lenders, no hidden tie-ups, complete transparency.</span>
        </p>
      </motion.div>
    </div>
  </section>
);

export default LenderPartners;
