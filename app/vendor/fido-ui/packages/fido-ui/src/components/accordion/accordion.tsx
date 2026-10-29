'use client';

import * as React from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { clsx } from 'clsx';
import { accordionVariants } from './accordion.variants';

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Accordion                                                                  */
/* -------------------------------------------------------------------------- */

export interface AccordionProps {
  /** Whether a single or multiple items can be open at the same time. */
  type?: 'single' | 'multiple';
  /** The controlled value of the open item(s). A string for single, string[] for multiple. */
  value?: string | string[];
  /** The default open item(s) when uncontrolled. A string for single, string[] for multiple. */
  defaultValue?: string | string[];
  /** Callback fired when the open item(s) change. */
  onValueChange?: (value: string | string[]) => void;
  /** Whether the component should ignore user interaction. */
  disabled?: boolean;
  /** Additional CSS class names applied to the root element. */
  className?: string;
  /** The accordion items. */
  children: React.ReactNode;
}

/**
 * A vertically stacked set of interactive headings that reveal or hide associated content.
 *
 * @example
 * ```tsx
 * <Accordion type="single" defaultValue="item-1">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content here</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  value,
  defaultValue,
  onValueChange,
  disabled,
  className,
  children,
}) => {
  const styles = accordionVariants();
  const multiple = type === 'multiple';

  // Normalize to array for Base UI
  const normalizedValue = value === undefined ? undefined : Array.isArray(value) ? value : [value];
  const normalizedDefault =
    defaultValue === undefined ? undefined : Array.isArray(defaultValue) ? defaultValue : [defaultValue];

  const handleValueChange = React.useCallback(
    (newValue: string[]) => {
      if (!onValueChange) return;
      if (type === 'single') {
        // For single mode, return the last opened value or empty string
        onValueChange(newValue.length > 0 ? newValue[newValue.length - 1] : '');
      } else {
        onValueChange(newValue);
      }
    },
    [onValueChange, type],
  );

  return (
    <BaseAccordion.Root
      className={clsx(styles.root(), className)}
      value={normalizedValue}
      defaultValue={normalizedDefault}
      onValueChange={onValueChange ? handleValueChange : undefined}
      multiple={multiple}
      disabled={disabled}
    >
      {children}
    </BaseAccordion.Root>
  );
};

Accordion.displayName = 'Accordion';

/* -------------------------------------------------------------------------- */
/*  AccordionItem                                                              */
/* -------------------------------------------------------------------------- */

export interface AccordionItemProps {
  /** A unique value that identifies this accordion item. */
  value: string;
  /** Whether this item is disabled. */
  disabled?: boolean;
  /** Additional CSS class names applied to the item element. */
  className?: string;
  /** The trigger and content for this item. */
  children: React.ReactNode;
}

/**
 * Groups an accordion header with its corresponding panel content.
 *
 * @example
 * ```tsx
 * <AccordionItem value="item-1">
 *   <AccordionTrigger>Section 1</AccordionTrigger>
 *   <AccordionContent>Content here</AccordionContent>
 * </AccordionItem>
 * ```
 */
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    const styles = accordionVariants();

    return (
      <BaseAccordion.Item
        ref={ref}
        value={value}
        disabled={disabled}
        className={clsx(styles.item(), className)}
        {...props}
      >
        {children}
      </BaseAccordion.Item>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';

/* -------------------------------------------------------------------------- */
/*  AccordionTrigger                                                           */
/* -------------------------------------------------------------------------- */

export interface AccordionTriggerProps {
  /** Additional CSS class names applied to the trigger button. */
  className?: string;
  /** The label content rendered inside the trigger. */
  children: React.ReactNode;
}

/**
 * A button that toggles the visibility of its associated accordion content panel.
 *
 * @example
 * ```tsx
 * <AccordionTrigger>Section 1</AccordionTrigger>
 * ```
 */
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const styles = accordionVariants();

    return (
      <BaseAccordion.Header>
        <BaseAccordion.Trigger ref={ref} className={clsx(styles.trigger(), className)} {...props}>
          {children}
          <span className={styles.icon()} aria-hidden>
            <ChevronDownIcon />
          </span>
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
    );
  },
);

AccordionTrigger.displayName = 'AccordionTrigger';

/* -------------------------------------------------------------------------- */
/*  AccordionContent                                                           */
/* -------------------------------------------------------------------------- */

export interface AccordionContentProps {
  /** Additional CSS class names applied to the content panel. */
  className?: string;
  /** The content rendered inside the collapsible panel. */
  children: React.ReactNode;
}

/**
 * A collapsible panel that contains the accordion item content.
 *
 * @example
 * ```tsx
 * <AccordionContent>Content goes here.</AccordionContent>
 * ```
 */
export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const styles = accordionVariants();

    return (
      <BaseAccordion.Panel ref={ref} className={clsx(styles.content(), className)} {...props}>
        <div className={styles.contentInner()}>{children}</div>
      </BaseAccordion.Panel>
    );
  },
);

AccordionContent.displayName = 'AccordionContent';
