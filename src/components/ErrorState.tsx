import { ReactNode } from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
}

export default function ErrorState({
  title = 'Etwas ist schief gelaufen',
  message = 'Es tut uns leid, aber es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
  action,
  className = '',
  size = 'md',
  icon
}: ErrorStateProps) {
  const sizeClasses = {
    sm: {
      container: 'p-4',
      icon: 'text-3xl mb-2',
      title: 'text-lg font-semibold',
      message: 'text-sm',
      button: 'px-3 py-2 text-sm'
    },
    md: {
      container: 'p-6',
      icon: 'text-4xl mb-4',
      title: 'text-xl font-semibold',
      message: 'text-base',
      button: 'px-4 py-2'
    },
    lg: {
      container: 'p-8',
      icon: 'text-6xl mb-6',
      title: 'text-2xl font-semibold',
      message: 'text-lg',
      button: 'px-6 py-3'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`text-center bg-slate-50 rounded-lg border border-slate-200 ${classes.container} ${className}`}>
      <div className={`${classes.icon} opacity-50`}>
        {icon || '⚠️'}
      </div>

      <h3 className={`text-slate-900 ${classes.title} mb-2`}>
        {title}
      </h3>

      <p className={`text-slate-600 ${classes.message} mb-4 leading-relaxed`}>
        {message}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className={`bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium ${classes.button}`}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export function InlineError({
  message,
  className = ''
}: {
  message: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 text-red-600 text-sm ${className}`}>
      <span className="text-lg">⚠️</span>
      <span>{message}</span>
    </div>
  );
}

export function NetworkError({
  onRetry,
  className = ''
}: {
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <ErrorState
      title="Verbindungsfehler"
      message="Es konnte keine Verbindung hergestellt werden. Bitte überprüfen Sie Ihre Internetverbindung."
      action={onRetry ? {
        label: 'Erneut versuchen',
        onClick: onRetry
      } : undefined}
      icon="🌐"
      className={className}
    />
  );
}

export function NotFoundError({
  title = 'Nicht gefunden',
  message = 'Die angeforderte Seite oder Ressource konnte nicht gefunden werden.',
  onGoHome,
  className = ''
}: {
  title?: string;
  message?: string;
  onGoHome?: () => void;
  className?: string;
}) {
  return (
    <ErrorState
      title={title}
      message={message}
      action={onGoHome ? {
        label: 'Zur Startseite',
        onClick: onGoHome
      } : undefined}
      icon="🔍"
      className={className}
    />
  );
}