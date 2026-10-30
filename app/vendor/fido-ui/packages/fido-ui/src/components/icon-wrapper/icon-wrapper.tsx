import * as React from 'react';
import { cn } from '../../utils/cn';
import { iconWrapperVariants, type IconWrapperVariants } from './icon-wrapper.variants';

export interface IconWrapperProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, IconWrapperVariants {
  /** Icon or image rendered inside the tokenized wrapper. */
  children: React.ReactNode;
}

/**
 * A presentational surface that gives icons consistent color, size, padding,
 * and corner treatments.
 *
 * IconWrapper adds no accessibility semantics. Mark decorative icon children
 * with `aria-hidden="true"`, or give informative children an accessible name.
 *
 * @example
 * ```tsx
 * <IconWrapper color="success" shade="light" size="md">
 *   <Check aria-hidden="true" />
 * </IconWrapper>
 * ```
 */
export const IconWrapper = React.forwardRef<HTMLSpanElement, IconWrapperProps>(
  ({ className, color, shade, size, children, ...props }, ref) => {
    const styles = iconWrapperVariants({ color, shade, size });

    return (
      <span ref={ref} className={cn(styles.root(), className)} data-slot="icon-wrapper" {...props}>
        <span className={styles.icon()} data-slot="icon">
          {children}
        </span>
      </span>
    );
  },
);

IconWrapper.displayName = 'IconWrapper';
