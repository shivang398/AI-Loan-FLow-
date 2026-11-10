import React from 'react';
import { C, DISPLAY, SANS } from '../theme';

const TrustBand: React.FC = () => (
  <section aria-label="Our lending network" style={{ background: C.parchment, borderBottom: `1px solid ${C.line}` }}>
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 24px 36px' }}>
      <p style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.goldDeep, textAlign: 'center', margin: 0 }}>
        Empanelled DSA for leading banks &amp; NBFCs
      </p>

      <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(24px, 2.6vw, 32px)', color: C.navy, textAlign: 'center', margin: '12px 0 0' }}>
        50+ banks &amp; NBFCs, one application
      </h2>

      <p style={{ fontFamily: SANS, fontSize: 12, color: C.muted, textAlign: 'center', margin: '18px 0 0' }}>
        Real Money is a Corporate DSA, not a lender. Loans are sanctioned and disbursed solely by the partner bank or NBFC.
      </p>

    </div>
  </section>
);

export default TrustBand;
