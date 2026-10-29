import * as React from 'react';
import { stepperVariants, type StepperVariants } from './stepper.variants';
import { cn } from '../../utils/cn';

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13 4.5L6 11.5L3 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Step (internal — used by Stepper)                                          */
/* -------------------------------------------------------------------------- */

export interface StepProps {
  /** Optional title displayed below the step indicator. */
  label?: string;
  /** Optional supporting text displayed below the title. */
  description?: string;
  /** The numeric position of this step (1-based). */
  stepNumber: number;
  /** The current status of the step, controlling its visual appearance. */
  status: NonNullable<StepperVariants['stepStatus']>;
  /** Additional CSS class name for the step element. */
  className?: string;
}

/**
 * An individual step indicator showing its number or a check icon when completed.
 *
 * @example
 * ```tsx
 * <Step stepNumber={1} status="completed" label="Account" description="Set up your account" />
 * ```
 */
export const Step: React.FC<StepProps> = ({ label: _label, description: _description, stepNumber, status, className: _className }) => {
  const styles = stepperVariants({ stepStatus: status });

  return (
    <span className={styles.stepIndicator()} aria-current={status === 'active' ? 'step' : undefined}>
      {status === 'completed' ? <CheckIcon /> : stepNumber}
    </span>
  );
};

Step.displayName = 'Step';

/* -------------------------------------------------------------------------- */
/*  Stepper                                                                    */
/* -------------------------------------------------------------------------- */

export interface StepperStep {
  /** Title text for the step. */
  label?: string;
  /** Supporting description text shown below the title. */
  description?: string;
  /** Whether this step should be rendered in a disabled state. */
  disabled?: boolean;
}

export interface StepperProps {
  /** The array of step definitions to render. */
  steps: StepperStep[];
  /** The zero-based index of the currently active step. */
  activeStep: number;
  /** Additional CSS class name for the stepper root element. */
  className?: string;
}

/**
 * A multi-step progress indicator with step numbers, labels, and connectors.
 *
 * @example
 * ```tsx
 * <Stepper
 *   steps={[
 *     { label: 'Account', description: 'Set up' },
 *     { label: 'Profile', description: 'Details' },
 *     { label: 'Review', description: 'Confirm' },
 *   ]}
 *   activeStep={1}
 * />
 * ```
 */
export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, steps, activeStep, ...props }, ref) => {
    const rootStyles = stepperVariants();

    const getStatus = (index: number, step: StepperStep): NonNullable<StepperVariants['stepStatus']> => {
      if (step.disabled) return 'disabled';
      if (index < activeStep) return 'completed';
      if (index === activeStep) return 'active';
      return 'upcoming';
    };

    return (
      <div ref={ref} className={cn(rootStyles.root(), className)} role="list" aria-label="Progress" {...props}>
        {steps.map((step, index) => {
          const status = getStatus(index, step);
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;
          const styles = stepperVariants({ stepStatus: status });

          // Connector before: completed if this step is active or completed
          const beforeCompleted = index <= activeStep;
          const beforeStyles = stepperVariants({ stepStatus: beforeCompleted ? 'completed' : 'upcoming' });
          // Connector after: completed if next step is active or completed
          const afterCompleted = index < activeStep;
          const afterStyles = stepperVariants({ stepStatus: afterCompleted ? 'completed' : 'upcoming' });

          return (
            <div key={index} role="listitem" className={styles.stepWrapper()}>
              {/* Top row: connector — indicator — connector */}
              <div className={styles.stepRow()}>
                {/* Left connector (invisible for first step) */}
                <div className={cn(beforeStyles.connector(), isFirst && 'bg-transparent')} aria-hidden="true" />

                {/* Step indicator */}
                <span className={styles.stepIndicator()} aria-current={status === 'active' ? 'step' : undefined}>
                  {status === 'completed' ? <CheckIcon /> : index + 1}
                </span>

                {/* Right connector (invisible for last step) */}
                <div className={cn(afterStyles.connector(), isLast && 'bg-transparent')} aria-hidden="true" />
              </div>

              {/* Bottom: labels */}
              {(step.label || step.description) && (
                <div className={styles.stepLabels()}>
                  {step.label && <span className={styles.stepTitle()}>{step.label}</span>}
                  {step.description && <span className={styles.stepDescription()}>{step.description}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = 'Stepper';
