import React from 'react';
import { motion } from 'framer-motion';
import { Target, Sparkles, UserCheck, Zap } from 'lucide-react';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';
const GOLD_L = '#E8C870';

const REASONS = [
  {
    icon: Target,
    title: 'Personal Loan Specialists',
    desc: 'We focus exclusively on personal loans — deep expertise, strong lender relationships, and consistently better rates than generalist brokers.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Eligibility Check',
    desc: 'Our eligibility engine analyses your profile in seconds and matches you with the best-fit offer for faster approval.',
  },
  {
    icon: UserCheck,
    title: 'Dedicated Relationship Manager',
    desc: 'A dedicated RM guides you from application to disbursal — by call, WhatsApp, and email. One person. Full accountability.',
  },
  {
    icon: Zap,
    title: '48-Hour Disbursal',
    desc: 'Digital documentation and direct lender integrations mean most personal loans disburse within 48 hours of document submission.',
  },
];

const WhyChooseUs: React.FC = () => (
  <section id="why-us" style={{ background: '#FFFFFF', padding: '96px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>

      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <span className="section-badge" style={{ marginBottom: 18 }}>Why Choose Us</span>
        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 3vw, 42px)',
          color: NAVY, margin: '14px 0 16px', letterSpacing: '-0.01em',
        }}>
          Why Choose Real Money
        </h2>
        <p style={{
          color: '#3A506B', fontSize: 16, maxWidth: 480,
          margin: '0 auto', lineHeight: 1.8, fontFamily: 'Inter',
        }}>
          Expertise + technology + transparency — we get you the best personal loan deal, every time.
        </p>
        <div style={{
          width: 48, height: 2,
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
          margin: '24px auto 0', borderRadius: 1,
        }} />
      </div>

      <div className="grid-4">
        {REASONS.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.38, delay: i * 0.09 }}
              style={{
                padding: '32px 26px',
                background: '#F8FAFD',
                border: '1px solid #D3DCE8',
                borderRadius: 4,
                borderTop: `3px solid transparent`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(11,30,61,0.09)' }}
            >
              {/* Hover accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
                opacity: 0,
                transition: 'opacity 0.2s',
              }} className="card-accent-line" />

              <div style={{
                width: 56, height: 56, borderRadius: 4,
                background: NAVY,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 22,
              }}>
                <Icon size={24} color={GOLD} />
              </div>

              <h3 style={{
                fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                fontWeight: 700, fontSize: 15.5,
                color: NAVY, margin: '0 0 12px', letterSpacing: '-0.01em', lineHeight: 1.3,
              }}>
                {r.title}
              </h3>
              <p style={{
                fontSize: 14, color: '#3A506B',
                lineHeight: 1.8, margin: 0, fontFamily: 'Inter',
              }}>
                {r.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
