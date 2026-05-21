import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Network, LayoutDashboard } from 'lucide-react';

const BENEFITS = [
  { icon: TrendingUp,      label: 'Higher Commissions' },
  { icon: Network,         label: '50+ Lender Access' },
  { icon: LayoutDashboard, label: 'Tech-Enabled Dashboard' },
];

const ChannelPartnerCTA: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section id="partner" style={{ background: 'linear-gradient(135deg, #071730 0%, #0A1F44 50%, #12306a 100%)', padding: '96px 0' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5 }}>
          <span style={{ display: 'inline-block', background: 'rgba(212,175,55,.18)', border: '1px solid rgba(212,175,55,.3)', color: '#D4AF37', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: 100, marginBottom: 20 }}>
            Partner With Us
          </span>
          <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#FFFFFF', margin: '0 0 18px', lineHeight: 1.2 }}>
            Are you a Financial Advisor,<br />
            <span style={{ color: '#D4AF37' }}>Tax Consultant, or Sub-DSA?</span>
          </h2>
          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.75, margin: '0 0 36px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            Join our Channel Partner Network. Access 50+ lenders, earn industry-best commissions, and serve your clients with a powerful tech platform.
          </p>

          {/* Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 44 }}>
            {BENEFITS.map(b => {
              const Icon = b.icon;
              return (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(212,175,55,.14)', border: '1px solid rgba(212,175,55,.3)', borderRadius: 100, padding: '8px 20px' }}>
                  <Icon size={15} color="#D4AF37" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#D4AF37' }}>{b.label}</span>
                </div>
              );
            })}
          </div>

          <Button size="large" onClick={() => navigate('/partners/register')}
            style={{ height: 54, paddingInline: 40, borderRadius: 12, fontWeight: 800, fontSize: 16, background: '#D4AF37', borderColor: '#D4AF37', color: '#0A1F44', boxShadow: '0 8px 32px rgba(212,175,55,.35)' }}>
            Become a Channel Partner →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ChannelPartnerCTA;
