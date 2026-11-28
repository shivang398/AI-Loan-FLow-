import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { C, DISPLAY, SANS } from '../theme';
import CreditReportCheck from './CreditReportCheck';

// Facts about Real Money itself — rates and disbursal times belong to the lenders, not the DSA
const FACTS = [
  { value: '₹0',  label: 'Advisory fee' },
];

const POINTS = [
  'Offers from leading banks & NBFCs with one application',
  'Free for borrowers — lenders pay our fee',
  'A personal advisor from application to disbursal',
];

/** Faint engraved line pattern, static — texture, not decoration */
const Engraving: React.FC = () => (
  <svg viewBox="-400 -400 800 800" aria-hidden
    style={{ position: 'absolute', right: -260, top: '50%', width: 900, height: 900, marginTop: -450, opacity: 0.07, pointerEvents: 'none' }}>
    {Array.from({ length: 48 }, (_, i) => (
      <ellipse key={i} rx="360" ry="140" fill="none" stroke={C.gold} strokeWidth="0.8" transform={`rotate(${i * 3.75})`} />
    ))}
  </svg>
);

const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const enter = (delay: number) => reduce ? {} : {
    initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section id="hero" style={{
      position: 'relative', overflow: 'hidden',
      background: `radial-gradient(ellipse 60% 70% at 85% 50%, ${C.navySoft} 0%, ${C.midnight} 65%)`,
      padding: 'clamp(56px, 7vw, 96px) 0',
    }}>
      <Engraving />
      <div className="lp-hero-grid" style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        {/* Promise */}
        <div className="lp-hero-copy">
          <motion.p {...enter(0)} style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.gold, margin: 0 }}>
            Authorised Corporate DSA · Personal loans
          </motion.p>

          <motion.h1 {...enter(0.08)} style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(42px, 5.4vw, 70px)', lineHeight: 1.04, color: C.onDark, margin: '18px 0 0' }}>
            The right lender,<br />
            <em className="lp-gold-text" style={{ fontStyle: 'italic' }}>found for you.</em>
          </motion.h1>

          <motion.p {...enter(0.16)} style={{ fontFamily: SANS, fontSize: 'clamp(16px, 1.4vw, 18px)', lineHeight: 1.7, color: C.onDarkDim, margin: '22px 0 0', maxWidth: 520 }}>
            Apply once. We compare personal-loan offers from leading banks and NBFCs,
            help you choose the best one and handle the paperwork until the money reaches you.
          </motion.p>
        </div>

        {/* Proof — on phones this drops below the form */}
        <div className="lp-hero-proof">
          <motion.ul {...enter(0.24)} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
            {POINTS.map(p => (
              <li key={p} style={{ display: 'flex', gap: 12, alignItems: 'center', fontFamily: SANS, fontSize: 15, color: C.onDark }}>
                <span style={{ width: 22, height: 22, flexShrink: 0, borderRadius: '50%', border: `1px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={13} color={C.goldLight} strokeWidth={2.4} />
                </span>
                {p}
              </li>
            ))}
          </motion.ul>

          <motion.div {...enter(0.32)} style={{ display: 'flex', gap: 'clamp(24px, 4vw, 48px)', marginTop: 36, paddingTop: 26, borderTop: '1px solid rgba(201,160,74,0.22)', flexWrap: 'wrap' }}>
            {FACTS.map(f => (
              <div key={f.label}>
                <div style={{ fontFamily: DISPLAY, fontSize: 38, fontWeight: 600, lineHeight: 1, color: C.goldLight }}>{f.value}</div>
                <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.onDarkDim, marginTop: 8 }}>{f.label}</div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Credit report check */}
        <motion.div {...enter(0.2)} className="lp-hero-form">
          <CreditReportCheck />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
