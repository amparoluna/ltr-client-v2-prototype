import { tv, type VariantProps } from 'tailwind-variants';
import { dropShadowSm } from '../../utils/variant-styles';

export const inputOtpVariants = tv({
  slots: {
    root: 'relative flex flex-wrap items-center gap-fido-ui-2xs font-fido-ui-paragraph cursor-text',
    group: `flex items-center gap-fido-ui-2xs ${dropShadowSm}`,
    slot: [
      'relative flex items-center justify-center',
      'size-9 rounded-fido-ui-xs text-fido-ui-p3',
      'border border-fido-ui-neutral-600 bg-fido-ui-neutral-white',
      'font-normal leading-fido-ui-normal text-fido-ui-neutral-950',
      'transition-colors duration-150',
    ],
    placeholder: 'text-fido-ui-neutral-600 opacity-50',
    cursor: 'absolute inset-y-[25%] left-1/2 w-[2px] -translate-x-1/2 bg-fido-ui-neutral-950 animate-[blink_1s_step-end_infinite]',
    separator: 'flex items-center justify-center w-3 text-fido-ui-neutral-400 select-none',
  },
  variants: {
    status: {
      default: {},
      error: {
        slot: 'border-fido-ui-destruct-600',
      },
      success: {
        slot: 'border-fido-ui-success-600',
      },
      disabled: {
        root: 'opacity-50 pointer-events-none',
        slot: 'border-fido-ui-neutral-300 bg-fido-ui-neutral-50 text-fido-ui-neutral-500',
      },
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

export type InputOtpVariants = VariantProps<typeof inputOtpVariants>;
