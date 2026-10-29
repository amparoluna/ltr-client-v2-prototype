import { tv, type VariantProps } from 'tailwind-variants';
import { focusRing, focusRingDestruct } from '../../utils/variant-styles';

export const checkboxVariants = tv({
  slots: {
    root: [
      'relative inline-flex size-fido-ui-xs shrink-0 items-center justify-center',
      'rounded-fido-ui-xs border border-fido-ui-neutral-600 bg-fido-ui-neutral-white',
      'transition-colors duration-150 cursor-pointer',
      'focus-visible:outline-none',
      focusRing,
      'data-[unchecked]:hover:bg-fido-ui-neutral-100 data-[unchecked]:hover:shadow-[0_0_0_3px_rgba(212,212,212,0.8)]',
      'data-[checked]:hover:shadow-[0_0_0_3px_rgba(212,212,212,0.8)]',
      'data-[checked]:bg-fido-ui-primary-800 data-[checked]:border-fido-ui-primary-800',
      'data-[checked]:text-fido-ui-neutral-white',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
    ],
    indicator: 'absolute inset-0 flex items-center justify-center text-current opacity-0 data-[checked]:opacity-100',
    label: 'font-fido-ui-paragraph text-fido-ui-p3 font-normal leading-fido-ui-normal text-fido-ui-neutral-950 cursor-pointer',
    wrapper: 'inline-flex items-center gap-fido-ui-xs',
    error: 'mt-1 text-fido-ui-p3 text-fido-ui-destruct-600',
  },
  variants: {
    container: {
      true: {
        wrapper: [
          'rounded-fido-ui-sm border border-fido-ui-neutral-300 bg-fido-ui-neutral-white',
          'px-fido-ui-md py-fido-ui-xs',
          'has-[[data-checked]]:border-fido-ui-primary-700',
          'has-[[data-disabled]]:bg-fido-ui-neutral-100 has-[[data-disabled]]:opacity-50',
        ],
      },
    },
    state: {
      default: {},
      error: {
        root: [
          'border-fido-ui-destruct-600 data-[checked]:border-fido-ui-destruct-600 data-[checked]:bg-fido-ui-destruct-600',
          focusRingDestruct,
          'data-[unchecked]:hover:bg-fido-ui-neutral-white data-[unchecked]:hover:shadow-[0_0_0_3px_rgba(210,50,40,0.3)]',
          'data-[checked]:hover:shadow-[0_0_0_3px_rgba(210,50,40,0.3)]',
        ],
        label: 'text-fido-ui-destruct-600',
        wrapper: 'has-[[data-checked]]:border-fido-ui-destruct-600',
      },
      disabled: {
        root: 'cursor-not-allowed opacity-50 shadow-none',
        label: 'opacity-50',
      },
    },
  },
  defaultVariants: {
    container: false,
    state: 'default',
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
