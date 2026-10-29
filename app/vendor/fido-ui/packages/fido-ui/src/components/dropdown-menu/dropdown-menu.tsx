'use client';

import * as React from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { dropdownMenuVariants } from './dropdown-menu.variants';
import { cn } from '../../utils/cn';

/* -------------------------------------------------------------------------- */
/*  DropdownMenu                                                               */
/* -------------------------------------------------------------------------- */

export interface DropdownMenuProps {
  /** The controlled open state of the menu */
  open?: boolean;
  /** The initial open state when uncontrolled */
  defaultOpen?: boolean;
  /** Callback fired when the menu open state changes */
  onOpenChange?: (open: boolean) => void;
  /** The menu trigger and items */
  children: React.ReactNode;
}

/**
 * A dropdown menu that displays a list of actions or options triggered by a button.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button>Options</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuItem onSelect={() => {}}>Edit</DropdownMenuItem>
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem destructive onSelect={() => {}}>Delete</DropdownMenuItem>
 * </DropdownMenu>
 * ```
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  open,
  defaultOpen,
  onOpenChange,
  children,
}) => {
  // Separate trigger from menu content children
  const triggerChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DropdownMenuTrigger,
  );
  const contentChildren = React.Children.toArray(children).filter(
    (child) => !(React.isValidElement(child) && child.type === DropdownMenuTrigger),
  );

  const styles = dropdownMenuVariants();

  return (
    <BaseMenu.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {triggerChild}
      <BaseMenu.Portal>
        <BaseMenu.Positioner className={styles.positioner()} sideOffset={8}>
          <BaseMenu.Popup className={styles.popup()}>
            {contentChildren}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
};

DropdownMenu.displayName = 'DropdownMenu';

/* -------------------------------------------------------------------------- */
/*  DropdownMenuTrigger                                                        */
/* -------------------------------------------------------------------------- */

export interface DropdownMenuTriggerProps {
  /** When true, the trigger renders as its child element instead of wrapping in a button */
  asChild?: boolean;
  /** Additional CSS class applied to the trigger */
  className?: string;
  /** The trigger element */
  children: React.ReactNode;
}

/**
 * A button that opens the parent DropdownMenu when clicked.
 *
 * @example
 * ```tsx
 * <DropdownMenuTrigger asChild>
 *   <Button>Options</Button>
 * </DropdownMenuTrigger>
 * ```
 */
export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, children, asChild, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return (
        <BaseMenu.Trigger ref={ref} render={children as React.JSX.Element} className={className} {...props} />
      );
    }

    return (
      <BaseMenu.Trigger ref={ref} className={className} {...props}>
        {children}
      </BaseMenu.Trigger>
    );
  },
);

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

/* -------------------------------------------------------------------------- */
/*  DropdownMenuItem                                                           */
/* -------------------------------------------------------------------------- */

export interface DropdownMenuItemProps {
  /** Callback invoked when the item is selected */
  onSelect?: () => void;
  /** When true, applies destructive (danger) styling */
  destructive?: boolean;
  /** When true, prevents the item from being selected */
  disabled?: boolean;
  /** Additional CSS class applied to the item */
  className?: string;
  /** The item content */
  children: React.ReactNode;
}

/**
 * An individual action item within a DropdownMenu.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem onSelect={() => console.log('clicked')}>Edit</DropdownMenuItem>
 * ```
 */
export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, children, onSelect, destructive, disabled, ...props }, ref) => {
    const styles = dropdownMenuVariants({ destructive });

    return (
      <BaseMenu.Item
        ref={ref}
        disabled={disabled}
        onClick={onSelect}
        className={cn(styles.item(), className)}
        {...props}
      >
        {children}
      </BaseMenu.Item>
    );
  },
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

/* -------------------------------------------------------------------------- */
/*  DropdownMenuSeparator                                                      */
/* -------------------------------------------------------------------------- */

export interface DropdownMenuSeparatorProps {
  /** Additional CSS class applied to the separator */
  className?: string;
}

/**
 * A visual divider used to separate items or groups within a DropdownMenu.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem onSelect={() => {}}>Edit</DropdownMenuItem>
 * <DropdownMenuSeparator />
 * <DropdownMenuItem onSelect={() => {}}>Delete</DropdownMenuItem>
 * ```
 */
export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({ className }) => {
  const styles = dropdownMenuVariants();
  return <BaseMenu.Separator className={cn(styles.separator(), className)} />;
};

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

/* -------------------------------------------------------------------------- */
/*  DropdownMenuGroup                                                          */
/* -------------------------------------------------------------------------- */

export interface DropdownMenuGroupProps {
  /** Optional text label for the group */
  label?: string;
  /** Additional CSS class applied to the group */
  className?: string;
  /** Menu items belonging to this group */
  children: React.ReactNode;
}

/**
 * A labelled group of DropdownMenuItem elements within a DropdownMenu.
 *
 * @example
 * ```tsx
 * <DropdownMenuGroup label="Actions">
 *   <DropdownMenuItem onSelect={() => {}}>Edit</DropdownMenuItem>
 *   <DropdownMenuItem onSelect={() => {}}>Duplicate</DropdownMenuItem>
 * </DropdownMenuGroup>
 * ```
 */
export const DropdownMenuGroup: React.FC<DropdownMenuGroupProps> = ({
  label,
  className,
  children,
}) => {
  const styles = dropdownMenuVariants();

  return (
    <BaseMenu.Group className={cn(styles.group(), className)}>
      {label && <BaseMenu.GroupLabel className={styles.label()}>{label}</BaseMenu.GroupLabel>}
      {children}
    </BaseMenu.Group>
  );
};

DropdownMenuGroup.displayName = 'DropdownMenuGroup';

/* -------------------------------------------------------------------------- */
/*  DropdownMenuLabel                                                          */
/* -------------------------------------------------------------------------- */

export interface DropdownMenuLabelProps {
  /** Additional CSS class applied to the label */
  className?: string;
  /** The label text */
  children: React.ReactNode;
}

/**
 * A non-interactive label within a DropdownMenu, typically used for section headings.
 *
 * @example
 * ```tsx
 * <DropdownMenuLabel>Actions</DropdownMenuLabel>
 * ```
 */
export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({ className, children }) => {
  const styles = dropdownMenuVariants();
  return <div className={cn(styles.label(), className)}>{children}</div>;
};

DropdownMenuLabel.displayName = 'DropdownMenuLabel';
