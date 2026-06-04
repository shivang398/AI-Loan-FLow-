import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import { Menu, X, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const RM_RED  = '#CC1B1B';
const RM_BLUE = '#0F2B9F';
const RM_NAVY = '#071560';

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

/* SVG globe logo matching the Real Money brand mark */
const RMLogo: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="white" />
    {/* Globe swoosh — blue arc left */}
    <path d="M8 20 C8 12 14 6 20 6 C26 6 32 12 32 20" stroke={RM_BLUE} strokeWidth="2.8" strokeLinecap="round" fill="none" />
    {/* Globe swoosh — red arc right */}
    <path d="M8 20 C8 28 14 34 20 34 C26 34 32 28 32 20" stroke={RM_RED} strokeWidth="2.8" strokeLinecap="round" fill="none" />
    {/* Horizontal white sweep */}
    <path d="M6 17 Q20 21 34 17" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M6 23 Q20 19 34 23" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    {/* R in red */}
    <text x="12" y="19" fontFamily="Arial" fontWeight="900" fontSize="8" fill={RM_RED}>R</text>
    {/* M in blue */}
    <text x="20" y="26" fontFamily="Arial" fontWeight="900" fontSize="8" fill={RM_BLUE}>M</text>
  </svg>
);

const Navbar: React.FC = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate                     = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: 68,
          background: '#fff',
          borderBottom: scrolled ? `1px solid #E5E7EB` : '1px solid #F3F4F6',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,.07)' : 'none',
          transition: 'box-shadow .25s, border-color .25s',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <RMLogo size={40} />
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 16, whiteSpace: 'nowrap', letterSpacing: '-0.02em' }}>
                <span style={{ color: RM_RED }}>REAL</span>
                {' '}
                <span style={{ color: RM_BLUE }}>MONEY</span>
              </div>
              <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Personal Loan Advisory
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="nav-desktop">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#374151', fontFamily: 'Inter, sans-serif', padding: '4px 0', whiteSpace: 'nowrap', transition: 'color .15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = RM_NAVY)}
                onMouseLeave={e => (e.currentTarget.style.color = '#374151')}
              >
                {link.label}
              </button>
            ))}

            <Button
              onClick={() => navigate('/partners/register')}
              style={{ borderColor: RM_RED, color: RM_RED, fontWeight: 600, borderRadius: 6, height: 38, paddingInline: 16, fontSize: 13, whiteSpace: 'nowrap' }}
            >
              Become a Partner
            </Button>
            <Button
              onClick={() => navigate('/login')}
              icon={<LogIn size={14} />}
              style={{ background: `linear-gradient(135deg, ${RM_NAVY}, ${RM_BLUE})`, borderColor: RM_BLUE, color: '#ffffff', fontWeight: 700, borderRadius: 6, height: 38, paddingInline: 16, fontSize: 13, whiteSpace: 'nowrap' }}
            >
              Login
            </Button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setDrawerOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8 }}
          >
            <Menu size={24} color={RM_NAVY} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <RMLogo size={34} />
            <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 15 }}>
              <span style={{ color: RM_RED }}>REAL</span>{' '}
              <span style={{ color: RM_BLUE }}>MONEY</span>
            </span>
          </div>
        }
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closeIcon={<X size={18} />}
        width={280}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => { scrollTo(link.href); setDrawerOpen(false); }}
              style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#111827', padding: '11px 14px', borderRadius: 8, fontFamily: 'Inter, sans-serif', transition: 'background .15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              {link.label}
            </button>
          ))}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button block size="large" onClick={() => { navigate('/partners/register'); setDrawerOpen(false); }} style={{ borderColor: RM_RED, color: RM_RED, fontWeight: 600, borderRadius: 6 }}>
              Become a Partner
            </Button>
            <Button block size="large" icon={<LogIn size={14} />} onClick={() => { navigate('/login'); setDrawerOpen(false); }} style={{ background: `linear-gradient(135deg, ${RM_NAVY}, ${RM_BLUE})`, borderColor: RM_BLUE, color: '#ffffff', fontWeight: 700, borderRadius: 6 }}>
              Login
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
