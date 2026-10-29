'use client';

import * as React from 'react';
import { Field as BaseField } from '@base-ui/react/field';
import { fieldVariants, type FieldVariants } from './field.variants';
import type { IconComponent } from '../../utils/types';
import type { FieldChromeProps } from '../../utils/field-variants';
import { CloseIcon, InfoIcon, ErrorIcon } from '../../utils/icons';
import { Badge, type BadgeProps } from '../badge/badge';
import { Tooltip } from '../tooltip/tooltip';
import { cn } from '../../utils/cn';

export interface FieldProps extends FieldChromeProps, FieldVariants {
  /**
   * A list of validation error messages (e.g. password rules), each rendered on
   * its own line with a red ✗ icon below the description/error.
   */
  validations?: string[];
  /**
   * Icon component rendered before the control (lucide-react or Heroicons).
   * Pass the component itself — Field sizes it for you.
   * Figma: Leading Icon.
   */
  leftIcon?: IconComponent;
  /**
   * Leading action node before the value (e.g. a "Choose file" pill).
   * Figma: Choose File.
   */
  fileAction?: React.ReactNode;
  /**
   * Leading prefix text or node before the value (e.g. "https://").
   */
  prefix?: React.ReactNode;
  /**
   * A {@link Badge} element rendered after the value.
   * Figma: Badge.
   */
  badge?: React.ReactElement<BadgeProps, typeof Badge>;
  /**
   * Icon component rendered after the value / badge.
   * Figma: Trailing Icon.
   */
  trailingIcon?: IconComponent;
  /**
   * Trailing suffix text or node after a vertical divider (e.g. "USD").
   * Figma: Suffix.
   */
  suffix?: React.ReactNode;
  /**
   * Trailing interactive control node (e.g. steppers).
   * Figma: Control.
   */
  control?: React.ReactNode;
  /**
   * Icon component for a simple trailing control affordance.
   * Rendered when `control` is not provided. Figma: Control Icon.
   */
  controlIcon?: IconComponent;
  /**
   * Action button or node rendered outside the control box, to its right
   * (Figma: Field + Btn / Button).
   */
  action?: React.ReactNode;
  /** Additional CSS class applied to the root field wrapper */
  className?: string;
  /**
   * Visual state — overridden to "disabled" when `disabled` is true, or
   * "error" when `error` is set.
   */
  state?: FieldVariants['state'];
  /**
   * The control to wrap — typically a FidoUI `Input`. Must be a single
   * React element that can receive `disabled` and `ref`.
   */
  children: React.ReactElement;
}

