import * as React from 'react';
import { clsx } from 'clsx';
import { badgeNumberVariants, type BadgeNumberVariants } from './badge-number.variants';

export interface BadgeNumberProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    BadgeNumberVariants {}

/**
 * A fixed-size square badge that displays a numeric status or count, with
 * `color` and `shade` variants matching the Badge palette.
 *
 * @example
 * ```tsx
 * <BadgeNumber>4</BadgeNumber>
 * <BadgeNumber color="success" shade="light">9</BadgeNumber>
 * <BadgeNumber color="neutral">#</BadgeNumber>
 * ```
 */
export const BadgeNumber = React.forwardRef<HTMLSpanElement, BadgeNumberProps>(
  ({ className, color, shade, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        // clsx (not cn/twMerge): preserve text-fido-ui-p4 with text-fido-ui-* colors
        className={clsx(badgeNumberVariants({ color, shade }), className)}
        {...props}
      >
        {/* text-box trims the line box to cap height so flex centering is
            optically exact for digits; without it the glyph sits ~0.5px high
            because browsers center the full font-metric line box. Applied on
            an inner span because text-box has no effect on the anonymous
            text of the flex container. Older engines simply ignore it. */}
        <span className="[text-box:trim-both_cap_alphabetic]">{children}</span>
      </span>
    );
  },
);

BadgeNumber.displayName = 'BadgeNumber';
