'use client';

import * as React from 'react';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle } from '@base-ui/react/toggle';
import { toggleGroupVariants } from './toggle-group.variants';
import { cn } from '../../utils/cn';

/* -------------------------------------------------------------------------- */
/*  ToggleGroup                                                                */
/* -------------------------------------------------------------------------- */

export interface ToggleGroupProps {
  /** The controlled array of currently selected toggle values. */
  value?: string[];
  /** The default selected values when uncontrolled. */
  defaultValue?: string[];
  /** Callback fired when the selection changes. */
  onValueChange?: (value: string[], event?: unknown) => void;
  /** Whether multiple items can be selected simultaneously. */
  multiple?: boolean;
  /** Whether the entire toggle group is disabled. */
  disabled?: boolean;
  /** Additional CSS class name for the toggle group container. */
  className?: string;
  /** The ToggleGroupItem elements to render inside the group. */
  children: React.ReactNode;
}

/**
 * A group of toggle buttons where one or more items can be selected.
 *
 * @example
 * ```tsx
 * <ToggleGroup defaultValue={["bold"]} multiple>
 *   <ToggleGroupItem value="bold">B</ToggleGroupItem>
 *   <ToggleGroupItem value="italic">I</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, value, defaultValue, onValueChange, multiple, disabled, children, ...props }, ref) => {
    const styles = toggleGroupVariants();

    return (
      <BaseToggleGroup
        ref={ref}
        className={cn(styles.root(), className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        multiple={multiple}
        disabled={disabled}
        {...props}
      >
        {children}
      </BaseToggleGroup>
    );
  },
);

ToggleGroup.displayName = 'ToggleGroup';

/* -------------------------------------------------------------------------- */
/*  ToggleGroupItem                                                            */
/* -------------------------------------------------------------------------- */

export interface ToggleGroupItemProps {
  /** The unique value that identifies this item within the toggle group. */
  value: string;
  /** Whether this individual toggle item is disabled. */
  disabled?: boolean;
  /** Additional CSS class name for the toggle item button. */
  className?: string;
  /** The content rendered inside the toggle button. */
  children: React.ReactNode;
}

/**
 * An individual toggle button used within a ToggleGroup.
 *
 * @example
 * ```tsx
 * <ToggleGroupItem value="bold">B</ToggleGroupItem>
 * ```
 */
export const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    const styles = toggleGroupVariants();

    return (
      <Toggle
        ref={ref}
        value={value}
        disabled={disabled}
        className={cn(styles.item(), className)}
        {...props}
      >
        {children}
      </Toggle>
    );
  },
);

ToggleGroupItem.displayName = 'ToggleGroupItem';
