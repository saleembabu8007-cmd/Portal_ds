import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, PhoneCall } from 'lucide-react';
import { Logger } from '../../core/telemetry/logger';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Zero PII Logging: logs error type and component stack without capturing form state
    Logger.error('SYSTEM', 'REACT_RENDER_EXCEPTION', error, {
      componentStack: errorInfo.componentStack?.slice(0, 300),
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    try {
      window.sessionStorage.removeItem('ds_workflow_draft_v1');
    } catch {
      // ignore
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: 'var(--ds-primitive-color-navy-50)',
            fontFamily: 'var(--ds-primitive-font-body)',
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--ds-primitive-radius-xl)',
              padding: '36px 32px',
              border: '1px solid var(--ds-color-border-subtle)',
              boxShadow: 'var(--ds-primitive-shadow-lg)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--ds-primitive-color-rose-50)',
                color: 'var(--ds-primitive-color-rose-500)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
              aria-hidden="true"
            >
              <AlertTriangle size={32} />
            </div>

            <h1
              style={{
                fontFamily: 'var(--ds-primitive-font-heading)',
                fontSize: '1.5rem',
                fontWeight: 500,
                color: 'var(--ds-color-text-heading)',
                margin: '0 0 12px 0',
              }}
            >
              We Encountered a Temporary Error
            </h1>

            <p
              style={{
                fontSize: 'var(--ds-primitive-font-size-base)',
                color: 'var(--ds-color-text-secondary)',
                lineHeight: 1.6,
                margin: '0 0 24px 0',
              }}
            >
              Your indemnity application draft is safely preserved. You can refresh the page to continue, or return to the start if the issue persists.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center',
                marginBottom: '28px',
              }}
            >
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  minHeight: '48px',
                  padding: '0 24px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  backgroundColor: 'var(--ds-color-action-primary)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: 'var(--ds-primitive-font-size-base)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <RefreshCw size={18} />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  minHeight: '48px',
                  padding: '0 20px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--ds-color-text-primary)',
                  fontWeight: 500,
                  fontSize: 'var(--ds-primitive-font-size-base)',
                  border: '1px solid var(--ds-color-border-default)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Home size={18} />
                <span>Restart Application</span>
              </button>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--ds-color-border-subtle)',
                paddingTop: '20px',
                fontSize: '13px',
                color: 'var(--ds-color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <PhoneCall size={14} color="var(--ds-primitive-color-teal-700)" />
              <span>DoctorShield Support: <strong>+60 3 2712 3456</strong></span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

