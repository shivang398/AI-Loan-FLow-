import React, { useState } from 'react';
import { Tabs } from 'antd';
import { LENDERS, type LenderCategory } from '../constants/landingData';
import '../styles/landing.css';

const CATS: Array<'All' | LenderCategory> = ['All', 'Public Banks', 'Private Banks', 'SFBs', 'NBFCs', 'HFCs'];

const LenderCard: React.FC<{ name: string }> = ({ name }) => (
  <div
    style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '10px 20px', borderRadius: 12, margin: '0 8px',
      background: '#FFFFFF', border: '1.5px solid #CBD5E1',
      minWidth: 130, flexShrink: 0,
      boxShadow: '0 1px 4px rgba(10,31,68,.06)',
    }}
  >
    <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 13, color: '#0A1F44', whiteSpace: 'nowrap' }}>
      {name}
    </span>
  </div>
);

const ScrollRow: React.FC<{ names: string[]; dir: 'left' | 'right' }> = ({ names, dir }) => {
  const doubled = [...names, ...names];
  return (
    <div className="lender-track">
      <div className={dir === 'left' ? 'lender-row-left' : 'lender-row-right'}>
        {doubled.map((n, i) => <LenderCard key={`${n}-${i}`} name={n} />)}
      </div>
    </div>
  );
};

const LenderPartners: React.FC = () => {
  const [tab, setTab] = useState<'All' | LenderCategory>('All');
  const filtered = tab === 'All' ? LENDERS : LENDERS.filter(l => l.category === tab);
  const names = filtered.map(l => l.name);
  const chunk = (arr: string[], n: number) => {
    const out: string[][] = [];
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
    return out;
  };
  let rows = chunk(names, Math.ceil(names.length / 3));
  while (rows.length < 3) rows.push(names);

  return (
    <section id="lender-partners" style={{ background: '#fff', padding: '88px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span style={{ display: 'inline-block', background: 'rgba(10,31,68,.07)', color: '#0A1F44', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100, marginBottom: 12 }}>
            Our Network
          </span>
          <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: '#0A1F44', margin: '8px 0' }}>
            50+ Lender Partners
          </h2>
          <p style={{ color: '#64748B', fontSize: 16 }}>
            One application. Access to India's top banks, NBFCs, SFBs, and HFCs.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
          <Tabs
            activeKey={tab}
            onChange={k => setTab(k as typeof tab)}
            items={CATS.map(c => ({ key: c, label: c }))}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rows.map((row, i) => (
            <ScrollRow key={i} names={row.length >= 5 ? row : names} dir={i % 2 === 0 ? 'left' : 'right'} />
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#94A3B8', marginTop: 24 }}>
          + many more regional banks and cooperative lenders
        </p>
      </div>
    </section>
  );
};

export default LenderPartners;
