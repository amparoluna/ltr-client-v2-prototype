'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { Button as BaseButton } from '@base-ui/react/button';
import { buttonVariants, type ButtonVariants } from './button.variants';
import type { IconComponent } from '../../utils/types';

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'>,
    ButtonVariants {
  /** Additional CSS class names applied to the button element */
  className?: string;
  /** Icon component rendered before the label (lucide-react or Heroicons). */
  leftIcon?: IconComponent;
  /** Icon component rendered after the label (lucide-react or Heroicons). */
  rightIcon?: IconComponent;
}

/**
 * A button with `color`, `shade`, and `size` variants. Optionally renders an
 * icon before and/or after the label, and supports the native `disabled` state.
 *
 * @example
 * ```tsx
 * import { Plus } from 'lucide-react';
 * import { XMarkIcon } from '@heroicons/react/24/outline';
 *
 * <Button color="primary" shade="dark" leftIcon={Plus}>Click me</Button>
 * <Button color="secondary" size="sm" rightIcon={XMarkIcon}>Dismiss</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color,
      shade,
      size,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <BaseButton
        ref={ref}
        // clsx (not cn/twMerge): preserve text-fido-ui-h5/p3 with text-fido-ui-* colors
        className={clsx(buttonVariants({ color, shade, size }), className)}
        {...props}
      >
        {LeftIcon ? <LeftIcon className="size-4 shrink-0" aria-hidden="true" /> : null}
        {children}
        {RightIcon ? <RightIcon className="size-4 shrink-0" aria-hidden="true" /> : null}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';
