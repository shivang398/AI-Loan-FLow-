import React from 'react';
import { Phone } from 'lucide-react';
import '../styles/landing.css';

const MobileStickyBar: React.FC = () => (
  <div
    className="mobile-sticky"
    style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 900,
      boxShadow: '0 -4px 20px rgba(10,31,68,.2)',
    }}
  >
    <a href="tel:+919876543210"
      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 0', background: '#0A1F44', color: '#FFFFFF', fontWeight: 700, fontSize: 14, textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}>
      <Phone size={17} /> Call Now
    </a>
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 0', background: '#D4AF37', color: '#0A1F44', fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
      Apply Now
    </button>
  </div>
);

export default MobileStickyBar;
