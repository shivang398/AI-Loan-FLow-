import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HandCoins, UserRoundCheck, LayoutDashboard, Wrench, ArrowRight } from 'lucide-react';
import { C, DISPLAY, SANS } from '../theme';
import { SectionHeading, Reveal, GoldCorners } from './Royal';

// Each benefit maps to something connectors actually get on the platform
const BENEFITS = [
  { Icon: HandCoins,       title: 'Commission on every disbursal', text: 'Earn on each loan disbursed from the customers you refer, as per your payout slab.' },
  { Icon: UserRoundCheck,  title: 'A dedicated relationship manager', text: 'An RM supports your leads from application through to disbursal.' },
  { Icon: LayoutDashboard, title: 'Track everything online',      text: 'See every lead, its status and your earnings on your partner dashboard.' },
  { Icon: Wrench,          title: 'Ready-made loan tools',        text: 'Eligibility checks and bank-statement analysis to qualify customers faster.' },
];

const PartnerProgram: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section id="partners" style={{ background: `radial-gradient(ellipse 60% 55% at 50% 30%, ${C.navySoft} 0%, ${C.midnight} 75%)`, padding: 'clamp(72px, 9vw, 112px) 0' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeading onDark eyebrow="Channel partners" title="Grow with us as a loan partner"
          intro="Advisors, agents and finance professionals: refer personal-loan customers through Real Money and earn on every disbursal." />

        <div className="lp-partner-grid" style={{ marginTop: 56 }}>
          {BENEFITS.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08} style={{ display: 'flex' }}>
              <div style={{ position: 'relative', flex: 1, padding: '30px 26px', background: 'rgba(255,248,232,0.03)', border: '1px solid rgba(201,160,74,0.25)' }}>
                <GoldCorners inset={-1} size={12} />
                <Icon size={24} color={C.goldLight} strokeWidth={1.4} />
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, color: C.onDark, margin: '16px 0 8px', lineHeight: 1.2 }}>{title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.65, color: C.onDarkDim, margin: 0 }}>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 44 }}>
          <button onClick={() => navigate('/careers?role=Channel%20Partner')} className="lp-btn lp-btn-gold" style={{ height: 52, padding: '0 32px' }}>
            Become a partner <ArrowRight size={14} />
          </button>
          <button onClick={() => navigate('/login')} className="lp-btn lp-btn-on-dark" style={{ height: 52, padding: '0 26px' }}>
            Partner login
          </button>
        </div>
        <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.onDarkDim, textAlign: 'center', margin: '18px 0 0' }}>
          Every partner application is reviewed by our team before access is granted.
        </p>
      </div>
    </section>
  );
};

export default PartnerProgram;
