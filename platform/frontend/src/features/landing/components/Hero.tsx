import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Phone, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { C, DISPLAY, SANS, scrollToId } from '../theme';
import { GoldCorners } from './Royal';
import { sendPrefill } from '../prefill';

// Facts about Real Money itself — rates and disbursal times belong to the lenders, not the DSA
const FACTS = [
  { value: '50+', label: 'Lending partners' },
  { value: '22+', label: 'Years in lending' },
  { value: '₹0',  label: 'Advisory fee' },
];

const POINTS = [
  'Offers from 50+ banks & NBFCs with one application',
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

const digits = (v: string, max: number) => v.replace(/\D/g, '').slice(0, max);
const inrDisplay = (v: string) => (v ? Number(v).toLocaleString('en-IN') : '');

const field: React.CSSProperties = {
  width: '100%', height: 48, padding: '0 14px', border: `1px solid ${C.line}`, borderRadius: 2, background: C.white,
  fontFamily: SANS, fontSize: 15, color: C.navy, outline: 'none', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = { display: 'block', fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted, marginBottom: 7 };

const QuickOffer: React.FC = () => {
  const [profession, setProfession] = useState<'SALARIED' | 'SELF_EMPLOYED'>('SALARIED');
  const [amount, setAmount] = useState('');
  const [income, setIncome] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(amount) < 50000) return setError('Enter a loan amount of at least ₹50,000.');
    if (!Number(income)) return setError('Enter your monthly income.');
    if (!/^[6-9]\d{9}$/.test(mobile)) return setError('Enter a valid 10-digit mobile number.');
    setError('');
    sendPrefill({ loanAmount: amount, netMonthlySalary: income, profession, mobile });
    scrollToId('apply');
  };

  return (
    <form onSubmit={submit} noValidate style={{ position: 'relative', background: C.ivory, padding: 'clamp(26px, 3vw, 36px)', borderTop: `3px solid ${C.gold}`, boxShadow: '0 30px 70px rgba(0,0,0,0.35)' }}>
      <GoldCorners inset={8} size={14} />
      <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 30, color: C.navy, margin: 0, lineHeight: 1.15 }}>Check your loan offer</h2>
      <p style={{ fontFamily: SANS, fontSize: 13.5, color: C.muted, margin: '6px 0 22px' }}>Personal loans · takes under a minute</p>

      <span style={labelStyle}>I am</span>
      <div role="radiogroup" aria-label="Employment type" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: 18, border: `1px solid ${C.line}` }}>
        {([['SALARIED', 'Salaried'], ['SELF_EMPLOYED', 'Self-employed']] as const).map(([value, text]) => {
          const on = profession === value;
          return (
            <button key={value} type="button" role="radio" aria-checked={on} onClick={() => setProfession(value)} style={{
              height: 44, border: 'none', cursor: 'pointer', fontFamily: SANS, fontSize: 14, fontWeight: 600,
              background: on ? C.navy : C.white, color: on ? C.goldLight : C.ink, transition: 'background .2s',
            }}>{text}</button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
        <label>
          <span style={labelStyle}>Loan amount</span>
          <input style={field} inputMode="numeric" placeholder="₹ 5,00,000" value={amount ? `₹ ${inrDisplay(amount)}` : ''} onChange={e => setAmount(digits(e.target.value, 8))} />
        </label>
        <label>
          <span style={labelStyle}>Monthly income</span>
          <input style={field} inputMode="numeric" placeholder="₹ 50,000" value={income ? `₹ ${inrDisplay(income)}` : ''} onChange={e => setIncome(digits(e.target.value, 8))} />
        </label>
      </div>

      <label style={{ display: 'block', marginBottom: 6 }}>
        <span style={labelStyle}>Mobile number</span>
        <div style={{ display: 'flex' }}>
          <span style={{ ...field, width: 'auto', display: 'flex', alignItems: 'center', borderRight: 'none', background: C.parchment, color: C.muted }}>+91</span>
          <input style={field} inputMode="tel" autoComplete="tel-national" placeholder="98xxxxxxxx" value={mobile} onChange={e => setMobile(digits(e.target.value, 10))} />
        </div>
      </label>

      <div role="alert" style={{ minHeight: 20, fontFamily: SANS, fontSize: 12.5, color: '#9B2C2C', margin: '6px 0 8px' }}>{error}</div>

      <button type="submit" className="lp-btn lp-btn-gold" style={{ width: '100%', height: 52 }}>
        Check my offers <ArrowRight size={15} />
      </button>
      <p style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontFamily: SANS, fontSize: 12, lineHeight: 1.55, color: C.muted, margin: '14px 0 0' }}>
        <ShieldCheck size={15} color={C.goldDeep} style={{ flexShrink: 0, marginTop: 1 }} />
        Free and no obligation. By continuing you agree to be contacted by Real Money about your loan.
      </p>
    </form>
  );
};

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

          <motion.div {...enter(0.4)} style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginTop: 28, fontFamily: SANS, fontSize: 14 }}>
            <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.onDark, textDecoration: 'none' }}>
              <Phone size={15} color={C.gold} /> +91 98765 43210
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.onDark, textDecoration: 'none' }}>
              <MessageCircle size={15} color={C.gold} /> Chat with an advisor
            </a>
          </motion.div>
        </div>

        {/* Lead capture */}
        <motion.div {...enter(0.2)} className="lp-hero-form">
          <QuickOffer />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
