'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../button';
import { paginationVariants } from './pagination.variants';
import { cn } from '../../utils/cn';

const EllipsisIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53976 10.4602 9.16667 10 9.16667C9.53976 9.16667 9.16667 9.53976 9.16667 10C9.16667 10.4602 9.53976 10.8333 10 10.8333Z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.8333 10.8333C16.2936 10.8333 16.6667 10.4602 16.6667 10C16.6667 9.53976 16.2936 9.16667 15.8333 9.16667C15.3731 9.16667 15 9.53976 15 10C15 10.4602 15.3731 10.8333 15.8333 10.8333Z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.16667 10.8333C4.6269 10.8333 5 10.4602 5 10C5 9.53976 4.6269 9.16667 4.16667 9.16667C3.70643 9.16667 3.33333 9.53976 3.33333 10C3.33333 10.4602 3.70643 10.8333 4.16667 10.8333Z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface PaginationProps {
  /** The current active page number (1-based) */
  page: number;
  /** Total number of pages available */
  totalPages: number;
  /** Callback invoked when the user navigates to a different page */
  onPageChange: (page: number) => void;
  /** Number of page buttons to show on each side of the current page (default: 1) */
  siblingCount?: number;
  /** Additional CSS class applied to the root nav element */
  className?: string;
}

function getPageRange(page: number, totalPages: number, siblingCount: number): (number | 'ellipsis')[] {
  const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
  const totalBlocks = totalNumbers + 2; // + 2 for ellipses

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1,
    );
    return [1, 'ellipsis', ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i,
  );
  return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
}

/**
 * A pagination navigation component with previous/next buttons, page numbers,
 * and ellipsis indicators for large page ranges.
 *
 * @example
 * ```tsx
 * <Pagination page={3} totalPages={10} onPageChange={(p) => setPage(p)} />
 * ```
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, page, totalPages, onPageChange, siblingCount = 1, ...props }, ref) => {
    const styles = paginationVariants();
    const pages = getPageRange(page, totalPages, siblingCount);

    return (
      <nav ref={ref} aria-label="Pagination" className={cn(styles.root(), className)} {...props}>
        <Button
          color="neutral"
          shade="ghost"
          size="sm"
          leftIcon={ChevronLeft}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          Previous
        </Button>
        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`ellipsis-${i}`} className={styles.ellipsis()}>
              <EllipsisIcon />
              <span className="sr-only">&hellip;</span>
            </span>
          ) : (
            <button
              key={p}
              className={p === page ? styles.itemActive() : styles.item()}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
              aria-label={`Page ${p}`}
            >
              {p}
            </button>
          ),
        )}
        <Button
          color="neutral"
          shade="ghost"
          size="sm"
          rightIcon={ChevronRight}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          Next
        </Button>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
