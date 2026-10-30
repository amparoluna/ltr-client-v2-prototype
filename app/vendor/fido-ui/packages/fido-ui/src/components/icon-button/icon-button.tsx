'use client';

import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { iconButtonVariants, type IconButtonVariants } from './icon-button.variants';
import type { IconComponent } from '../../utils/types';
import { cn } from '../../utils/cn';

export interface IconButtonProps
  extends Omit<
      React.ComponentPropsWithoutRef<'button'>,
      'color' | 'children' | 'aria-label'
    >,
    IconButtonVariants {
  /** Additional CSS class names applied to the button element */
  className?: string;
  /**
   * Icon component rendered inside the button (lucide-react or Heroicons).
   * Pass the component itself (not a rendered element) — IconButton sizes and
   * renders it for you.
   */
  icon: IconComponent;
  /**
   * Accessible label describing the button's action. Required: an icon-only
   * button has no visible text, so a label is needed for assistive tech.
   */
  'aria-label': string;
}

/**
 * A circular, icon-only button with `color` and `shade` variants. Renders the
 * provided icon and requires an `aria-label` for assistive technology.
 *
 * @example
 * ```tsx
 * import { Plus } from 'lucide-react';
 * import { XMarkIcon } from '@heroicons/react/24/outline';
 *
 * <IconButton color="primary" shade="dark" icon={Plus} aria-label="Add item" />
 * <IconButton color="secondary" shade="ghost" icon={Plus} aria-label="Add" />
 * <IconButton color="neutral" shade="light" icon={XMarkIcon} aria-label="Close" />
 * ```
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, color, shade, icon: Icon, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        className={cn(iconButtonVariants({ color, shade }), className)}
        {...props}
      >
        <Icon className="size-[18px] shrink-0" aria-hidden="true" />
      </BaseButton>
    );
  },
);

IconButton.displayName = 'IconButton';
