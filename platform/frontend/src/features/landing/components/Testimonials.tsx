import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants/landingData';
import { C, DISPLAY, SANS } from '../theme';
import { SectionHeading, Reveal } from './Royal';

const SHOWN = TESTIMONIALS.slice(0, 3);

const Testimonials: React.FC = () => (
  <section id="testimonials" style={{ background: C.parchment, padding: 'clamp(72px, 9vw, 112px) 0' }}>
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
      <SectionHeading eyebrow="Reviews" title="In our borrowers’ words" />

      <div className="lp-cards-3" style={{ marginTop: 56 }}>
        {SHOWN.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1} style={{ display: 'flex' }}>
            <figure className="lp-card" style={{ position: 'relative', flex: 1, margin: 0, background: C.ivory, border: `1px solid ${C.line}`, padding: '44px 30px 28px', display: 'flex', flexDirection: 'column' }}>
              <span aria-hidden style={{ position: 'absolute', top: -6, left: 22, fontFamily: DISPLAY, fontSize: 96, lineHeight: 1, color: C.gold, opacity: 0.85 }}>“</span>
              <div style={{ display: 'flex', gap: 3 }} aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: t.rating }, (_, k) => <Star key={k} size={13} fill={C.gold} color={C.gold} />)}
              </div>
              <blockquote style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontWeight: 500, fontSize: 21, lineHeight: 1.5, color: C.navy, margin: '16px 0 0', flex: 1 }}>
                {t.review}
              </blockquote>
              <figcaption style={{ marginTop: 24, paddingTop: 18, borderTop: `1px solid ${C.line}`, fontFamily: SANS }}>
                <div style={{ fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.navy }}>{t.name}</div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{t.city} · {t.product} · {t.amount} in {t.days}</div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <p style={{ fontFamily: SANS, fontSize: 12, color: C.muted, textAlign: 'center', margin: '32px 0 0' }}>
        Illustrative testimonials based on representative customer experiences.
      </p>
    </div>
  </section>
);

export default Testimonials;
