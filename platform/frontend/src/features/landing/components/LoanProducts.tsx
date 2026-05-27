import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { Wallet, GraduationCap, Briefcase, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { LOAN_PRODUCTS } from '../constants/landingData';

const ICON_MAP: Record<string, React.ElementType> = { Wallet, GraduationCap, Briefcase };

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const LoanProducts: React.FC = () => (
  <section id="loan-products" style={{ background: '#F9FAFB', padding: '96px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <span style={{
          display: 'inline-block', background: '#EFF6FF', color: '#2563EB',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 4, marginBottom: 14,
        }}>
          Our Products
        </span>
        <h2 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800,
          fontSize: 'clamp(28px, 3.5vw, 40px)', color: '#0A1F44', margin: '0 0 14px',
        }}>
          Loan Solutions for Every Need
        </h2>
        <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
          Personal loans are our core expertise. For education and business, we work with exclusive, trusted partners to secure the right deal for you.
        </p>
      </div>

      <div className="loan-products-grid" style={{ display: 'grid', gap: '1.75rem' }}>
        {LOAN_PRODUCTS.map((p, i) => {
          const Icon = ICON_MAP[p.icon];
          const isMain = p.highlight;
          return (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                background: '#ffffff',
                borderRadius: 14,
                padding: '28px 24px',
                border: isMain ? '1.5px solid #BFDBFE' : '1.5px solid #E5E7EB',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isMain ? '0 8px 32px rgba(37,99,235,.08)' : '0 2px 8px rgba(0,0,0,.04)',
              }}
            >
              {/* Featured top stripe */}
              {isMain && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#2563EB' }} />
              )}

              {/* Badge */}
              <div style={{ marginBottom: 18, marginTop: isMain ? 8 : 0 }}>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: 4,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                  background: isMain ? '#EFF6FF' : p.partner ? '#F0FDF4' : '#F9FAFB',
                  color: isMain ? '#2563EB' : p.partner ? '#15803D' : '#374151',
                  border: isMain ? '1px solid #BFDBFE' : 'none',
                }}>
                  {p.badge}
                </span>
              </div>

              {/* Icon */}
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: isMain ? '#EFF6FF' : '#F9FAFB',
                border: `1px solid ${isMain ? '#BFDBFE' : '#E5E7EB'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                {Icon && <Icon size={22} color={isMain ? '#2563EB' : '#0A1F44'} />}
              </div>

              <h3 style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 700, fontSize: 19,
                color: '#0A1F44', margin: '0 0 8px',
              }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 18px', lineHeight: 1.75, flex: 1 }}>
                {p.description}
              </p>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <CheckCircle2 size={14} color={isMain ? '#2563EB' : '#10B981'} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 13, color: '#374151', fontWeight: 500, lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Partner tag */}
              {p.partner && (
                <div style={{
                  background: '#F9FAFB', borderRadius: 8, padding: '10px 14px', marginBottom: 18,
                  border: '1px solid #E5E7EB',
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 2 }}>
                    Exclusive Partner
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1F44' }}>{p.partner}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>{p.partnerNote}</div>
                </div>
              )}

              {/* Rate + Max */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                paddingTop: 16, borderTop: '1px solid #F3F4F6', marginBottom: 18,
              }}>
                <div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginBottom: 3 }}>Starting from</div>
                  <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 16, color: '#2563EB' }}>{p.rate}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginBottom: 3 }}>Loan up to</div>
                  <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 16, color: '#0A1F44' }}>{p.maxAmount}</div>
                </div>
              </div>

              {/* CTA */}
              {p.partnerUrl ? (
                <a href={p.partnerUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Button block size="large" style={{
                    height: 44, borderRadius: 8, fontWeight: 700, fontSize: 13,
                    background: 'transparent', borderColor: '#D1D5DB', color: '#374151',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                    Visit {p.partner} <ExternalLink size={13} />
                  </Button>
                </a>
              ) : (
                <Button
                  block size="large"
                  onClick={() => scrollTo('#customer-register')}
                  style={{
                    height: 44, borderRadius: 8, fontWeight: 700, fontSize: 13,
                    background: isMain ? '#2563EB' : 'transparent',
                    borderColor: isMain ? '#2563EB' : '#0A1F44',
                    color: isMain ? '#ffffff' : '#0A1F44',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  {isMain ? 'Apply Now' : 'Enquire Now'} <ArrowRight size={13} />
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
