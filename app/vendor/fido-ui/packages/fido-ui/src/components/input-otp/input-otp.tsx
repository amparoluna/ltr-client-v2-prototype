'use client';

import * as React from 'react';
import { inputOtpVariants, type InputOtpVariants } from './input-otp.variants';
import { focusRingShadow } from '../../utils/variant-styles';
import { cn } from '../../utils/cn';

export interface InputOtpProps extends InputOtpVariants {
  /** Current OTP value */
  value: string;
  /** Number of digits (default: 6) */
  length?: number;
  /** Insert a hyphen separator after this many digits (e.g. 3 for "123-456") */
  hyphenAfter?: number;
  /** Visual status variant — "default", "error", or "success" */
  status?: Exclude<InputOtpVariants['status'], 'disabled'>;
  /** When true, dims the slots and blocks interaction */
  disabled?: boolean;
  /** Additional class for the root container */
  className?: string;
  /** HTML name attribute for the hidden input (for form submission) */
  name?: string;
  /** Additional class applied to each digit slot */
  slotClassName?: string;
  /** Render prop for each slot — receives digit value, index, and whether it's focused */
  renderSlot?: (props: { digit: string; index: number; isActive: boolean }) => React.ReactNode;
  /** All other props forwarded to the hidden <input> element (onChange, onFocus, onKeyDown, etc.) */
  inputProps?: React.ComponentPropsWithoutRef<'input'>;
}

/**
 * A presentational OTP (one-time password) input component that renders styled
 * digit slots and a hidden `<input>` for focus and keyboard capture. All
 * interaction logic — including auto-advance, paste handling, validation, and
 * digit filtering — is the consumer's responsibility via `inputProps`.
 *
 * The component is fully controlled: pass `value` and update it from
 * `inputProps.onChange`. The visible slots derive from `value`, so any
 * transformation you apply (filtering non-digits, clamping length) is what
 * the user sees.
 *
 * @example
 * Controlled usage with digit-only filtering and a length cap:
 * ```tsx
 * const [otp, setOtp] = useState('');
 *
 * <InputOtp
 *   value={otp}
 *   length={6}
 *   hyphenAfter={3}
 *   inputProps={{
 *     onChange: (e) => {
 *       const next = e.target.value.replace(/\D/g, '').slice(0, 6);
 *       setOtp(next);
 *     },
 *   }}
 * />
 * ```
 *
 * @see {@link https://github.com/PetScreeningInc/fido-ui/blob/main/packages/fido-ui/stories/forms.mdx | Forms guide}
 */
export const InputOtp = React.forwardRef<HTMLInputElement, InputOtpProps>(
  (
    {
      value,
      length = 6,
      hyphenAfter,
      status: statusProp,
      disabled,
      name,
      className,
      slotClassName,
      renderSlot,
      inputProps,
      ...props
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRef(ref, internalRef);
    const [focused, setFocused] = React.useState(false);

    const status = disabled ? 'disabled' : statusProp;
    const styles = inputOtpVariants({ status });

    // Which slot should appear "active"
    const activeIndex = focused ? Math.min(value.length, length - 1) : -1;

    const handleContainerClick = () => {
      internalRef.current?.focus();
    };

    // Split indices into groups based on hyphenAfter
    const groups: number[][] = [];
    if (hyphenAfter != null && hyphenAfter > 0 && hyphenAfter < length) {
      groups.push(
        Array.from({ length: hyphenAfter }, (_, i) => i),
        Array.from({ length: length - hyphenAfter }, (_, i) => hyphenAfter + i),
      );
    } else {
      groups.push(Array.from({ length }, (_, i) => i));
    }

    const renderSlotEl = (i: number) => {
      const digit = value[i] ?? '';
      const isActive = i === activeIndex;

      return (
        <div
          key={i}
          className={cn(
            styles.slot(),
            isActive && status !== 'error' && status !== 'disabled' && `z-10 ${focusRingShadow}`,
            slotClassName,
          )}
          data-active={isActive || undefined}
          data-filled={digit !== '' || undefined}
        >
          {renderSlot ? (
            renderSlot({ digit, index: i, isActive })
          ) : (
            <>
              {digit || (!isActive && (
                <span className={styles.placeholder()}>#</span>
              ))}
              {isActive && digit === '' && (
                <span className={styles.cursor()} />
              )}
            </>
          )}
        </div>
      );
    };

    return (
      <div
        className={cn(styles.root(), className)}
        onClick={handleContainerClick}
        role="group"
        aria-label="One-time password"
        {...props}
      >
        {groups.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && (
              <span className={styles.separator()}>—</span>
            )}
            <div className={styles.group()}>
              {group.map((i) => renderSlotEl(i))}
            </div>
          </React.Fragment>
        ))}

        {/* Hidden input captures focus, keyboard, and paste events */}
        <input
          ref={combinedRef}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d*"
          maxLength={length}
          value={value}
          disabled={disabled}
          name={name}
          aria-label="OTP input"
          {...inputProps}
          onFocus={(e) => {
            setFocused(true);
            inputProps?.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            inputProps?.onBlur?.(e);
          }}
          className={cn('sr-only', inputProps?.className)}
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
        />
      </div>
    );
  },
);

InputOtp.displayName = 'InputOtp';

/** Combines a forwarded ref with an internal ref */
function useCombinedRef<T>(
  forwardedRef: React.ForwardedRef<T>,
  internalRef: React.RefObject<T | null>,
) {
  return React.useCallback(
    (node: T | null) => {
      (internalRef as React.MutableRefObject<T | null>).current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<T | null>).current = node;
      }
    },
    [forwardedRef, internalRef],
  );
}
