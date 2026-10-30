import { tv, type VariantProps } from 'tailwind-variants';

export const badgeNumberVariants = tv(
  {
    // Figma "Badge Number (Status)": fixed 20px square (Size/XS), Corners/XS
    // radius, centered Paragraph/P4 text.
    base: [
      'inline-flex items-center justify-center shrink-0',
      'size-fido-ui-xs rounded-fido-ui-xs',
      'font-fido-ui-paragraph font-normal leading-fido-ui-normal text-fido-ui-p4',
      'whitespace-nowrap',
    ],
    variants: {
      color: {
        primary: '',
        secondary: '',
        info: '',
        alert: '',
        warning: '',
        success: '',
        neutral: '',
      },
      shade: {
        dark: '',
        light: '',
      },
    },
    compoundVariants: [
      // Primary
      { color: 'primary', shade: 'dark', class: 'bg-fido-ui-primary-700 text-fido-ui-neutral-white' },
      { color: 'primary', shade: 'light', class: 'bg-fido-ui-primary-100 text-fido-ui-primary-700' },
      // Secondary
      {
        color: 'secondary',
        shade: 'dark',
        class: 'bg-fido-ui-secondary-700 text-fido-ui-neutral-white',
      },
      {
        color: 'secondary',
        shade: 'light',
        class: 'bg-fido-ui-secondary-100 text-fido-ui-secondary-700',
      },
      // Info
      { color: 'info', shade: 'dark', class: 'bg-fido-ui-info-600 text-fido-ui-neutral-white' },
      { color: 'info', shade: 'light', class: 'bg-fido-ui-info-100 text-fido-ui-info-800' },
      // Alert (Figma light text is destruct/900 — one step darker than Badge)
      { color: 'alert', shade: 'dark', class: 'bg-fido-ui-alert-600 text-fido-ui-neutral-white' },
      { color: 'alert', shade: 'light', class: 'bg-fido-ui-alert-100 text-fido-ui-alert-900' },
      // Warning
      { color: 'warning', shade: 'dark', class: 'bg-fido-ui-warning-500 text-fido-ui-neutral-white' },
      { color: 'warning', shade: 'light', class: 'bg-fido-ui-warning-100 text-fido-ui-warning-700' },
      // Success (Figma light text is success/900 — one step darker than Badge)
      { color: 'success', shade: 'dark', class: 'bg-fido-ui-success-700 text-fido-ui-neutral-white' },
      { color: 'success', shade: 'light', class: 'bg-fido-ui-success-100 text-fido-ui-success-900' },
      // Neutral (Figma light surface is neutral/100, not Badge's neutral/200)
      { color: 'neutral', shade: 'dark', class: 'bg-fido-ui-neutral-700 text-fido-ui-neutral-white' },
      { color: 'neutral', shade: 'light', class: 'bg-fido-ui-neutral-100 text-fido-ui-neutral-black' },
    ],
    defaultVariants: {
      color: 'primary',
      shade: 'dark',
    },
  },
  // Preserve text-fido-ui-p4 alongside text-fido-ui-* colors (twMerge collapses text-fido-ui-*).
  {
    twMerge: false,
  },
);

export type BadgeNumberVariants = VariantProps<typeof badgeNumberVariants>;
