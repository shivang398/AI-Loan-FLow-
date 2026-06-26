import React from 'react';
import { Mail, Phone, MapPin, Shield, Award, Users, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import '../styles/landing.css';

const NAVY    = '#071228';
const GOLD    = '#C4993A';
const GOLD_L  = '#E8C870';
const RM_RED  = '#CC1B1B';
const RM_BLUE = '#0F2B9F';
const MUTED   = '#6B7F96';
const LIGHT   = '#A8BCCE';

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const GlobeMark: React.FC<{ size?: number }> = ({ size = 46 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="44" rx="8" fill="white" />
    <path d="M9 22 C9 13 15 7 22 7 C29 7 35 13 35 22" stroke={RM_BLUE} strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M9 22 C9 31 15 37 22 37 C29 37 35 31 35 22" stroke={RM_RED} strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M7 19 Q22 23 37 19" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <path d="M7 25 Q22 21 37 25" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <text x="13" y="21" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="9" fill={RM_RED}>R</text>
    <text x="22" y="29" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="9" fill={RM_BLUE}>M</text>
  </svg>
);

/* Proper SVG brand icons — lucide social icons render as generic outlines */
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={NAVY}/>
  </svg>
);

const SOCIAL_LINKS = [
  { Icon: LinkedInIcon,  href: 'https://linkedin.com/company/realmoney',  label: 'LinkedIn' },
  { Icon: XIcon,        href: 'https://twitter.com/realmoneygroups',      label: 'X (Twitter)' },
  { Icon: FacebookIcon, href: 'https://facebook.com/realmoneygroups',     label: 'Facebook' },
  { Icon: InstagramIcon,href: 'https://instagram.com/realmoneygroups',    label: 'Instagram' },
  { Icon: YoutubeIcon,  href: 'https://youtube.com/@realmoneygroups',     label: 'YouTube' },
];

const TRUST_BADGES = [
  { icon: Shield, label: '22+ Years', sub: 'Trusted Since 2002' },
  { icon: Award,  label: '₹10 Cr+',  sub: 'Monthly Business' },
  { icon: Users,  label: '50+ Banks', sub: '& NBFCs Empanelled' },
];

const LEGAL_CONTENT: Record<string, string> = {
  'Privacy Policy': 'Real Money respects your privacy. We collect only necessary information to process your loan application. Data is shared only with the specific lender partner you explicitly consent to apply with. You may request deletion of your data at any time by writing to contact@realmoneygroups.in.',
  'Terms & Conditions': 'By using our services, you agree that Real Money acts solely as a Corporate DSA. We do not guarantee loan approvals. All final decisions rest with the respective lender. Misrepresentation of information is grounds for rejection.',
  'RBI Disclosure': 'Real Money is registered as a Corporate Direct Selling Agent (DSA). We are not a bank or NBFC and do not accept deposits or lend money directly. All lending is done by our exclusive partner lenders — banks and NBFCs regulated by the Reserve Bank of India.',
  'Grievance Redressal': 'For any grievances, please write to grievance@realmoneygroups.in or call +91 98765 43210. We aim to resolve all complaints within 7 working days. Unresolved complaints may be escalated to the Banking Ombudsman.',
  'Fair Practice Code': 'We follow a transparent, customer-first approach. No hidden charges. Interest rates are disclosed upfront. We do not engage in coercive recovery practices. All communications are in clear, simple language.',
  'Cookie Policy': 'Our website uses cookies to improve your experience. Essential cookies are required for the site to function. Analytics cookies help us understand usage patterns. You may disable non-essential cookies through your browser settings.',
};

const SectionHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 style={{
    fontSize: 11, fontWeight: 700, color: GOLD,
    margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.14em',
    fontFamily: 'Inter, sans-serif',
    display: 'flex', alignItems: 'center', gap: 10,
  }}>
    <span style={{ width: 18, height: 1.5, background: `linear-gradient(90deg, ${GOLD}, transparent)`, borderRadius: 1, flexShrink: 0 }} />
    {children}
  </h4>
);

