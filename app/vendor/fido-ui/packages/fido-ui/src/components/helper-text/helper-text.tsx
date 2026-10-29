import * as React from 'react';
import { CircleCheck, CircleX, Info, TriangleAlert, type LucideIcon } from 'lucide-react';
import {
  helperTextLabelVariants,
  helperTextVariants,
  type HelperTextVariants,
} from './helper-text.variants';
import { Spinner } from '../spinner/spinner';
import { cn } from '../../utils/cn';

const typeIcons: Partial<Record<NonNullable<HelperTextVariants['type']>, LucideIcon>> = {
  default: CircleX,
  inform: Info,
  error: CircleX,
  success: CircleCheck,
  warn: TriangleAlert,
};

export interface HelperTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, HelperTextVariants {
  /**
   * Visual status type. Matches Figma "Type".
   * @default 'default'
   */
  type?: HelperTextVariants['type'];
  /**
   * Whether to show the leading status icon. Matches Figma "Left Icon".
   * @default true
   */
  leftIcon?: boolean;
}

/**
 * Compact inline guidance or status feedback with an optional leading icon.
 *
 * @example
 * ```tsx
 * <HelperText type="success">Saved</HelperText>
 * <HelperText type="error" leftIcon={false}>Invalid</HelperText>
 * ```
 */
export const HelperText = React.forwardRef<HTMLSpanElement, HelperTextProps>(
  ({ className, type = 'default', leftIcon = true, children, ...props }, ref) => {
    const resolvedType = type ?? 'default';
    const Icon = typeIcons[resolvedType];

    return (
      <span
        ref={ref}
        className={cn(helperTextVariants({ type: resolvedType }), className)}
        {...props}
      >
        {leftIcon && resolvedType === 'loading' ? (
          <span
            className="flex size-fido-ui-xs shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            <Spinner size="sm" color="current" label="" />
          </span>
        ) : null}
        {leftIcon && Icon ? <Icon className="size-fido-ui-xs shrink-0" aria-hidden="true" /> : null}
        <span className={helperTextLabelVariants({ type: resolvedType })}>{children}</span>
      </span>
    );
  },
);

HelperText.displayName = 'HelperText';
