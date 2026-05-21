import React from 'react';
import { motion } from 'framer-motion';
import { Network, Sparkles, UserCheck, Zap } from 'lucide-react';

const REASONS = [
  { icon: Network,    title: '50+ Lenders, 1 Smart Application', desc: 'Submit once and get matched across our entire lender network — banks, NBFCs, SFBs, and HFCs.' },
  { icon: Sparkles,   title: 'AI-Powered Advisory',               desc: 'Our eligibility engine analyses your profile and recommends the best-fit lenders for faster approvals.' },
  { icon: UserCheck,  title: 'Dedicated Relationship Manager',     desc: 'A dedicated RM guides you from application to disbursal — by call, WhatsApp, and email.' },
  { icon: Zap,        title: '48-Hour Disbursal',                  desc: 'Digital documentation and deep lender integrations mean most loans disburse within 48 hours.' },
];

const WhyChooseUs: React.FC = () => (
  <section id="why-us" style={{ background: '#F8FAFC', padding: '88px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <span style={{ display: 'inline-block', background: 'rgba(10,31,68,.07)', color: '#0A1F44', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100, marginBottom: 12 }}>Why Us</span>
        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: '#0A1F44', margin: '8px 0' }}>
          Why Choose Real Money Advisory
        </h2>
        <p style={{ color: '#64748B', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
          Technology + expertise + wide lender network — we get you the best deal, every time.
        </p>
      </div>

      <div className="grid-4">
        {REASONS.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.09 }}
              style={{ textAlign: 'center', padding: '0 8px' }}
            >
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(212,175,55,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Icon size={28} color="#D4AF37" />
              </div>
              <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 16, color: '#0A1F44', margin: '0 0 10px' }}>{r.title}</h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, margin: 0 }}>{r.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
