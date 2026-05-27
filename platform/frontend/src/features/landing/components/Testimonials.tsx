import React from 'react';
import { Carousel, Rate } from 'antd';
import { TESTIMONIALS } from '../constants/landingData';
import '../styles/landing.css';

const TestiCard: React.FC<{ t: typeof TESTIMONIALS[0] }> = ({ t }) => (
  <div style={{
    background: '#ffffff',
    borderRadius: 12,
    padding: '26px 22px',
    border: '1.5px solid #E5E7EB',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 8px rgba(0,0,0,.04)',
  }}>
    <Rate disabled defaultValue={t.rating} style={{ fontSize: 12, color: '#F59E0B', marginBottom: 14 }} />
    <p style={{
      fontSize: 14, color: '#374151', lineHeight: 1.8, flex: 1,
      margin: '0 0 20px', fontStyle: 'italic',
    }}>
      &ldquo;{t.review}&rdquo;
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid #F3F4F6', paddingTop: 16 }}>
      <div style={{
        width: 42, height: 42, borderRadius: '50%',
        background: '#0A1F44',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800,
        fontSize: 16, color: '#ffffff', flexShrink: 0,
      }}>
        {t.name.charAt(0)}
      </div>
      <div>
        <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 14, color: '#0A1F44' }}>
          {t.name}
        </div>
        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
          {t.city} &middot; {t.product} &middot; <strong style={{ color: '#374151' }}>{t.amount}</strong> in {t.days}
        </div>
        {t.lender && !['Best Offer Matched', 'Best Rate Secured', 'Best Rate Matched', 'Top Offer Selected'].includes(t.lender) && (
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>via {t.lender}</div>
        )}
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => (
  <section id="testimonials" style={{ background: '#F9FAFB', padding: '96px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <span style={{
          display: 'inline-block', background: '#EFF6FF', color: '#2563EB',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 4, marginBottom: 14,
        }}>
          Customer Stories
        </span>
        <h2 style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800,
          fontSize: 'clamp(28px, 3vw, 40px)', color: '#0A1F44', margin: '0 0 12px',
        }}>
          Trusted by Borrowers Across India
        </h2>
        <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>
          Real experiences from real customers who applied through Real Money.
        </p>
      </div>

      {/* Desktop 3-col grid */}
      <div className="testi-desktop">
        {TESTIMONIALS.map((t, i) => <TestiCard key={i} t={t} />)}
      </div>

      {/* Mobile carousel */}
      <div className="testi-mobile">
        <Carousel autoplay autoplaySpeed={5000} dots>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ padding: '0 4px' }}>
              <TestiCard t={t} />
            </div>
          ))}
        </Carousel>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: '#D1D5DB', marginTop: 32 }}>
        * Illustrative testimonials based on representative customer experiences
      </p>
    </div>
  </section>
);

export default Testimonials;
