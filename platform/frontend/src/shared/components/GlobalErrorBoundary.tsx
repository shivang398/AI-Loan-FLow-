import { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button, Typography } from 'antd';
import { RefreshCcw } from 'lucide-react';

const { Text } = Typography;

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex items-center justify-center bg-slate-50 p-6">
          <Result
            status="error"
            title={<span className="font-bold">Something went wrong</span>}
            subTitle={
              <div className="space-y-4">
                <Text type="secondary">
                  An unexpected error occurred in the application. Please try refreshing the page.
                </Text>
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 mt-4">
                  <Text type="danger" className="font-mono text-xs italic">
                    Error Code: ERR_PLATFORM_CRASH_01
                  </Text>
                </div>
              </div>
            }
            extra={[
              <Button 
                type="primary" 
                key="refresh" 
                icon={<RefreshCcw size={16} />}
                onClick={() => window.location.reload()}
                className="bg-blue-600 h-12 px-8 rounded-xl font-bold"
              >
                Refresh Dashboard
              </Button>,
              <Button key="support" ghost className="h-12 border-slate-200 text-slate-600">
                Contact Support
              </Button>
            ]}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
