import React from 'react';
import { C, DISPLAY, SANS, ROMAN, GOLD_GRADIENT } from '../theme';
import { SectionHeading, Reveal } from './Royal';

const STEPS = [
  { title: 'Apply once', desc: 'One short form instead of separate applications at every bank. No branch visits.' },
  { title: 'We compare lenders', desc: 'Your advisor matches your profile with the lenders most likely to approve you, at the best rate on offer.' },
  { title: 'The lender disburses', desc: 'You choose the offer. The bank or NBFC sanctions the loan and pays it straight into your account.' },
];

const HowItWorks: React.FC = () => (
  <section id="how-it-works" style={{ background: C.ivory, padding: 'clamp(72px, 9vw, 112px) 0' }}>
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>
      <SectionHeading eyebrow="How it works" title="Your loan, without the running around" intro="As your DSA, we do the comparing and the follow-ups. The lender makes the loan." />

      <div role="list" className="lp-steps" style={{ margin: '64px 0 0' }}>
        <span aria-hidden className="lp-steps-line" style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.12} style={{ textAlign: 'center', position: 'relative' }}>
            <div role="listitem">
              <div style={{ width: 76, height: 76, margin: '0 auto', borderRadius: '50%', padding: 1, background: GOLD_GRADIENT }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%', background: C.ivory,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `inset 0 0 0 4px ${C.ivory}, inset 0 0 0 5px ${C.line}`,
                }}>
                  <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 28, color: C.navy }}>{ROMAN[i]}</span>
                </div>
              </div>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 25, color: C.navy, margin: '24px 0 10px' }}>{s.title}</h3>
              <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.7, color: C.muted, margin: '0 auto', maxWidth: 290 }}>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
