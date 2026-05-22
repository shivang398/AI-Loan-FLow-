import React from 'react';
import { motion } from 'framer-motion';
import { Target, Sparkles, UserCheck, Zap } from 'lucide-react';

const REASONS = [
  {
    icon: Target,
    title: 'Personal Loan Specialists',
    desc: 'We focus on personal loans — deep expertise, strong lender relationships, and the best rates. Not a generalist broker.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Eligibility Check',
    desc: 'Our eligibility engine analyses your profile in seconds and matches you with the best-fit offer for faster approval.',
  },
  {
    icon: UserCheck,
    title: 'Dedicated Relationship Manager',
    desc: 'A dedicated RM guides you from application to disbursal — by call, WhatsApp, and email. One person, full accountability.',
  },
  {
    icon: Zap,
    title: '48-Hour Disbursal',
    desc: 'Digital documentation and direct lender integrations mean most personal loans disburse within 48 hours of document submission.',
  },
];

const WhyChooseUs: React.FC = () => (
  <section id="why-us" style={{ background: '#F8FAFC', padding: '96px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <span style={{ display: 'inline-block', background: 'rgba(10,31,68,.07)', color: '#0A1F44', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100, marginBottom: 12 }}>
          Why Us
        </span>
        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 3vw, 42px)', color: '#0A1F44', margin: '8px 0 16px' }}>
          Why Choose Real Money
        </h2>
        <p style={{ color: '#64748B', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          Expertise + technology + transparency — we get you the best personal loan deal, every time.
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
              style={{
                textAlign: 'center',
                padding: '32px 20px',
                background: '#fff',
                borderRadius: 20,
                border: '1.5px solid #E2E8F0',
                transition: 'border-color .2s, box-shadow .2s',
              }}
              whileHover={{ y: -6 }}
            >
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(212,175,55,.12)', border: '1.5px solid rgba(212,175,55,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px' }}>
                <Icon size={28} color="#D4AF37" />
              </div>
              <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 16, color: '#0A1F44', margin: '0 0 12px', lineHeight: 1.3 }}>{r.title}</h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.75, margin: 0 }}>{r.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
