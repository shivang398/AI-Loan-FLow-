import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Clock, BadgeCheck } from 'lucide-react';
import HeroForm from './HeroForm';
import '../styles/landing.css';

const RM_RED = '#CC1B1B';

const TRUST = [
  { icon: ShieldCheck, text: 'RBI-Compliant DSA' },
  { icon: Award,       text: '4.8 / 5 Customer Rating' },
  { icon: Clock,       text: '48-Hour Disbursal' },
  { icon: BadgeCheck,  text: 'Zero Processing Fees' },
];

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero: React.FC = () => (
  <section
    id="hero"
    style={{
      background: 'linear-gradient(150deg, #071560 0%, #0F2B9F 55%, #7A1010 100%)',
      paddingTop: 100,
      paddingBottom: 80,
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    {/* Decorative swoosh lines mimicking the globe logo */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: `
        radial-gradient(ellipse 80% 60% at 20% 50%, rgba(204,27,27,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 80% 50%, rgba(15,43,159,0.15) 0%, transparent 60%)
      `,
      pointerEvents: 'none',
    }} />
    {/* Subtle arc overlay — echoes the globe swoosh */}
    <svg
      style={{ position: 'absolute', top: 0, right: 0, opacity: 0.07, pointerEvents: 'none' }}
      width="600" height="600" viewBox="0 0 600 600" fill="none"
    >
      <ellipse cx="500" cy="300" rx="280" ry="260" stroke="white" strokeWidth="60" />
      <ellipse cx="500" cy="300" rx="180" ry="160" stroke="white" strokeWidth="40" />
    </svg>

    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
      <div className="hero-grid">

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>

          {/* Authority badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: 6, padding: '5px 14px', marginBottom: 28,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.80)', letterSpacing: '0.04em', fontFamily: 'Inter, sans-serif' }}>
              Authorised Corporate DSA · Personal Loan Specialists
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            lineHeight: 1.15,
            color: '#FFFFFF',
            margin: '0 0 20px',
          }}>
            Personal Loans.<br />
            <span style={{
              background: `linear-gradient(90deg, #ffffff 0%, #FFAAAA 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Simplified. Transparent.
            </span>
            <br />Disbursed in 48 Hours.
          </h1>

          <p style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.8,
            margin: '0 0 32px',
            maxWidth: 480,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
          }}>
            India's trusted personal loan advisory for salaried and self-employed professionals.
            Expert guidance, competitive rates, and zero advisory fees — always.
          </p>

          {/* Key metrics */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 36, flexWrap: 'wrap' }}>
            {[
              { value: '₹50L',   label: 'Maximum Loan Amount' },
              { value: '10.5%',  label: 'Interest Rate p.a.' },
              { value: '48 hrs', label: 'Average Disbursal' },
            ].map((s, i) => (
              <div key={s.label} style={{
                paddingLeft: i === 0 ? 0 : 28,
                marginLeft:  i === 0 ? 0 : 28,
                borderLeft:  i === 0 ? 'none' : '1px solid rgba(255,255,255,0.15)',
                marginBottom: 12,
              }}>
                <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 26, color: '#FFFFFF', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 500, marginTop: 5, letterSpacing: '0.03em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
            <Button
              size="large"
              onClick={() => scrollTo('#customer-register')}
              style={{
                height: 50, paddingInline: 32, borderRadius: 8,
                fontWeight: 700, fontSize: 15,
                background: RM_RED, borderColor: RM_RED, color: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(204,27,27,0.45)',
              }}
            >
              Apply Now
            </Button>
            <Button
              size="large"
              href="tel:+919876543210"
              style={{
                height: 50, paddingInline: 24, borderRadius: 8,
                fontWeight: 600, fontSize: 14,
                background: 'transparent', borderColor: 'rgba(255,255,255,0.30)', color: '#FFFFFF',
              }}
            >
              Speak to an Advisor
            </Button>
          </div>

          {/* Trust strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.10)' }}>
            {TRUST.map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Icon size={13} color="#FFAAAA" />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.60)', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Teaser card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <HeroForm />
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
