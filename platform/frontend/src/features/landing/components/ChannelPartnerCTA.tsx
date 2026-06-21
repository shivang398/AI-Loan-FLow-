import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, TrendingUp, ArrowRight } from 'lucide-react';

const GOLD  = '#C4993A';
const GOLD_L = '#E8C870';

const PERKS = [
  { icon: Briefcase, label: '6 Open Positions' },
  { icon: Users,     label: 'Collaborative Culture' },
  { icon: TrendingUp, label: 'Fast-Growing Platform' },
];

const ChannelPartnerCTA: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section id="careers-cta" style={{ background: '#0B1E3D', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(196,153,58,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,153,58,0.03) 1px, transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)` }} />

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <span style={{
            display: 'inline-block', background: `rgba(196,153,58,0.12)`,
            border: `1px solid rgba(196,153,58,0.30)`, color: GOLD,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase',
            padding: '4px 16px', marginBottom: 24,
          }}>
            We're Hiring
          </span>

          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700,
            fontSize: 'clamp(26px, 3.5vw, 42px)', color: '#ffffff', margin: '0 0 18px', lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            Want to Help Shape the Future<br />
            <span style={{ background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_L} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              of Credit in India?
            </span>
          </h2>

          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.50)', lineHeight: 1.85, margin: '0 0 36px', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            We're a fast-growing fintech DSA looking for sharp operators, analysts, and builders. Join a team that has disbursed ₹50 Cr+ and is just getting started.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {PERKS.map(b => {
              const Icon = b.icon;
              return (
                <div key={b.label} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  padding: '8px 18px',
                }}>
                  <Icon size={14} color={GOLD} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{b.label}</span>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => navigate('/careers')}
            style={{
              height: 52, paddingInline: 40, border: 'none',
              background: GOLD, color: '#fff',
              fontWeight: 700, fontSize: 15, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#B08830')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = GOLD)}
          >
            View Open Roles <ArrowRight size={16} />
          </button>

          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 16 }}>
            Full-time · Jaipur &amp; Remote · Apply in under 2 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ChannelPartnerCTA;
