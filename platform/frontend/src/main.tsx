import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { ConfigProvider, App as AntdApp } from 'antd';
import { store } from './store';
import { enterpriseTheme } from './shared/theme/enterpriseTheme';
import GlobalErrorBoundary from './shared/components/GlobalErrorBoundary';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={enterpriseTheme}>
        <AntdApp>
          <GlobalErrorBoundary>
            <App />
          </GlobalErrorBoundary>
        </AntdApp>
      </ConfigProvider>
    </Provider>
  </StrictMode>,
)
