import { tv, type VariantProps } from 'tailwind-variants';
import { focusRing, focusRingDestruct } from '../../utils/variant-styles';

/**
 * Light shade outline that does not clear on hover/active (Figma keeps the
 * stroke through Focus and Pressed).
 */
const lightOutline = 'outline outline-1 -outline-offset-1';
/**
 * Circular, icon-only control styling by `color` × `shade` × state.
 * Maps Figma Icon Button (Color × Shade × State): Primary / Secondary /
 * Neutral / Destruct × Dark / Light / Ghost.
 */
export const iconButtonVariants = tv({
  base: [
    'inline-flex items-center justify-center',
    // Figma Icon Button is a fixed 56×56 circle (size-14) with spacing/base
    // padding (Primary `--spacing-fido-ui-xl` = 20px).
    'size-14 p-fido-ui-xl',
    'rounded-fido-ui-full transition-colors duration-150',
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
  },
  compoundVariants: [
    // --- Primary ---
    {
      color: 'primary',
      shade: 'dark',
      class: `bg-fido-ui-primary-700 text-fido-ui-neutral-white hover:bg-fido-ui-primary-800 active:bg-fido-ui-primary-900 ${focusRing}`,
    },
    {
      color: 'primary',
      shade: 'light',
      class: `${lightOutline} bg-fido-ui-primary-50 outline-fido-ui-primary-500 text-fido-ui-primary-700 hover:bg-fido-ui-primary-100 hover:outline-fido-ui-primary-700 active:bg-fido-ui-primary-200 active:outline-fido-ui-primary-700 ${focusRing}`,
    },
    {
      color: 'primary',
      shade: 'ghost',
      class: `text-fido-ui-primary-700 hover:bg-fido-ui-primary-50 active:bg-fido-ui-primary-100 ${focusRing}`,
    },

    // --- Secondary ---
    {
      color: 'secondary',
      shade: 'dark',
      class: `bg-fido-ui-secondary-700 text-fido-ui-neutral-white hover:bg-fido-ui-secondary-800 active:bg-fido-ui-secondary-900 ${focusRing}`,
    },
    {
      color: 'secondary',
      shade: 'light',
      class: `${lightOutline} bg-fido-ui-secondary-50 outline-fido-ui-secondary-500 text-fido-ui-secondary-700 hover:bg-fido-ui-secondary-100 hover:outline-fido-ui-secondary-700 active:bg-fido-ui-secondary-200 active:outline-fido-ui-secondary-700 ${focusRing}`,
    },
    {
      color: 'secondary',
      shade: 'ghost',
      class: `text-fido-ui-secondary-700 hover:bg-fido-ui-secondary-50 active:bg-fido-ui-secondary-100 ${focusRing}`,
    },

    // --- Neutral ---
    {
      color: 'neutral',
      shade: 'dark',
      class: `bg-fido-ui-neutral-600 text-fido-ui-neutral-white hover:bg-fido-ui-neutral-700 active:bg-fido-ui-neutral-black ${focusRing}`,
    },
    {
      color: 'neutral',
      shade: 'light',
      class: `${lightOutline} bg-fido-ui-neutral-50 outline-fido-ui-neutral-400 text-fido-ui-neutral-700 hover:bg-fido-ui-neutral-100 hover:outline-fido-ui-neutral-700 active:bg-fido-ui-neutral-200 active:outline-fido-ui-neutral-700 ${focusRing}`,
    },
    {
      color: 'neutral',
      shade: 'ghost',
      class: `text-fido-ui-neutral-700 hover:bg-fido-ui-neutral-50 active:bg-fido-ui-neutral-100 ${focusRing}`,
    },

    // --- Destruct ---
    {
      color: 'destruct',
      shade: 'dark',
      class: `bg-fido-ui-destruct-600 text-fido-ui-neutral-white hover:bg-fido-ui-destruct-700 active:bg-fido-ui-destruct-900 ${focusRingDestruct}`,
    },
    {
      color: 'destruct',
      shade: 'light',
      class: `${lightOutline} bg-fido-ui-destruct-50 outline-fido-ui-destruct-700 text-fido-ui-destruct-700 hover:bg-fido-ui-destruct-100 active:bg-fido-ui-destruct-200 ${focusRingDestruct}`,
    },
    {
      color: 'destruct',
      shade: 'ghost',
      class: `text-fido-ui-destruct-700 hover:bg-fido-ui-destruct-50 active:bg-fido-ui-destruct-100 ${focusRingDestruct}`,
    },

    // --- Focus outline suppression (shades without a visible border) ---
    // Light shades keep the native outline fallback. Dark/ghost rely on the
    // box-shadow focus ring, so suppress the browser's default focus outline.
    {
      shade: 'dark',
      class: 'focus-visible:outline-none',
    },
    {
      shade: 'ghost',
      class: 'focus-visible:outline-none',
    },

    // --- Disabled (Figma: neutral-100 fill / grey icon; light keeps border) ---
    {
      shade: 'dark',
      class: 'disabled:bg-fido-ui-neutral-100 disabled:text-fido-ui-neutral-400',
    },
    {
      shade: 'light',
      class:
        'disabled:bg-fido-ui-neutral-100 disabled:text-fido-ui-neutral-400 disabled:outline-fido-ui-neutral-300',
    },
    {
      shade: 'ghost',
      class: 'disabled:bg-transparent disabled:text-fido-ui-neutral-400',
    },
  ],
  defaultVariants: {
    color: 'primary',
    shade: 'dark',
  },
});

export type IconButtonVariants = VariantProps<typeof iconButtonVariants>;
