import { tv, type VariantProps } from 'tailwind-variants';
import {
  disabledDark,
  disabledLight,
  focusRing,
  focusRingDestruct,
} from '../../utils/variant-styles';

/**
 * Light shade outline that stays through hover/active (Figma keeps the stroke
 * on Pressed). Drawn with `outline` rather than `border` so the 1px stroke does
 * not add to the button's height.
 */
const lightOutline = 'outline outline-1 -outline-offset-1';

/** Figma's Ghost/Focus variant sits on an opaque white fill behind the ring. */
const ghostFocusFill = 'focus-visible:bg-fido-ui-neutral-white';

export const buttonVariants = tv(
  {
    base: [
      'inline-flex items-center justify-center gap-fido-ui-xs',
      'font-bold',
      'rounded-fido-ui-md transition-colors duration-150',
      'disabled:pointer-events-none',
    ],
    variants: {
      color: {
        primary: '',
        secondary: '',
        neutral: '',
        destruct: '',
      },
      shade: {
        dark: '',
        light: '',
        ghost: '',
      },
      size: {
        // Figma Size=MD: Spacing/BASE (16px) × Spacing/MD (10px), Heading/H5 Bold
        md: 'px-fido-ui-base py-fido-ui-md font-fido-ui-heading text-fido-ui-h5 leading-fido-ui-tight',
        // Figma Size=SM: Spacing/LG (12px) × Spacing/XS (6px), Paragraph/P3 Bold
        sm: 'px-fido-ui-lg py-fido-ui-xs font-fido-ui-paragraph text-fido-ui-p3 leading-fido-ui-normal',
      },
    },
    compoundVariants: [
      // Figma models Enabled / Focus / Pressed / Disabled but has no Hover state,
      // so `hover:` reuses the Focus appearance (minus the ring) and `active:`
      // maps to Pressed. Ghost hover keeps its own tint since Figma's Ghost/Focus
      // fill is white, which would read as no feedback on a light page.

      // --- Primary ---
      {
        color: 'primary',
        shade: 'dark',
        class: `bg-fido-ui-primary-700 text-fido-ui-neutral-white hover:bg-fido-ui-primary-800 focus-visible:bg-fido-ui-primary-800 active:bg-fido-ui-primary-900 ${focusRing}`,
      },
      {
        color: 'primary',
        shade: 'light',
        class: `${lightOutline} bg-fido-ui-primary-50 outline-fido-ui-primary-300 text-fido-ui-primary-700 hover:bg-fido-ui-primary-100 hover:outline-fido-ui-primary-700 focus-visible:bg-fido-ui-primary-100 focus-visible:outline-fido-ui-primary-700 active:bg-fido-ui-primary-200 active:outline-fido-ui-primary-700 ${focusRing}`,
      },
      {
        color: 'primary',
        shade: 'ghost',
        class: `text-fido-ui-primary-700 hover:bg-fido-ui-primary-50 active:bg-fido-ui-primary-100 ${ghostFocusFill} ${focusRing}`,
      },

      // --- Secondary ---
      {
        color: 'secondary',
        shade: 'dark',
        class: `bg-fido-ui-secondary-700 text-fido-ui-neutral-white hover:bg-fido-ui-secondary-800 focus-visible:bg-fido-ui-secondary-800 active:bg-fido-ui-secondary-900 ${focusRing}`,
      },
      {
        color: 'secondary',
        shade: 'light',
        class: `${lightOutline} bg-fido-ui-secondary-50 outline-fido-ui-secondary-300 text-fido-ui-secondary-700 hover:bg-fido-ui-secondary-100 hover:outline-fido-ui-secondary-400 focus-visible:bg-fido-ui-secondary-100 focus-visible:outline-fido-ui-secondary-400 active:bg-fido-ui-secondary-200 active:outline-fido-ui-secondary-700 ${focusRing}`,
      },
      {
        color: 'secondary',
        shade: 'ghost',
        class: `text-fido-ui-secondary-700 hover:bg-fido-ui-secondary-50 active:bg-fido-ui-secondary-100 ${ghostFocusFill} ${focusRing}`,
      },

      // --- Neutral ---
      {
        color: 'neutral',
        shade: 'dark',
        class: `bg-fido-ui-neutral-600 text-fido-ui-neutral-white hover:bg-fido-ui-neutral-700 focus-visible:bg-fido-ui-neutral-700 active:bg-fido-ui-neutral-black ${focusRing}`,
      },
      {
        color: 'neutral',
        shade: 'light',
        class: `${lightOutline} bg-fido-ui-neutral-50 outline-fido-ui-neutral-300 text-fido-ui-neutral-700 hover:bg-fido-ui-neutral-100 hover:outline-fido-ui-neutral-400 focus-visible:bg-fido-ui-neutral-100 focus-visible:outline-fido-ui-neutral-400 active:bg-fido-ui-neutral-200 active:outline-fido-ui-neutral-400 ${focusRing}`,
      },
      {
        color: 'neutral',
        shade: 'ghost',
        class: `text-fido-ui-neutral-700 hover:bg-fido-ui-neutral-50 active:bg-fido-ui-neutral-100 ${ghostFocusFill} ${focusRing}`,
      },

      // --- Destruct ---
      {
        color: 'destruct',
        shade: 'dark',
        class: `bg-fido-ui-destruct-600 text-fido-ui-neutral-white hover:bg-fido-ui-destruct-700 focus-visible:bg-fido-ui-destruct-700 active:bg-fido-ui-destruct-900 ${focusRingDestruct}`,
      },
      {
        // Figma's Destruct/Light Focus keeps the 50 fill and only darkens the stroke.
        color: 'destruct',
        shade: 'light',
        class: `${lightOutline} bg-fido-ui-destruct-50 outline-fido-ui-destruct-300 text-fido-ui-destruct-900 hover:outline-fido-ui-destruct-400 focus-visible:outline-fido-ui-destruct-400 active:bg-fido-ui-destruct-200 active:outline-fido-ui-destruct-600 ${focusRingDestruct}`,
      },
      {
        color: 'destruct',
        shade: 'ghost',
        class: `text-fido-ui-destruct-900 hover:bg-fido-ui-destruct-50 active:bg-fido-ui-destruct-100 ${ghostFocusFill} ${focusRingDestruct}`,
      },

      // --- Focus outline suppression (shades without a visible border) ---
      {
        shade: 'dark',
        class: 'focus-visible:outline-none',
      },
      {
        shade: 'ghost',
        class: 'focus-visible:outline-none',
      },

      // --- Disabled ---
      {
        shade: 'dark',
        class: disabledDark,
      },
      {
        shade: 'light',
        class: disabledLight,
      },
      {
        shade: 'ghost',
        class: 'disabled:bg-transparent disabled:text-fido-ui-neutral-500',
      },
    ],
    defaultVariants: {
      color: 'primary',
      shade: 'dark',
      size: 'md',
    },
  },
  // Preserve text-fido-ui-h5/p3 + text-fido-ui-neutral-* (twMerge collapses text-fido-ui-*).
  {
    twMerge: false,
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
