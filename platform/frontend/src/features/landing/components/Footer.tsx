import React from 'react';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Mail, Phone, MapPin, Shield, Award, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import '../styles/landing.css';

const NAVY2   = '#071228';
const GOLD    = '#C4993A';
const GOLD_L  = '#E8C870';
const RM_RED  = '#CC1B1B';
const RM_BLUE = '#0F2B9F';

const scrollTo = (id: string) => { const el = document.querySelector(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };

const GlobeMark: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="44" rx="8" fill="white" />
    <path d="M9 22 C9 13 15 7 22 7 C29 7 35 13 35 22" stroke={RM_BLUE} strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M9 22 C9 31 15 37 22 37 C29 37 35 31 35 22" stroke={RM_RED}  strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M7 19 Q22 23 37 19" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <path d="M7 25 Q22 21 37 25" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <text x="13" y="21" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="9" fill={RM_RED}>R</text>
    <text x="22" y="29" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="9" fill={RM_BLUE}>M</text>
  </svg>
);

const FooterLink: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: 'none', border: 'none', cursor: 'pointer',
      fontSize: 13, color: '#5A6E84',
      padding: '5px 0', textAlign: 'left',
      fontFamily: 'Inter, sans-serif', transition: 'color .15s',
      letterSpacing: '0.01em',
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD_L; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#5A6E84'; }}
  >
    <span style={{ width: 3, height: 3, borderRadius: '50%', background: GOLD, flexShrink: 0, opacity: 0.6 }} />
    {label}
  </button>
);

const LEGAL_CONTENT: Record<string, string> = {
  'Privacy Policy': 'Real Money respects your privacy. We collect only necessary information to process your loan application. Data is shared only with the specific lender partner you explicitly consent to apply with. You may request deletion of your data at any time by writing to contact@realmoneygroups.in.',
  'Terms & Conditions': 'By using our services, you agree that Real Money acts solely as a Corporate DSA. We do not guarantee loan approvals. All final decisions rest with the respective lender. Misrepresentation of information is grounds for rejection.',
  'RBI Disclosure': 'Real Money is registered as a Corporate Direct Selling Agent (DSA). We are not a bank or NBFC and do not accept deposits or lend money directly. All lending is done by our exclusive partner lenders — banks and NBFCs regulated by the Reserve Bank of India.',
  'Grievance Redressal': 'For any grievances, please write to grievance@realmoneygroups.in or call +91 98765 43210. We aim to resolve all complaints within 7 working days. Unresolved complaints may be escalated to the Banking Ombudsman.',
  'Fair Practice Code': 'We follow a transparent, customer-first approach. No hidden charges. Interest rates are disclosed upfront. We do not engage in coercive recovery practices. All communications are in clear, simple language.',
  'Cookie Policy': 'Our website uses cookies to improve your experience. Essential cookies are required for the site to function. Analytics cookies help us understand usage patterns. You may disable non-essential cookies through your browser settings.',
};

const SOCIAL_LINKS = [
  { Icon: Linkedin,  href: 'https://linkedin.com/company/realmoney',    label: 'LinkedIn' },
  { Icon: Twitter,   href: 'https://twitter.com/realmoneygroups',       label: 'Twitter' },
  { Icon: Facebook,  href: 'https://facebook.com/realmoneygroups',      label: 'Facebook' },
  { Icon: Instagram, href: 'https://instagram.com/realmoneygroups',     label: 'Instagram' },
  { Icon: Youtube,   href: 'https://youtube.com/@realmoneygroups',      label: 'YouTube' },
];

const TRUST_BADGES = [
  { icon: Shield, label: '22+ Years', sub: 'Trusted Since 2002' },
  { icon: Award,  label: '₹10 Cr+',  sub: 'Monthly Business' },
  { icon: Users,  label: '50+ Banks', sub: '& NBFCs Empanelled' },
];

const SectionHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 style={{
    fontSize: 10, fontWeight: 700, color: GOLD,
    margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.12em',
    fontFamily: 'Inter', display: 'flex', alignItems: 'center', gap: 8,
  }}>
    <span style={{ width: 16, height: 1, background: GOLD, opacity: 0.6, borderRadius: 1 }} />
    {children}
  </h4>
);

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const showLegal = (title: string) => {
    Modal.info({
      title,
      content: <p style={{ color: '#3A506B', lineHeight: 1.85, marginTop: 10, fontFamily: 'Inter' }}>{LEGAL_CONTENT[title]}</p>,
      okText: 'Close',
      centered: true,
      width: 520,
    });
  };

  return (
    <footer id="footer" style={{ background: NAVY2, color: '#5A6E84', position: 'relative', overflow: 'hidden' }}>

      {/* Very subtle background pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(196,153,58,0.02) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(196,153,58,0.02) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      {/* Trust badges strip */}
      <div style={{ borderBottom: `1px solid rgba(196,153,58,0.12)`, background: 'rgba(196,153,58,0.03)', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '18px 28px', display: 'flex', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
          {TRUST_BADGES.map(({ icon: Icon, label, sub }, i) => (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 40px' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 3,
                  background: 'rgba(196,153,58,0.08)',
                  border: '1px solid rgba(196,153,58,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} color={GOLD} />
                </div>
                <div>
                  <div style={{
                    fontSize: 15, fontWeight: 700, color: '#FFFFFF',
                    lineHeight: 1.1, fontFamily: '"Playfair Display", serif',
                  }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 11, color: '#5A6E84', fontWeight: 500, marginTop: 2, fontFamily: 'Inter' }}>{sub}</div>
                </div>
              </div>
              {i < TRUST_BADGES.length - 1 && (
                <div style={{ width: 1, background: 'rgba(255,255,255,0.05)', alignSelf: 'stretch', margin: '8px 0' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 28px 44px', position: 'relative' }}>
        <div className="footer-grid">

          {/* ── Company Column ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <GlobeMark size={44} />
              <div>
                <div style={{
                  fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                  fontWeight: 800, fontSize: 17,
                  letterSpacing: '-0.01em', lineHeight: 1.1,
                }}>
                  <span style={{ color: RM_RED }}>REAL</span>{' '}
                  <span style={{ color: RM_BLUE }}>MONEY</span>
                </div>
                <div style={{
                  fontSize: 9.5, color: GOLD, fontWeight: 700,
                  letterSpacing: '0.10em', textTransform: 'uppercase', marginTop: 4,
                  fontFamily: 'Inter',
                }}>
                  Personal Loan Advisory
                </div>
              </div>
            </div>

            <p style={{ fontSize: 13, lineHeight: 1.9, margin: '0 0 20px', color: '#5A6E84', fontFamily: 'Inter' }}>
              Corporate DSA — Personal loan specialists, Jaipur.<br />
              Empanelled with 50+ banks &amp; NBFCs across India.
            </p>

            {/* Partner brands */}
            <div style={{
              borderRadius: 3, padding: '14px 16px', marginBottom: 22,
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(196,153,58,0.12)',
            }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 10, fontFamily: 'Inter' }}>
                Our Brands
              </div>
              <div style={{ fontSize: 13, color: '#5A6E84', lineHeight: 2.1, fontFamily: 'Inter' }}>
                <span style={{ color: '#7AB4F0', fontWeight: 600 }}>Saral Vidya</span>
                <span style={{ color: '#3A4E63' }}> · Education Loans via Poonawala Fincorp</span>
                <br />
                <span style={{ color: GOLD, fontWeight: 600 }}>Real Finserv</span>
                <span style={{ color: '#3A4E63' }}> · Business Loans</span>
              </div>
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {[
                { Icon: MapPin, text: 'Jaipur, Rajasthan, India' },
                { Icon: Mail,   text: 'contact@realmoneygroups.in', href: 'mailto:contact@realmoneygroups.in' },
                { Icon: Phone,  text: '+91 98765 43210',             href: 'tel:+919876543210' },
              ].map(({ Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 3,
                    background: 'rgba(196,153,58,0.07)',
                    border: '1px solid rgba(196,153,58,0.14)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={12} color={GOLD} />
                  </div>
                  {href ? (
                    <a href={href} style={{ fontSize: 13, color: '#5A6E84', textDecoration: 'none', fontFamily: 'Inter', transition: 'color .15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = GOLD_L)}
                      onMouseLeave={e => (e.currentTarget.style.color = '#5A6E84')}>
                      {text}
                    </a>
                  ) : (
                    <span style={{ fontSize: 13, color: '#5A6E84', fontFamily: 'Inter' }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Loan Products ── */}
          <div>
            <SectionHead>Loan Products</SectionHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Personal Loan', 'Education Loan (Saral Vidya)', 'Business Loan (Real Finserv)'].map(p => (
                <FooterLink key={p} label={p} onClick={() => scrollTo('#loan-products')} />
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <SectionHead>Our Brands</SectionHead>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FooterLink label="Saral Vidya (saralvidya.in)" onClick={() => window.open('https://saralvidya.in', '_blank')} />
                <FooterLink label="Real Finserv" onClick={() => scrollTo('#partners')} />
              </div>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <SectionHead>Quick Links</SectionHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Privacy Policy', 'Terms & Conditions', 'RBI Disclosure', 'Grievance Redressal', 'Fair Practice Code', 'Cookie Policy'].map(l => (
                <FooterLink key={l} label={l} onClick={() => showLegal(l)} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{
          margin: '48px 0 28px', height: 1,
          background: `linear-gradient(90deg, transparent, rgba(196,153,58,0.20), rgba(196,153,58,0.12), transparent)`,
        }} />

        {/* ── Social + copyright ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {SOCIAL_LINKS.map(({ Icon, href, label }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" title={label}
                style={{
                  width: 36, height: 36, borderRadius: 3,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#5A6E84', textDecoration: 'none', transition: 'all .2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(196,153,58,0.12)';
                  el.style.color = GOLD_L;
                  el.style.borderColor = 'rgba(196,153,58,0.25)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(255,255,255,0.04)';
                  el.style.color = '#5A6E84';
                  el.style.borderColor = 'rgba(255,255,255,0.07)';
                  el.style.transform = 'none';
                }}>
                <Icon size={14} />
              </a>
            ))}
          </div>
          <div style={{ fontSize: 12.5, color: '#3A4E63', textAlign: 'center', fontFamily: 'Inter' }}>
            © 2026{' '}
            <span style={{ color: RM_RED, fontWeight: 700 }}>REAL</span>
            {' '}
            <span style={{ color: RM_BLUE, fontWeight: 700 }}>MONEY</span>
            . All Rights Reserved.
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div style={{
          marginTop: 24,
          borderRadius: 3, padding: '16px 20px',
          fontSize: 11.5, lineHeight: 1.9, color: '#3A4E63',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(196,153,58,0.10)',
          fontFamily: 'Inter',
        }}>
          <strong style={{ color: '#5A6E84' }}>Disclaimer:</strong> Real Money is a Corporate DSA and is NOT a bank, NBFC, or financial institution. We do not lend money or guarantee loan approvals. All loan products are offered by our exclusive lender partners — banks and NBFCs regulated by the Reserve Bank of India — subject to their eligibility criteria. Interest rates are indicative and subject to change. Loan approval is at the sole discretion of the respective lender.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
