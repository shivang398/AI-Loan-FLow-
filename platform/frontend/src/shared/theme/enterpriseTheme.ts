import { ThemeConfig } from 'antd';

export const enterpriseTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0B2DA4',       // Real Money brand blue
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#CC1A1A',          // Real Money brand red
    colorInfo: '#0B2DA4',
    borderRadius: 3,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#F5F7FC',
    colorText: '#0A1E6E',
    colorTextSecondary: '#3A4F80',
    controlHeight: 40,
  },
  components: {
    Button: {
      fontWeight: 600,
      borderRadius: 3,
      controlHeight: 42,
      colorPrimary: '#0B2DA4',
      boxShadow: 'none',
    },
    Card: {
      borderRadiusLG: 4,
      boxShadowTertiary: '0 1px 3px 0 rgb(10 30 110 / 0.08), 0 1px 2px -1px rgb(10 30 110 / 0.05)',
    },
    Input: {
      borderRadius: 3,
      controlHeight: 42,
      colorBgContainer: '#ffffff',
      activeBorderColor: '#0B2DA4',
      hoverBorderColor: '#0B2DA4',
    },
    Table: {
      headerBg: '#F5F7FC',
      headerColor: '#3A4F80',
      headerSplitColor: 'transparent',
      borderRadius: 4,
    },
    Menu: {
      itemSelectedBg: 'rgba(204, 26, 26, 0.08)',
      itemSelectedColor: '#CC1A1A',
    },
    Tabs: {
      inkBarColor: '#CC1A1A',
      itemSelectedColor: '#CC1A1A',
      itemHoverColor: '#0B2DA4',
    },
  }
};
