import React from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import Navbar              from '../features/landing/components/Navbar';
import Hero                from '../features/landing/components/Hero';
import LoanProducts        from '../features/landing/components/LoanProducts';
import LenderPartners      from '../features/landing/components/LenderPartners';
import WhyChooseUs         from '../features/landing/components/WhyChooseUs';
import HowItWorks          from '../features/landing/components/HowItWorks';
import EligibilityWidget   from '../features/landing/components/EligibilityWidget';
import Testimonials        from '../features/landing/components/Testimonials';
import Stats               from '../features/landing/components/Stats';
import FAQ                 from '../features/landing/components/FAQ';
import ChannelPartnerCTA   from '../features/landing/components/ChannelPartnerCTA';
import Footer              from '../features/landing/components/Footer';
import WhatsAppFloat       from '../features/landing/components/WhatsAppFloat';
import MobileStickyBar     from '../features/landing/components/MobileStickyBar';
import '../features/landing/styles/landing.css';

const landingTheme = {
  token: {
    colorPrimary: '#0A1F44',
    colorLink: '#D4AF37',
    borderRadius: 8,
    fontFamily: 'Inter, sans-serif',
  },
};

const LandingPage: React.FC = () => (
  <ConfigProvider theme={landingTheme}>
    <AntdApp>
      <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
        <Navbar />
        <Hero />
        <LoanProducts />
        <LenderPartners />
        <WhyChooseUs />
        <HowItWorks />
        <EligibilityWidget />
        <Testimonials />
        <Stats />
        <FAQ />
        <ChannelPartnerCTA />
        <Footer />
        <WhatsAppFloat />
        <MobileStickyBar />
      </div>
    </AntdApp>
  </ConfigProvider>
);

export default LandingPage;
