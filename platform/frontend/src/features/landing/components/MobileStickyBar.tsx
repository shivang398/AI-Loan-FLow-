import React from 'react';
import { Phone } from 'lucide-react';
import { C, SANS, scrollToId } from '../theme';
import '../styles/landing.css';

const cell: React.CSSProperties = {
  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 0',
  fontFamily: SANS, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: 'none', cursor: 'pointer',
};

const MobileStickyBar: React.FC = () => (
  <div className="mobile-sticky" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 900, boxShadow: '0 -4px 16px rgba(11,30,61,.15)' }}>
    <a href="tel:+919876543210" style={{ ...cell, background: C.midnight, color: C.onDark, borderTop: '1px solid rgba(201,160,74,0.35)' }}>
      <Phone size={16} /> Call
    </a>
    <button onClick={() => scrollToId('apply')} className="lp-btn-gold" style={{ ...cell, borderRadius: 0, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 13 }}>
      Apply now
    </button>
  </div>
);

export default MobileStickyBar;
