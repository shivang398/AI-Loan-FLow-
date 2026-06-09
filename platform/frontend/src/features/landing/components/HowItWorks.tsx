import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Layers, Upload, BadgeCheck } from 'lucide-react';
import '../styles/landing.css';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';
const GOLD_L = '#E8C870';

const STEPS = [
  {
    n: '01',
    icon: MessageSquare,
    title: 'Share Your Requirement',
    desc: 'Tell us your loan amount, employment type, and monthly income using our secure, structured application form.',
  },
  {
    n: '02',
    icon: Layers,
    title: 'Get Best-Fit Offer',
    desc: 'Our advisory team evaluates your profile and presents the most suitable personal loan offer from our lender network.',
  },
  {
    n: '03',
    icon: Upload,
    title: 'Submit Documents',
    desc: 'Upload KYC and income proof securely through our digital portal. No branch visits. No physical paperwork.',
  },
  {
    n: '04',
    icon: BadgeCheck,
    title: 'Receive Disbursal',
    desc: 'Loan amount disbursed directly to your bank account — typically within 48 hours of document verification.',
  },
];

const HowItWorks: React.FC = () => (
  <section id="how-it-works" style={{ background: '#F3F6FA', padding: '96px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>

      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <span className="section-badge" style={{ marginBottom: 18 }}>The Process</span>
        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 3vw, 42px)',
          color: NAVY, margin: '14px 0 16px', letterSpacing: '-0.01em',
        }}>
          How It Works
        </h2>
        <p style={{
          color: '#3A506B', fontSize: 16, maxWidth: 440,
          margin: '0 auto', lineHeight: 1.8, fontFamily: 'Inter',
        }}>
          From application to disbursal in four structured steps — simple, digital, and fully transparent.
        </p>
        <div style={{
          width: 48, height: 2,
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
          margin: '24px auto 0', borderRadius: 1,
        }} />
      </div>

      <div className="steps-grid">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.38, delay: i * 0.1 }}
              style={{
                padding: '36px 32px',
                background: '#FFFFFF',
                border: '1px solid #D3DCE8',
                borderRadius: 0,
                borderLeft: i === 0 ? '1px solid #D3DCE8' : 'none',
                position: 'relative',
                borderTop: i < 2 ? '3px solid transparent' : '3px solid transparent',
              }}
            >
              {/* Active top border for first step */}
              {i === 0 && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
                }} />
              )}

              {/* Step number — large background watermark */}
              <div style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: 64,
                color: 'rgba(11,30,61,0.04)',
                lineHeight: 1,
                position: 'absolute',
                top: 18, right: 22,
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
                {step.n}
              </div>

              {/* Step number badge */}
              <div style={{
                width: 38, height: 38, borderRadius: 2,
                background: NAVY,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <span style={{
                  fontSize: 13, fontWeight: 700, color: GOLD,
                  fontFamily: '"Playfair Display", serif', lineHeight: 1,
                }}>
                  {step.n}
                </span>
              </div>

              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 3,
                background: '#F3F6FA', border: '1px solid #D3DCE8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}>
                <Icon size={18} color={NAVY} />
              </div>

              <h3 style={{
                fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                fontWeight: 700, fontSize: 15.5,
                color: NAVY, margin: '0 0 10px', letterSpacing: '-0.01em',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: 13.5, color: '#3A506B',
                lineHeight: 1.8, margin: 0, fontFamily: 'Inter',
              }}>
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorks;
