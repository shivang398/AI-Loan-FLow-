import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, GraduationCap, Briefcase, ArrowRight, ExternalLink, Check } from 'lucide-react';
import { LOAN_PRODUCTS } from '../constants/landingData';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';
const GOLD_L = '#E8C870';

const ICON_MAP: Record<string, React.ElementType> = { Wallet, GraduationCap, Briefcase };

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const LoanProducts: React.FC = () => (
  <section id="loan-products" style={{ background: '#FFFFFF', padding: '96px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <span className="section-badge" style={{ marginBottom: 18 }}>Our Products</span>
        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 3.5vw, 42px)',
          color: NAVY, margin: '14px 0 16px', letterSpacing: '-0.01em',
        }}>
          Loan Solutions for Every Need
        </h2>
        <p style={{
          color: '#3A506B', fontSize: 16, maxWidth: 520,
          margin: '0 auto', lineHeight: 1.8, fontFamily: 'Inter',
        }}>
          Personal loans are our core expertise. For education and business, we work with trusted partners to secure the right deal.
        </p>
        <div style={{
          width: 48, height: 2, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
          margin: '24px auto 0', borderRadius: 1,
        }} />
      </div>

      <div className="loan-products-grid" style={{ display: 'grid', gap: '1.5rem' }}>
        {LOAN_PRODUCTS.map((p, i) => {
          const Icon = ICON_MAP[p.icon];
          const isMain = p.highlight;
          return (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38, delay: i * 0.09 }}
              style={{
                background: isMain ? NAVY : '#FFFFFF',
                borderRadius: 4,
                padding: '32px 28px',
                border: isMain ? `1px solid ${NAVY}` : `1px solid #D3DCE8`,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isMain
                  ? '0 12px 40px rgba(11,30,61,0.18)'
                  : '0 2px 12px rgba(11,30,61,0.05)',
              }}
            >
              {/* Gold accent line for main product */}
              {isMain && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: 3, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
                }} />
              )}

              {/* Icon + Badge row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 4,
                  background: isMain ? 'rgba(196,153,58,0.12)' : '#F3F6FA',
                  border: `1px solid ${isMain ? 'rgba(196,153,58,0.25)' : '#D3DCE8'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {Icon && <Icon size={22} color={isMain ? GOLD : NAVY} />}
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  padding: '4px 10px', borderRadius: 2,
                  background: isMain ? 'rgba(196,153,58,0.12)' : p.partner ? 'rgba(26,74,172,0.07)' : '#F3F6FA',
                  color: isMain ? GOLD : p.partner ? '#1A4AAC' : '#3A506B',
                  border: isMain ? '1px solid rgba(196,153,58,0.25)' : `1px solid ${p.partner ? 'rgba(26,74,172,0.15)' : '#D3DCE8'}`,
                  fontFamily: 'Inter',
                }}>
                  {p.badge}
                </span>
              </div>

              <h3 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700, fontSize: 20,
                color: isMain ? '#FFFFFF' : NAVY,
                margin: '0 0 10px', letterSpacing: '-0.01em',
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: 14, lineHeight: 1.8, flex: 1, margin: '0 0 20px',
                color: isMain ? 'rgba(255,255,255,0.55)' : '#3A506B',
                fontFamily: 'Inter',
              }}>
                {p.description}
              </p>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                      background: isMain ? 'rgba(196,153,58,0.15)' : 'rgba(26,74,172,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={9} color={isMain ? GOLD : '#1A4AAC'} strokeWidth={3} />
                    </div>
                    <span style={{
                      fontSize: 13, lineHeight: 1.5, fontWeight: 500, fontFamily: 'Inter',
                      color: isMain ? 'rgba(255,255,255,0.70)' : '#3A506B',
                    }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* Partner tag */}
              {p.partner && (
                <div style={{
                  borderRadius: 3, padding: '11px 14px', marginBottom: 20,
                  background: isMain ? 'rgba(255,255,255,0.05)' : '#F3F6FA',
                  border: `1px solid ${isMain ? 'rgba(255,255,255,0.10)' : '#D3DCE8'}`,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 3, fontFamily: 'Inter', color: isMain ? 'rgba(255,255,255,0.35)' : '#7A90A8' }}>
                    Exclusive Partner
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, fontFamily: 'Inter', color: isMain ? '#FFFFFF' : NAVY }}>{p.partner}</div>
                  <div style={{ fontSize: 11, fontFamily: 'Inter', color: isMain ? 'rgba(255,255,255,0.40)' : '#7A90A8' }}>{p.partnerNote}</div>
                </div>
              )}

              {/* Rate + Max */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '16px 0', marginBottom: 20,
                borderTop: `1px solid ${isMain ? 'rgba(196,153,58,0.18)' : '#EEF2F8'}`,
                borderBottom: `1px solid ${isMain ? 'rgba(196,153,58,0.18)' : '#EEF2F8'}`,
              }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Inter', color: isMain ? 'rgba(255,255,255,0.35)' : '#7A90A8' }}>Starting from</div>
                  <div style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: 18, color: isMain ? GOLD_L : NAVY }}>{p.rate}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Inter', color: isMain ? 'rgba(255,255,255,0.35)' : '#7A90A8' }}>Loan up to</div>
                  <div style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: 18, color: isMain ? '#FFFFFF' : NAVY }}>{p.maxAmount}</div>
                </div>
              </div>

              {/* CTA */}
              {p.partnerUrl ? (
                <a href={p.partnerUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%', height: 44, borderRadius: 3, fontWeight: 600, fontSize: 13,
                    background: 'transparent',
                    border: `1px solid ${isMain ? 'rgba(196,153,58,0.35)' : '#D3DCE8'}`,
                    color: isMain ? GOLD : '#3A506B',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    cursor: 'pointer', fontFamily: 'Inter', letterSpacing: '0.02em',
                    transition: 'all .15s',
                  }}>
                    Visit {p.partner} <ExternalLink size={12} />
                  </button>
                </a>
              ) : (
                <button
                  onClick={() => scrollTo('#customer-register')}
                  style={{
                    width: '100%', height: 44, borderRadius: 3, fontWeight: 700, fontSize: 13,
                    background: isMain ? GOLD : NAVY,
                    border: `1px solid ${isMain ? GOLD : NAVY}`,
                    color: '#FFFFFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    cursor: 'pointer', fontFamily: 'Inter', letterSpacing: '0.03em',
                    transition: 'all .15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  {isMain ? 'Apply Now' : 'Enquire Now'} <ArrowRight size={13} />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default LoanProducts;
