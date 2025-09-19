interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export default function LoadingSpinner({
  size = 'md',
  className = '',
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="mt-2 text-sm text-slate-600 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

export function SkeletonLoader({
  className = '',
  rows = 3
}: {
  className?: string;
  rows?: number;
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-200 rounded mb-3 last:mb-0"
          style={{
            width: i === rows - 1 ? '60%' : '100%'
          }}
        />
      ))}
    </div>
  );
}

export function ImageSkeleton({
  className = '',
  aspectRatio = 'aspect-video'
}: {
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <div className={`${aspectRatio} bg-slate-200 rounded-lg animate-pulse ${className}`}>
      <div className="flex items-center justify-center h-full">
        <svg
          className="w-12 h-12 text-slate-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}