'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { monitoring } from '@/lib/monitoring';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface AsyncActions<T> {
  execute: (...args: unknown[]) => Promise<T | undefined>;
  reset: () => void;
  setData: (data: T) => void;
  setError: (error: Error) => void;
}

export function useAsyncState<T>(
  asyncFunction: (...args: unknown[]) => Promise<T>,
  immediate = false,
  dependencies: unknown[] = []
): [AsyncState<T>, AsyncActions<T>] {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const isMountedRef = useRef(true);
  const functionRef = useRef(asyncFunction);

  // Update function reference
  useEffect(() => {
    functionRef.current = asyncFunction;
  }, [asyncFunction]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async (...args: unknown[]): Promise<T | undefined> => {
    if (!isMountedRef.current) return undefined;

    setState(prev => ({ ...prev, loading: true, error: null }));

    const startTime = performance.now();

    try {
      const result = await functionRef.current(...args);

      if (isMountedRef.current) {
        setState({
          data: result,
          loading: false,
          error: null,
        });

        // Log successful operation
        monitoring.logPerformance({
          name: 'async_operation_success',
          duration: performance.now() - startTime,
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : '',
          type: 'custom',
        });
      }

      return result;
    } catch (error) {
      const asyncError = error instanceof Error ? error : new Error(String(error));

      if (isMountedRef.current) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: asyncError,
        }));

        // Log error
        monitoring.logError(asyncError, {
          duration: performance.now() - startTime,
          source: 'useAsyncState',
        });
      }

      throw asyncError;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data, error: null }));
  }, []);

  const setError = useCallback((error: Error) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, execute, ...dependencies]);

  return [
    state,
    {
      execute,
      reset,
      setData,
      setError,
    },
  ];
}

export function useRetryableAsync<T>(
  asyncFunction: (...args: unknown[]) => Promise<T>,
  maxRetries = 3,
  retryDelay = 1000
) {
  const [retryCount, setRetryCount] = useState(0);
  const [state, actions] = useAsyncState(asyncFunction);

  const executeWithRetry = useCallback(async (...args: unknown[]) => {
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        const result = await actions.execute(...args);
        setRetryCount(0); // Reset on success
        return result;
      } catch (error) {
        attempt++;
        setRetryCount(attempt);

        if (attempt <= maxRetries) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
        } else {
          throw error; // Re-throw if max retries exceeded
        }
      }
    }
  }, [actions, maxRetries, retryDelay]);

  return [
    { ...state, retryCount },
    { ...actions, execute: executeWithRetry },
  ];
}