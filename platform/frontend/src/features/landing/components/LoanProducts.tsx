import React from 'react';
import { motion } from 'framer-motion';
import { Home, Wallet, Briefcase, Building2, Car, GraduationCap } from 'lucide-react';
import { LOAN_PRODUCTS } from '../constants/landingData';

const ICON_MAP: Record<string, React.ElementType> = { Home, Wallet, Briefcase, Building2, Car, GraduationCap };

const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <span style={{ display: 'inline-block', background: 'rgba(10,31,68,.07)', color: '#0A1F44', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100, marginBottom: 12 }}>
    {text}
  </span>
);

const LoanProducts: React.FC = () => (
  <section id="loan-products" style={{ background: '#F8FAFC', padding: '88px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <SectionLabel text="What We Offer" />
        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: '#0A1F44', margin: '8px 0' }}>
          Loan Products
        </h2>
        <p style={{ color: '#64748B', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
          Tailored financing from 50+ lender partners — one application, multiple offers.
        </p>
      </div>

      <div className="grid-3">
        {LOAN_PRODUCTS.map((p, i) => {
          const Icon = ICON_MAP[p.icon];
          return (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.38, delay: i * 0.06 }}
              whileHover="hover"
              variants={{ hover: { y: -6 } }}
              style={{
                background: '#fff',
                borderRadius: 18,
                padding: '28px 24px',
                border: '1.5px solid #E2E8F0',
                cursor: 'pointer',
                transition: 'border-color .2s',
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(10,31,68,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                {Icon && <Icon size={24} color="#0A1F44" />}
              </div>
              <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 17, color: '#0A1F44', margin: '0 0 6px' }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 20px', lineHeight: 1.65 }}>{p.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginBottom: 2 }}>Starting from</div>
                  <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 15, color: '#D4AF37' }}>{p.rate}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginBottom: 2 }}>Loan up to</div>
                  <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 15, color: '#0A1F44' }}>{p.maxAmount}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default LoanProducts;
