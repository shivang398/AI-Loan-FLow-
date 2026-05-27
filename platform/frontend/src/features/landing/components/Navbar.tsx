import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import { IndianRupee, Menu, X, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

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
          borderBottom: scrolled ? '1px solid #E5E7EB' : '1px solid #F3F4F6',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,.06)' : 'none',
          transition: 'box-shadow .25s, border-color .25s',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 8,
              background: '#0A1F44',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <IndianRupee size={19} color="#ffffff" strokeWidth={2.5} />
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 16, color: '#0A1F44', whiteSpace: 'nowrap', letterSpacing: '-0.02em' }}>
                Real Money
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
                onMouseEnter={e => (e.currentTarget.style.color = '#0A1F44')}
                onMouseLeave={e => (e.currentTarget.style.color = '#374151')}
              >
                {link.label}
              </button>
            ))}

            <Button
              onClick={() => navigate('/partners/register')}
              style={{ borderColor: '#D1D5DB', color: '#374151', fontWeight: 600, borderRadius: 6, height: 38, paddingInline: 16, fontSize: 13, whiteSpace: 'nowrap' }}
            >
              Become a Partner
            </Button>
            <Button
              onClick={() => navigate('/login')}
              icon={<LogIn size={14} />}
              style={{ background: '#0A1F44', borderColor: '#0A1F44', color: '#ffffff', fontWeight: 700, borderRadius: 6, height: 38, paddingInline: 16, fontSize: 13, whiteSpace: 'nowrap' }}
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
            <Menu size={24} color="#0A1F44" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#0A1F44', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IndianRupee size={15} color="#ffffff" />
            </div>
            <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, color: '#0A1F44', fontSize: 15 }}>
              Real Money
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
            <Button block size="large" onClick={() => { navigate('/partners/register'); setDrawerOpen(false); }} style={{ borderColor: '#D1D5DB', color: '#374151', fontWeight: 600, borderRadius: 6 }}>
              Become a Partner
            </Button>
            <Button block size="large" icon={<LogIn size={14} />} onClick={() => { navigate('/login'); setDrawerOpen(false); }} style={{ background: '#0A1F44', borderColor: '#0A1F44', color: '#ffffff', fontWeight: 700, borderRadius: 6 }}>
              Login
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
