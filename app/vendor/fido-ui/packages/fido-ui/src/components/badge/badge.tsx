import * as React from 'react';
import { clsx } from 'clsx';
import { DismissButton } from '../../utils/icons';
import type { IconComponent } from '../../utils/types';
import { badgeVariants, type BadgeVariants } from './badge.variants';

/** Icon size per badge size (Figma: LG 16px, MED 14px, SM 12px). */
const iconSizeClasses: Record<NonNullable<BadgeVariants['size']>, string> = {
  lg: 'size-4',
  md: 'size-3.5',
  sm: 'size-3',
};

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    Omit<BadgeVariants, 'leadingIcon' | 'trailingIcon'> {
  /** Icon component rendered before the label (lucide-react or Heroicons). */
  leftIcon?: IconComponent;
  /** Icon component rendered after the label (lucide-react or Heroicons). Ignored when `onDismiss` is set. */
  rightIcon?: IconComponent;
  /** Render a trailing dismiss (X) button and call this handler when it is clicked. */
  onDismiss?: () => void;
}

/**
 * A small label used to indicate status, count, or classification, with
 * `color`, `shade`, and `size` variants plus optional leading/trailing icons
 * and a dismiss action.
 *
 * @example
 * ```tsx
 * import { Check } from 'lucide-react';
 *
 * <Badge color="success" shade="light">Active</Badge>
 * <Badge color="primary" size="md" leftIcon={Check}>Verified</Badge>
 * <Badge color="neutral" onDismiss={() => {}}>Filter</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      color,
      shade,
      size = 'lg',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      onDismiss,
      children,
      ...props
    },
    ref,
  ) => {
    const iconSize = iconSizeClasses[size ?? 'lg'];
    const hasTrailingIcon = Boolean(onDismiss || RightIcon);
    return (
      <span
        ref={ref}
        // clsx (not cn/twMerge): preserve text-fido-ui-p3/p4/p5 with text-fido-ui-* colors
        className={clsx(
          badgeVariants({
            color,
            shade,
            size,
            leadingIcon: Boolean(LeftIcon),
            trailingIcon: hasTrailingIcon,
          }),
          className,
        )}
        {...props}
      >
        {LeftIcon ? <LeftIcon className={clsx(iconSize, 'shrink-0')} aria-hidden="true" /> : null}
        {children}
        {onDismiss ? (
          <DismissButton onClick={onDismiss} iconClassName={iconSize} />
        ) : RightIcon ? (
          <RightIcon className={clsx(iconSize, 'shrink-0')} aria-hidden="true" />
        ) : null}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
