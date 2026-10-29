'use client';

import * as React from 'react';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { switchVariants, type SwitchVariants } from './switch.variants';
import { cn } from '../../utils/cn';

export interface SwitchProps extends SwitchVariants {
  /** The controlled checked state of the switch. */
  checked?: boolean;
  /** The default checked state when uncontrolled. */
  defaultChecked?: boolean;
  /** Callback fired when the switch is toggled. */
  onCheckedChange?: (checked: boolean) => void;
  /** An optional text label displayed next to the switch. */
  label?: React.ReactNode;
  /** Optional supporting text displayed beneath the label. */
  description?: React.ReactNode;
  /** Places the label before or after the switch. */
  labelPlacement?: 'start' | 'end';
  /** Wraps the switch field in the bordered treatment shown in Figma. */
  container?: boolean;
  /** Whether the switch is disabled and non-interactive. */
  disabled?: boolean;
  /** The form field name for the switch input. */
  name?: string;
  /** Additional CSS class name for the switch or its wrapper. */
  className?: string;
}

/**
 * A toggle switch component for binary on/off choices.
 *
 * @example
 * ```tsx
 * <Switch label="Enable notifications" defaultChecked onCheckedChange={(v) => console.log(v)} />
 * ```
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      label,
      description,
      labelPlacement,
      container,
      status: statusProp,
      disabled,
      checked,
      defaultChecked,
      onCheckedChange,
      name,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || statusProp === 'disabled';
    const status = isDisabled ? 'disabled' : statusProp;
    const styles = switchVariants({ status, container, labelPlacement });
    const generatedId = React.useId();
    const labelId = label != null ? `switch-${generatedId}-label` : undefined;
    const descriptionId = description != null ? `switch-${generatedId}-description` : undefined;
    const hasFieldContent = label != null || description != null;

    const switchElement = (
      <BaseSwitch.Root
        ref={ref}
        className={cn(styles.root(), !hasFieldContent && !container && className)}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={isDisabled}
        name={name}
        aria-invalid={status === 'error' ? true : undefined}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        {...props}
      >
        <BaseSwitch.Thumb className={styles.thumb()} />
      </BaseSwitch.Root>
    );

    if (hasFieldContent || container) {
      return (
        <label className={cn(styles.wrapper(), className)}>
          <span className={styles.control()}>{switchElement}</span>
          {hasFieldContent ? (
            <span className={styles.content()}>
              {label != null ? (
                <span id={labelId} className={styles.label()}>
                  {label}
                </span>
              ) : null}
              {description != null ? (
                <span id={descriptionId} className={styles.description()}>
                  {description}
                </span>
              ) : null}
            </span>
          ) : null}
        </label>
      );
    }

    return switchElement;
  },
);

Switch.displayName = 'Switch';
