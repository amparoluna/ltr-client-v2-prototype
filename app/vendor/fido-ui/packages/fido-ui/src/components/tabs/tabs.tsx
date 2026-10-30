'use client';

import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { tabsVariants, type TabsVariants } from './tabs.variants';
import { cn } from '../../utils/cn';
import type { IconComponent } from '../../utils/types';

/* -------------------------------------------------------------------------- */
/*  Tabs Root                                                                  */
/* -------------------------------------------------------------------------- */

export interface TabsProps extends TabsVariants {
  /** The controlled value of the currently selected tab. */
  value?: string | number | null;
  /** The default selected tab value when uncontrolled. */
  defaultValue?: string | number | null;
  /** Callback fired when the active tab changes. */
  onValueChange?: (value: string | number | null, event?: unknown) => void;
  /** Additional CSS class name for the tabs root element. */
  className?: string;
  /** The tabs list, tab triggers, and tab panels as children. */
  children: React.ReactNode;
}

/**
 * A tabbed interface root component that manages tab selection state.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <Tab value="tab1">First</Tab>
 *     <Tab value="tab2">Second</Tab>
 *   </TabsList>
 *   <TabPanel value="tab1">Content 1</TabPanel>
 *   <TabPanel value="tab2">Content 2</TabPanel>
 * </Tabs>
 * ```
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, style, value, defaultValue, onValueChange, children, ...props }, ref) => {
    const styles = tabsVariants({ style });

    return (
      <BaseTabs.Root
        ref={ref}
        className={cn(styles.root(), className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        {...props}
      >
        {children}
      </BaseTabs.Root>
    );
  },
);

Tabs.displayName = 'Tabs';

/* -------------------------------------------------------------------------- */
/*  TabsList                                                                   */
/* -------------------------------------------------------------------------- */

export interface TabsListProps extends TabsVariants {
  /** Additional CSS class name for the tabs list container. */
  className?: string;
  /** The Tab trigger elements to render inside the list. */
  children: React.ReactNode;
}

/**
 * A container for tab trigger buttons, rendered as a horizontal list.
 *
 * @example
 * ```tsx
 * <TabsList>
 *   <Tab value="a">Tab A</Tab>
 *   <Tab value="b">Tab B</Tab>
 * </TabsList>
 * ```
 */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, style, children, ...props }, ref) => {
    const styles = tabsVariants({ style });

    return (
      <BaseTabs.List ref={ref} className={cn(styles.list(), className)} {...props}>
        {children}
      </BaseTabs.List>
    );
  },
);

TabsList.displayName = 'TabsList';

/* -------------------------------------------------------------------------- */
/*  Tab                                                                        */
/* -------------------------------------------------------------------------- */

export interface TabProps extends TabsVariants {
  /** The unique value that associates this trigger with its corresponding TabPanel. */
  value: string | number;
  /** Whether this tab trigger is disabled. */
  disabled?: boolean;
  /** Additional CSS class name for the tab trigger button. */
  className?: string;
  /** The label content rendered inside the tab trigger. */
  children?: React.ReactNode;
  /** Optional icon slots, sized to the 20px Figma attachment slot. */
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  /** Optional count/status badge. Pass true to render the default “#”. */
  number?: React.ReactNode;
}

/**
 * A single tab trigger button that activates its associated panel when clicked.
 *
 * @example
 * ```tsx
 * <Tab value="settings">Settings</Tab>
 * ```
 */
export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, style, value, disabled, children, leftIcon: LeftIcon, rightIcon: RightIcon, number, ...props }, ref) => {
    const styles = tabsVariants({ style });

    return (
      <BaseTabs.Tab
        ref={ref}
        value={value}
        disabled={disabled}
        className={cn(styles.tab(), className)}
        {...props}
      >
        {LeftIcon ? <LeftIcon className={styles.icon()} aria-hidden="true" /> : null}
        {children}
        {number !== undefined && number !== false ? <span className={cn(styles.badge(), disabled && 'opacity-40')}>{number === true ? '#' : number}</span> : null}
        {RightIcon ? <RightIcon className={styles.icon()} aria-hidden="true" /> : null}
      </BaseTabs.Tab>
    );
  },
);

Tab.displayName = 'Tab';

/* -------------------------------------------------------------------------- */
/*  TabPanel                                                                   */
/* -------------------------------------------------------------------------- */

export interface TabPanelProps extends TabsVariants {
  /** The value linking this panel to its corresponding Tab trigger. */
  value: string | number;
  /** Additional CSS class name for the tab panel container. */
  className?: string;
  /** The content to display when this panel is active. */
  children: React.ReactNode;
}

/**
 * A content panel that is shown when its matching Tab trigger is selected.
 *
 * @example
 * ```tsx
 * <TabPanel value="settings">Settings content goes here.</TabPanel>
 * ```
 */
export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, style, value, children, ...props }, ref) => {
    const styles = tabsVariants({ style });

    return (
      <BaseTabs.Panel
        ref={ref}
        value={value}
        className={cn(styles.panel(), className)}
        {...props}
      >
        {children}
      </BaseTabs.Panel>
    );
  },
);

TabPanel.displayName = 'TabPanel';
