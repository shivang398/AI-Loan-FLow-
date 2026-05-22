import React from 'react';
import { Carousel, Rate } from 'antd';
import { TESTIMONIALS } from '../constants/landingData';
import '../styles/landing.css';

const TestiCard: React.FC<{ t: typeof TESTIMONIALS[0] }> = ({ t }) => (
  <div style={{ background: '#fff', borderRadius: 20, padding: '28px 24px', border: '1.5px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 16px rgba(10,31,68,.05)' }}>
    <Rate disabled defaultValue={t.rating} style={{ fontSize: 12, color: '#D4AF37', marginBottom: 14 }} />
    <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.78, flex: 1, margin: '0 0 22px', fontStyle: 'italic' }}>&ldquo;{t.review}&rdquo;</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0A1F44, #1a3a6e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 17, color: '#D4AF37', flexShrink: 0 }}>
        {t.name.charAt(0)}
      </div>
      <div>
        <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 14, color: '#0A1F44' }}>{t.name}</div>
        <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
          {t.city} &middot; {t.product} &middot; <strong style={{ color: '#0A1F44' }}>{t.amount}</strong> in {t.days}
        </div>
        {t.lender && t.lender !== 'Best Offer Matched' && t.lender !== 'Best Rate Secured' && t.lender !== 'Best Rate Matched' && t.lender !== 'Top Offer Selected' && (
          <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>via {t.lender}</div>
        )}
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => (
  <section id="testimonials" style={{ background: '#F8FAFC', padding: '96px 0' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <span style={{ display: 'inline-block', background: 'rgba(10,31,68,.07)', color: '#0A1F44', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100, marginBottom: 12 }}>
          Customer Stories
        </span>
        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 3vw, 42px)', color: '#0A1F44', margin: '8px 0 14px' }}>
          What Our Customers Say
        </h2>
        <p style={{ color: '#64748B', fontSize: 16, maxWidth: 460, margin: '0 auto' }}>
          Real experiences from real customers who got their loans through Real Money.
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

      <p style={{ textAlign: 'center', fontSize: 12, color: '#94A3B8', marginTop: 36 }}>
        * Illustrative testimonials from representative customer experiences
      </p>
    </div>
  </section>
);

export default Testimonials;
