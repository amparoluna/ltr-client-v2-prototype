import { tv, type VariantProps } from 'tailwind-variants';

/**
 * Inline status feedback: leading type icon + label.
 * Root colors the decorative icon; the label owns typography and its own text color.
 */
export const helperTextVariants = tv(
  {
    base: ['inline-flex min-w-0 items-start gap-fido-ui-xs'],
    variants: {
      type: {
        default: 'text-fido-ui-neutral-700',
        inform: 'text-fido-ui-info-600',
        error: 'text-fido-ui-destruct-600',
        success: 'text-fido-ui-success-600',
        warn: 'text-fido-ui-warning-500',
        loading: 'text-fido-ui-neutral-700',
      },
    },
    defaultVariants: {
      type: 'default',
    },
  },
  {
    twMerge: false,
  },
);

/**
 * Label typography plus accessible text colors; decorative icons keep the exact
 * Figma status colors. Typography sits on the same element that establishes the
 * line box so the label's first line stays aligned with the leading icon.
 */
export const helperTextLabelVariants = tv(
  {
    base: [
      'min-w-0 flex-1 break-words',
      'font-fido-ui-paragraph font-normal text-fido-ui-p3 leading-fido-ui-normal',
    ],
    variants: {
      type: {
        default: 'text-fido-ui-neutral-700',
        inform: 'text-fido-ui-info-700',
        error: 'text-fido-ui-destruct-600',
        success: 'text-fido-ui-success-700',
        warn: 'text-fido-ui-warning-700',
        loading: 'text-fido-ui-neutral-700',
      },
    },
    defaultVariants: {
      type: 'default',
    },
  },
  {
    twMerge: false,
  },
);

export type HelperTextVariants = VariantProps<typeof helperTextVariants>;
