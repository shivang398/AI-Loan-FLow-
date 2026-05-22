import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '../constants/landingData';
import '../styles/landing.css';

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
  <section id="stats" style={{ background: 'linear-gradient(135deg, #071730 0%, #0A1F44 60%, #0f2a5a 100%)', padding: '88px 0', position: 'relative', overflow: 'hidden' }}>
    {/* Decorative */}
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
      <div className="stat-grid">
        {STATS.map((s, i) => (
          <motion.div key={s.label} style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.45, delay: i * 0.07 }}>
            <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 3vw, 40px)', color: '#D4AF37', lineHeight: 1, marginBottom: 10 }}>
              <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} isDecimal={!Number.isInteger(s.value)} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#64748B', letterSpacing: '0.02em', lineHeight: 1.4 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
