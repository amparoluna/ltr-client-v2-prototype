import * as React from 'react';
import { spinnerVariants, type SpinnerVariants } from './spinner.variants';
import { cn } from '../../utils/cn';

export interface SpinnerProps extends SpinnerVariants {
  /** Accessible label describing the loading state, used as the aria-label. */
  label?: string;
  /** Additional CSS class name for the spinner element. */
  className?: string;
}

/**
 * An animated loading spinner that communicates an ongoing process to the user.
 *
 * @example
 * ```tsx
 * <Spinner size="md" color="primary" label="Loading data" />
 * ```
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, color, label = 'Loading', ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(spinnerVariants({ size, color }), className)}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </span>
    );
  },
);

Spinner.displayName = 'Spinner';
