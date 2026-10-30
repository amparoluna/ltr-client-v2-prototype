'use client';

import * as React from 'react';
import { Progress as BaseProgress } from '@base-ui/react/progress';
import { progressVariants } from './progress.variants';
import { cn } from '../../utils/cn';

export interface ProgressProps {
  /** Current progress value (default: 0) */
  value?: number;
  /** Minimum value of the progress range (default: 0) */
  min?: number;
  /** Maximum value of the progress range (default: 100) */
  max?: number;
  /** Additional CSS class applied to the root wrapper */
  className?: string;
}

/**
 * A horizontal progress bar that displays completion status.
 *
 * @example
 * ```tsx
 * <Progress value={65} />
 * ```
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, min = 0, max = 100, ...props }, ref) => {
    const styles = progressVariants();

    return (
      <BaseProgress.Root
        ref={ref}
        value={value}
        min={min}
        max={max}
        aria-label="Progress"
        className={cn(styles.root(), className)}
        {...props}
      >
        <BaseProgress.Track className={styles.track()}>
          <BaseProgress.Indicator className={styles.indicator()} />
        </BaseProgress.Track>
      </BaseProgress.Root>
    );
  },
);

Progress.displayName = 'Progress';
