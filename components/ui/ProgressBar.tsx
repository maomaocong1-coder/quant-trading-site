import { HTMLAttributes, forwardRef } from 'react';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className = '', value, max = 100, showLabel = false, size = 'md', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    const getColor = (pct: number) => {
      if (pct < 30) return 'bg-red-500';
      if (pct < 70) return 'bg-yellow-500';
      return 'bg-green-500';
    };

    return (
      <div ref={ref} className={`w-full ${className}`} {...props}>
        <div className={`w-full bg-gray-200 rounded-full dark:bg-gray-700 ${sizes[size]}`}>
          <div
            className={`${sizes[size]} rounded-full ${getColor(percentage)} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 text-right">
            {Math.round(percentage)}%
          </p>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;