'use client';

import { useEffect, useRef } from 'react';
import { monitoring } from '@/lib/monitoring';

export function usePerformanceMonitoring(componentName: string) {
  const mountTime = useRef<number>(0);
  const renderCount = useRef<number>(0);

  useEffect(() => {
    mountTime.current = performance.now();

    return () => {
      const duration = performance.now() - mountTime.current;
      monitoring.logPerformance({
        name: `${componentName}_lifecycle`,
        duration,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
        type: 'custom',
      });
    };
  }, [componentName]);

  useEffect(() => {
    renderCount.current += 1;

    if (renderCount.current > 1) {
      monitoring.logPerformance({
        name: `${componentName}_render`,
        duration: 0, // Instant metric
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
        type: 'custom',
      });
    }
  });

  return {
    measureAsync: async <T>(operationName: string, operation: () => Promise<T>): Promise<T> => {
      const start = performance.now();
      try {
        const result = await operation();
        monitoring.logPerformance({
          name: `${componentName}_${operationName}`,
          duration: performance.now() - start,
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : '',
          type: 'custom',
        });
        return result;
      } catch (error) {
        monitoring.logPerformance({
          name: `${componentName}_${operationName}_error`,
          duration: performance.now() - start,
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : '',
          type: 'custom',
        });
        throw error;
      }
    },

    measureSync: <T>(operationName: string, operation: () => T): T => {
      const start = performance.now();
      try {
        const result = operation();
        monitoring.logPerformance({
          name: `${componentName}_${operationName}`,
          duration: performance.now() - start,
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : '',
          type: 'custom',
        });
        return result;
      } catch (error) {
        monitoring.logPerformance({
          name: `${componentName}_${operationName}_error`,
          duration: performance.now() - start,
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : '',
          type: 'custom',
        });
        throw error;
      }
    }
  };
}