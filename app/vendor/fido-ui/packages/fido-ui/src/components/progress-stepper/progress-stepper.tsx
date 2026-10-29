'use client';

import * as React from 'react';
import { Progress as BaseProgress } from '@base-ui/react/progress';
import { progressStepperVariants } from './progress-stepper.variants';
import { cn } from '../../utils/cn';

export interface ProgressStepperProps {
  /** The 1-based index of the currently active step. */
  currentStep: number;
  /** The total number of steps (segments). */
  totalSteps: number;
  /** Fill percentage within the current step (0–100, default: 0). */
  progress?: number;
  /** Bold label displayed before the description. */
  title?: string;
  /** Supporting text displayed after the title. */
  description?: string;
  /** When true, displays the current step count (e.g. "1/4") on the right. */
  showCount?: boolean;
  /** Additional CSS class applied to the root wrapper. */
  className?: string;
}

function clampProgress(value: number): number {
  return Math.min(100, Math.max(0, value));
}

function getSegmentFill(stepIndex: number, currentStep: number, progress: number): number {
  if (stepIndex < currentStep) return 100;
  if (stepIndex === currentStep) return clampProgress(progress);
  return 0;
}

/**
 * A segmented progress stepper with optional title, description, and step count.
 * Each segment is a Base UI Progress bar driven by the current step and per-step progress.
 *
 * @example
 * ```tsx
 * <ProgressStepper
 *   currentStep={1}
 *   totalSteps={4}
 *   progress={40}
 *   title="Title:"
 *   description="Description"
 * />
 * ```
 */
export const ProgressStepper = React.forwardRef<HTMLDivElement, ProgressStepperProps>(
  (
    {
      className,
      currentStep,
      totalSteps,
      progress = 0,
      title,
      description,
      showCount = true,
      ...props
    },
    ref,
  ) => {
    const styles = progressStepperVariants();
    const clampedProgress = clampProgress(progress);
    const showContent = Boolean(title || description || showCount);

    return (
      <div
        ref={ref}
        role="group"
        aria-label={title ?? 'Progress'}
        className={cn(styles.root(), className)}
        {...props}
      >
        {showContent && (
          <div className={cn(styles.content(), !title && !description && 'justify-end')}>
            {(title || description) && (
              <div className={styles.detail()}>
                {title && <span className={styles.title()}>{title}</span>}
                {description && <span className={styles.description()}>{description}</span>}
              </div>
            )}
            {showCount && (
              <span className={styles.count()}>
                {currentStep}/{totalSteps}
              </span>
            )}
          </div>
        )}

        <div className={styles.bar()}>
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepIndex = index + 1;
            const fill = getSegmentFill(stepIndex, currentStep, clampedProgress);

            return (
              <BaseProgress.Root
                key={stepIndex}
                value={fill}
                min={0}
                max={100}
                aria-label={`Step ${stepIndex} of ${totalSteps}`}
                className={styles.segmentRoot()}
              >
                <BaseProgress.Track className={styles.segmentTrack()}>
                  <BaseProgress.Indicator className={styles.segmentIndicator()} />
                </BaseProgress.Track>
              </BaseProgress.Root>
            );
          })}
        </div>
      </div>
    );
  },
);

ProgressStepper.displayName = 'ProgressStepper';
