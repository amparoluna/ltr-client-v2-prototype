import * as React from 'react';
import { pillVariants, type PillVariants } from './pill.variants';
import type { IconComponent } from '../../utils/types';
import { DismissButton } from '../../utils/icons';
import { cn } from '../../utils/cn';

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement>, PillVariants {
  /** Visual style variant — "primary", "light", "outline", or "neutral" */
  variant?: PillVariants['variant'];
  /**
   * Icon component rendered before the label (lucide-react or Heroicons).
   * Pass the component itself (not a rendered element) — Pill sizes it for you.
   */
  leftIcon?: IconComponent;
  /** Show a dismiss (X) button after the label. Pass a handler to make it interactive. */
  onDismiss?: () => void;
}

/**
 * A small rounded label used to categorize, tag, or highlight information.
 * Supports a dynamic leading icon and an optional dismiss button.
 *
 * @example
 * ```tsx
 * import { Plus } from 'lucide-react';
 *
 * <Pill variant="primary" leftIcon={Plus} onDismiss={() => {}}>Label</Pill>
 * ```
 */
export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  ({ className, variant, leftIcon: LeftIcon, onDismiss, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(pillVariants({ variant }), className)} {...props}>
        {LeftIcon ? <LeftIcon className="size-4 shrink-0" aria-hidden="true" /> : null}
        {children}
        {onDismiss && <DismissButton onClick={onDismiss} />}
      </span>
    );
  },
);

Pill.displayName = 'Pill';
