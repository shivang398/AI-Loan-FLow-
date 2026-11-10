import React from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import Navbar              from '../features/landing/components/Navbar';
import Hero                from '../features/landing/components/Hero';
import TrustBand           from '../features/landing/components/TrustBand';
import HowItWorks          from '../features/landing/components/HowItWorks';
import Charter             from '../features/landing/components/Charter';
import CustomerRegistrationSection from '../features/landing/components/CustomerRegistrationSection';
import Loans               from '../features/landing/components/Loans';
import Testimonials        from '../features/landing/components/Testimonials';
import PartnerProgram      from '../features/landing/components/PartnerProgram';
import FAQ                 from '../features/landing/components/FAQ';
import Footer              from '../features/landing/components/Footer';
import WhatsAppFloat       from '../features/landing/components/WhatsAppFloat';
import MobileStickyBar     from '../features/landing/components/MobileStickyBar';
import { C } from '../features/landing/theme';
import '../features/landing/styles/landing.css';

const landingTheme = {
  token: {
    colorPrimary:    '#0B1E3D',
    colorLink:       C.gold,
    colorSuccess:    '#15803D',
    colorWarning:    '#C4993A',
    colorError:      '#DC2626',
    borderRadius:    2,
    borderRadiusSM:  2,
    borderRadiusLG:  3,
    fontFamily:      'Inter, -apple-system, sans-serif',
    colorBgBase:     '#FFFFFF',
    colorTextBase:   '#0B1E3D',
    colorBorder:     C.line,
  },
  components: {
    Button: { borderRadius: 2 },
    Input:  { borderRadius: 2 },
    Select: { borderRadius: 2 },
    Modal:  { borderRadiusLG: 3 },
  },
};

const LandingPage: React.FC = () => (
  <ConfigProvider theme={landingTheme}>
    <AntdApp>
      {/* Borrowers: hero → lending network → how it works → charter → apply → loans → reviews; then channel partners; then FAQ */}
      <div style={{ minHeight: '100vh', background: C.white, fontFamily: 'Inter, sans-serif' }}>
        <Navbar />
        <Hero />
        <TrustBand />
        <HowItWorks />
        <Charter />
        <CustomerRegistrationSection />
        <Loans />
        <Testimonials />
        <PartnerProgram />
        <FAQ />
        <Footer />
        <WhatsAppFloat />
        <MobileStickyBar />
      </div>
    </AntdApp>
  </ConfigProvider>
);

export default LandingPage;
