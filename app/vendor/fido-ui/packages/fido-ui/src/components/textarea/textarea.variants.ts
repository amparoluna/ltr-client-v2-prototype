import { tv, type VariantProps } from 'tailwind-variants';
import {
  fieldControlStateDefault,
  fieldControlStateError,
  fieldControlStateSuccess,
  fieldError,
  fieldErrorIcon,
  fieldLabelInternal,
  fieldLabelStacked,
  fieldOptionalText,
  fieldTextP3,
  fieldTextP4,
  fieldTooltipIcon,
} from '../../utils/field-variants';

export const textareaVariants = tv(
  {
    slots: {
      root: 'group/field relative flex w-full flex-col font-fido-ui-paragraph',
      label: fieldLabelStacked,
      internalLabel: fieldLabelInternal,
      // The bordered box is a flex column: textarea on top, counter as a footer
      // row. Keeping the counter in flow (not absolute) prevents it overlapping
      // the text once the field fills up.
      controlWrapper: [
        'relative flex min-h-[70px] flex-col gap-1 rounded-fido-ui-md border bg-fido-ui-neutral-white',
        'py-2.5',
        'transition-[border-color,box-shadow,background-color] duration-150',
      ],
      control: [
        'block min-h-12 w-full resize-none overflow-y-hidden border-0 bg-transparent p-0',
        'font-fido-ui-paragraph text-fido-ui-p2 leading-fido-ui-normal text-fido-ui-neutral-700',
        'placeholder:text-fido-ui-neutral-500',
        'focus:outline-none',
      ],
      optionalText: `${fieldOptionalText} font-normal`,
      tooltipIcon: fieldTooltipIcon,
      charCount:
        'self-end font-fido-ui-paragraph text-fido-ui-p3 leading-fido-ui-normal text-fido-ui-neutral-500',
      description: 'font-fido-ui-paragraph text-fido-ui-p3 leading-fido-ui-normal text-fido-ui-neutral-500',
      error: fieldError,
      errorIcon: fieldErrorIcon,
    },
    variants: {
      labelPlacement: {
        stacked: {
          root: 'gap-fido-ui-xs',
          controlWrapper: 'px-fido-ui-lg',
          optionalText: fieldTextP3,
        },
        internal: {
          root: 'gap-fido-ui-sm',
          controlWrapper: 'gap-fido-ui-xs px-fido-ui-xl',
          optionalText: fieldTextP4,
        },
      },
      state: {
        default: {
          controlWrapper: fieldControlStateDefault,
          control: 'focus:text-fido-ui-primary-700',
        },
        filled: {
          controlWrapper: [fieldControlStateDefault, 'border-fido-ui-primary-500'],
          control: 'text-fido-ui-primary-700',
        },
        error: {
          controlWrapper: fieldControlStateError,
        },
        success: {
          controlWrapper: fieldControlStateSuccess,
        },
        disabled: {
          controlWrapper: 'border-fido-ui-neutral-200 bg-fido-ui-neutral-50',
          control: 'cursor-not-allowed text-fido-ui-neutral-500 placeholder:text-fido-ui-neutral-500',
        },
      },
    },
    defaultVariants: {
      state: 'default',
      labelPlacement: 'stacked',
    },
  },
  { twMerge: false },
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
