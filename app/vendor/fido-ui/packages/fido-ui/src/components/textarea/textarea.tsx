'use client';

import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { textareaVariants, type TextareaVariants } from './textarea.variants';
import { Tooltip } from '../tooltip/tooltip';
import { ErrorIcon, InfoIcon } from '../../utils/icons';
import { cn } from '../../utils/cn';

export interface TextareaProps
  extends Omit<React.ComponentPropsWithoutRef<'textarea'>, 'children'>, TextareaVariants {
  /** Accessible text label. Required — use `hideLabel` to hide visually. */
  label: string;
  /** Visually hides the label while keeping it available to assistive technology. */
  hideLabel?: boolean;
  /** Positions the label above (`stacked`) or inside (`internal`) the textarea. */
  labelPlacement?: TextareaVariants['labelPlacement'];
  /** Whether to show an "(Optional)" indicator next to the label. */
  optional?: boolean;
  /** Tooltip text shown via an info icon next to the label. */
  tooltip?: string;
  /** Helper text displayed below the textarea when there is no error. */
  description?: string;
  /** Error message displayed below the textarea, replacing the description. */
  error?: string;
  /** The maximum number of characters allowed in the textarea. */
  maxLength?: number;
  /** Whether to display the character count indicator. Defaults to true when maxLength is set. */
  showCharCount?: boolean;
  /** Additional CSS class name for the field root wrapper. */
  className?: string;
  /** Additional CSS class name applied directly to the textarea element. */
  textareaClassName?: string;
}

/**
 * A multi-line text input field with support for labels, validation errors, tooltips, and character counting.
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Bio"
 *   optional
 *   tooltip="Tell us about yourself"
 *   maxLength={200}
 *   placeholder="Write something..."
 * />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      textareaClassName,
      label,
      hideLabel,
      labelPlacement = 'stacked',
      optional,
      tooltip,
      description,
      error,
      maxLength,
      showCharCount = !!maxLength,
      state: stateProp,
      disabled,
      value,
      defaultValue,
      placeholder,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [charCount, setCharCount] = React.useState(() => {
      const initial = value ?? defaultValue ?? '';
      return String(initial).length;
    });

    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
    }, [value]);

    const state = disabled
      ? 'disabled'
      : error
        ? 'error'
        : (stateProp ?? (charCount > 0 ? 'filled' : undefined));
    const styles = textareaVariants({ state, labelPlacement });
    const showStackedLabel = Boolean(label) && labelPlacement === 'stacked' && !hideLabel;
    const showInternalLabel = Boolean(label) && labelPlacement === 'internal' && !hideLabel;

    const innerRef = React.useRef<HTMLTextAreaElement>(null);
    const initialHeightRef = React.useRef<number | null>(null);
    const maxHeightRef = React.useRef<number | null>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement, []);

    const resizeTextarea = React.useCallback((textarea: HTMLTextAreaElement) => {
      const initialHeight = initialHeightRef.current ?? textarea.clientHeight;
      if (!initialHeight) return;

      initialHeightRef.current = initialHeight;
      maxHeightRef.current ??=
        initialHeight + (textarea.parentElement?.clientHeight || initialHeight);
      textarea.style.height = 'auto';

      const maxHeight = maxHeightRef.current;
      const nextHeight = Math.min(Math.max(textarea.scrollHeight, initialHeight), maxHeight);

      textarea.style.height = `${nextHeight}px`;
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }, []);

    React.useEffect(() => {
      if (innerRef.current) {
        resizeTextarea(innerRef.current);
      }
    }, [resizeTextarea, value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      resizeTextarea(e.currentTarget);
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    // Clicking anywhere in the bordered box (the char counter, the padding, the
    // empty space below the text) should focus the textarea — except when an
    // interactive element was clicked.
    const handleWrapperMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      if (target === innerRef.current) return;
      if (target.closest('button, a, input, textarea, select, [role="button"], [tabindex]')) {
        return;
      }
      event.preventDefault();
      innerRef.current?.focus();
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
      <Field.Root className={cn(styles.root(), className)} disabled={disabled}>
        {label && hideLabel && (
          <Field.Label className="sr-only">
            {label}
            {optional && <span>(Optional)</span>}
          </Field.Label>
        )}
        {showStackedLabel && (
          <Field.Label className={styles.label()}>
            {label}
            {labelExtras}
          </Field.Label>
        )}
        <div className={styles.controlWrapper()} onMouseDown={handleWrapperMouseDown}>
          {showInternalLabel && (
            <Field.Label className={styles.internalLabel()}>
              {label}
              {labelExtras}
            </Field.Label>
          )}
          {/* Render a <textarea> as the Field control so Base UI associates the
              label with it (label-click focus + accessible name), the same way
              Input uses Base UI's Input as the control. */}
          <Field.Control
            render={
              <textarea
                ref={innerRef}
                className={cn(styles.control(), textareaClassName)}
                disabled={disabled}
                maxLength={maxLength}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={handleChange}
                {...props}
              />
            }
          />
          {showCharCount && maxLength && (
            <span className={styles.charCount()}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
        {error ? (
          <p role="alert" className={styles.error()}>
            <span className={styles.errorIcon()}>
              <ErrorIcon className="size-4 shrink-0" />
            </span>
            {error}
          </p>
        ) : description ? (
          <Field.Description className={styles.description()}>{description}</Field.Description>
        ) : null}
      </Field.Root>
    );
  },
);

Textarea.displayName = 'Textarea';
