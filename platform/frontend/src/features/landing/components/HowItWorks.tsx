import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Layers, Upload, BadgeCheck } from 'lucide-react';
import '../styles/landing.css';

const STEPS = [
  {
    n: 1,
    icon: MessageSquare,
    title: 'Share Your Requirement',
    desc: 'Tell us your loan amount, employment type, and monthly income using our secure, structured application form.',
  },
  {
    n: 2,
    icon: Layers,
    title: 'Get Best-Fit Offer',
    desc: 'Our advisory team evaluates your profile and presents the most suitable personal loan offer from our lender network.',
  },
  {
    n: 3,
    icon: Upload,
    title: 'Submit Documents',
    desc: 'Upload KYC and income proof securely through our digital portal. No branch visits. No physical paperwork.',
  },
  {
    n: 4,
    icon: BadgeCheck,
    title: 'Receive Disbursal',
    desc: 'Loan amount disbursed directly to your bank account — typically within 48 hours of document verification.',
  },
];

const HowItWorks: React.FC = () => (
  <section id="how-it-works" style={{ background: '#F9FAFB', padding: '96px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <span style={{
          display: 'inline-block', background: '#EFF6FF', color: '#2563EB',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 4, marginBottom: 14,
        }}>
          The Process
        </span>
        <h2 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800,
          fontSize: 'clamp(28px, 3vw, 40px)', color: '#0A1F44', margin: '0 0 12px',
        }}>
          How It Works
        </h2>
        <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 440, margin: '0 auto', lineHeight: 1.75 }}>
          From application to disbursal in four structured steps — simple, digital, and fully transparent.
        </p>
      </div>

      <div className="steps-grid">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ textAlign: 'center', position: 'relative' }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute', top: 28, left: '55%', right: '-45%',
                  height: 1, background: '#E5E7EB', zIndex: 0,
                }} className="hide-on-mobile" />
              )}

              {/* Step circle */}
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#0A1F44',
                border: '4px solid #ffffff',
                boxShadow: '0 0 0 1px #E5E7EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', position: 'relative', zIndex: 1,
              }}>
                <span style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: 18, fontWeight: 800, color: '#ffffff', lineHeight: 1,
                }}>{step.n}</span>
              </div>

              {/* Icon */}
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: '#ffffff', border: '1.5px solid #E5E7EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 2px 6px rgba(0,0,0,.04)',
              }}>
                <Icon size={18} color="#2563EB" />
              </div>

              <h3 style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700,
                fontSize: 15, color: '#0A1F44', margin: '0 0 10px',
              }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.75, margin: 0 }}>
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
