import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Layers, Upload, BadgeCheck } from 'lucide-react';
import '../styles/landing.css';

const STEPS = [
  { n: 1, icon: MessageSquare, title: 'Share Your Requirement',     desc: 'Tell us your loan type, amount, and income details using our simple form.' },
  { n: 2, icon: Layers,        title: 'Get Instant Lender Match',   desc: 'Our AI matches your profile against 50+ lenders and shows best-fit offers.' },
  { n: 3, icon: Upload,        title: 'Upload Documents Digitally', desc: 'Upload KYC and income documents securely through our online portal.' },
  { n: 4, icon: BadgeCheck,    title: 'Receive Disbursal',          desc: 'Loan disbursed directly to your account — typically within 48 hours.' },
];

const HowItWorks: React.FC = () => (
  <section id="how-it-works" style={{ background: '#fff', padding: '88px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <span style={{ display: 'inline-block', background: 'rgba(10,31,68,.07)', color: '#0A1F44', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100, marginBottom: 12 }}>The Process</span>
        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: '#0A1F44', margin: '8px 0' }}>How It Works</h2>
        <p style={{ color: '#64748B', fontSize: 16 }}>4 simple steps from requirement to disbursal</p>
      </div>

      <div className="steps-grid">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              style={{ textAlign: 'center', position: 'relative' }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div style={{ position: 'absolute', top: 40, left: '55%', right: '-45%', height: 2, background: 'linear-gradient(to right, #D4AF37, rgba(212,175,55,.2))', zIndex: 0 }} className="hide-on-mobile" />
              )}

              {/* Number disk */}
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#D4AF37', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', position: 'relative', zIndex: 1, boxShadow: '0 6px 24px rgba(212,175,55,.35)' }}>
                <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 10, fontWeight: 700, color: '#0A1F44', lineHeight: 1, letterSpacing: '0.05em' }}>STEP</span>
                <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 26, fontWeight: 900, color: '#0A1F44', lineHeight: 1.1 }}>{step.n}</span>
              </div>

              {/* Icon */}
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(10,31,68,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <Icon size={20} color="#0A1F44" />
              </div>

              <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 16, color: '#0A1F44', margin: '0 0 8px' }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorks;
