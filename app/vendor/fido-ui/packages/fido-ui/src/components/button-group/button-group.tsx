import * as React from 'react';
import { buttonGroupVariants } from './button-group.variants';
import { cn } from '../../utils/cn';

export interface ButtonGroupProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'role'> {
  /** Button elements to render in the group */
  children: React.ReactNode;
}

/**
 * A semantic container that joins related buttons into a connected group.
 * Provide an accessible name when the surrounding context does not already describe the actions.
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button color="neutral" shade="light">Left</Button>
 *   <Button color="neutral" shade="light">Center</Button>
 *   <Button color="neutral" shade="light" iconOnly><PlusIcon /></Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div {...props} ref={ref} role="group" className={cn(buttonGroupVariants(), className)}>
        {children}
      </div>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';
