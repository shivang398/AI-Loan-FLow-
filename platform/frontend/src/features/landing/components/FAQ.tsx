import React from 'react';
import { Collapse } from 'antd';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../constants/landingData';

const FAQ: React.FC = () => (
  <section id="faq" style={{ background: '#F9FAFB', padding: '88px 0' }}>
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span style={{
          display: 'inline-block', background: '#EFF6FF', color: '#2563EB',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 4, marginBottom: 14,
        }}>
          FAQs
        </span>
        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 'clamp(26px, 3vw, 38px)', color: '#0A1F44', margin: '0 0 12px' }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: '#6B7280', fontSize: 15, margin: 0 }}>
          Everything you need to know before applying for a personal loan.
        </p>
      </div>

      <Collapse
        accordion bordered={false}
        expandIcon={({ isActive }) => (
          <ChevronDown size={16} color="#2563EB" style={{ transform: isActive ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .25s' }} />
        )}
        expandIconPosition="end"
        style={{ background: 'transparent' }}
        items={FAQ_ITEMS.map(item => ({
          key: item.key,
          label: <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: 15, color: '#0A1F44' }}>{item.label}</span>,
          children: <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.8, margin: 0 }}>{item.children}</p>,
          style: { marginBottom: 8, border: '1.5px solid #E5E7EB', borderRadius: 10, overflow: 'hidden', background: '#ffffff' },
        }))}
      />
    </div>
  </section>
);

export default FAQ;
