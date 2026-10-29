import { tv, type VariantProps } from 'tailwind-variants';
import { focusRing, focusRingDestruct } from '../../utils/variant-styles';

/**
 * FidoUI typography and color utilities share the `text-fido-ui-*` prefix, so the
 * default Tailwind merge config can mistake font-size and color classes for a
 * conflict. Keep both classes intact, as other FidoUI component variants do.
 */
export const radioGroupVariants = tv(
  {
    slots: {
      root: 'flex flex-col gap-2 font-fido-ui-paragraph',
      label: 'text-fido-ui-p3 font-bold leading-fido-ui-normal text-fido-ui-neutral-950',
      description: 'text-fido-ui-p4 text-fido-ui-neutral-500',
      error: 'text-fido-ui-p4 text-fido-ui-destruct-600',
    },
  },
  { twMerge: false },
);

export const radioVariants = tv(
  {
    slots: {
      root: [
        'relative inline-flex size-fido-ui-2xs shrink-0 items-center justify-center',
        'rounded-fido-ui-full border border-fido-ui-neutral-500 bg-fido-ui-neutral-white',
        'transition-shadow duration-150 cursor-pointer',
        'focus-visible:outline-none',
        focusRing,
        'disabled:cursor-not-allowed disabled:border-fido-ui-neutral-300 disabled:shadow-none',
      ],
      indicator: [
        'size-2 rounded-fido-ui-full bg-fido-ui-primary-700 opacity-0 data-[checked]:opacity-100',
        'data-[disabled]:bg-fido-ui-neutral-400',
      ],
      wrapper: 'inline-flex gap-fido-ui-lg',
      textWrapper: 'flex flex-col gap-fido-ui-2xs text-left',
      label:
        'font-fido-ui-heading text-fido-ui-h5 font-bold leading-fido-ui-tight text-fido-ui-neutral-950 cursor-pointer',
      description:
        'font-fido-ui-paragraph text-fido-ui-p2 font-normal leading-fido-ui-normal text-fido-ui-neutral-500',
    },
    variants: {
      container: {
        true: {
          wrapper: [
            'flex w-full rounded-fido-ui-lg border border-fido-ui-neutral-200 bg-fido-ui-neutral-white',
            'px-fido-ui-base py-fido-ui-lg',
            'has-[[data-checked]]:border-fido-ui-primary-600 has-[[data-checked]]:bg-fido-ui-neutral-50',
          ],
          textWrapper: 'flex-1',
        },
      },
      state: {
        default: {},
        error: {
          root: [
            'border-fido-ui-destruct-600 data-[checked]:border-fido-ui-destruct-600',
            focusRingDestruct,
          ],
          indicator: 'bg-fido-ui-destruct-600',
          wrapper: [
            'border-fido-ui-destruct-600',
            'has-[[data-checked]]:border-fido-ui-destruct-600 has-[[data-checked]]:bg-fido-ui-neutral-white',
          ],
        },
        disabled: {
          root: 'cursor-not-allowed border-fido-ui-neutral-300 shadow-none',
          wrapper: 'cursor-not-allowed',
          label: 'cursor-not-allowed !text-fido-ui-neutral-400',
          description: '!text-fido-ui-neutral-400',
        },
      },
    },
    defaultVariants: {
      container: false,
      state: 'default',
    },
  },
  { twMerge: false },
);

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
export type RadioVariants = VariantProps<typeof radioVariants>;
