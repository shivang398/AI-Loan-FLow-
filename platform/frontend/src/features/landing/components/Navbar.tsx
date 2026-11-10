import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RealMoneyLogoWhite } from '../../../shared/components/RealMoneyLogo';
import { C, SANS, scrollToId } from '../theme';
import '../styles/landing.css';

const NAV_LINKS = [
  { label: 'How it works', id: 'how-it-works' },
  { label: 'Loans',        id: 'loans' },
  { label: 'Partner with us', id: 'partners' },
  { label: 'FAQ',          id: 'faq' },
];

const linkStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
  fontFamily: SANS, fontSize: 12.5, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.onDarkDim,
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => { setOpen(false); scrollToId(id); };

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 1000, height: 72,
        background: scrolled ? 'rgba(6,13,31,0.88)' : C.midnight,
        backdropFilter: scrolled ? 'blur(10px)' : undefined,
        WebkitBackdropFilter: scrolled ? 'blur(10px)' : undefined,
        borderBottom: '1px solid rgba(201,160,74,0.22)',
        transition: 'background .3s',
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <RealMoneyLogoWhite markSize={36} fontSize={16} subtitle="Personal Loan Advisory" id="nav-logo" />
          </button>

          <nav className="nav-desktop" style={{ gap: 34 }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => go(l.id)} className="lp-navlink" style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = C.goldLight)}
                onMouseLeave={e => (e.currentTarget.style.color = C.onDarkDim)}>
                {l.label}
              </button>
            ))}
            <span style={{ width: 1, height: 18, background: 'rgba(201,160,74,0.35)' }} />
            <button onClick={() => navigate('/login')} className="lp-navlink" style={{ ...linkStyle, color: C.onDark }}>Log in</button>
            <button onClick={() => go('apply')} className="lp-btn lp-btn-gold" style={{ height: 42, padding: '0 22px', fontSize: 12 }}>
              Apply now
            </button>
          </nav>

          <button className="nav-mobile-btn" onClick={() => setOpen(true)} aria-label="Open menu" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
            <Menu size={22} color={C.goldLight} />
          </button>
        </div>
      </header>

      <Drawer
        placement="right" width={290} open={open} onClose={() => setOpen(false)} closeIcon={<X size={18} color={C.goldLight} />}
        title={<RealMoneyLogoWhite markSize={30} fontSize={14} subtitle="Loan Advisory" id="nav-drawer-logo" />}
        styles={{
          header: { background: C.midnight, borderBottom: '1px solid rgba(201,160,74,0.22)' },
          body: { padding: '8px 0', background: C.midnight },
        }}
      >
        {NAV_LINKS.map(l => (
          <button key={l.id} onClick={() => go(l.id)} style={{ ...linkStyle, display: 'block', width: '100%', textAlign: 'left', padding: '16px 24px', color: C.onDark, borderBottom: '1px solid rgba(201,160,74,0.14)' }}>
            {l.label}
          </button>
        ))}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={() => go('apply')} className="lp-btn lp-btn-gold" style={{ height: 48 }}>Apply now</button>
          <button onClick={() => navigate('/login')} className="lp-btn lp-btn-on-dark" style={{ height: 48 }}>Log in</button>
          <button onClick={() => navigate('/careers')} style={{ ...linkStyle, marginTop: 8 }}>Careers</button>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
