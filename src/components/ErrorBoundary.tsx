import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="relative z-0 w-full h-full flex justify-center items-center bg-black">
          <div className="text-center p-8 text-terminal-text">
            <h2 className="text-2xl mb-4">⚠️ 3D Assets Error</h2>
            <p className="mb-2">Please ensure these files exist and are valid:</p>
            <ul className="text-left inline-block text-terminal-secondary">
              <li className="mb-1">📁 src/assets/lanyard/card.glb</li>
              <li>📁 src/assets/lanyard/lanyard.png</li>
            </ul>
            <p className="mt-4 text-sm text-terminal-secondary">
              Download from the Reactbits repository or create your own
            </p>
            <button
              onClick={this.handleReset}
              className="mt-6 px-6 py-2 bg-terminal-text text-black font-bold rounded hover:bg-terminal-secondary transition-colors"
            >
              Try Again
            </button>
            <p className="mt-4 text-xs opacity-50">
              or press Ctrl+R to reload the page
            </p>
            {this.state.error?.message && (
              <p className="mt-6 text-xs opacity-70 text-red-400">
                Error: {this.state.error.message}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

