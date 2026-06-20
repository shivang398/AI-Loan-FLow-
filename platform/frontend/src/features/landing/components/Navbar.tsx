import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import { Menu, X, LogIn, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RealMoneyLogo } from '../../../shared/components/RealMoneyLogo';
import '../styles/landing.css';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';

const NAV_LINKS = [
  { label: 'Home',          href: '#hero' },
  { label: 'Loan Products', href: '#loan-products' },
  { label: 'Our Partners',  href: '#partners' },
  { label: 'How It Works',  href: '#how-it-works' },
  { label: 'About Us',      href: '#why-us' },
  { label: 'Contact',       href: '#footer' },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate                     = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div style={{
        background: '#060F1E',
        padding: '7px 24px',
        textAlign: 'center',
        fontSize: 11.5,
        color: 'rgba(255,255,255,0.45)',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.02em',
        borderBottom: `1px solid rgba(196,153,58,0.15)`,
      }}>
        <span style={{ color: GOLD, fontWeight: 700 }}>Authorised Corporate DSA</span>
        {' · '}Personal Loans · Education Loans · Business Loans
        {' · '}
        <a href="tel:+919876543210" style={{
          color: 'rgba(255,255,255,0.45)',
          textDecoration: 'none', fontWeight: 500,
        }}>
          +91 98765 43210
        </a>
      </div>

      {/* Main navbar */}
      <header style={{
        position: 'sticky',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: 64,
        background: '#FFFFFF',
        borderBottom: `1px solid ${scrolled ? '#CDD4EC' : '#E4E9F7'}`,
        boxShadow: scrolled ? '0 2px 16px rgba(10,30,110,0.08)' : 'none',
        transition: 'box-shadow 0.22s, border-color 0.22s',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 28px',
          height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            aria-label="Go to top"
          >
            <RealMoneyLogo
              markSize={40}
              fontSize={16}
              subSize={9}
              subtitle="Personal Loan Advisory"
              id="nav-logo"
            />
          </button>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ gap: '1.75rem' }}>
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 13.5, fontWeight: 500, color: '#3A4F80',
                  fontFamily: 'Inter, sans-serif', padding: '4px 0',
                  letterSpacing: '0.01em', transition: 'color 0.14s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = NAVY)}
                onMouseLeave={e => (e.currentTarget.style.color = '#3A4F80')}
              >
                {link.label}
              </button>
            ))}

            {/* Become a Partner */}
            <button
              onClick={() => navigate('/partners/register')}
              style={{
                background: 'none',
                border: `1px solid ${GOLD}`,
                cursor: 'pointer',
                color: GOLD, fontWeight: 600,
                borderRadius: 2,
                height: 36, paddingInline: 16,
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.03em',
                transition: 'all 0.14s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = GOLD;
                (e.currentTarget as HTMLElement).style.color = '#fff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'none';
                (e.currentTarget as HTMLElement).style.color = GOLD;
              }}
            >
              Become a Partner
            </button>

            {/* Login */}
            <button
              onClick={() => navigate('/login')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: NAVY,
                border: `1px solid ${NAVY}`,
                cursor: 'pointer',
                color: '#fff', fontWeight: 600,
                borderRadius: 2,
                height: 36, paddingInline: 16,
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.03em',
                transition: 'background 0.14s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#1A3256')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = NAVY)}
            >
              <LogIn size={13} />
              Login
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setDrawerOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}
            aria-label="Open menu"
          >
            <Menu size={22} color={NAVY} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <RealMoneyLogo
              markSize={32}
              fontSize={14}
              subSize={8}
              subtitle="Loan Advisory"
              id="nav-drawer-logo"
            />
          </div>
        }
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closeIcon={<X size={17} />}
        width={288}
        styles={{ body: { padding: '8px 0' } }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => { scrollTo(link.href); setDrawerOpen(false); }}
              style={{
                textAlign: 'left',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 500, color: NAVY,
                padding: '13px 24px',
                fontFamily: 'Inter, sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid #EEF2FF',
                transition: 'background 0.12s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#F5F7FC')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'none')}
            >
              {link.label}
              <ChevronRight size={14} color="#7A8FB0" />
            </button>
          ))}

          <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Button
              block size="large"
              onClick={() => { navigate('/partners/register'); setDrawerOpen(false); }}
              style={{
                borderColor: GOLD, color: GOLD, fontWeight: 600,
                borderRadius: 2, letterSpacing: '0.03em',
              }}
            >
              Become a Partner
            </Button>
            <Button
              block size="large"
              icon={<LogIn size={13} />}
              onClick={() => { navigate('/login'); setDrawerOpen(false); }}
              style={{
                background: NAVY, borderColor: NAVY,
                color: '#ffffff', fontWeight: 600, borderRadius: 2,
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
