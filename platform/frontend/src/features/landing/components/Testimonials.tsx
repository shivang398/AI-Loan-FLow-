import React from 'react';
import { Carousel, Rate } from 'antd';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants/landingData';
import '../styles/landing.css';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';
const GOLD_L = '#E8C870';

const TestiCard: React.FC<{ t: typeof TESTIMONIALS[0] }> = ({ t }) => (
  <div style={{
    background: '#FFFFFF',
    borderRadius: 4,
    padding: '30px 28px',
    border: '1px solid #D3DCE8',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 12px rgba(11,30,61,0.05)',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Gold top accent */}
    <div style={{
      position: 'absolute', top: 0, left: 0, width: 48, height: 3,
      background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
    }} />

    {/* Quote icon */}
    <Quote size={22} color={GOLD} style={{ marginBottom: 16, opacity: 0.6 }} />

    <Rate disabled defaultValue={t.rating}
      style={{ fontSize: 11, color: GOLD, marginBottom: 14 }} />

    <p style={{
      fontSize: 14, color: '#3A506B', lineHeight: 1.85, flex: 1,
      margin: '0 0 22px', fontFamily: 'Inter', fontStyle: 'italic',
      fontWeight: 400,
    }}>
      &ldquo;{t.review}&rdquo;
    </p>

    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      borderTop: '1px solid #EEF2F8', paddingTop: 18,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 3,
        background: NAVY,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Playfair Display", serif', fontWeight: 700,
        fontSize: 17, color: GOLD, flexShrink: 0,
      }}>
        {t.name.charAt(0)}
      </div>
      <div>
        <div style={{
          fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
          fontWeight: 700, fontSize: 14, color: NAVY,
        }}>
          {t.name}
        </div>
        <div style={{ fontSize: 11.5, color: '#7A90A8', marginTop: 2, fontFamily: 'Inter' }}>
          {t.city} · {t.product} · <strong style={{ color: '#3A506B', fontWeight: 600 }}>{t.amount}</strong> in {t.days}
        </div>
        {t.lender && !['Best Offer Matched', 'Best Rate Secured', 'Best Rate Matched', 'Top Offer Selected'].includes(t.lender) && (
          <div style={{ fontSize: 11, color: '#7A90A8', marginTop: 1, fontFamily: 'Inter' }}>via {t.lender}</div>
        )}
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => (
  <section id="testimonials" style={{ background: '#F3F6FA', padding: '96px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <span className="section-badge" style={{ marginBottom: 18 }}>Customer Stories</span>
        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 3vw, 42px)',
          color: NAVY, margin: '14px 0 16px', letterSpacing: '-0.01em',
        }}>
          Trusted by Borrowers Across India
        </h2>
        <p style={{ color: '#3A506B', fontSize: 16, maxWidth: 460, margin: '0 auto', lineHeight: 1.8, fontFamily: 'Inter' }}>
          Real experiences from real customers who applied through Real Money.
        </p>
        <div style={{
          width: 48, height: 2,
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
          margin: '24px auto 0', borderRadius: 1,
        }} />
      </div>

      {/* Desktop 3-col grid */}
      <div className="testi-desktop">
        {TESTIMONIALS.map((t, i) => <TestiCard key={i} t={t} />)}
      </div>

      {/* Mobile carousel */}
      <div className="testi-mobile">
        <Carousel autoplay autoplaySpeed={5000} dots>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ padding: '0 6px' }}>
              <TestiCard t={t} />
            </div>
          ))}
        </Carousel>
      </div>

      <p style={{ textAlign: 'center', fontSize: 11.5, color: '#B0BAC8', marginTop: 32, fontFamily: 'Inter' }}>
        * Illustrative testimonials based on representative customer experiences
      </p>
    </div>
  </section>
);

export default Testimonials;