const FooterLink: React.FC<{ label: string; onClick: () => void; external?: boolean }> = ({ label, onClick, external }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'none', border: 'none', cursor: 'pointer',
      fontSize: 13.5, color: LIGHT,
      padding: '5px 0', textAlign: 'left',
      fontFamily: 'Inter, sans-serif',
      letterSpacing: '0.01em',
      transition: 'color .15s',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.color = GOLD_L;
      const dot = (e.currentTarget as HTMLElement).querySelector('.link-dot') as HTMLElement;
      if (dot) dot.style.background = GOLD_L;
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.color = LIGHT;
      const dot = (e.currentTarget as HTMLElement).querySelector('.link-dot') as HTMLElement;
      if (dot) dot.style.background = GOLD;
    }}
  >
    <span className="link-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: GOLD, flexShrink: 0, transition: 'background .15s' }} />
    {label}
    {external && <ArrowUpRight size={10} style={{ opacity: 0.5, marginLeft: 'auto' }} />}
  </button>
);

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const showLegal = (title: string) => {
    Modal.info({
      title,
      content: (
        <p style={{ color: '#3A506B', lineHeight: 1.9, marginTop: 10, fontFamily: 'Inter', fontSize: 14 }}>
          {LEGAL_CONTENT[title]}
        </p>
      ),
      okText: 'Close',
      centered: true,
      width: 540,
    });
  };

  return (
    <footer id="footer" style={{ background: NAVY, color: MUTED, position: 'relative', overflow: 'hidden' }}>

      {/* Top gold accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, ${GOLD_L} 50%, ${GOLD} 70%, transparent 100%)` }} />

      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(196,153,58,0.025) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(196,153,58,0.025) 1px, transparent 1px)`,
        backgroundSize: '56px 56px',
      }} />

      {/* Trust badges strip */}
      <div style={{ borderBottom: `1px solid rgba(196,153,58,0.14)`, background: 'rgba(196,153,58,0.04)', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 32px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {TRUST_BADGES.map(({ icon: Icon, label, sub }, i) => (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 48px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 4,
                  background: 'rgba(196,153,58,0.10)',
                  border: '1px solid rgba(196,153,58,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={18} color={GOLD} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1, fontFamily: '"Playfair Display", serif' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 11.5, color: MUTED, fontWeight: 500, marginTop: 3, fontFamily: 'Inter' }}>{sub}</div>
                </div>
              </div>
              {i < TRUST_BADGES.length - 1 && (
                <div style={{ width: 1, background: 'rgba(255,255,255,0.07)', alignSelf: 'stretch', margin: '10px 0' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main footer body */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 48px', position: 'relative' }}>
        <div className="footer-grid">

          {/* ── Company Column ── */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <GlobeMark size={46} />
              <div>
                <div style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                  <span style={{ color: RM_RED }}>REAL</span>{' '}
                  <span style={{ color: RM_BLUE }}>MONEY</span>
                </div>
                <div style={{ fontSize: 9.5, color: GOLD, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 5, fontFamily: 'Inter' }}>
                  Personal Loan Advisory
                </div>
              </div>
            </div>

            <p style={{ fontSize: 13.5, lineHeight: 2, margin: '0 0 22px', color: LIGHT, fontFamily: 'Inter' }}>
              Corporate DSA specialising in personal loans, Jaipur.<br />
              Empanelled with 50+ banks &amp; NBFCs across India.
            </p>

            {/* Partner brands card */}
            <div style={{
              borderRadius: 4, padding: '16px 18px', marginBottom: 24,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(196,153,58,0.15)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontFamily: 'Inter' }}>
                Our Brands
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#7AB4F0', marginTop: 6, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, lineHeight: 1.6, fontFamily: 'Inter' }}>
                    <span style={{ color: '#7AB4F0', fontWeight: 600 }}>Saral Vidya</span>
                    <span style={{ color: MUTED }}> — Education Loans via Poonawala Fincorp</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 3, height: 3, borderRadius: '50%', background: GOLD, marginTop: 6, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, lineHeight: 1.6, fontFamily: 'Inter' }}>
                    <span style={{ color: GOLD, fontWeight: 600 }}>Real Finserv</span>
                    <span style={{ color: MUTED }}> — Business Loans</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { Icon: MapPin, text: 'Jaipur, Rajasthan, India' },
                { Icon: Mail,  text: 'contact@realmoneygroups.in', href: 'mailto:contact@realmoneygroups.in' },
                { Icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
              ].map(({ Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 4,
                    background: 'rgba(196,153,58,0.08)',
                    border: '1px solid rgba(196,153,58,0.16)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={13} color={GOLD} />
                  </div>
                  {href ? (
                    <a href={href}
                      style={{ fontSize: 13.5, color: LIGHT, textDecoration: 'none', fontFamily: 'Inter', transition: 'color .15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = GOLD_L)}
                      onMouseLeave={e => (e.currentTarget.style.color = LIGHT)}>
                      {text}
                    </a>
                  ) : (
                    <span style={{ fontSize: 13.5, color: LIGHT, fontFamily: 'Inter' }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Loan Products ── */}
          <div>
            <SectionHead>Loan Products</SectionHead>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {['Personal Loan', 'Education Loan (Saral Vidya)', 'Business Loan (Real Finserv)'].map(p => (
                <FooterLink key={p} label={p} onClick={() => scrollTo('#loan-products')} />
              ))}
            </div>

            <div style={{ marginTop: 36 }}>
              <SectionHead>Our Brands</SectionHead>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FooterLink label="Saral Vidya (saralvidya.in)" external onClick={() => window.open('https://saralvidya.in', '_blank')} />
                <FooterLink label="Real Finserv" onClick={() => scrollTo('#partners')} />
              </div>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <SectionHead>Quick Links</SectionHead>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { l: 'About Us',                a: () => scrollTo('#why-us') },
                { l: 'How It Works',            a: () => scrollTo('#how-it-works') },
                { l: 'Our Partner Brands',      a: () => scrollTo('#partners') },
                { l: 'Channel Partner Program', a: () => navigate('/partners/register') },
                { l: 'Customer Stories',        a: () => scrollTo('#testimonials') },
                { l: 'Contact Us',              a: () => scrollTo('#footer') },
              ].map(({ l, a }) => <FooterLink key={l} label={l} onClick={a} />)}
            </div>
          </div>

          {/* ── Legal ── */}
          <div>
            <SectionHead>Legal &amp; Compliance</SectionHead>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {['Privacy Policy', 'Terms & Conditions', 'RBI Disclosure', 'Grievance Redressal', 'Fair Practice Code', 'Cookie Policy'].map(l => (
                <FooterLink key={l} label={l} onClick={() => showLegal(l)} />
              ))}
            </div>

            {/* RBI badge */}
            <div style={{
              marginTop: 28, borderRadius: 4, padding: '13px 16px',
              background: 'rgba(15,43,159,0.12)',
              border: '1px solid rgba(15,43,159,0.25)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#7AB4F0', letterSpacing: '0.10em', textTransform: 'uppercase', fontFamily: 'Inter', marginBottom: 5 }}>
                RBI Compliant
              </div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.7, fontFamily: 'Inter' }}>
                Corporate DSA — regulated under RBI guidelines for Direct Selling Agents.
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{
          margin: '52px 0 32px', height: 1,
          background: `linear-gradient(90deg, transparent, rgba(196,153,58,0.22), rgba(196,153,58,0.14), transparent)`,
        }} />

        {/* ── Bottom bar: social + copyright ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          {/* Social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: 'Inter', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: 4 }}>Follow</span>
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                style={{
                  width: 36, height: 36, borderRadius: 4,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: LIGHT, textDecoration: 'none', transition: 'all .2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(196,153,58,0.14)';
                  el.style.color = GOLD_L;
                  el.style.borderColor = `rgba(196,153,58,0.30)`;
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(255,255,255,0.05)';
                  el.style.color = LIGHT;
                  el.style.borderColor = 'rgba(255,255,255,0.09)';
                  el.style.transform = 'none';
                }}>
                <Icon />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div style={{ fontSize: 13, color: MUTED, fontFamily: 'Inter', letterSpacing: '0.01em' }}>
            © 2026{' '}
            <span style={{ color: RM_RED, fontWeight: 700 }}>REAL</span>{' '}
            <span style={{ color: RM_BLUE, fontWeight: 700 }}>MONEY</span>
            {' '}— All Rights Reserved.
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div style={{
          marginTop: 24, borderRadius: 4, padding: '16px 20px',
          fontSize: 12, lineHeight: 1.9, color: MUTED,
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(196,153,58,0.10)',
          fontFamily: 'Inter',
        }}>
          <strong style={{ color: LIGHT }}>Disclaimer:</strong> Real Money is a Corporate DSA and is NOT a bank, NBFC, or financial institution. We do not lend money or guarantee loan approvals. All loan products are offered by our exclusive lender partners — banks and NBFCs regulated by the Reserve Bank of India — subject to their eligibility criteria. Interest rates are indicative and subject to change. Loan approval is at the sole discretion of the respective lender.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
