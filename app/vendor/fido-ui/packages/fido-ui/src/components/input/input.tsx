'use client';

import * as React from 'react';
import { Input as BaseInput } from '@base-ui/react/input';
import { inputVariants, type InputVariants } from './input.variants';

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'children' | 'size'>,
    InputVariants {
  /** Additional CSS class applied to the input element */
  className?: string;
  /** Visual state of the standalone input */
  state?: InputVariants['state'];
}

/**
 * A styled text input primitive. Pair with `Field` for labels, helper text,
 * errors, and adornments.
 *
 * @example
 * ```tsx
 * import { Input } from '@petscreeninginc/fido-ui/input';
 * import { Field } from '@petscreeninginc/fido-ui/field';
 *
 * <Field label="Email">
 *   <Input name="email" placeholder="you@example.com" />
 * </Field>
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      state: stateProp,
      disabled,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const state = disabled ? 'disabled' : stateProp;
    const styles = inputVariants({ state });

    return (
      <BaseInput
        ref={ref}
        // Avoid cn()/twMerge — it collapses text-fido-ui-p2 with text-fido-ui-neutral-*.
        className={[styles, className].filter(Boolean).join(' ')}
        disabled={disabled}
        // Empty string keeps `:placeholder-shown` reliable for filled styles.
        placeholder={placeholder ?? ''}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
