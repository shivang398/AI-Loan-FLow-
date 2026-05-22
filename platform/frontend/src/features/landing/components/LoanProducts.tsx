import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { Wallet, GraduationCap, Briefcase, ArrowRight, ExternalLink } from 'lucide-react';
import { LOAN_PRODUCTS } from '../constants/landingData';

const ICON_MAP: Record<string, React.ElementType> = { Wallet, GraduationCap, Briefcase };

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <span style={{ display: 'inline-block', background: 'rgba(10,31,68,.07)', color: '#0A1F44', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100, marginBottom: 12 }}>
    {text}
  </span>
);

const LoanProducts: React.FC = () => (
  <section id="loan-products" style={{ background: '#F8FAFC', padding: '96px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <SectionLabel text="What We Offer" />
        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 3.5vw, 44px)', color: '#0A1F44', margin: '8px 0 16px' }}>
          Our Loan Products
        </h2>
        <p style={{ color: '#64748B', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          Personal loans are our core strength. For education and business, we work with exclusive, trusted partners to bring you the best deal.
        </p>
      </div>

      <div className="loan-products-grid" style={{ display: 'grid', gap: '2rem' }}>
        {LOAN_PRODUCTS.map((p, i) => {
          const Icon = ICON_MAP[p.icon];
          const isMain = p.highlight;
          return (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                background: isMain ? 'linear-gradient(145deg, #0A1F44, #1a3a6e)' : '#fff',
                borderRadius: 22,
                padding: '32px 28px',
                border: isMain ? '1.5px solid rgba(212,175,55,.3)' : '1.5px solid #E2E8F0',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isMain ? '0 20px 60px rgba(10,31,68,.25)' : '0 2px 16px rgba(10,31,68,.05)',
              }}
            >
              {/* Gold shimmer for main card */}
              {isMain && (
                <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
              )}

              {/* Badge */}
              <div style={{ marginBottom: 20 }}>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  background: isMain ? 'rgba(212,175,55,.2)' : p.partner ? 'rgba(59,130,246,.1)' : 'rgba(10,31,68,.07)',
                  color: isMain ? '#D4AF37' : p.partner ? '#3B82F6' : '#0A1F44',
                  border: isMain ? '1px solid rgba(212,175,55,.35)' : 'none',
                }}>
                  {p.badge}
                </span>
              </div>

              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: isMain ? 'rgba(212,175,55,.15)' : 'rgba(10,31,68,.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}>
                {Icon && <Icon size={26} color={isMain ? '#D4AF37' : '#0A1F44'} />}
              </div>

              <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 20, color: isMain ? '#FFFFFF' : '#0A1F44', margin: '0 0 8px' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 14, color: isMain ? '#94A3B8' : '#64748B', margin: '0 0 20px', lineHeight: 1.7, flex: 1 }}>
                {p.description}
              </p>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: isMain ? '#D4AF37' : '#10B981', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: isMain ? '#CBD5E1' : '#475569', fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Partner tag */}
              {p.partner && (
                <div style={{ background: isMain ? 'rgba(212,175,55,.1)' : '#F0F7FF', borderRadius: 10, padding: '10px 14px', marginBottom: 20, border: `1px solid ${isMain ? 'rgba(212,175,55,.2)' : '#DBEAFE'}` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: isMain ? '#D4AF37' : '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
                    Exclusive Partner
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: isMain ? '#FFFFFF' : '#1E40AF' }}>{p.partner}</div>
                  <div style={{ fontSize: 11, color: isMain ? '#94A3B8' : '#64748B' }}>{p.partnerNote}</div>
                </div>
              )}

              {/* Rate + Max */}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 18, borderTop: `1px solid ${isMain ? 'rgba(255,255,255,.1)' : '#F1F5F9'}`, marginBottom: 22 }}>
                <div>
                  <div style={{ fontSize: 11, color: isMain ? '#64748B' : '#94A3B8', fontWeight: 500, marginBottom: 3 }}>Starting from</div>
                  <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 16, color: '#D4AF37' }}>{p.rate}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: isMain ? '#64748B' : '#94A3B8', fontWeight: 500, marginBottom: 3 }}>Loan up to</div>
                  <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 16, color: isMain ? '#FFFFFF' : '#0A1F44' }}>{p.maxAmount}</div>
                </div>
              </div>

              {/* CTA */}
              {p.partnerUrl ? (
                <a href={p.partnerUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Button block size="large" style={{
                    height: 46, borderRadius: 12, fontWeight: 700, fontSize: 14,
                    background: 'transparent', borderColor: '#3B82F6', color: '#3B82F6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                    Visit {p.partner} <ExternalLink size={14} />
                  </Button>
                </a>
              ) : (
                <Button
                  block size="large"
                  onClick={() => scrollTo('#hero')}
                  style={{
                    height: 46, borderRadius: 12, fontWeight: 700, fontSize: 14,
                    background: isMain ? '#D4AF37' : 'transparent',
                    borderColor: isMain ? '#D4AF37' : '#0A1F44',
                    color: isMain ? '#0A1F44' : '#0A1F44',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  {isMain ? 'Apply Now' : 'Enquire Now'} <ArrowRight size={14} />
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default LoanProducts;
