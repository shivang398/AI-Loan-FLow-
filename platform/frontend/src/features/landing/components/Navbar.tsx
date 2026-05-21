import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import { IndianRupee, Menu, X, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const NAV_LINKS = [
  { label: 'Home',            href: '#hero' },
  { label: 'Loan Products',   href: '#loan-products' },
  { label: 'Lender Partners', href: '#lender-partners' },
  { label: 'How It Works',    href: '#how-it-works' },
  { label: 'About',           href: '#why-us' },
  { label: 'Contact',         href: '#footer' },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const navigate                       = useNavigate();

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
          borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 24px rgba(10,31,68,.09)' : 'none',
          transition: 'box-shadow .25s, border-color .25s',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo('#hero')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div style={{ width: 38, height: 38, borderRadius: 10, background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IndianRupee size={20} color="#0A1F44" strokeWidth={2.5} />
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
              <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 16, color: '#0A1F44', whiteSpace: 'nowrap' }}>
                Real Money Advisory
              </div>
              <div style={{ fontSize: 11, color: '#D4AF37', fontWeight: 600, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                Solution Pvt Ltd
              </div>
            </div>
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="nav-desktop">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#334155', fontFamily: 'Inter, sans-serif', padding: '4px 0', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = '#334155')}
              >
                {link.label}
              </button>
            ))}

            <Button
              onClick={() => scrollTo('#hero')}
              style={{ background: '#D4AF37', borderColor: '#D4AF37', color: '#0A1F44', fontWeight: 700, borderRadius: 8, height: 40, paddingInline: 20, fontSize: 14, whiteSpace: 'nowrap' }}
              type="primary"
            >
              Apply Now
            </Button>
            <Button
              onClick={() => navigate('/partners/register')}
              style={{ borderColor: '#0A1F44', color: '#0A1F44', fontWeight: 600, borderRadius: 8, height: 40, paddingInline: 16, fontSize: 13, whiteSpace: 'nowrap' }}
            >
              Partner
            </Button>
            <Button
              onClick={() => navigate('/login')}
              icon={<LogIn size={15} />}
              style={{ borderColor: '#4f46e5', color: '#4f46e5', fontWeight: 700, borderRadius: 8, height: 40, paddingInline: 16, fontSize: 13, whiteSpace: 'nowrap' }}
            >
              Login
            </Button>
          </nav>

          {/* ── Mobile Hamburger ── */}
          <button
            className="nav-mobile-btn"
            onClick={() => setDrawerOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8 }}
          >
            <Menu size={24} color="#0A1F44" />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IndianRupee size={16} color="#0A1F44" />
            </div>
            <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, color: '#0A1F44', fontSize: 15 }}>
              Real Money Advisory
            </span>
          </div>
        }
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closeIcon={<X size={18} />}
        width={280}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => { scrollTo(link.href); setDrawerOpen(false); }}
              style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 500, color: '#0F172A', padding: '12px 16px', borderRadius: 10, fontFamily: 'Inter, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              {link.label}
            </button>
          ))}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Button type="primary" block size="large" onClick={() => { scrollTo('#hero'); setDrawerOpen(false); }} style={{ background: '#D4AF37', borderColor: '#D4AF37', color: '#0A1F44', fontWeight: 700 }}>
              Apply Now
            </Button>
            <Button block size="large" onClick={() => { navigate('/partners/register'); setDrawerOpen(false); }} style={{ borderColor: '#0A1F44', color: '#0A1F44', fontWeight: 600 }}>
              Become a Partner
            </Button>
            <Button block size="large" icon={<LogIn size={15} />} onClick={() => { navigate('/login'); setDrawerOpen(false); }} style={{ borderColor: '#4f46e5', color: '#4f46e5', fontWeight: 700 }}>
              Login
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
