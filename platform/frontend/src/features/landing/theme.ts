// Landing page palette — "royal": midnight navy, burnished gold, ivory parchment. Every landing section uses these.
export const C = {
  midnight:  '#060D1F',   // hero / footer / navbar background
  navy:      '#0B1E3D',   // headings and primary text on light
  navySoft:  '#13284D',   // raised surfaces on dark
  gold:      '#C9A04A',   // the single accent
  goldLight: '#EBD49A',
  goldDeep:  '#9A7426',
  goldSoft:  '#F3E8CC',   // tinted wells on light
  parchment: '#F8F3E8',   // alternate light section background
  ivory:     '#FFFDF8',   // light section background / cards
  white:     '#FFFFFF',
  ink:       '#26334B',   // body text on light
  muted:     '#6B6557',   // secondary text on light (warm grey)
  line:      '#E6D9BC',   // gold-tinted hairlines on light
  onDark:    'rgba(255,248,232,0.92)',
  onDarkDim: 'rgba(255,248,232,0.62)',
} as const;

/** Burnished-gold gradient for text, rules and buttons */
export const GOLD_GRADIENT = `linear-gradient(100deg, ${C.goldDeep} 0%, ${C.gold} 28%, ${C.goldLight} 50%, ${C.gold} 72%, ${C.goldDeep} 100%)`;

export const DISPLAY = '"Cormorant Garamond", "Playfair Display", Georgia, serif';
export const SANS = 'Inter, -apple-system, sans-serif';

export const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
