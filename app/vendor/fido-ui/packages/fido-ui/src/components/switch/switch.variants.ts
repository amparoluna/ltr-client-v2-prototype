import { tv, type VariantProps } from 'tailwind-variants';
import { focusRing, focusRingDestruct } from '../../utils/variant-styles';

export const switchVariants = tv({
  slots: {
    // Track: 30×16. The 1px border and inset keep the 12px thumb visually
    // centered and preserve geometry when error styling adds a visible border.
    root: [
      'relative inline-flex h-4 w-[30px] shrink-0 cursor-pointer items-center',
      'rounded-fido-ui-full border border-transparent p-px transition-colors duration-200',
      'data-[checked]:bg-fido-ui-primary-700 data-[unchecked]:bg-fido-ui-neutral-400',
      'focus-visible:outline-none',
      focusRing,
      'disabled:cursor-not-allowed disabled:bg-fido-ui-neutral-100 disabled:opacity-50 disabled:shadow-none',
    ],
    thumb: [
      'pointer-events-none block size-3 rounded-fido-ui-full bg-fido-ui-neutral-white',
      'transition-transform duration-200',
      'data-[checked]:translate-x-[14px] data-[unchecked]:translate-x-0',
    ],
    label: [
      'font-fido-ui-paragraph text-fido-ui-p3 leading-fido-ui-normal',
      'w-full text-fido-ui-neutral-900',
    ],
    description: [
      'w-full font-fido-ui-paragraph text-fido-ui-p3 leading-fido-ui-normal',
      'text-fido-ui-neutral-500',
    ],
    control: 'flex shrink-0 pt-0.5',
    content: 'flex min-w-0 flex-1 flex-col items-start',
    wrapper: 'inline-flex items-start gap-fido-ui-lg',
  },
  variants: {
    status: {
      default: {},
      error: {
        // On: filled red. Off: white track with a red border and a red thumb so
        // it stays visible against the white track.
        root: [
          'data-[checked]:bg-fido-ui-destruct-600',
          'data-[unchecked]:bg-fido-ui-neutral-white data-[unchecked]:border-fido-ui-destruct-600',
          focusRingDestruct,
        ],
        thumb: 'data-[unchecked]:bg-fido-ui-destruct-600',
      },
      disabled: {
        root: 'cursor-not-allowed opacity-50',
        label: 'opacity-50',
        description: 'opacity-50',
      },
    },
    container: {
      true: {
        wrapper: [
          'w-full rounded-fido-ui-md border border-fido-ui-neutral-200 bg-fido-ui-neutral-white',
          'px-fido-ui-base py-fido-ui-lg',
        ],
      },
    },
    labelPlacement: {
      start: {
        wrapper: 'w-full flex-row-reverse justify-between',
      },
      end: {},
    },
  },
  defaultVariants: {
    status: 'default',
    container: false,
    labelPlacement: 'end',
  },
});

export type SwitchVariants = VariantProps<typeof switchVariants>;
