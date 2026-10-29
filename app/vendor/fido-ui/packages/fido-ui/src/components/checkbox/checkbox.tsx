'use client';

import * as React from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { checkboxVariants, type CheckboxVariants } from './checkbox.variants';
import { cn } from '../../utils/cn';

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface CheckboxProps {
  /** The controlled checked state of the checkbox */
  checked?: boolean;
  /** The initial checked state when uncontrolled */
  defaultChecked?: boolean;
  /** Callback fired when the checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Optional text label rendered next to the checkbox */
  label?: string;
  /** Whether the checkbox is disabled and non-interactive */
  disabled?: boolean;
  /** The form field name for the checkbox input */
  name?: string;
  /** The id of the underlying checkbox input */
  id?: string;
  /** The value submitted when the checkbox is checked */
  value?: string;
  /** Associates the checkbox with a form by id */
  form?: string;
  /** Whether the checkbox is read-only */
  readOnly?: boolean;
  /** Whether the checkbox is required */
  required?: boolean;
  /** Id of the element that labels the checkbox */
  'aria-labelledby'?: string;
  /** Id of the element that describes the checkbox */
  'aria-describedby'?: string;
  /** Error message displayed below the checkbox; also sets the checkbox to an error state */
  error?: string;
  /** When true, wraps the checkbox and label in a bordered container */
  container?: CheckboxVariants['container'];
  /** Visual state for validation styling; overridden by `error` and `disabled` */
  state?: CheckboxVariants['state'];
  /** Additional CSS class names applied to the checkbox or its wrapper */
  className?: string;
}

/**
 * A checkbox input that supports a label, controlled and uncontrolled modes, and disabled state.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" onCheckedChange={(checked) => console.log(checked)} />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    { className, label, disabled, error, container, state: stateProp, checked, defaultChecked, onCheckedChange, name, ...props },
    ref,
  ) => {
    const state = disabled ? 'disabled' : error ? 'error' : stateProp;
    const styles = checkboxVariants({ container, state });

    const checkboxElement = (
      <BaseCheckbox.Root
        ref={ref}
        className={cn(styles.root(), !label && !error && !container && className)}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
        {...props}
      >
        <BaseCheckbox.Indicator keepMounted className={styles.indicator()}>
          <CheckIcon />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );

    if (label || error || container) {
      return (
        <div>
          <label className={cn(styles.wrapper(), className)}>
            {checkboxElement}
            {label && <span className={styles.label()}>{label}</span>}
          </label>
          {error && (
            <p role="alert" className={styles.error()}>
              {error}
            </p>
          )}
        </div>
      );
    }

    return checkboxElement;
  },
);

Checkbox.displayName = 'Checkbox';
