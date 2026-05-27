import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Clock, BadgeCheck, Zap } from 'lucide-react';
import HeroForm from './HeroForm';
import '../styles/landing.css';

const TRUST = [
  { icon: ShieldCheck, text: 'RBI-Compliant DSA' },
  { icon: Star,        text: '4.8 / 5 Rating' },
  { icon: Clock,       text: '48-Hr Disbursal' },
  { icon: BadgeCheck,  text: 'Zero Fees' },
  { icon: Zap,         text: '100% Digital' },
];

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero: React.FC = () => (
  <section
    id="hero"
    style={{
      background: 'linear-gradient(150deg, #040d1e 0%, #0A1F44 50%, #0f2a5a 100%)',
      paddingTop: 100,
      paddingBottom: 72,
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    {/* Decorative elements */}
    <div style={{ position: 'absolute', top: -100, right: -80, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,.10) 0%, transparent 65%)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: -60, left: -60, width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
    {/* Subtle grid pattern */}
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
      <div className="hero-grid">

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(212,175,55,.14)', border: '1px solid rgba(212,175,55,.3)', borderRadius: 100, padding: '6px 18px', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px #4ade80' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>
              Corporate DSA &nbsp;·&nbsp; Personal Loan Specialists
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(36px, 4.8vw, 58px)', lineHeight: 1.1, color: '#FFFFFF', margin: '0 0 22px' }}>
            Personal Loans.{' '}
            <span style={{ color: '#D4AF37' }}>Fast.</span>
            <br />
            <span style={{ color: '#D4AF37' }}>Transparent.</span>{' '}Yours.
          </h1>

          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.75, margin: '0 0 16px', maxWidth: 500, fontFamily: 'Inter, sans-serif' }}>
            India's trusted personal loan advisory. Expert guidance, best rates, and disbursal in as little as 48 hours — completely free.
          </p>

          {/* Key stats inline */}
          <div style={{ display: 'flex', gap: 28, marginBottom: 36, flexWrap: 'wrap' }}>
            {[
              { value: '₹50L', label: 'Max Loan' },
              { value: '10.5%', label: 'Starting Rate' },
              { value: '48 hrs', label: 'Avg Disbursal' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 22, color: '#FFFFFF', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
            <Button
              size="large"
              onClick={() => scrollTo('#customer-register')}
              style={{ height: 54, paddingInline: 32, borderRadius: 10, fontWeight: 800, fontSize: 16, background: '#D4AF37', borderColor: '#D4AF37', color: '#0A1F44', boxShadow: '0 8px 28px rgba(212,175,55,.35)' }}
            >
              Apply Now →
            </Button>
            <Button
              size="large"
              href="tel:+919876543210"
              style={{ height: 54, paddingInline: 28, borderRadius: 10, fontWeight: 600, fontSize: 15, background: 'rgba(255,255,255,.07)', borderColor: 'rgba(255,255,255,.2)', color: '#FFFFFF' }}
            >
              Talk to an Advisor
            </Button>
          </div>

          {/* Trust strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.08)' }}>
            {TRUST.map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Icon size={13} color="#D4AF37" />
                <span style={{ fontSize: 12, color: '#CBD5E1', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Form card */}
        <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.12 }}>
          <HeroForm />
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
