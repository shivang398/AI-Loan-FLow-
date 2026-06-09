import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import { Menu, X, LogIn, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const NAVY    = '#0B1E3D';
const GOLD    = '#C4993A';
const RM_RED  = '#CC1B1B';
const RM_BLUE = '#0F2B9F';

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

const RMLogo: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="white" />
    <path d="M8 20 C8 12 14 6 20 6 C26 6 32 12 32 20" stroke={RM_BLUE} strokeWidth="2.8" strokeLinecap="round" fill="none" />
    <path d="M8 20 C8 28 14 34 20 34 C26 34 32 28 32 20" stroke={RM_RED}  strokeWidth="2.8" strokeLinecap="round" fill="none" />
    <path d="M6 17 Q20 21 34 17" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M6 23 Q20 19 34 23" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <text x="12" y="19" fontFamily="Arial" fontWeight="900" fontSize="8" fill={RM_RED}>R</text>
    <text x="20" y="26" fontFamily="Arial" fontWeight="900" fontSize="8" fill={RM_BLUE}>M</text>
  </svg>
);

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
      {/* Top announcement bar */}
      <div style={{
        background: NAVY,
        padding: '7px 24px',
        textAlign: 'center',
        fontSize: 12,
        color: 'rgba(255,255,255,0.65)',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.01em',
      }}>
        <span style={{ color: GOLD, fontWeight: 600 }}>Authorised Corporate DSA</span>
        {' · '}Personal Loans · Education Loans · Business Loans
        {' · '}
        <a href="tel:+919876543210" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontWeight: 500 }}>
          +91 98765 43210
        </a>
      </div>

      <motion.header
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'sticky',
          top: 0,
          left: 0, right: 0,
          zIndex: 1000,
          height: 64,
          background: '#FFFFFF',
          borderBottom: `1px solid ${scrolled ? '#D3DCE8' : '#E8EDF5'}`,
          boxShadow: scrolled ? '0 2px 20px rgba(11,30,61,0.08)' : 'none',
          transition: 'box-shadow .25s, border-color .25s',
        }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 28px',
          height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            style={{ display: 'flex', alignItems: 'center', gap: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <RMLogo size={38} />
            <div style={{ textAlign: 'left', lineHeight: 1.25 }}>
              <div style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif', fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>
                <span style={{ color: RM_RED }}>REAL</span>
                {' '}
                <span style={{ color: RM_BLUE }}>MONEY</span>
              </div>
              <div style={{ fontSize: 9.5, color: GOLD, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Personal Loan Advisory
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="nav-desktop" style={{ gap: '1.75rem' }}>
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 13.5, fontWeight: 500, color: '#3A506B',
                  fontFamily: 'Inter, sans-serif', padding: '4px 0',
                  letterSpacing: '0.01em', transition: 'color .15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = NAVY)}
                onMouseLeave={e => (e.currentTarget.style.color = '#3A506B')}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => navigate('/partners/register')}
              style={{
                background: 'none', border: `1px solid ${GOLD}`, cursor: 'pointer',
                color: GOLD, fontWeight: 600, borderRadius: 3, height: 36,
                paddingInline: 16, fontSize: 13, fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.02em', transition: 'all .15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = GOLD; }}
            >
              Become a Partner
            </button>
            <Button
              onClick={() => navigate('/login')}
              icon={<LogIn size={13} />}
              style={{
                background: NAVY, borderColor: NAVY, color: '#ffffff',
                fontWeight: 600, borderRadius: 3, height: 36,
                paddingInline: 18, fontSize: 13, letterSpacing: '0.02em',
              }}
            >
              Login
            </Button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setDrawerOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 3 }}
          >
            <Menu size={22} color={NAVY} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <RMLogo size={32} />
            <div style={{ lineHeight: 1.25 }}>
              <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 14 }}>
                <span style={{ color: RM_RED }}>REAL</span>{' '}
                <span style={{ color: RM_BLUE }}>MONEY</span>
              </div>
              <div style={{ fontSize: 9, color: GOLD, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Loan Advisory
              </div>
            </div>
          </div>
        }
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closeIcon={<X size={17} />}
        width={290}
        styles={{ body: { padding: '8px 0' } }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => { scrollTo(link.href); setDrawerOpen(false); }}
              style={{
                textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 500, color: '#0B1E3D',
                padding: '12px 24px', fontFamily: 'Inter, sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid #EEF2F8',
              }}
            >
              {link.label}
              <ChevronRight size={14} color="#7A90A8" />
            </button>
          ))}
          <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Button block size="large" onClick={() => { navigate('/partners/register'); setDrawerOpen(false); }}
              style={{ borderColor: GOLD, color: GOLD, fontWeight: 600, borderRadius: 3, letterSpacing: '0.02em' }}>
              Become a Partner
            </Button>
            <Button block size="large" icon={<LogIn size={13} />}
              onClick={() => { navigate('/login'); setDrawerOpen(false); }}
              style={{ background: NAVY, borderColor: NAVY, color: '#ffffff', fontWeight: 600, borderRadius: 3 }}>
              Login
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
