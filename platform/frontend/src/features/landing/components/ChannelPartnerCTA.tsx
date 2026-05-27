import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, LayoutDashboard, BadgeCheck, ArrowRight } from 'lucide-react';

const BENEFITS = [
  { icon: TrendingUp,      label: 'Best-in-Class Commissions' },
  { icon: BadgeCheck,      label: 'Exclusive Lender Network Access' },
  { icon: LayoutDashboard, label: 'Technology-Enabled Dashboard' },
];

const ChannelPartnerCTA: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section id="partner" style={{ background: '#0A1F44', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <span style={{
            display: 'inline-block', background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.75)',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
            padding: '4px 16px', borderRadius: 4, marginBottom: 24,
          }}>
            Partner Programme
          </span>

          <h2 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800,
            fontSize: 'clamp(26px, 3.5vw, 42px)', color: '#ffffff', margin: '0 0 18px', lineHeight: 1.2,
          }}>
            Financial Advisor, CA, or Sub-DSA?
            <br />
            <span style={{ color: '#93C5FD' }}>Join Our Channel Partner Network.</span>
          </h2>

          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, margin: '0 0 36px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            Partner with Real Money to serve your clients with exclusive lender access, competitive commissions, and a fully digital management platform — free to join.
          </p>

          {/* Benefits */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {BENEFITS.map(b => {
              const Icon = b.icon;
              return (
                <div key={b.label} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6, padding: '8px 18px',
                }}>
                  <Icon size={14} color="#93C5FD" />
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{b.label}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Button
              size="large"
              onClick={() => navigate('/partners/register')}
              style={{
                height: 52, paddingInline: 40, borderRadius: 8,
                fontWeight: 700, fontSize: 15,
                background: '#ffffff', borderColor: '#ffffff', color: '#0A1F44',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              Register as Channel Partner <ArrowRight size={15} />
            </Button>
          </div>

          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 14 }}>
            Free to join · No upfront investment · Start earning immediately
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ChannelPartnerCTA;
