import React from 'react';
import { Collapse } from 'antd';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../constants/landingData';
import { C, DISPLAY, SANS } from '../theme';
import { SectionHeading } from './Royal';

const FAQ: React.FC = () => (
  <section id="faq" style={{ background: C.ivory, padding: 'clamp(72px, 9vw, 112px) 0' }}>
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px' }}>
      <SectionHeading eyebrow="FAQ" title="Questions, answered" />

      <Collapse
        accordion bordered={false} expandIconPosition="end"
        style={{ background: 'transparent', marginTop: 48, borderTop: `1px solid ${C.line}` }}
        expandIcon={({ isActive }) => (
          <Plus size={18} color={C.goldDeep} style={{ transform: isActive ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }} />
        )}
        items={FAQ_ITEMS.map(item => ({
          key: item.key,
          label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span aria-hidden style={{ width: 7, height: 7, background: C.gold, transform: 'rotate(45deg)', flexShrink: 0 }} />
              <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 21, color: C.navy }}>{item.label}</span>
            </span>
          ),
          children: <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.8, color: C.muted, margin: '0 0 0 21px' }}>{item.children}</p>,
          style: { background: 'transparent', borderBottom: `1px solid ${C.line}`, borderRadius: 0, padding: '6px 0' },
        }))}
      />
    </div>
  </section>
);

export default FAQ;
