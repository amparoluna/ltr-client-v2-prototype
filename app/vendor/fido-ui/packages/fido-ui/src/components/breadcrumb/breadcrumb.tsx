import * as React from 'react';
import { breadcrumbVariants } from './breadcrumb.variants';
import type { IconComponent } from '../../utils/types';
import { cn } from '../../utils/cn';

const ChevronRight = () => (
  <svg
    className="size-full"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EllipsisIcon = () => (
  <svg
    className="size-[14px]"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="3" cy="7" r="1" fill="currentColor" />
    <circle cx="7" cy="7" r="1" fill="currentColor" />
    <circle cx="11" cy="7" r="1" fill="currentColor" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Breadcrumb                                                                 */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbProps {
  /** Custom separator element rendered between each breadcrumb item. Defaults to a chevron-right icon. */
  separator?: React.ReactNode;
  /** Additional CSS class names applied to the root nav element */
  className?: string;
  /** Breadcrumb items (BreadcrumbLink, BreadcrumbPage, or BreadcrumbEllipsis elements) */
  children: React.ReactNode;
}

/**
 * Navigation component that displays a trail of links representing the current page hierarchy.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *   <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
 *   <BreadcrumbPage>Current</BreadcrumbPage>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, separator, children, ...props }, ref) => {
    const defaultSeparator = <ChevronRight />;
    const styles = breadcrumbVariants();
    const items = React.Children.toArray(children);

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn(styles.root(), className)} {...props}>
        <ol className={styles.list()}>
          {items.map((child, index) => (
            <li key={index} className={styles.item()}>
              {index > 0 && (
                <span className={styles.separator()} aria-hidden="true">
                  {separator ?? defaultSeparator}
                </span>
              )}
              {child}
            </li>
          ))}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

/* -------------------------------------------------------------------------- */
/*  BreadcrumbLink                                                             */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Additional CSS class names applied to the anchor element */
  className?: string;
  /**
   * Icon component rendered before the label (lucide-react or Heroicons).
   * Pass the component itself — Breadcrumb sizes it to 24px.
   */
  icon?: IconComponent;
}

/**
 * A clickable breadcrumb item rendered as an anchor link.
 *
 * @example
 * ```tsx
 * import { Home } from 'lucide-react';
 *
 * <BreadcrumbLink href="/" aria-label="Home" icon={Home} />
 * <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
 * ```
 */
export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, icon: Icon, children, ...props }, ref) => {
    const styles = breadcrumbVariants();
    return (
      <a ref={ref} className={cn(styles.link(), className)} {...props}>
        {Icon ? <Icon className="size-fido-ui-sm shrink-0" aria-hidden="true" /> : null}
        {children}
      </a>
    );
  },
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

/* -------------------------------------------------------------------------- */
/*  BreadcrumbPage (current page)                                              */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbPageProps {
  /** Additional CSS class names applied to the current-page span */
  className?: string;
  /**
   * Icon component rendered before the current page label (lucide-react or Heroicons).
   * Pass the component itself — Breadcrumb sizes it to 16px.
   */
  icon?: IconComponent;
  /** The label text for the current page */
  children: React.ReactNode;
}

/**
 * A non-interactive breadcrumb item representing the current page, marked with `aria-current="page"`.
 *
 * @example
 * ```tsx
 * import { LayoutGrid } from 'lucide-react';
 *
 * <BreadcrumbPage icon={LayoutGrid}>Settings</BreadcrumbPage>
 * ```
 */
export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, icon: Icon, children, ...props }, ref) => {
    const styles = breadcrumbVariants();
    return (
      <span ref={ref} aria-current="page" className={cn(styles.currentPage(), className)} {...props}>
        {Icon ? <Icon className="size-fido-ui-xs shrink-0" aria-hidden="true" /> : null}
        {children}
      </span>
    );
  },
);

BreadcrumbPage.displayName = 'BreadcrumbPage';

/* -------------------------------------------------------------------------- */
/*  BreadcrumbEllipsis (collapsed items)                                       */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbEllipsisProps {
  /** Additional CSS class names applied to the ellipsis element */
  className?: string;
  /** Callback fired when the ellipsis is clicked or activated via keyboard */
  onClick?: () => void;
}

/**
 * A placeholder breadcrumb item rendered as an ellipsis, used to represent collapsed intermediate items.
 *
 * @example
 * ```tsx
 * <BreadcrumbEllipsis onClick={() => setExpanded(true)} />
 * ```
 */
export const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  ({ className, onClick, ...props }, ref) => {
    const styles = breadcrumbVariants();
    return (
      <span
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label="Show collapsed breadcrumb items"
        className={cn(styles.ellipsis(), className)}
        onClick={onClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
        {...props}
      >
        <EllipsisIcon />
        <span className="sr-only">…</span>
      </span>
    );
  },
);

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
