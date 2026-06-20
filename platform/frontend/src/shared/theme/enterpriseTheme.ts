import { ThemeConfig } from 'antd';

export const enterpriseTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0B1E3D',
    colorSuccess: '#15803D',
    colorWarning: '#C4993A',
    colorError: '#DC2626',
    colorInfo: '#0B1E3D',
    borderRadius: 3,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#F5F7FC',
    colorText: '#0B1E3D',
    colorTextSecondary: '#3A5278',
    controlHeight: 40,
  },
  components: {
    Button: {
      fontWeight: 600,
      borderRadius: 3,
      controlHeight: 42,
      colorPrimary: '#0B1E3D',
      boxShadow: 'none',
    },
    Card: {
      borderRadiusLG: 4,
      boxShadowTertiary: '0 1px 3px 0 rgb(11 30 61 / 0.08), 0 1px 2px -1px rgb(11 30 61 / 0.05)',
    },
    Input: {
      borderRadius: 3,
      controlHeight: 42,
      colorBgContainer: '#ffffff',
      activeBorderColor: '#C4993A',
      hoverBorderColor: '#0B1E3D',
    },
    Table: {
      headerBg: '#F5F7FC',
      headerColor: '#3A5278',
      headerSplitColor: 'transparent',
      borderRadius: 4,
    },
    Menu: {
      itemSelectedBg: 'rgba(196, 153, 58, 0.08)',
      itemSelectedColor: '#C4993A',
    },
    Tabs: {
      inkBarColor: '#C4993A',
      itemSelectedColor: '#C4993A',
      itemHoverColor: '#0B1E3D',
    },
  }
};
