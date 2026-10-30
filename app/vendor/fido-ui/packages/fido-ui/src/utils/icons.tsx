import * as React from 'react';
import { cn } from './cn';

/**
 * Decorative "X" / close icon (always `aria-hidden` — it lives inside controls
 * that carry their own accessible label). Size it via `className`, e.g.
 * `size-4` (defaults to 16px).
 */
export const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('size-4', className)}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L4 12M4 4l8 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Decorative outlined info circle (`aria-hidden`). Used next to field labels to
 * anchor a tooltip; renders at 12px and inherits `currentColor`.
 */
export const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 6.5v3m0-5h.005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Decorative outlined error circle with an inner X (`aria-hidden`). Used in field
 * error rows; inherits `currentColor`. Size via `className`.
 */
export const ErrorIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.33333 1.66667C4.65143 1.66667 1.66667 4.65143 1.66667 8.33333C1.66667 12.0152 4.65143 15 8.33333 15C12.0152 15 15 12.0152 15 8.33333C15 4.65143 12.0152 1.66667 8.33333 1.66667ZM0 8.33333C0 3.73096 3.73096 0 8.33333 0C12.9357 0 16.6667 3.73096 16.6667 8.33333C16.6667 12.9357 12.9357 16.6667 8.33333 16.6667C3.73096 16.6667 0 12.9357 0 8.33333ZM6.07741 6.07741C6.40285 5.75197 6.93049 5.75197 7.25592 6.07741L8.33333 7.15482L9.41074 6.07741C9.73618 5.75197 10.2638 5.75197 10.5893 6.07741C10.9147 6.40285 10.9147 6.93049 10.5893 7.25592L9.51184 8.33333L10.5893 9.41074C10.9147 9.73618 10.9147 10.2638 10.5893 10.5893C10.2638 10.9147 9.73618 10.9147 9.41074 10.5893L8.33333 9.51184L7.25592 10.5893C6.93049 10.9147 6.40285 10.9147 6.07741 10.5893C5.75197 10.2638 5.75197 9.73618 6.07741 9.41074L7.15482 8.33333L6.07741 7.25592C5.75197 6.93049 5.75197 6.40285 6.07741 6.07741Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Decorative upload tray + arrow (`aria-hidden`). Used by DragDrop; inherits
 * `currentColor`. Figma: Icon / Upload. Size via `className` (defaults to ~27px).
 */
export const UploadIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('size-[26.67px]', className)}
    viewBox="0 0 26.6667 26.6664"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M0 22.6664V17.333C0 16.5966 0.596954 15.9997 1.33333 15.9997C2.06971 15.9997 2.66667 16.5966 2.66667 17.333V22.6664C2.66667 23.02 2.80724 23.359 3.05729 23.6091C3.30734 23.8591 3.64638 23.9997 4 23.9997H22.6667C23.0203 23.9997 23.3593 23.8591 23.6094 23.6091C23.8594 23.359 24 23.02 24 22.6664V17.333C24 16.5966 24.597 15.9997 25.3333 15.9997C26.0697 15.9997 26.6667 16.5966 26.6667 17.333V22.6664C26.6667 23.7272 26.2449 24.7443 25.4948 25.4945C24.7446 26.2446 23.7275 26.6664 22.6667 26.6664H4C2.93913 26.6664 1.92202 26.2446 1.17187 25.4945C0.42173 24.7443 0 23.7272 0 22.6664ZM12 17.333V4.55177L7.60937 8.9424C7.08868 9.46309 6.24466 9.46309 5.72396 8.9424C5.20326 8.4217 5.20326 7.57768 5.72396 7.05698L12.3906 0.390313L12.4922 0.299167C13.0159 -0.127967 13.7879 -0.0978421 14.276 0.390313L20.9427 7.05698C21.4634 7.57768 21.4634 8.4217 20.9427 8.9424C20.422 9.46309 19.578 9.46309 19.0573 8.9424L14.6667 4.55177V17.333C14.6667 18.0694 14.0697 18.6664 13.3333 18.6664C12.597 18.6664 12 18.0694 12 17.333Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Decorative chevron pointing down (`aria-hidden`). Used as the open/close
 * affordance on select-like triggers; renders at 18px and inherits
 * `currentColor`. Size via `className`.
 */
export const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('size-4.5', className)}
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 6.75L9 11.25L13.5 6.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Decorative "X" used to clear an input's value (`aria-hidden`). Renders at 14px
 * and inherits `currentColor`. Size via `className`.
 */
export const ClearIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('size-3.5', className)}
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Checkbox-style selection indicator: an empty square that fills with the brand
 * color and shows a white check when its group is `data-selected`. Pass through
 * `className` to size/position it. Used by Combobox / Select items.
 */
export const CheckboxIcon = ({ className }: { className?: string }) => (
  <span
    className={cn(
      'shrink-0 size-4 rounded-[4px] border border-fido-ui-neutral-500 inline-flex items-center justify-center',
      'group-data-selected:bg-fido-ui-primary-700 group-data-selected:border-fido-ui-primary-700',
      className,
    )}
  >
    <svg
      className="hidden group-data-selected:block text-white"
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 1L3.5 6.5L1 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

/**
 * Checkmark-style selection indicator: a brand-colored check that is only
 * visible when its group is `data-selected` (no box). Pass through `className`
 * to size/position it. Used by Combobox / Select items.
 */
export const CheckmarkIcon = ({ className }: { className?: string }) => (
  <span
    className={cn(
      'shrink-0 size-4 inline-flex items-center justify-center opacity-0 group-data-selected:opacity-100 text-fido-ui-primary-700',
      className,
    )}
  >
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
      <path
        d="M11 1L4 8L1 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

/**
 * Trailing dismiss control shared by Badge and Pill. Renders an X button with
 * an accessible "Dismiss" label; pass `onClick` to handle dismissal. Use
 * `iconClassName` to size the icon (defaults to 16px).
 */
export const DismissButton = ({
  onClick,
  iconClassName,
}: {
  onClick?: () => void;
  iconClassName?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Dismiss"
    className="inline-flex shrink-0 cursor-pointer opacity-70 hover:opacity-100"
  >
    <CloseIcon className={iconClassName} />
  </button>
);
