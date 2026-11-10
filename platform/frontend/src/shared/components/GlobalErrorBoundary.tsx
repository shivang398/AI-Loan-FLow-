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
        <div>
          <Result
            status="error"
            title={<span>Something went wrong</span>}
            subTitle={
              <div>
                <Text type="secondary">
                  An unexpected error occurred in the application. Please try refreshing the page.
                </Text>
                <div>
                  <Text type="danger">
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

              >
                Refresh Dashboard
              </Button>,
              <Button key="support" ghost>
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
