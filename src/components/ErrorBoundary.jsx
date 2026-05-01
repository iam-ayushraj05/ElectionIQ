import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary — catches React rendering errors and shows a fallback UI.
 * Wrap any subtree that might fail (e.g., lazy-loaded pages, third-party widgets).
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /** Triggered when a descendant throws during rendering */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /** Log the error details to the console (or an external service) */
  componentDidCatch(error, info) {
    console.error('[ElectionIQ] Unhandled error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '3rem', textAlign: 'center',
            minHeight: '40vh', gap: '1rem',
          }}
        >
          <div style={{ fontSize: '3rem' }}>⚠️</div>
          <h2 style={{ fontWeight: 700 }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-2)', maxWidth: 400 }}>
            An unexpected error occurred while loading this section.
            Please refresh the page or try navigating to a different page.
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  /** Any React node(s) to render inside the boundary */
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
