import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { C, DISPLAY, SANS, ROMAN } from '../theme';
import { Reveal, Ornament } from './Royal';

// Each article restates the site's own FAQ, Fair Practice Code, privacy and grievance text — keep them in sync.
// Deliberately no approval guarantees and no rates presented as ours: the lender sanctions and prices the loan.
const ARTICLES = [
  { title: 'We are your agent, not your lender', text: 'Real Money is a Corporate DSA. Your loan is sanctioned and disbursed only by an RBI-regulated bank or NBFC, and we tell you which one before you apply.' },
  { title: 'Our service is free to you',          text: 'Lenders pay us when a loan is disbursed. You never pay us a fee — not to apply, not to be approved, not ever.' },
  { title: 'Every charge in writing, upfront',    text: 'The interest rate, processing fee and all other charges are disclosed before you proceed. No hidden charges.' },
  { title: 'Your data, only with your consent',   text: 'Shared only with the lender you choose to apply with, and deleted whenever you ask.' },
  { title: 'Clear advice, never pressure',        text: 'Plain language, honest comparisons and no coercive practices — the choice of lender is always yours.' },
  { title: 'Complaints answered in 7 days',       text: 'Write to grievance@realmoneygroups.in. Anything unresolved can be escalated to the Banking Ombudsman.' },
];

/** Gold wax seal */
const Seal: React.FC = () => (
  <svg width="104" height="104" viewBox="0 0 104 104" aria-hidden>
    <defs>
      <radialGradient id="seal-gold" cx="38%" cy="32%" r="75%">
        <stop offset="0" stopColor="#F4E2B0" />
        <stop offset="0.45" stopColor="#C9A04A" />
        <stop offset="1" stopColor="#7E5D1A" />
      </radialGradient>
    </defs>
    {/* scalloped edge */}
    <path
      d={Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2, b = ((i + 0.5) / 24) * Math.PI * 2;
        const p = (r: number, t: number) => `${52 + Math.cos(t) * r},${52 + Math.sin(t) * r}`;
        return `${i ? 'L' : 'M'}${p(50, a)} L${p(45, b)}`;
      }).join(' ') + ' Z'}
      fill="url(#seal-gold)"
    />
    <circle cx="52" cy="52" r="38" fill="none" stroke="#7E5D1A" strokeOpacity="0.55" strokeWidth="1.2" />
    <circle cx="52" cy="52" r="33" fill="none" stroke="#FFF3D1" strokeOpacity="0.45" strokeWidth="0.8" strokeDasharray="2 3" />
    <text x="52" y="61" textAnchor="middle" fontFamily='"Cormorant Garamond", Georgia, serif' fontWeight="700" fontSize="27" fill="#5A4110" fillOpacity="0.85">RM</text>
  </svg>
);

const Charter: React.FC = () => (
  <section id="charter" style={{ background: C.parchment, padding: 'clamp(72px, 9vw, 112px) 0' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
      <Reveal>
        {/* The document: double gold rule frame on parchment */}
        <div style={{ position: 'relative', background: C.ivory, border: `1px solid ${C.gold}`, padding: 8, boxShadow: '0 24px 60px rgba(11,30,61,0.10)' }}>
          <div style={{ border: `1px solid ${C.line}`, outline: `1px solid rgba(201,160,74,0.35)`, outlineOffset: -6, padding: 'clamp(40px, 6vw, 64px) clamp(22px, 5vw, 64px) clamp(36px, 5vw, 52px)' }}>
            <div style={{ position: 'absolute', top: -52, left: '50%', transform: 'translateX(-50%)', filter: 'drop-shadow(0 6px 10px rgba(11,30,61,0.25))' }}>
              <Seal />
            </div>

            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <p style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.32em', textTransform: 'uppercase', color: C.goldDeep, margin: 0 }}>Our promise, in writing</p>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(36px, 4.6vw, 54px)', lineHeight: 1.08, color: C.navy, margin: '12px 0 0' }}>
                The Borrower’s Charter
              </h2>
              <Ornament width={220} style={{ marginTop: 18 }} />
              <p style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 20, color: C.ink, margin: '18px auto 0', maxWidth: 560, lineHeight: 1.5 }}>
                Six commitments we make to every customer, before we ask anything of you.
              </p>
            </div>

            <ol className="lp-charter-grid" style={{ listStyle: 'none', padding: 0, margin: '44px 0 0' }}>
              {ARTICLES.map((a, i) => (
                <li key={a.title} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 14, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 26, color: C.gold, textAlign: 'right' }}>{ROMAN[i]}.</span>
                  <div>
                    <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, color: C.navy, margin: 0, lineHeight: 1.25 }}>{a.title}</h3>
                    <p style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.7, color: C.muted, margin: '6px 0 0' }}>{a.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Fraud warning — upfront-fee scams are the most common loan fraud */}
            <div role="note" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginTop: 44, padding: '18px 20px', background: C.midnight, borderLeft: `3px solid ${C.gold}` }}>
              <ShieldAlert size={22} color={C.goldLight} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.65, color: C.onDarkDim, margin: 0 }}>
                <strong style={{ color: C.goldLight }}>Beware of loan fraud.</strong>{' '}
                No one from Real Money will ever ask you to pay money, transfer a “processing fee” or share an OTP to get a loan approved.
                If someone does, stop and report it at <span style={{ color: C.onDark }}>cybercrime.gov.in</span> or call <span style={{ color: C.onDark }}>1930</span>,
                and tell us at <span style={{ color: C.onDark }}>grievance@realmoneygroups.in</span>.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 36 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 26, color: C.navy }}>The Real Money team</div>
                <div style={{ width: 200, height: 1, background: C.gold, margin: '6px auto 6px' }} />
                <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.muted }}>Corporate DSA · Jaipur</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Charter;
