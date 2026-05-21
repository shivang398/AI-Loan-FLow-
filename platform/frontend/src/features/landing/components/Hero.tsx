import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Clock, Users, Zap } from 'lucide-react';
import HeroForm from './HeroForm';
import '../styles/landing.css';

const TRUST = [
  { icon: ShieldCheck, text: 'RBI-Compliant DSA' },
  { icon: Star,        text: '4.8 / 5 Rating' },
  { icon: Clock,       text: '48-Hr Disbursal' },
  { icon: Users,       text: '50+ Lenders' },
  { icon: Zap,         text: 'Zero Fees' },
];

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero: React.FC = () => (
  <section
    id="hero"
    style={{
      background: 'linear-gradient(135deg, #071730 0%, #0A1F44 45%, #12306a 100%)',
      paddingTop: 100,
      paddingBottom: 72,
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    {/* Decorative blobs */}
    <div style={{ position: 'absolute', top: -120, right: -120, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      {/* ── 2-column grid ── */}
      <div className="hero-grid">

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(212,175,55,.15)', border: '1px solid rgba(212,175,55,.35)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.04em', fontFamily: 'Inter, sans-serif' }}>
              Corporate DSA &nbsp;·&nbsp; 50+ Banks & NBFCs
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(34px, 4.5vw, 54px)', lineHeight: 1.12, color: '#FFFFFF', margin: '0 0 20px' }}>
            Smart Loans.{' '}
            <span style={{ color: '#D4AF37' }}>Real Advisory.</span>
            <br />Trusted Solutions.
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.75, margin: '0 0 36px', maxWidth: 480, fontFamily: 'Inter, sans-serif' }}>
            India's trusted Corporate DSA — partnered with 50+ banks and NBFCs. Get the best loan offer matched to your profile, completely free, in 48 hours.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
            <Button
              size="large"
              onClick={() => scrollTo('#hero')}
              style={{ height: 52, paddingInline: 28, borderRadius: 10, fontWeight: 700, fontSize: 15, background: '#D4AF37', borderColor: '#D4AF37', color: '#0A1F44' }}
            >
              Check My Eligibility →
            </Button>
            <Button
              size="large"
              href="tel:+919876543210"
              style={{ height: 52, paddingInline: 28, borderRadius: 10, fontWeight: 600, fontSize: 15, background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.25)', color: '#FFFFFF' }}
            >
              Talk to an Advisor
            </Button>
          </div>

          {/* Trust strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,.1)' }}>
            {TRUST.map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Icon size={14} color="#D4AF37" />
                <span style={{ fontSize: 13, color: '#CBD5E1', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Form card */}
        <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
          <HeroForm />
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
