import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, LayoutDashboard, BadgeCheck } from 'lucide-react';

const BENEFITS = [
  { icon: TrendingUp,      label: 'Best-in-Class Commissions' },
  { icon: BadgeCheck,      label: 'Exclusive Lender Access' },
  { icon: LayoutDashboard, label: 'Tech-Enabled Dashboard' },
];

const ChannelPartnerCTA: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section id="partner" style={{ background: 'linear-gradient(150deg, #040d1e 0%, #0A1F44 50%, #0f2a5a 100%)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5 }}>
          <span style={{ display: 'inline-block', background: 'rgba(212,175,55,.14)', border: '1px solid rgba(212,175,55,.28)', color: '#D4AF37', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: 100, marginBottom: 24 }}>
            Partner With Us
          </span>
          <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 46px)', color: '#FFFFFF', margin: '0 0 20px', lineHeight: 1.15 }}>
            Financial Advisor, Tax Consultant,{' '}
            <span style={{ color: '#D4AF37' }}>or Sub-DSA?</span>
          </h2>
          <p style={{ fontSize: 17, color: '#64748B', lineHeight: 1.8, margin: '0 0 40px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            Join the Real Money Channel Partner Network. Get access to exclusive lenders, earn industry-best commissions, and serve your clients with a powerful tech platform — all free to join.
          </p>

          {/* Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
            {BENEFITS.map(b => {
              const Icon = b.icon;
              return (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(212,175,55,.1)', border: '1px solid rgba(212,175,55,.25)', borderRadius: 100, padding: '9px 22px' }}>
                  <Icon size={15} color="#D4AF37" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#D4AF37' }}>{b.label}</span>
                </div>
              );
            })}
          </div>

          <Button size="large" onClick={() => navigate('/partners/register')}
            style={{ height: 56, paddingInline: 48, borderRadius: 14, fontWeight: 800, fontSize: 16, background: '#D4AF37', borderColor: '#D4AF37', color: '#0A1F44', boxShadow: '0 8px 36px rgba(212,175,55,.35)' }}>
            Become a Channel Partner →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ChannelPartnerCTA;
