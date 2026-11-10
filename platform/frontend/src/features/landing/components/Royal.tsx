import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { C, DISPLAY, SANS } from '../theme';

/** Gold rule with a diamond centrepiece — the page's signature ornament */
export const Ornament: React.FC<{ width?: number; onDark?: boolean; style?: React.CSSProperties }> = ({ width = 180, onDark, style }) => (
  <div aria-hidden style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, ...style }}>
    <span style={{ height: 1, width: width / 2 - 14, background: `linear-gradient(90deg, transparent, ${C.gold})` }} />
    <svg width="14" height="14" viewBox="0 0 14 14">
      <path d="M7 0 L14 7 L7 14 L0 7 Z" fill="none" stroke={C.gold} strokeWidth="1.2" />
      <path d="M7 4 L10 7 L7 10 L4 7 Z" fill={onDark ? C.goldLight : C.gold} />
    </svg>
    <span style={{ height: 1, width: width / 2 - 14, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
  </div>
);

/** Gold monogram crest */
export const Crest: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
    <defs>
      <linearGradient id="crest-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={C.goldLight} />
        <stop offset="0.5" stopColor={C.gold} />
        <stop offset="1" stopColor={C.goldDeep} />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="none" stroke="url(#crest-gold)" strokeWidth="1.2" />
    <circle cx="32" cy="32" r="25.5" fill="none" stroke="url(#crest-gold)" strokeWidth="0.6" strokeDasharray="1.5 2.5" />
    {/* laurel ticks around the ring */}
    {Array.from({ length: 24 }, (_, i) => {
      const a = (i / 24) * Math.PI * 2;
      return <line key={i} x1={32 + Math.cos(a) * 27.5} y1={32 + Math.sin(a) * 27.5} x2={32 + Math.cos(a) * 29} y2={32 + Math.sin(a) * 29} stroke={C.gold} strokeWidth="0.8" opacity="0.7" />;
    })}
    <text x="32" y="39.5" textAnchor="middle" fontFamily='"Cormorant Garamond", Georgia, serif' fontWeight="700" fontSize="21" fill="url(#crest-gold)" letterSpacing="1">RM</text>
  </svg>
);

/** Small-caps eyebrow + display title + ornament, used by every light section */
export const SectionHeading: React.FC<{ eyebrow: string; title: React.ReactNode; intro?: string; onDark?: boolean }> = ({ eyebrow, title, intro, onDark }) => (
  <Reveal style={{ textAlign: 'center' }}>
    <p style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.32em', textTransform: 'uppercase', color: C.gold, margin: 0 }}>{eyebrow}</p>
    <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(34px, 4.2vw, 50px)', lineHeight: 1.1, color: onDark ? C.onDark : C.navy, margin: '14px 0 0' }}>{title}</h2>
    <Ornament style={{ marginTop: 18 }} onDark={onDark} />
    {intro && <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.75, color: onDark ? C.onDarkDim : C.muted, margin: '18px auto 0', maxWidth: 560 }}>{intro}</p>}
  </Reveal>
);

/** Fade-up on scroll; static for visitors who prefer reduced motion */
export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }> = ({ children, delay = 0, style, className }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div style={style} className={className}>{children}</div>;
  return (
    <motion.div
      className={className} style={style}
      initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/** Gold corner brackets framing a card */
export const GoldCorners: React.FC<{ inset?: number; size?: number }> = ({ inset = 10, size = 18 }) => {
  const s = (pos: React.CSSProperties, borders: React.CSSProperties) => (
    <span aria-hidden style={{ position: 'absolute', width: size, height: size, pointerEvents: 'none', ...pos, ...borders }} />
  );
  const b = `1px solid ${C.gold}`;
  return (
    <>
      {s({ top: inset, left: inset }, { borderTop: b, borderLeft: b })}
      {s({ top: inset, right: inset }, { borderTop: b, borderRight: b })}
      {s({ bottom: inset, left: inset }, { borderBottom: b, borderLeft: b })}
      {s({ bottom: inset, right: inset }, { borderBottom: b, borderRight: b })}
    </>
  );
};
