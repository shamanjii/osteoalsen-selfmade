'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { isDevelopment } from '@/lib/config';
import { monitoring } from '@/lib/monitoring';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Update state with error info
    this.setState({
      error,
      errorInfo
    });

    // Log to monitoring service
    monitoring.logError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-[200px] flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
          <div className="text-center p-6 max-w-md">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Oops! Etwas ist schief gelaufen
            </h3>
            <p className="text-slate-600 mb-4">
              Es tut uns leid, aber es ist ein unerwarteter Fehler aufgetreten.
              Bitte versuchen Sie es erneut oder kontaktieren Sie uns.
            </p>
            {isDevelopment() && this.state.error && (
              <details className="text-left text-xs bg-red-50 p-2 rounded border">
                <summary className="cursor-pointer font-medium text-red-800 mb-2">
                  Fehlerdetails (Development)
                </summary>
                <pre className="text-red-700 whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <div className="flex gap-3 justify-center mt-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
              >
                Seite neu laden
              </button>
              <a
                href="/#kontakt"
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors"
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;