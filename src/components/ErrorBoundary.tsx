'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { linkPath } from "@/lib/basePath";

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
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

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
            <div className="flex gap-3 justify-center mt-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
              >
                Seite neu laden
              </button>
              <a
                href={linkPath("/#kontakt")}
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