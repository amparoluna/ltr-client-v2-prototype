import { tv, type VariantProps } from 'tailwind-variants';
import {
  fieldControlStateDefault,
  fieldControlStateDisabled,
  fieldControlStateError,
  fieldControlStateSuccess,
  fieldRootDisabled,
} from '../../utils/field-variants';

/**
 * Bare styled Input primitive — no label, helper, or adornments.
 * Use with `Field` for the integrated form-field chrome.
 */
export const inputVariants = tv(
  {
    base: [
      'flex w-full items-center rounded-fido-ui-sm border bg-fido-ui-neutral-white',
      'h-10 px-fido-ui-lg',
      'font-fido-ui-paragraph text-fido-ui-p2 leading-fido-ui-normal text-fido-ui-neutral-500',
      'placeholder:text-fido-ui-neutral-500',
      'transition-[border-color,box-shadow,background-color] duration-150',
      'focus:outline-none',
    ],
    variants: {
      state: {
        default: [
          fieldControlStateDefault,
          'not-placeholder-shown:border-fido-ui-primary-500',
          'not-placeholder-shown:text-fido-ui-primary-700',
        ].join(' '),
        error: [
          fieldControlStateError,
          'text-fido-ui-neutral-500',
        ].join(' '),
        success: [
          fieldControlStateSuccess,
          'not-placeholder-shown:text-fido-ui-primary-700',
        ].join(' '),
        disabled: [
          fieldRootDisabled,
          fieldControlStateDisabled,
          'text-fido-ui-neutral-500',
        ].join(' '),
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
  { twMerge: false },
);

export type InputVariants = VariantProps<typeof inputVariants>;