/**
 * Integrated field wrapper: label, helper/error text, and adornment slots
 * around a control child (typically `Input`).
 *
 * @example
 * ```tsx
 * import { Field } from '@petscreeninginc/fido-ui/field';
 * import { Input } from '@petscreeninginc/fido-ui/input';
 * import { Mail } from 'lucide-react';
 *
 * <Field label="Email" leftIcon={Mail} description="Helper text">
 *   <Input name="email" placeholder="you@example.com" />
 * </Field>
 * ```
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      className,
      label,
      hideLabel,
      labelPlacement = 'stacked',
      optional,
      tooltip,
      description,
      error,
      validations,
      leftIcon: LeftIcon,
      fileAction,
      prefix,
      badge,
      trailingIcon: TrailingIcon,
      suffix,
      control,
      controlIcon: ControlIcon,
      action,
      state: stateProp,
      disabled,
      children,
    },
    ref,
  ) => {
    const state = disabled ? 'disabled' : error ? 'error' : stateProp;
    const styles = fieldVariants({ state, labelPlacement });
    const showStackedLabel = Boolean(label) && labelPlacement === 'stacked' && !hideLabel;
    const showInternalLabel = Boolean(label) && labelPlacement === 'internal' && !hideLabel;
    const leadingIconClass =
      labelPlacement === 'internal' ? 'size-6' : 'size-4';

    const controlRef = React.useRef<HTMLElement | null>(null);

    const child = React.Children.only(children);
    const childProps = child.props as {
      disabled?: boolean;
      ref?: React.Ref<HTMLElement>;
    };

    const setControlRef = React.useCallback(
      (node: HTMLElement | null) => {
        controlRef.current = node;
        const childRef = childProps.ref;
        if (typeof childRef === 'function') {
          childRef(node);
        } else if (childRef && typeof childRef === 'object') {
          (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [childProps.ref],
    );

    const controlElement = React.cloneElement(child, {
      ref: setControlRef,
      disabled: disabled ?? childProps.disabled,
    } as React.Attributes);

    // Clicking anywhere in the container (icons, suffix, empty space) should
    // focus the control — except when an interactive adornment was clicked.
    const handleContainerMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      if (controlRef.current && target === controlRef.current) return;
      if (target.closest('button, a, input, textarea, select, [role="button"], [tabindex]')) {
        return;
      }
      event.preventDefault();
      controlRef.current?.focus();
    };

    const labelExtras = (
      <>
        {optional && <span className={styles.optionalText()}>(Optional)</span>}
        {tooltip && (
          <Tooltip content={tooltip} side="top">
            <span className={styles.tooltipIcon()}>
              <InfoIcon />
            </span>
          </Tooltip>
        )}
      </>
    );

    return (
      <BaseField.Root
        ref={ref}
        className={cn(styles.root(), className)}
        disabled={disabled}
      >
        {label && hideLabel && (
          <BaseField.Label className="sr-only">
            {label}
            {optional && <span>(Optional)</span>}
          </BaseField.Label>
        )}
        {showStackedLabel && (
          <BaseField.Label className={styles.label()}>
            {label}
            {labelExtras}
          </BaseField.Label>
        )}
        <div className={styles.controlRow()}>
          <div className={styles.container()} onMouseDown={handleContainerMouseDown}>
            {LeftIcon ? (
              <span className={styles.icon()}>
                <LeftIcon className={leadingIconClass} aria-hidden="true" />
              </span>
            ) : null}
            {fileAction ? <span className={styles.fileAction()}>{fileAction}</span> : null}
            {prefix ? <span className={styles.prefix()}>{prefix}</span> : null}
            <div className={styles.content()}>
              {showInternalLabel && (
                <BaseField.Label className={styles.internalLabel()}>
                  {label}
                  {labelExtras}
                </BaseField.Label>
              )}
              {controlElement}
            </div>
            {badge ? <span className={styles.badgeSlot()}>{badge}</span> : null}
            {TrailingIcon ? (
              <span className={styles.trailingIcon()}>
                <TrailingIcon className="size-[18px]" aria-hidden="true" />
              </span>
            ) : null}
            {suffix ? (
              <span className={styles.suffix()}>
                <span className={styles.suffixDivider()} aria-hidden="true" />
                <span className={styles.suffixText()}>{suffix}</span>
              </span>
            ) : null}
            {control ? (
              <span className={styles.controlSlot()}>{control}</span>
            ) : ControlIcon ? (
              <span className={styles.controlSlot()} aria-hidden="true">
                <ControlIcon className="size-[18px]" />
              </span>
            ) : null}
          </div>
          {action ? <span className={styles.actionSlot()}>{action}</span> : null}
        </div>
        {description && (
          <BaseField.Description className={styles.description()}>
            {description}
          </BaseField.Description>
        )}
        {error && (
          <p role="alert" className={styles.error()}>
            <span className={styles.errorIcon()}>
              <ErrorIcon className="size-4 shrink-0" />
            </span>
            {error}
          </p>
        )}
        {validations && validations.length > 0 && (
          <ul className={styles.validationList()}>
            {validations.map((validation, index) => (
              <li key={index} className={styles.validationItem()}>
                <span className={styles.validationIcon()}>
                  <CloseIcon className="size-4" />
                </span>
                {validation}
              </li>
            ))}
          </ul>
        )}
      </BaseField.Root>
    );
  },
);

Field.displayName = 'Field';
