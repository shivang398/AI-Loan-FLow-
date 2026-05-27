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
  const accentColor = isBlue ? '#2563EB' : '#0A1F44';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      style={{
        background: '#ffffff',
        borderRadius: 14,
        padding: '36px 32px',
        border: '1.5px solid #E5E7EB',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 16px rgba(0,0,0,.05)',
      }}
    >
      {/* Top color stripe */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: accentColor }} />

      {/* Top row: icon + exclusive badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, marginTop: 8 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 12,
          background: isBlue ? '#EFF6FF' : '#F9FAFB',
          border: `1.5px solid ${isBlue ? '#BFDBFE' : '#E5E7EB'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={26} color={accentColor} />
        </div>
        <span style={{
          display: 'inline-block', padding: '4px 12px', borderRadius: 4,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const,
          background: '#F9FAFB', border: '1px solid #E5E7EB', color: '#6B7280',
        }}>
          Exclusive Partner
        </span>
      </div>

      {/* Brand name + tagline */}
      <h3 style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800,
        fontSize: 'clamp(24px, 2.5vw, 32px)', color: '#0A1F44', margin: '0 0 4px', lineHeight: 1.15,
      }}>
        {partner.brand}
      </h3>
      <p style={{ fontSize: 14, color: accentColor, fontWeight: 600, margin: '0 0 4px', letterSpacing: '0.01em' }}>
        {partner.tagline}
      </p>
      {partner.domain && (
        <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 18px' }}>
          {partner.domain}
        </p>
      )}

      {/* Lender powered-by */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: '#F9FAFB', borderRadius: 8,
        padding: '8px 14px', marginBottom: 20,
        border: '1px solid #E5E7EB',
        alignSelf: 'flex-start',
      }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>
          {partner.lenderNote}: <strong style={{ color: '#0A1F44' }}>{partner.lender}</strong>
        </span>
      </div>

      <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.8, margin: '0 0 24px' }}>
        {partner.description}
      </p>

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginBottom: 24 }}>
        {partner.features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
            <CheckCircle2 size={14} color={accentColor} style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 13, color: '#374151', fontWeight: 500, lineHeight: 1.45 }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Key metrics */}
      <div style={{
        display: 'flex', gap: 24, marginBottom: 28,
        paddingTop: 18, borderTop: '1px solid #F3F4F6',
      }}>
        <div>
          <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 22, color: '#0A1F44', lineHeight: 1 }}>{partner.highlight}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4, textTransform: 'uppercase' as const, letterSpacing: '0.04em', fontWeight: 500 }}>Max Amount</div>
        </div>
        <div style={{ width: 1, background: '#E5E7EB' }} />
        <div>
          <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 22, color: accentColor, lineHeight: 1 }}>{partner.rate}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4, textTransform: 'uppercase' as const, letterSpacing: '0.04em', fontWeight: 500 }}>Interest Rate</div>
        </div>
      </div>

      {/* CTA */}
      {partner.url ? (
        <a href={partner.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <Button block size="large" style={{
            height: 48, borderRadius: 8, fontWeight: 700, fontSize: 14,
            background: accentColor,
            borderColor: accentColor,
            color: '#ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            Visit {partner.brand} <ExternalLink size={14} />
          </Button>
        </a>
      ) : (
        <Button block size="large" onClick={() => scrollTo('#customer-register')} style={{
          height: 48, borderRadius: 8, fontWeight: 700, fontSize: 14,
          background: '#0A1F44', borderColor: '#0A1F44', color: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          Apply for Business Loan <ArrowRight size={14} />
        </Button>
      )}
    </motion.div>
  );
};

const LenderPartners: React.FC = () => (
  <section id="partners" style={{ background: '#ffffff', padding: '96px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <span style={{
          display: 'inline-block', background: '#EFF6FF', color: '#2563EB',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase' as const,
          padding: '4px 14px', borderRadius: 4, marginBottom: 14,
        }}>
          Our Partner Brands
        </span>
        <h2 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800,
          fontSize: 'clamp(28px, 3.5vw, 40px)', color: '#0A1F44', margin: '0 0 14px', lineHeight: 1.2,
        }}>
          Specialised Brands. Trusted Partners.
        </h2>
        <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
          Beyond personal loans, we operate dedicated brands for education and business financing — each backed by a single, carefully selected lender for consistent quality.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="partners-grid">
        {PARTNERS.map((partner, i) => (
          <PartnerCard key={partner.id} partner={partner} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        style={{ textAlign: 'center', marginTop: 40 }}
      >
        <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.7 }}>
          We work exclusively with these partners for education and business financing —
          no hidden tie-ups, complete transparency.
        </p>
      </motion.div>
    </div>
  </section>
);

export default LenderPartners;
