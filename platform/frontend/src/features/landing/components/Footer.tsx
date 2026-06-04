import React from 'react';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Mail, Phone, MapPin, Shield, Award, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import '../styles/landing.css';

const RM_RED  = '#CC1B1B';
const RM_BLUE = '#0F2B9F';
const RM_NAVY = '#071560';

const scrollTo = (id: string) => { const el = document.querySelector(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };

/* Inline globe SVG — identical to Navbar */
const GlobeMark: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
    <path d="M10 32 C10 18 20 8 32 8 C44 8 54 18 54 32" stroke={RM_BLUE} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
    <path d="M10 32 C10 46 20 56 32 56 C44 56 54 46 54 32" stroke={RM_RED}  strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
    <path d="M7 26 Q32 33 57 26" stroke="rgba(255,255,255,0.50)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M7 38 Q32 31 57 38" stroke="rgba(255,255,255,0.50)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <text x="20" y="30" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="12" fill="white">R</text>
    <text x="31" y="43" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="12" fill="white">M</text>
  </svg>
);

const FooterLink: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13.5, color: '#94A3B8', padding: '4px 0', textAlign: 'left', fontFamily: 'Inter, sans-serif', transition: 'color .15s' }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = RM_RED; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94A3B8'; }}
  >
    <span style={{ width: 4, height: 4, borderRadius: '50%', background: `rgba(204,27,27,0.5)`, flexShrink: 0 }} />
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
    fontSize: 11, fontWeight: 800, color: RM_RED,
    margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '0.1em',
    display: 'flex', alignItems: 'center', gap: 8,
  }}>
    <span style={{ width: 16, height: 2, background: `linear-gradient(90deg,${RM_RED},transparent)`, borderRadius: 2 }} />
    {children}
  </h4>
);

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const showLegal = (title: string) => {
    Modal.info({
      title,
      content: <p style={{ color: '#475569', lineHeight: 1.8, marginTop: 8 }}>{LEGAL_CONTENT[title]}</p>,
      okText: 'Close',
      centered: true,
      width: 520,
    });
  };

  return (
    <footer id="footer" style={{ background: 'linear-gradient(180deg, #040D1E 0%, #020812 100%)', color: '#64748B', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative glows — brand colors */}
      <div style={{ position: 'absolute', top: 0, left: '15%', width: 500, height: 400, background: `radial-gradient(ellipse, rgba(204,27,27,0.07) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 80, right: '10%', width: 400, height: 300, background: `radial-gradient(ellipse, rgba(15,43,159,0.07) 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Trust badges strip */}
      <div style={{ borderBottom: `1px solid rgba(204,27,27,0.14)`, background: 'rgba(204,27,27,0.03)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
          {TRUST_BADGES.map(({ icon: Icon, label, sub }, i) => (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 40px' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `linear-gradient(135deg,rgba(204,27,27,0.18),rgba(15,43,159,0.12))`,
                  border: `1px solid rgba(204,27,27,0.22)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color={RM_RED} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, fontFamily: '"Plus Jakarta Sans",sans-serif' }}>{label}</div>
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 2 }}>{sub}</div>
                </div>
              </div>
              {i < TRUST_BADGES.length - 1 && (
                <div style={{ width: 1, background: 'rgba(255,255,255,0.07)', alignSelf: 'stretch', margin: '8px 0' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 44px', position: 'relative' }}>
        <div className="footer-grid">

          {/* ── Company Column ── */}
          <div>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(150deg,${RM_NAVY},${RM_BLUE})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 6px 20px rgba(15,43,159,0.40)`,
                border: '1px solid rgba(255,255,255,0.10)',
              }}>
                <GlobeMark size={40} />
              </div>
              <div>
                <div style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  <span style={{ color: RM_RED }}>REAL</span>
                  {' '}
                  <span style={{ color: '#FFFFFF' }}>MONEY</span>
                </div>
                <div style={{ fontSize: 10, color: RM_RED, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3, opacity: 0.8 }}>
                  Personal Loan Advisory
                </div>
              </div>
            </div>

            <p style={{ fontSize: 13, lineHeight: 1.9, margin: '0 0 20px', color: '#64748B' }}>
              Corporate DSA — Personal loan specialists, Jaipur.<br />
              Empanelled with 50+ banks &amp; NBFCs across India.
            </p>

            {/* Partner brands */}
            <div style={{
              background: 'linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.02))',
              borderRadius: 14, padding: '14px 16px', marginBottom: 22,
              border: `1px solid rgba(204,27,27,0.15)`,
              backdropFilter: 'blur(4px)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Our Brands</div>
              <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 2 }}>
                <span style={{ color: '#60A5FA', fontWeight: 700 }}>Saral Vidya</span>
                <span style={{ color: '#475569' }}> · Education Loans via Poonawala Fincorp</span>
                <br />
                <span style={{ color: RM_RED, fontWeight: 700 }}>Real Finserv</span>
                <span style={{ color: '#475569' }}> · Business Loans</span>
              </div>
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { Icon: MapPin, text: 'Jaipur, Rajasthan, India' },
                { Icon: Mail,   text: 'contact@realmoneygroups.in', href: 'mailto:contact@realmoneygroups.in' },
                { Icon: Phone,  text: '+91 98765 43210',             href: 'tel:+919876543210' },
              ].map(({ Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: `rgba(204,27,27,0.10)`,
                    border: `1px solid rgba(204,27,27,0.18)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={13} color={RM_RED} />
                  </div>
                  {href ? (
                    <a href={href} style={{ fontSize: 13, color: '#64748B', textDecoration: 'none', transition: 'color .15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = RM_RED)}
                      onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}>{text}</a>
                  ) : (
                    <span style={{ fontSize: 13, color: '#64748B' }}>{text}</span>
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

            <SectionHead>Our Brands</SectionHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FooterLink label="Saral Vidya (saralvidya.in)" onClick={() => window.open('https://saralvidya.in', '_blank')} />
              <FooterLink label="Real Finserv" onClick={() => scrollTo('#partners')} />
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
            <SectionHead>Legal</SectionHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Privacy Policy', 'Terms & Conditions', 'RBI Disclosure', 'Grievance Redressal', 'Fair Practice Code', 'Cookie Policy'].map(l => (
                <FooterLink key={l} label={l} onClick={() => showLegal(l)} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ margin: '48px 0 28px', height: 1, background: `linear-gradient(90deg,transparent,rgba(204,27,27,0.25),rgba(15,43,159,0.20),transparent)` }} />

        {/* ── Social + copyright ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {SOCIAL_LINKS.map(({ Icon, href, label }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" title={label}
                style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', textDecoration: 'none', transition: 'all .2s' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `linear-gradient(135deg,${RM_NAVY},${RM_BLUE})`;
                  el.style.color = '#ffffff';
                  el.style.borderColor = 'transparent';
                  el.style.boxShadow = `0 4px 14px rgba(15,43,159,0.40)`;
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(255,255,255,.05)';
                  el.style.color = '#64748B';
                  el.style.borderColor = 'rgba(255,255,255,.09)';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'none';
                }}>
                <Icon size={15} />
              </a>
            ))}
          </div>
          <div style={{ fontSize: 12.5, color: '#334155', textAlign: 'center' }}>
            © 2026{' '}
            <span style={{ color: RM_RED, fontWeight: 700 }}>REAL</span>
            {' '}
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>MONEY</span>
            . All Rights Reserved.
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div style={{
          marginTop: 24,
          background: `linear-gradient(135deg,rgba(204,27,27,0.04),rgba(15,43,159,0.04))`,
          borderRadius: 14, padding: '16px 20px', fontSize: 11.5, lineHeight: 1.85, color: '#334155',
          border: `1px solid rgba(204,27,27,0.12)`,
        }}>
          <strong style={{ color: '#475569' }}>Disclaimer:</strong> Real Money is a Corporate DSA and is NOT a bank, NBFC, or financial institution. We do not lend money or guarantee loan approvals. All loan products are offered by our exclusive lender partners — banks and NBFCs regulated by the Reserve Bank of India — subject to their eligibility criteria. Interest rates are indicative and subject to change. Loan approval is at the sole discretion of the respective lender.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
