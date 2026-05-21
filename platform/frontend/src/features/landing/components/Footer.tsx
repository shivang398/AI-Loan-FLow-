import React from 'react';
import { IndianRupee, Linkedin, Twitter, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import '../styles/landing.css';

const scrollTo = (id: string) => { const el = document.querySelector(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };

const FooterLink: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button onClick={onClick} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#94A3B8', padding: '3px 0', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}
    onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
    onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}>
    {label}
  </button>
);

const LEGAL_CONTENT: Record<string, string> = {
  'Privacy Policy': 'Real Money Advisory Solution Pvt Ltd respects your privacy. We collect only necessary information to process your loan application. Data is shared only with lender partners with your consent. You may request deletion of your data at any time by writing to contact@realmoneyadvisory.in.',
  'Terms & Conditions': 'By using our services, you agree that Real Money Advisory Solution Pvt Ltd acts solely as a Corporate DSA. We do not guarantee loan approvals. All final decisions rest with the respective lender. Misrepresentation of information is grounds for rejection.',
  'RBI Disclosure': 'Real Money Advisory Solution Pvt Ltd is registered as a Corporate Direct Selling Agent (DSA). We are not a bank or NBFC and do not accept deposits or lend money directly. All lending is done by our partner banks and NBFCs regulated by the Reserve Bank of India.',
  'Grievance Redressal': 'For any grievances, please write to grievance@realmoneyadvisory.in or call +91 98765 43210. We aim to resolve all complaints within 7 working days. Unresolved complaints may be escalated to the Banking Ombudsman.',
  'Fair Practice Code': 'We follow a transparent, customer-first approach. No hidden charges. Interest rates are disclosed upfront. We do not engage in coercive recovery practices. All communications are in clear, simple language.',
  'Cookie Policy': 'Our website uses cookies to improve your experience. Essential cookies are required for the site to function. Analytics cookies help us understand usage patterns. You may disable non-essential cookies through your browser settings.',
};

const SOCIAL_LINKS = [
  { Icon: Linkedin,  href: 'https://linkedin.com/company/realmoneyadvisory' },
  { Icon: Twitter,   href: 'https://twitter.com/realmoneyadv' },
  { Icon: Facebook,  href: 'https://facebook.com/realmoneyadvisory' },
  { Icon: Instagram, href: 'https://instagram.com/realmoneyadvisory' },
  { Icon: Youtube,   href: 'https://youtube.com/@realmoneyadvisory' },
];

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
    <footer id="footer" style={{ background: '#060F1E', color: '#94A3B8' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px 40px' }}>
        <div className="footer-grid">
          {/* Company */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IndianRupee size={20} color="#0A1F44" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 14, color: '#FFFFFF' }}>Real Money Advisory</div>
                <div style={{ fontSize: 11, color: '#D4AF37', fontWeight: 600 }}>Solution Pvt Ltd</div>
              </div>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.8, margin: '0 0 16px', color: '#64748B' }}>
              CIN: U67190RJ2024PTC000000<br />
              Corporate DSA partnered with 50+ Indian banks and NBFCs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { Icon: MapPin, text: 'Jaipur, Rajasthan, India' },
                { Icon: Mail,   text: 'contact@realmoneyadvisory.in', href: 'mailto:contact@realmoneyadvisory.in' },
                { Icon: Phone,  text: '+91 98765 43210', href: 'tel:+919876543210' },
              ].map(({ Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <Icon size={13} color="#D4AF37" style={{ flexShrink: 0, marginTop: 2 }} />
                  {href ? (
                    <a href={href} style={{ fontSize: 12, color: '#94A3B8', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}>{text}</a>
                  ) : (
                    <span style={{ fontSize: 12 }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Loan Products */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Loan Products</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Home Loan', 'Personal Loan', 'Business Loan', 'Loan Against Property', 'Car Loan', 'Education Loan'].map(p => (
                <FooterLink key={p} label={p} onClick={() => scrollTo('#loan-products')} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { l: 'About Us',                  a: () => scrollTo('#why-us') },
                { l: 'How It Works',              a: () => scrollTo('#how-it-works') },
                { l: 'Lender Partners',           a: () => scrollTo('#lender-partners') },
                { l: 'Channel Partner Program',   a: () => navigate('/partners/register') },
                { l: 'Contact Us',                a: () => scrollTo('#footer') },
              ].map(({ l, a }) => <FooterLink key={l} label={l} onClick={a} />)}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Privacy Policy', 'Terms & Conditions', 'RBI Disclosure', 'Grievance Redressal', 'Fair Practice Code', 'Cookie Policy'].map(l => (
                <FooterLink key={l} label={l} onClick={() => showLegal(l)} />
              ))}
            </div>
          </div>
        </div>

        {/* Social + copyright */}
        <div style={{ marginTop: 52, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,.07)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {SOCIAL_LINKS.map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', textDecoration: 'none', transition: 'background .2s, color .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D4AF37'; (e.currentTarget as HTMLElement).style.color = '#0A1F44'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.07)'; (e.currentTarget as HTMLElement).style.color = '#64748B'; }}>
                <Icon size={15} />
              </a>
            ))}
          </div>
          <div style={{ fontSize: 12, color: '#475569', textAlign: 'center' }}>
            © 2026 Real Money Advisory Solution Pvt Ltd. All Rights Reserved.
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: 24, background: 'rgba(255,255,255,.03)', borderRadius: 12, padding: '16px 20px', fontSize: 11, lineHeight: 1.8, color: '#475569' }}>
          <strong style={{ color: '#64748B' }}>Disclaimer:</strong> Real Money Advisory Solution Pvt Ltd is a Corporate DSA and is NOT a bank, NBFC, or financial institution. We do not lend money or guarantee loan approvals. All loan products are offered by lender partners subject to their eligibility criteria. Interest rates are indicative and subject to change. Loan approval is at the sole discretion of the respective lender.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
