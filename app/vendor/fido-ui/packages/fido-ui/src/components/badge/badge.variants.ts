import { tv, type VariantProps } from 'tailwind-variants';

export const badgeVariants = tv(
  {
    base: [
      'inline-flex items-center justify-center',
      'font-fido-ui-paragraph font-normal leading-fido-ui-tight',
      'rounded-fido-ui-full whitespace-nowrap',
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
      size: {
        // Figma Size=LG: Size/SM height (24px), Spacing/XS vertical padding, 2XS gap, Paragraph/P3
        lg: 'h-fido-ui-sm gap-fido-ui-2xs py-fido-ui-xs text-fido-ui-p3',
        // Figma Size=MED: Size/XS height (20px), Spacing/XS vertical padding, 2px gap, Paragraph/P4
        md: 'h-fido-ui-xs gap-[2px] py-fido-ui-xs text-fido-ui-p4',
        // Figma Size=SM: 18px tall, Spacing/2XS vertical padding, 2px gap, Paragraph/P5.
        // 18px and the 2px gap sit between steps on the size/spacing scales, so
        // they stay literal until Figma promotes them to tokens.
        sm: 'h-[18px] gap-[2px] py-fido-ui-2xs text-fido-ui-p5',
      },
      // Figma Icon=Left / Icon=Right tighten the padding on whichever side holds
      // the icon. Internal only — derived from the icon props, not set by consumers.
      leadingIcon: { true: '', false: '' },
      trailingIcon: { true: '', false: '' },
    },
    compoundVariants: [
      // ---- Horizontal padding (per size, tighter on the icon side) ----------
      { size: 'lg', leadingIcon: false, class: 'pl-fido-ui-md' },
      { size: 'lg', leadingIcon: true, class: 'pl-fido-ui-xs' },
      { size: 'lg', trailingIcon: false, class: 'pr-fido-ui-md' },
      { size: 'lg', trailingIcon: true, class: 'pr-fido-ui-xs' },
      { size: ['md', 'sm'], leadingIcon: false, class: 'pl-fido-ui-sm' },
      { size: ['md', 'sm'], leadingIcon: true, class: 'pl-fido-ui-2xs' },
      { size: ['md', 'sm'], trailingIcon: false, class: 'pr-fido-ui-sm' },
      { size: ['md', 'sm'], trailingIcon: true, class: 'pr-fido-ui-2xs' },

      // ---- Colors ----------------------------------------------------------
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
      // Alert
      { color: 'alert', shade: 'dark', class: 'bg-fido-ui-alert-600 text-fido-ui-neutral-white' },
      { color: 'alert', shade: 'light', class: 'bg-fido-ui-alert-100 text-fido-ui-alert-800' },
      // Warning
      { color: 'warning', shade: 'dark', class: 'bg-fido-ui-warning-500 text-fido-ui-neutral-white' },
      { color: 'warning', shade: 'light', class: 'bg-fido-ui-warning-100 text-fido-ui-warning-700' },
      // Success
      { color: 'success', shade: 'dark', class: 'bg-fido-ui-success-700 text-fido-ui-neutral-white' },
      { color: 'success', shade: 'light', class: 'bg-fido-ui-success-100 text-fido-ui-success-800' },
      // Neutral
      { color: 'neutral', shade: 'dark', class: 'bg-fido-ui-neutral-700 text-fido-ui-neutral-white' },
      { color: 'neutral', shade: 'light', class: 'bg-fido-ui-neutral-200 text-fido-ui-neutral-black' },
    ],
    defaultVariants: {
      color: 'primary',
      shade: 'dark',
      size: 'lg',
      leadingIcon: false,
      trailingIcon: false,
    },
  },
  // Preserve text-fido-ui-p3/p4/p5 alongside text-fido-ui-* colors (twMerge collapses text-fido-ui-*).
  {
    twMerge: false,
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
