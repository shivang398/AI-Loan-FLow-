import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Clock, BadgeCheck } from 'lucide-react';
import HeroForm from './HeroForm';
import '../styles/landing.css';

const NAVY  = '#0B1E3D';
const GOLD  = '#C4993A';
const GOLD_L = '#E8C870';

const TRUST = [
  { icon: ShieldCheck, text: 'RBI-Compliant DSA' },
  { icon: Award,       text: '4.8 / 5 Customer Rating' },
  { icon: Clock,       text: '48-Hour Disbursal' },
  { icon: BadgeCheck,  text: 'Zero Advisory Fees' },
];

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero: React.FC = () => (
  <section
    id="hero"
    style={{
      background: `linear-gradient(160deg, #060F20 0%, ${NAVY} 50%, #0E2545 100%)`,
      paddingTop: 88,
      paddingBottom: 88,
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    {/* Subtle diagonal grid pattern */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `linear-gradient(rgba(196,153,58,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(196,153,58,0.04) 1px, transparent 1px)`,
      backgroundSize: '48px 48px',
    }} />

    {/* Large circle accent — top right */}
    <div style={{
      position: 'absolute', top: -160, right: -160,
      width: 520, height: 520,
      borderRadius: '50%',
      border: '1px solid rgba(196,153,58,0.08)',
      pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', top: -80, right: -80,
      width: 340, height: 340,
      borderRadius: '50%',
      border: '1px solid rgba(196,153,58,0.06)',
      pointerEvents: 'none',
    }} />

    {/* Bottom border glow */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 1,
      background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)`,
    }} />

    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
      <div className="hero-grid">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Authority badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 16px 6px 8px',
            background: 'rgba(196,153,58,0.08)',
            border: `1px solid rgba(196,153,58,0.22)`,
            borderRadius: 2, marginBottom: 32,
          }}>
            <span style={{
              background: GOLD, color: '#fff', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.08em', padding: '2px 7px', borderRadius: 1,
              fontFamily: 'Inter', textTransform: 'uppercase',
            }}>
              Corporate DSA
            </span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter', letterSpacing: '0.02em' }}>
              Personal Loan Specialists
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(34px, 4.5vw, 54px)',
            lineHeight: 1.12,
            color: '#FFFFFF',
            margin: '0 0 24px',
            letterSpacing: '-0.01em',
          }}>
            Personal Loans,<br />
            <span style={{
              background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_L} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Simplified.
            </span>
            <br />Disbursed in 48 Hours.
          </h1>

          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.85,
            margin: '0 0 36px',
            maxWidth: 460,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
          }}>
            India's trusted personal loan advisory for salaried and self-employed professionals.
            Expert guidance, competitive rates, and zero advisory fees — always.
          </p>

          {/* Key metrics */}
          <div style={{
            display: 'flex', gap: 0, marginBottom: 40,
            flexWrap: 'wrap',
            borderTop: '1px solid rgba(196,153,58,0.15)',
            borderBottom: '1px solid rgba(196,153,58,0.15)',
            padding: '24px 0',
          }}>
            {[
              { value: '₹50L',   label: 'Maximum Loan Amount' },
              { value: '10.5%',  label: 'Interest Rate p.a.' },
              { value: '48 hrs', label: 'Average Disbursal' },
            ].map((s, i) => (
              <div key={s.label} style={{
                paddingLeft: i === 0 ? 0 : 32,
                marginLeft:  i === 0 ? 0 : 32,
                borderLeft:  i === 0 ? 'none' : '1px solid rgba(196,153,58,0.18)',
                marginBottom: 8,
              }}>
                <div style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700, fontSize: 28,
                  color: GOLD_L,
                  lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 11, color: 'rgba(255,255,255,0.35)',
                  fontWeight: 500, marginTop: 6,
                  letterSpacing: '0.04em', fontFamily: 'Inter',
                  textTransform: 'uppercase',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 36 }}>
            <button
              onClick={() => scrollTo('#customer-register')}
              className="btn-gold-formal"
              style={{ height: 48, paddingInline: 32, fontSize: 14, fontWeight: 700, letterSpacing: '0.03em' }}
            >
              Apply Now
            </button>
            <a
              href="tel:+919876543210"
              style={{
                height: 48, paddingInline: 24, display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 500, letterSpacing: '0.02em',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: 3, color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none', fontFamily: 'Inter',
                transition: 'border-color .15s, color .15s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(196,153,58,0.50)'; el.style.color = '#fff'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.22)'; el.style.color = 'rgba(255,255,255,0.75)'; }}
            >
              Speak to an Advisor
            </a>
          </div>

          {/* Trust strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 28px' }}>
            {TRUST.map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Icon size={12} color={GOLD} />
                <span style={{
                  fontSize: 12, color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'Inter', fontWeight: 500,
                }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Application teaser */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
        >
          <HeroForm />
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
