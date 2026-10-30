'use client';

import * as React from 'react';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { radioGroupVariants, radioVariants, type RadioVariants } from './radio-group.variants';
import { cn } from '../../utils/cn';

const RadioGroupDisabledContext = React.createContext(false);

/* -------------------------------------------------------------------------- */
/*  RadioGroup                                                                 */
/* -------------------------------------------------------------------------- */

export interface RadioGroupProps {
  /** The controlled selected value of the radio group */
  value?: string;
  /** The default selected value when uncontrolled */
  defaultValue?: string;
  /** Callback invoked when the selected radio option changes */
  onValueChange?: (value: string, event: unknown) => void;
  /** Text label displayed above the radio group */
  label?: string;
  /** Helper text displayed below the label when there is no error */
  description?: string;
  /** Error message displayed below the group; visually indicates a validation error */
  error?: string;
  /** When true, disables all radio items in the group */
  disabled?: boolean;
  /** HTML name attribute shared by all radio inputs in the group */
  name?: string;
  /** Additional CSS class applied to the root container */
  className?: string;
  /** Radio items to render inside the group */
  children: React.ReactNode;
}

/**
 * A group of radio buttons that allows the user to select one option from a set.
 *
 * @example
 * ```tsx
 * <RadioGroup label="Plan" defaultValue="pro" onValueChange={(v) => setPlan(v)}>
 *   <RadioItem value="free" label="Free" />
 *   <RadioItem value="pro" label="Pro" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, label, description, error, disabled, children, value, defaultValue, onValueChange, name, ...props }, ref) => {
    const styles = radioGroupVariants();
    const labelId = React.useId();
    const descriptionId = React.useId();
    const errorId = React.useId();

    return (
      <BaseRadioGroup
        ref={ref}
        className={cn(styles.root(), className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={error ? errorId : description ? descriptionId : undefined}
        {...props}
      >
        <RadioGroupDisabledContext.Provider value={Boolean(disabled)}>
          {label && (
            <span id={labelId} className={styles.label()}>
              {label}
            </span>
          )}
          {description && !error && (
            <span id={descriptionId} className={styles.description()}>
              {description}
            </span>
          )}
          {children}
          {error && (
            <p id={errorId} role="alert" className={styles.error()}>
              {error}
            </p>
          )}
        </RadioGroupDisabledContext.Provider>
      </BaseRadioGroup>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

/* -------------------------------------------------------------------------- */
/*  RadioItem                                                                  */
/* -------------------------------------------------------------------------- */

export interface RadioItemProps extends RadioVariants {
  /** The value of this radio option, submitted when selected */
  value: string;
  /** Text label rendered next to the radio indicator */
  label?: string;
  /** Secondary description rendered beneath the label */
  description?: React.ReactNode;
  /** When true, wraps the radio item in a bordered container card */
  container?: RadioVariants['container'];
  /** Visual state of the radio item — overridden to "disabled" when `disabled` is true */
  state?: RadioVariants['state'];
  /** When true, disables this individual radio item */
  disabled?: boolean;
  /** Additional CSS class applied to the radio root or wrapper element */
  className?: string;
}

/**
 * An individual radio option meant to be used inside a RadioGroup.
 *
 * @example
 * ```tsx
 * <RadioItem value="option-a" label="Option A" description="Best for small teams" />
 * ```
 */
export const RadioItem = React.forwardRef<HTMLButtonElement, RadioItemProps>(
  ({ className, label, description, container, state: stateProp, disabled: disabledProp, value, ...props }, ref) => {
    const groupDisabled = React.useContext(RadioGroupDisabledContext);
    const disabled = Boolean(disabledProp || groupDisabled);
    const state = disabled ? 'disabled' : stateProp;
    const styles = radioVariants({ container, state });
    const hasText = Boolean(label || description);
    const hasDescription = Boolean(description);

    const radioElement = (
      <BaseRadio.Root
        ref={ref}
        value={value}
        className={cn(styles.root(), hasDescription && 'mt-fido-ui-2xs', !hasText && !container && className)}
        disabled={disabled}
        {...props}
      >
        <BaseRadio.Indicator className={styles.indicator()} />
      </BaseRadio.Root>
    );

    if (hasText || container) {
      return (
        <label className={cn(styles.wrapper(), hasDescription ? 'items-start' : 'items-center', className)}>
          {radioElement}
          {hasText && (
            <span className={styles.textWrapper()}>
              {label && <span className={styles.label()}>{label}</span>}
              {description && <span className={styles.description()}>{description}</span>}
            </span>
          )}
        </label>
      );
    }

    return radioElement;
  },
);

RadioItem.displayName = 'RadioItem';
