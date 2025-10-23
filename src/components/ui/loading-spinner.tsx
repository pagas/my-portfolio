interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ message = "Loading...", size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-32 w-32',
    lg: 'h-48 w-48'
  };

  return (
    <div className="text-center">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 mx-auto ${sizeClasses[size]}`}></div>
      <p className="mt-4 text-lg text-foreground/60">{message}</p>
    </div>
  );
}
