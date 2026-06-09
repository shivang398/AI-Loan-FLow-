import React from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import Navbar              from '../features/landing/components/Navbar';
import Hero                from '../features/landing/components/Hero';
import LoanProducts        from '../features/landing/components/LoanProducts';
import LenderPartners      from '../features/landing/components/LenderPartners';
import HowItWorks          from '../features/landing/components/HowItWorks';
import EligibilityWidget   from '../features/landing/components/EligibilityWidget';
import Testimonials        from '../features/landing/components/Testimonials';
import Stats               from '../features/landing/components/Stats';
import FAQ                 from '../features/landing/components/FAQ';
import CustomerRegistrationSection from '../features/landing/components/CustomerRegistrationSection';
import ChannelPartnerCTA   from '../features/landing/components/ChannelPartnerCTA';
import Footer              from '../features/landing/components/Footer';
import WhatsAppFloat       from '../features/landing/components/WhatsAppFloat';
import MobileStickyBar     from '../features/landing/components/MobileStickyBar';
import '../features/landing/styles/landing.css';

const landingTheme = {
  token: {
    colorPrimary: '#0B1E3D',
    colorLink: '#1A3A6B',
    borderRadius: 3,
    fontFamily: 'Inter, sans-serif',
    colorBgBase: '#FFFFFF',
    colorTextBase: '#0B1E3D',
  },
  components: {
    Button: {
      borderRadius: 3,
    },
    Input: {
      borderRadius: 3,
    },
    Select: {
      borderRadius: 3,
    },
  },
};

const LandingPage: React.FC = () => (
  <ConfigProvider theme={landingTheme}>
    <AntdApp>
      <div style={{ minHeight: '100vh', background: '#F3F6FA', fontFamily: 'Inter, sans-serif' }}>
        <Navbar />
        <Hero />
        <LoanProducts />
        <LenderPartners />
        <HowItWorks />
        <EligibilityWidget />
        <Testimonials />
        <Stats />
        <FAQ />
        <CustomerRegistrationSection />
        <ChannelPartnerCTA />
        <Footer />
        <WhatsAppFloat />
        <MobileStickyBar />
      </div>
    </AntdApp>
  </ConfigProvider>
);

export default LandingPage;
