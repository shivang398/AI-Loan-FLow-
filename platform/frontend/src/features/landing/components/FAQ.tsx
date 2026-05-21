import React from 'react';
import { Collapse } from 'antd';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../constants/landingData';

const FAQ: React.FC = () => (
  <section id="faq" style={{ background: '#fff', padding: '88px 0' }}>
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span style={{ display: 'inline-block', background: 'rgba(10,31,68,.07)', color: '#0A1F44', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100, marginBottom: 12 }}>FAQ</span>
        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: '#0A1F44', margin: '8px 0' }}>Frequently Asked Questions</h2>
      </div>

      <Collapse
        accordion bordered={false}
        expandIcon={({ isActive }) => (
          <ChevronDown size={18} color="#0A1F44" style={{ transform: isActive ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .3s' }} />
        )}
        expandIconPosition="end"
        style={{ background: 'transparent' }}
        items={FAQ_ITEMS.map(item => ({
          key: item.key,
          label: <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 15, color: '#0A1F44' }}>{item.label}</span>,
          children: <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.75, margin: 0 }}>{item.children}</p>,
          style: { marginBottom: 10, border: '1.5px solid #E2E8F0', borderRadius: 14, overflow: 'hidden', background: '#fff' },
        }))}
      />
    </div>
  </section>
);

export default FAQ;
