import React from 'react';

const RED  = '#CC1A1A';
const BLUE = '#0B2DA4';

/**
 * Globe mark — blue arc (left ~270°), red arc (right ~90°),
 * two white swoosh bands, "R" red + "M" blue in the centre gap.
 * `id` must be unique per page (used for clipPath).
 */
export const RealMoneyMark: React.FC<{ size?: number; id?: string }> = ({
  size = 40,
  id   = 'rm-default',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Real Money logo mark"
  >
    <defs>
      <clipPath id={`globe-${id}`}>
        {/* clip white bands to inside the circle */}
        <circle cx="100" cy="100" r="82" />
      </clipPath>
    </defs>

    {/* ── Blue arc: 1 o'clock → 5 o'clock going counterclockwise (270°, left side) ── */}
    <path
      d="M 140,31 A 80,80 0 1 0 140,169"
      stroke={BLUE}
      strokeWidth="13"
      strokeLinecap="round"
    />

    {/* ── Red arc: 1 o'clock → 5 o'clock going clockwise (90°, right side) ── */}
    <path
      d="M 140,31 A 80,80 0 0 1 140,169"
      stroke={RED}
      strokeWidth="11"
      strokeLinecap="round"
    />

    {/* ── Two white swoosh bands clipped to globe ── */}
    <g clipPath={`url(#globe-${id})`}>
      {/* upper band */}
      <path d="M 16,66 Q 100,57 184,66 L 184,82 Q 100,73 16,82 Z" fill="white" />
      {/* lower band */}
      <path d="M 16,118 Q 100,109 184,118 L 184,134 Q 100,125 16,134 Z" fill="white" />
    </g>

    {/* ── "R" in red, "M" in blue — sit in the centre gap between bands ── */}
    <text
      x="44"
      y="113"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontWeight="700"
      fontSize="44"
      fill={RED}
      letterSpacing="-2"
    >
      R
    </text>
    <text
      x="95"
      y="113"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontWeight="700"
      fontSize="40"
      fill={BLUE}
      letterSpacing="-2"
    >
      M
    </text>
  </svg>
);

/**
 * Full horizontal logo — mark + wordmark side by side.
 * Use in Navbar and any header context.
 */
export const RealMoneyLogo: React.FC<{
  markSize?:   number;
  fontSize?:   number;
  subSize?:    number;
  subtitle?:   string;
  id?:         string;
}> = ({
  markSize = 40,
  fontSize = 17,
  subSize  = 9,
  subtitle = 'Personal Loan Advisory',
  id       = 'rm-logo',
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0 }}>
    <RealMoneyMark size={markSize} id={id} />
    <div style={{ lineHeight: 1.2 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
        <span style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 800,
          fontSize,
          color: RED,
          letterSpacing: '-0.01em',
        }}>
          REAL&nbsp;
        </span>
        <span style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 800,
          fontSize,
          color: BLUE,
          letterSpacing: '-0.01em',
        }}>
          MONEY
        </span>
      </div>
      {subtitle && (
        <div style={{
          fontSize: subSize,
          fontWeight: 700,
          color: 'rgba(10,30,110,0.35)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
          marginTop: 1,
        }}>
          {subtitle}
        </div>
      )}
    </div>
  </div>
);

/**
 * Sidebar variant — white text for dark backgrounds.
 */
export const RealMoneyLogoWhite: React.FC<{
  markSize?: number;
  fontSize?: number;
  subtitle?: string;
  id?:       string;
}> = ({
  markSize = 38,
  fontSize = 15,
  subtitle = 'Advisory Platform',
  id       = 'rm-sidebar',
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
    <RealMoneyMark size={markSize} id={id} />
    <div style={{ lineHeight: 1.2 }}>
      <div style={{ display: 'flex', gap: 0 }}>
        <span style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700,
          fontSize,
          color: '#E8C870',
          letterSpacing: '-0.01em',
        }}>
          REAL&nbsp;
        </span>
        <span style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700,
          fontSize,
          color: '#FFFFFF',
          letterSpacing: '-0.01em',
        }}>
          MONEY
        </span>
      </div>
      {subtitle && (
        <div style={{
          fontSize: 9,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.30)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
          marginTop: 2,
        }}>
          {subtitle}
        </div>
      )}
    </div>
  </div>
);

export default RealMoneyLogo;
