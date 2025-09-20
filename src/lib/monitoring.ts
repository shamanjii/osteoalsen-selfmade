export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  url?: string;
  userAgent?: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;
  buildVersion?: string;
}

export interface PerformanceMetrics {
  name: string;
  duration: number;
  timestamp: string;
  url: string;
  type: 'navigation' | 'interaction' | 'custom';
}

class MonitoringService {
  private endpoint: string;
  private apiKey: string;
  private isEnabled: boolean;

  constructor() {
    this.endpoint = process.env.NEXT_PUBLIC_MONITORING_ENDPOINT || '';
    this.apiKey = process.env.NEXT_PUBLIC_MONITORING_API_KEY || '';
    this.isEnabled = process.env.NODE_ENV === 'production' && !!this.endpoint;
  }

  async logError(error: Error, additionalInfo?: Record<string, unknown>) {
    if (!this.isEnabled) {
      console.error('Error logged (dev mode):', error, additionalInfo);
      return;
    }

    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
      buildVersion: process.env.NEXT_PUBLIC_BUILD_VERSION || 'unknown',
      ...additionalInfo,
    };

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          type: 'error',
          data: errorInfo,
        }),
      });
    } catch (logError) {
      console.error('Failed to log error to monitoring service:', logError);
    }
  }

  async logPerformance(metrics: PerformanceMetrics) {
    if (!this.isEnabled) {
      console.log('Performance metrics (dev mode):', metrics);
      return;
    }

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          type: 'performance',
          data: metrics,
        }),
      });
    } catch (logError) {
      console.error('Failed to log performance metrics:', logError);
    }
  }

  logPageView(page: string, referrer?: string) {
    if (!this.isEnabled) {
      console.log('Page view (dev mode):', { page, referrer });
      return;
    }

    // Simple analytics tracking
    fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        type: 'pageview',
        data: {
          page,
          referrer,
          timestamp: new Date().toISOString(),
          userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        },
      }),
    }).catch(error => {
      console.error('Failed to log page view:', error);
    });
  }

  measurePerformance<T>(name: string, fn: () => T | Promise<T>): T | Promise<T> {
    const start = performance.now();

    try {
      const result = fn();

      if (result instanceof Promise) {
        return result.then(
          (value) => {
            this.logPerformance({
              name,
              duration: performance.now() - start,
              timestamp: new Date().toISOString(),
              url: typeof window !== 'undefined' ? window.location.href : '',
              type: 'custom',
            });
            return value;
          },
          (error) => {
            this.logPerformance({
              name: `${name}_error`,
              duration: performance.now() - start,
              timestamp: new Date().toISOString(),
              url: typeof window !== 'undefined' ? window.location.href : '',
              type: 'custom',
            });
            throw error;
          }
        ) as Promise<T>;
      } else {
        this.logPerformance({
          name,
          duration: performance.now() - start,
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : '',
          type: 'custom',
        });
        return result;
      }
    } catch (error) {
      this.logPerformance({
        name: `${name}_error`,
        duration: performance.now() - start,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
        type: 'custom',
      });
      throw error;
    }
  }
}

export const monitoring = new MonitoringService();