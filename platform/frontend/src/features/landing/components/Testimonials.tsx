import React from 'react';
import { Carousel, Rate } from 'antd';
import { TESTIMONIALS } from '../constants/landingData';
import '../styles/landing.css';

const TestiCard: React.FC<{ t: typeof TESTIMONIALS[0] }> = ({ t }) => (
  <div style={{ background: '#fff', borderRadius: 18, padding: '28px 24px', border: '1.5px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Rate disabled defaultValue={t.rating} style={{ fontSize: 13, color: '#D4AF37', marginBottom: 14 }} />
    <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.72, flex: 1, margin: '0 0 20px', fontStyle: 'italic' }}>"{t.review}"</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#0A1F44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 16, color: '#D4AF37', flexShrink: 0 }}>
        {t.name.charAt(0)}
      </div>
      <div>
        <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 14, color: '#0A1F44' }}>{t.name}</div>
        <div style={{ fontSize: 12, color: '#64748B' }}>{t.city} &middot; {t.product} &middot; {t.amount} in {t.days}</div>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => (
  <section id="testimonials" style={{ background: '#F8FAFC', padding: '88px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <span style={{ display: 'inline-block', background: 'rgba(10,31,68,.07)', color: '#0A1F44', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100, marginBottom: 12 }}>Customer Stories</span>
        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: '#0A1F44', margin: '8px 0' }}>What Our Customers Say</h2>
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

      <p style={{ textAlign: 'center', fontSize: 12, color: '#94A3B8', marginTop: 32 }}>
        * Illustrative testimonials from representative customer experiences
      </p>
    </div>
  </section>
);

export default Testimonials;
