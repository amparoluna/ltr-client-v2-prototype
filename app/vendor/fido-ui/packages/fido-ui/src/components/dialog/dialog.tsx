'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { dialogVariants, type DialogVariants } from './dialog.variants';
import { cn } from '../../utils/cn';
import { CloseIcon } from '../../utils/icons';
import type { IconComponent } from '../../utils/types';

/* -------------------------------------------------------------------------- */
/*  Dialog                                                                     */
/* -------------------------------------------------------------------------- */

export interface DialogProps extends DialogVariants {
  /** The controlled open state of the dialog */
  open?: boolean;
  /** The initial open state when uncontrolled */
  defaultOpen?: boolean;
  /** Callback fired when the dialog open state changes */
  onOpenChange?: (open: boolean) => void;
  /** The dialog content, typically DialogTrigger and DialogContent */
  children: React.ReactNode;
}

/**
 * A modal dialog root that manages open/close state for its trigger and content children.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Title</DialogTitle>
 *       <DialogDescription>Description</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter><Button>Confirm</Button></DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export const Dialog: React.FC<DialogProps> = ({ open, defaultOpen, onOpenChange, children }) => {
  return (
    <BaseDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </BaseDialog.Root>
  );
};

Dialog.displayName = 'Dialog';

/* -------------------------------------------------------------------------- */
/*  DialogTrigger                                                              */
/* -------------------------------------------------------------------------- */

export interface DialogTriggerProps {
  /** Additional CSS class names applied to the trigger button */
  className?: string;
  /** Replace the default button while preserving trigger behavior */
  render?: React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger>['render'];
  /** The trigger element, typically a button or interactive element */
  children: React.ReactNode;
}

/**
 * A button that opens the parent Dialog when clicked.
 *
 * @example
 * ```tsx
 * <DialogTrigger>Open Dialog</DialogTrigger>
 * ```
 */
export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, render, children, ...props }, ref) => (
    <BaseDialog.Trigger ref={ref} className={className} render={render} {...props}>
      {children}
    </BaseDialog.Trigger>
  ),
);

DialogTrigger.displayName = 'DialogTrigger';

/* -------------------------------------------------------------------------- */
/*  DialogContent                                                              */
/* -------------------------------------------------------------------------- */

export interface DialogContentProps extends DialogVariants {
  /** Whether to display a close button in the top-right corner (default: true) */
  showClose?: boolean;
  /** Accessible label for the close button */
  closeLabel?: string;
  /** Additional CSS class names applied to the dialog popup */
  className?: string;
  /** The content rendered inside the dialog panel */
  children: React.ReactNode;
}

/**
 * The dialog panel rendered inside a portal with a backdrop overlay. Supports configurable size and an optional close button.
 *
 * @example
 * ```tsx
 * <DialogContent size="md" showClose>
 *   <DialogTitle>Confirm</DialogTitle>
 *   <DialogDescription>Are you sure?</DialogDescription>
 * </DialogContent>
 * ```
 */
export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, size, showClose = true, closeLabel = 'Close dialog', children, ...props }, ref) => {
    const styles = dialogVariants({ size });

    return (
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop()} />
        <BaseDialog.Viewport className={styles.viewport()}>
          <BaseDialog.Popup ref={ref} className={cn(styles.popup(), className)} {...props}>
            {showClose && (
              <BaseDialog.Close className={styles.close()} aria-label={closeLabel}>
                <CloseIcon className="size-5" />
              </BaseDialog.Close>
            )}
            {children}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    );
  },
);

DialogContent.displayName = 'DialogContent';

/* -------------------------------------------------------------------------- */
/*  DialogHeader                                                               */
/* -------------------------------------------------------------------------- */

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The title and optional description rendered at the top of the dialog */
  children: React.ReactNode;
}

/**
 * Groups a DialogTitle and optional DialogDescription with the design-system spacing.
 */
export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const styles = dialogVariants();
    return (
      <div ref={ref} className={cn(styles.header(), className)} {...props}>
        {children}
      </div>
    );
  },
);

DialogHeader.displayName = 'DialogHeader';

/* -------------------------------------------------------------------------- */
/*  DialogTitle                                                                */
/* -------------------------------------------------------------------------- */

export interface DialogTitleProps {
  /** Additional CSS class names applied to the title heading */
  className?: string;
  /** Icon component rendered before the title */
  leftIcon?: IconComponent;
  /** The title text content */
  children: React.ReactNode;
}

/**
 * The heading element for a dialog, rendered as an accessible dialog title.
 *
 * @example
 * ```tsx
 * <DialogTitle>Delete Item</DialogTitle>
 * ```
 */
export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, leftIcon: LeftIcon, children, ...props }, ref) => {
    const styles = dialogVariants();
    return (
      <BaseDialog.Title ref={ref} className={clsx(styles.title(), className)} {...props}>
        {LeftIcon ? <LeftIcon className="size-6 shrink-0" aria-hidden="true" /> : null}
        {children}
      </BaseDialog.Title>
    );
  },
);

DialogTitle.displayName = 'DialogTitle';

/* -------------------------------------------------------------------------- */
/*  DialogDescription                                                          */
/* -------------------------------------------------------------------------- */

export interface DialogDescriptionProps {
  /** Additional CSS class names applied to the description paragraph */
  className?: string;
  /** The descriptive text content */
  children: React.ReactNode;
}

/**
 * A paragraph that provides additional context for the dialog, linked as the accessible description.
 *
 * @example
 * ```tsx
 * <DialogDescription>This action cannot be undone.</DialogDescription>
 * ```
 */
export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const styles = dialogVariants();
    return (
      <BaseDialog.Description
        ref={ref}
        className={clsx(styles.description(), className)}
        {...props}
      >
        {children}
      </BaseDialog.Description>
    );
  },
);

DialogDescription.displayName = 'DialogDescription';

/* -------------------------------------------------------------------------- */
/*  DialogFooter                                                               */
/* -------------------------------------------------------------------------- */

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Action buttons or other content rendered in the dialog footer */
  children: React.ReactNode;
}

/**
 * A container for action buttons placed at the bottom of a dialog panel.
 *
 * @example
 * ```tsx
 * <DialogFooter>
 *   <Button shade="ghost">Cancel</Button>
 *   <Button color="danger">Delete</Button>
 * </DialogFooter>
 * ```
 */
export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => {
    const styles = dialogVariants();
    return (
      <div ref={ref} className={cn(styles.footer(), className)} {...props}>
        {children}
      </div>
    );
  },
);

DialogFooter.displayName = 'DialogFooter';

/* -------------------------------------------------------------------------- */
/*  DialogClose                                                                */
/* -------------------------------------------------------------------------- */

export const DialogClose = BaseDialog.Close;
