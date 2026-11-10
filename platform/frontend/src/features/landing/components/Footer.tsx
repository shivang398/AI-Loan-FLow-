import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { RealMoneyLogoWhite } from '../../../shared/components/RealMoneyLogo';
import { C, SANS, scrollToId } from '../theme';
import { Crest, Ornament } from './Royal';

const LEGAL_CONTENT: Record<string, string> = {
  'Privacy Policy': 'Real Money respects your privacy. We collect only necessary information to process your loan application. Data is shared only with the specific lender partner you explicitly consent to apply with. You may request deletion of your data at any time by writing to contact@realmoneygroups.in.',
  'Terms & Conditions': 'By using our services, you agree that Real Money acts solely as a Corporate DSA. We do not guarantee loan approvals. All final decisions rest with the respective lender. Misrepresentation of information is grounds for rejection.',
  'RBI Disclosure': 'Real Money is registered as a Corporate Direct Selling Agent (DSA). We are not a bank or NBFC and do not accept deposits or lend money directly. All lending is done by our exclusive partner lenders — banks and NBFCs regulated by the Reserve Bank of India.',
  'Grievance Redressal': 'For any grievances, please write to grievance@realmoneygroups.in or call +91 98765 43210. We aim to resolve all complaints within 7 working days. Unresolved complaints may be escalated to the Banking Ombudsman.',
  'Fair Practice Code': 'We follow a transparent, customer-first approach. No hidden charges. Interest rates are disclosed upfront. We do not engage in coercive recovery practices. All communications are in clear, simple language.',
  'Cookie Policy': 'Our website uses cookies to improve your experience. Essential cookies are required for the site to function. Analytics cookies help us understand usage patterns. You may disable non-essential cookies through your browser settings.',
};

const SOCIAL = [
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/realmoney' },
  { label: 'Instagram', href: 'https://instagram.com/realmoneygroups' },
  { label: 'X',         href: 'https://twitter.com/realmoneygroups' },
  { label: 'Facebook',  href: 'https://facebook.com/realmoneygroups' },
  { label: 'YouTube',   href: 'https://youtube.com/@realmoneygroups' },
];

const head: React.CSSProperties = { fontFamily: SANS, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.26em', textTransform: 'uppercase', color: C.gold, margin: '0 0 16px' };
const link: React.CSSProperties = { display: 'block', background: 'none', border: 'none', padding: '5px 0', cursor: 'pointer', fontFamily: SANS, fontSize: 14, color: C.onDarkDim, textAlign: 'left', textDecoration: 'none' };

const FootLink: React.FC<{ onClick?: () => void; href?: string; children: React.ReactNode }> = ({ onClick, href, children }) => {
  const hover = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = C.goldLight),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = C.onDarkDim),
  };
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" style={link} {...hover}>{children}</a>
    : <button onClick={onClick} style={link} {...hover}>{children}</button>;
};

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const showLegal = (title: string) => Modal.info({
    title, okText: 'Close', centered: true, width: 540,
    content: <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.8, color: C.ink, marginTop: 10 }}>{LEGAL_CONTENT[title]}</p>,
  });

  return (
    <footer id="footer" style={{ background: C.midnight, borderTop: '1px solid rgba(201,160,74,0.35)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '56px 24px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 48 }}>
          <Crest size={54} />
          <Ornament width={260} onDark />
        </div>
        <div className="lp-footer-grid">
          <div>
            <RealMoneyLogoWhite markSize={36} fontSize={16} subtitle="Personal Loan Advisory" id="footer-logo" />
            <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.7, color: C.onDarkDim, margin: '18px 0 20px', maxWidth: 320 }}>
              Corporate DSA specialising in personal loans, empanelled with 50+ banks &amp; NBFCs across India.
            </p>
            {[
              { Icon: MapPin, text: 'Jaipur, Rajasthan, India' },
              { Icon: Mail,   text: 'contact@realmoneygroups.in', href: 'mailto:contact@realmoneygroups.in' },
              { Icon: Phone,  text: '+91 98765 43210',            href: 'tel:+919876543210' },
            ].map(({ Icon, text, href }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}>
                <Icon size={14} color={C.gold} />
                {href
                  ? <a href={href} style={{ ...link, display: 'inline', padding: 0 }}>{text}</a>
                  : <span style={{ ...link, display: 'inline', padding: 0, cursor: 'default' }}>{text}</span>}
              </div>
            ))}
          </div>

          <div>
            <h4 style={head}>Real Money</h4>
            <FootLink onClick={() => scrollToId('how-it-works')}>How it works</FootLink>
            <FootLink onClick={() => scrollToId('charter')}>Borrower’s Charter</FootLink>
            <FootLink onClick={() => scrollToId('loans')}>Loans</FootLink>
            <FootLink onClick={() => scrollToId('faq')}>FAQ</FootLink>
            <FootLink href="https://saralvidya.in">Saral Vidya — education loans</FootLink>
            <FootLink onClick={() => scrollToId('partners')}>Become a partner</FootLink>
            <FootLink onClick={() => navigate('/careers')}>Careers</FootLink>
          </div>

          <div>
            <h4 style={head}>Legal</h4>
            {Object.keys(LEGAL_CONTENT).map(t => <FootLink key={t} onClick={() => showLegal(t)}>{t}</FootLink>)}
          </div>
        </div>

        <p style={{ fontFamily: SANS, fontSize: 12.5, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', margin: '40px 0 0', paddingTop: 24, borderTop: '1px solid rgba(201,160,74,0.18)' }}>
          <strong style={{ color: C.onDarkDim }}>Disclaimer:</strong> Real Money is a Corporate DSA and is NOT a bank, NBFC, or financial institution. We do not lend money or guarantee loan approvals. All loan products are offered by our exclusive lender partners — banks and NBFCs regulated by the Reserve Bank of India — subject to their eligibility criteria. Interest rates are indicative and subject to change. Loan approval is at the sole discretion of the respective lender.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 20, fontFamily: SANS, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
          <span>© {new Date().getFullYear()} Real Money. All rights reserved.</span>
          <span style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            {SOCIAL.map(s => <FootLink key={s.label} href={s.href}>{s.label}</FootLink>)}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
