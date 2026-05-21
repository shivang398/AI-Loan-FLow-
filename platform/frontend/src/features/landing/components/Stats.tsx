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

  const display = target === 0 ? '—' : isDecimal ? val.toFixed(1) : val.toLocaleString('en-IN');
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

const Stats: React.FC = () => (
  <section id="stats" style={{ background: '#0A1F44', padding: '80px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      {/* <!-- TODO: Update stats with real numbers before going live --> */}
      <div className="stat-grid">
        {STATS.map((s, i) => (
          <motion.div key={s.label} style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.45, delay: i * 0.07 }}>
            <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 42px)', color: '#D4AF37', lineHeight: 1, marginBottom: 8 }}>
              <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} isDecimal={!Number.isInteger(s.value)} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#94A3B8', letterSpacing: '0.02em' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
