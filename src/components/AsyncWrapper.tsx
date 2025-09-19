'use client';

import { ReactNode } from 'react';
import LoadingSpinner, { SkeletonLoader } from './LoadingSpinner';
import ErrorState, { InlineError } from './ErrorState';

interface AsyncWrapperProps {
  loading: boolean;
  error: Error | null;
  children: ReactNode;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  onRetry?: () => void;
  className?: string;
  loadingText?: string;
  skeleton?: boolean;
  skeletonRows?: number;
  inline?: boolean;
}

export default function AsyncWrapper({
  loading,
  error,
  children,
  loadingComponent,
  errorComponent,
  onRetry,
  className = '',
  loadingText,
  skeleton = false,
  skeletonRows = 3,
  inline = false
}: AsyncWrapperProps) {
  if (loading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }

    if (skeleton) {
      return <SkeletonLoader className={className} rows={skeletonRows} />;
    }

    return (
      <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
        <LoadingSpinner text={loadingText} />
      </div>
    );
  }

  if (error) {
    if (errorComponent) {
      return <>{errorComponent}</>;
    }

    if (inline) {
      return <InlineError message={error.message} className={className} />;
    }

    return (
      <div className={className}>
        <ErrorState
          message={error.message}
          action={onRetry ? {
            label: 'Erneut versuchen',
            onClick: onRetry
          } : undefined}
        />
      </div>
    );
  }

  return <>{children}</>;
}

// Higher-order component for wrapping components with async state
export function withAsyncState<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    skeleton?: boolean;
    skeletonRows?: number;
    loadingText?: string;
  }
) {
  return function AsyncComponent(
    props: P & {
      loading?: boolean;
      error?: Error | null;
      onRetry?: () => void;
    }
  ) {
    const { loading, error, onRetry, ...componentProps } = props;

    return (
      <AsyncWrapper
        loading={loading || false}
        error={error || null}
        onRetry={onRetry}
        skeleton={options?.skeleton}
        skeletonRows={options?.skeletonRows}
        loadingText={options?.loadingText}
      >
        <Component {...(componentProps as P)} />
      </AsyncWrapper>
    );
  };
}