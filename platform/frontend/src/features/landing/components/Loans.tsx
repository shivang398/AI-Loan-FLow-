import React from 'react';
import { Wallet, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { LOAN_PRODUCTS } from '../constants/landingData';
import { C, DISPLAY, SANS, scrollToId } from '../theme';
import { SectionHeading, Reveal, GoldCorners } from './Royal';

const ICONS: Record<string, React.ElementType> = { Wallet, GraduationCap, Briefcase };

/** Where each card's button goes: apply here, the partner brand's site, or an advisor chat */
const actionFor = (p: typeof LOAN_PRODUCTS[number]) =>
  p.key === 'personal'
    ? { label: 'Apply now', onClick: () => scrollToId('apply') }
    : p.partnerUrl
      ? { label: `Visit ${p.partner}`, href: p.partnerUrl }
      : { label: 'Ask an advisor', href: 'https://wa.me/919876543210' };

const Loans: React.FC = () => (
  <section id="loans" style={{ background: C.ivory, padding: 'clamp(72px, 9vw, 112px) 0' }}>
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
      <SectionHeading eyebrow="Loans" title="Personal loans are our speciality" intro="Education and business loans are handled by our dedicated partner brands." />

      <div className="lp-cards-3" style={{ marginTop: 56 }}>
        {LOAN_PRODUCTS.map((p, i) => {
          const Icon = ICONS[p.icon];
          const action = actionFor(p);
          const core = p.key === 'personal';
          const fg = core ? C.onDark : C.navy;
          const dim = core ? C.onDarkDim : C.muted;
          return (
            <Reveal key={p.key} delay={i * 0.1} style={{ display: 'flex' }}>
              <article className="lp-card" style={{
                position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 32px 32px',
                background: core ? `linear-gradient(160deg, ${C.navySoft}, ${C.midnight})` : C.white,
                border: `1px solid ${core ? 'rgba(201,160,74,0.45)' : C.line}`,
                boxShadow: core ? '0 20px 50px rgba(6,13,31,0.25)' : 'none',
              }}>
                <GoldCorners />
                {core && (
                  <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: C.gold, color: C.midnight, fontFamily: SANS, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '5px 14px' }}>
                    Our speciality
                  </span>
                )}

                <div style={{ width: 52, height: 52, margin: '0 auto', borderRadius: '50%', border: `1px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={21} color={core ? C.goldLight : C.goldDeep} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 30, color: fg, textAlign: 'center', margin: '18px 0 0' }}>{p.title}</h3>
                <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, textAlign: 'center', marginTop: 6 }}>
                  {core ? 'Real Money' : p.badge}
                </div>

                <p style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.7, color: dim, textAlign: 'center', margin: '18px 0 0', flex: 1 }}>{p.description}</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 32, margin: '26px 0', padding: '18px 0', borderTop: `1px solid ${core ? 'rgba(201,160,74,0.25)' : C.line}`, borderBottom: `1px solid ${core ? 'rgba(201,160,74,0.25)' : C.line}` }}>
                  {[['Rates from', p.rate], ['Amount', p.maxAmount]].map(([k, v]) => (
                    <div key={k} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: dim }}>{k}</div>
                      <div style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 600, color: core ? C.goldLight : C.navy, marginTop: 4 }}>{v}</div>
                    </div>
                  ))}
                </div>

                {'href' in action ? (
                  <a href={action.href} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn-outline" style={{ height: 46 }}>
                    {action.label} <ArrowRight size={14} />
                  </a>
                ) : (
                  <button onClick={action.onClick} className="lp-btn lp-btn-gold" style={{ height: 46 }}>
                    {action.label} <ArrowRight size={14} />
                  </button>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>

      <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.muted, textAlign: 'center', margin: '32px auto 0', maxWidth: 680, lineHeight: 1.7 }}>
        Rates and amounts are indicative and offered by our partner lenders, subject to their eligibility criteria.
        The final rate and charges are set by the lender.
      </p>
    </div>
  </section>
);

export default Loans;
