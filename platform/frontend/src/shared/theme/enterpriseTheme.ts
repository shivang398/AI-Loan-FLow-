import { ThemeConfig } from 'antd';

export const enterpriseTheme: ThemeConfig = {
  token: {
    colorPrimary: '#3b82f6', // Premium Blue
    colorSuccess: '#10b981', // Emerald
    colorWarning: '#f59e0b', // Amber
    colorError: '#ef4444',   // Rose
    colorInfo: '#3b82f6',
    borderRadius: 12,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f8fafc',
    colorText: '#1e293b',
    colorTextSecondary: '#64748b',
    controlHeight: 40,
  },
  components: {
    Button: {
      fontWeight: 600,
      borderRadius: 10,
      controlHeight: 42,
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    Card: {
      borderRadiusLG: 24,
      boxShadowTertiary: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    },
    Input: {
      borderRadius: 10,
      controlHeight: 42,
      colorBgContainer: '#f1f5f9',
      activeBorderColor: '#3b82f6',
    },
    Table: {
      headerBg: '#f8fafc',
      headerColor: '#64748b',
      headerSplitColor: 'transparent',
      borderRadius: 16,
    },
    Menu: {
      itemSelectedBg: '#eff6ff',
      itemSelectedColor: '#3b82f6',
    }
  }
};
