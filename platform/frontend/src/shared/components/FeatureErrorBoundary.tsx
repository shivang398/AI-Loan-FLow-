import { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button } from 'antd';
import { RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  feature?: string;
}

interface State {
  hasError: boolean;
}

class FeatureErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Structured log — no stack traces in prod; error monitoring tools pick this up
    const entry = {
      feature: this.props.feature ?? 'unknown',
      message: error.message,
      componentStack: info.componentStack?.slice(0, 500),
    };
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('[FeatureError]', entry);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320, padding: 32 }}>
          <Result
            status="warning"
            title={<span style={{ fontWeight: 800 }}>This section failed to load</span>}
            subTitle={`The ${this.props.feature ?? 'feature'} module encountered an unexpected error. Other parts of the app are unaffected.`}
            extra={
              <Button
                icon={<RefreshCcw size={15} />}
                onClick={() => this.setState({ hasError: false })}
                style={{ borderRadius: 8, fontWeight: 700 }}
              >
                Try again
              </Button>
            }
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export default FeatureErrorBoundary;
