import React from 'react';

export const RM_BLUE  = '#0B2DA4';
export const RM_RED   = '#CC1A1A';
export const RM_NAVY  = '#0A1E6E';

export const SCORE_BANDS: Record<string, { label: string; color: string; bg: string; border: string; desc: string }> = {
  EXCELLENT:  { label: 'Excellent',       color: '#1A7A4A', bg: '#F0FAF4', border: '#A3D9B8', desc: 'Highly likely to be approved. Best interest rates available.' },
  GOOD:       { label: 'Good',            color: '#1A7A4A', bg: '#F0FAF4', border: '#A3D9B8', desc: 'Strong profile. Approval likely with standard terms.' },
  FAIR:       { label: 'Fair',            color: '#8A6020', bg: '#FBF4E0', border: '#D4B46A', desc: 'Moderate risk. May face conditional approval.' },
  POOR:       { label: 'Poor',            color: '#C2410C', bg: '#FFF3EE', border: '#F5B896', desc: 'High risk. Approval uncertain. Higher interest rates.' },
  VERY_POOR:  { label: 'Very Poor',       color: '#991B1B', bg: '#FFF0F0', border: '#F5A5A5', desc: 'Unlikely to be approved. Significant credit issues.' },
  NO_HISTORY: { label: 'No History (NH)', color: '#3A4F80', bg: '#EEF2FF', border: '#C7D2F8', desc: 'No sufficient credit history. First loan applicant.' },
};

export const scoreColor = (score: number) => {
  if (score >= 750) return '#1A7A4A';
  if (score >= 700) return '#1A7A4A';
  if (score >= 650) return '#8A6020';
  if (score >= 550) return '#C2410C';
  return '#991B1B';
};

export const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const CIRCUM = Math.PI * 90;
  const clipped = Math.min(Math.max(score - 300, 0), 600);
  const pct = clipped / 600;
  const offset = CIRCUM * (1 - pct);
  const color = scoreColor(score);

  return (
    <svg viewBox="0 0 220 120" width={200} height={110} style={{ overflow: 'visible' }}>
      <path d="M 20,110 A 90,90 0 0,1 200,110" stroke="#E8ECF7" strokeWidth={16} fill="none" strokeLinecap="butt" />
      <path
        d="M 20,110 A 90,90 0 0,1 200,110"
        stroke={color}
        strokeWidth={16}
        fill="none"
        strokeLinecap="butt"
        strokeDasharray={CIRCUM}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.4s ease' }}
      />
      <text x="110" y="96" textAnchor="middle" fontSize="34" fontWeight="700" fill={color}
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{score}</text>
      <text x="110" y="114" textAnchor="middle" fontSize="8.5" fill="#7A8FB0" fontWeight="600"
        style={{ fontFamily: "Inter, sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        CIBIL SCORE · 300–900
      </text>
    </svg>
  );
};

export const ScoreRangeReference: React.FC<{ scoreBand: string }> = ({ scoreBand }) => (
  <div className="pro-card" style={{ padding: '18px 20px' }}>
    <div style={{
      fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)',
      textTransform: 'uppercase', letterSpacing: '0.10em',
      fontFamily: 'Inter, sans-serif', marginBottom: 14,
    }}>
      Score Range Reference
    </div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {[
        { range: '750–900', label: 'Excellent', color: '#1A7A4A', bg: '#F0FAF4' },
        { range: '700–749', label: 'Good',      color: '#1A7A4A', bg: '#F5FDF8' },
        { range: '650–699', label: 'Fair',      color: '#8A6020', bg: '#FBF4E0' },
        { range: '550–649', label: 'Poor',      color: '#C2410C', bg: '#FFF3EE' },
        { range: '300–549', label: 'Very Poor', color: '#991B1B', bg: '#FFF0F0' },
      ].map(({ range, label, color, bg }) => {
        const isActive = SCORE_BANDS[scoreBand]?.label === label;
        return (
          <div key={range} style={{
            padding: '8px 14px',
            background: isActive ? color : bg,
            border: `1px solid ${isActive ? color : color + '33'}`,
            flex: 1, minWidth: 90, textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? '#fff' : color, fontFamily: '"Playfair Display", Georgia, serif' }}>{range}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: isActive ? 'rgba(255,255,255,0.85)' : color, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{label}</div>
          </div>
        );
      })}
    </div>
  </div>
);
