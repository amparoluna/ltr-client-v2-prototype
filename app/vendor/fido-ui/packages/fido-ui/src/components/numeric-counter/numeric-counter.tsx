'use client';

import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { numericCounterVariants, type NumericCounterVariants } from './numeric-counter.variants';
import { IconButton } from '../icon-button/icon-button';
import { cn } from '../../utils/cn';

export interface NumericCounterProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>, NumericCounterVariants {
  /** Current value rendered between the controls. Consumers own the state. */
  value?: number | string;
  /** Disables the whole counter. */
  disabled?: boolean;
  /** Disables only the decrement button (e.g. at the minimum bound). */
  decrementDisabled?: boolean;
  /** Disables only the increment button (e.g. at the maximum bound). */
  incrementDisabled?: boolean;
  /** Called when the decrement button is clicked. */
  onDecrement?: React.MouseEventHandler<HTMLButtonElement>;
  /** Called when the increment button is clicked. */
  onIncrement?: React.MouseEventHandler<HTMLButtonElement>;
  /** Accessible label for the decrement button. */
  decrementAriaLabel?: string;
  /** Accessible label for the increment button. */
  incrementAriaLabel?: string;
  /** Accessible label for the numeric value output. */
  valueAriaLabel?: string;
}

/**
 * A stateless numeric counter with default and compact sizes. Consumers own the
 * value, bounds, and increment/decrement behavior (disable buttons at min/max).
 */
export const NumericCounter = React.forwardRef<HTMLDivElement, NumericCounterProps>(
  (
    {
      className,
      size = 'default',
      value = 0,
      disabled,
      decrementDisabled,
      incrementDisabled,
      onDecrement,
      onIncrement,
      decrementAriaLabel = 'Decrease value',
      incrementAriaLabel = 'Increase value',
      valueAriaLabel = 'Value',
      ...props
    },
    ref,
  ) => {
    const styles = numericCounterVariants({ size });
    const buttonClassName = cn(
      size === 'compact'
        ? 'size-fido-ui-sm [&_svg]:size-fido-ui-xs'
        : 'size-fido-ui-lg [&_svg]:size-fido-ui-xs',
    );

    return (
      <div ref={ref} className={cn(styles.root(), className)} {...props}>
        <IconButton
          type="button"
          color="primary"
          shade="light"
          icon={Minus}
          aria-label={decrementAriaLabel}
          disabled={disabled || decrementDisabled}
          onClick={onDecrement}
          className={buttonClassName}
        />

        <output
          aria-label={valueAriaLabel}
          aria-live="polite"
          className={styles.value()}
        >
          {value}
        </output>

        <IconButton
          type="button"
          color="primary"
          shade="light"
          icon={Plus}
          aria-label={incrementAriaLabel}
          disabled={disabled || incrementDisabled}
          onClick={onIncrement}
          className={buttonClassName}
        />
      </div>
    );
  },
);

NumericCounter.displayName = 'NumericCounter';
