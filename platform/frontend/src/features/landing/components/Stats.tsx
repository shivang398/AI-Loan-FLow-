import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '../constants/landingData';
import '../styles/landing.css';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';

const Counter: React.FC<{ target: number; prefix: string; suffix: string; isDecimal?: boolean }> = ({ target, prefix, suffix, isDecimal }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || target === 0) return;
    const steps = 60; const dur = 1800;
    let cur = 0;
    const timer = setInterval(() => {
      cur += target / steps;
      if (cur >= target) { setVal(target); clearInterval(timer); }
      else setVal(isDecimal ? parseFloat(cur.toFixed(1)) : Math.floor(cur));
    }, dur / steps);
    return () => clearInterval(timer);
  }, [inView, target, isDecimal]);

  const display = target === 0
    ? (suffix === '' && prefix === '₹' ? 'Zero' : '—')
    : isDecimal ? val.toFixed(1) : val.toLocaleString('en-IN');

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

const Stats: React.FC = () => (
  <section id="stats" style={{
    background: `linear-gradient(160deg, #060F20 0%, ${NAVY} 60%, #0E2545 100%)`,
    padding: '80px 0',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Subtle grid */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `linear-gradient(rgba(196,153,58,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(196,153,58,0.03) 1px, transparent 1px)`,
      backgroundSize: '48px 48px',
    }} />

    {/* Gold bottom line */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)`,
    }} />

    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '5px 16px', marginBottom: 18,
          border: `1px solid rgba(196,153,58,0.25)`,
          borderRadius: 2,
          background: 'rgba(196,153,58,0.06)',
        }}>
          <span style={{
            width: 14, height: 1, background: GOLD, display: 'inline-block',
          }} />
          <span style={{
            fontSize: 11, fontWeight: 700, color: GOLD,
            letterSpacing: '0.10em', textTransform: 'uppercase', fontFamily: 'Inter',
          }}>
            By the Numbers
          </span>
        </div>
        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700, fontSize: 'clamp(24px, 2.5vw, 36px)',
          color: '#ffffff', margin: 0, letterSpacing: '-0.01em',
        }}>
          Numbers That Speak for Themselves
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginTop: 10, fontFamily: 'Inter' }}>
          Real impact. Real borrowers. Real outcomes.
        </p>
      </div>

      <div className="stat-grid">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            style={{
              textAlign: 'center', padding: '32px 16px',
              background: 'rgba(255,255,255,0.025)',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.38, delay: i * 0.07 }}
          >
            <div className="gold-number" style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: 'clamp(26px, 3vw, 38px)',
              lineHeight: 1, marginBottom: 10,
            }}>
              <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} isDecimal={!Number.isInteger(s.value)} />
            </div>
            <div style={{
              fontSize: 12, fontWeight: 500,
              color: 'rgba(255,255,255,0.38)',
              letterSpacing: '0.04em', lineHeight: 1.4,
              fontFamily: 'Inter', textTransform: 'uppercase',
            }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
