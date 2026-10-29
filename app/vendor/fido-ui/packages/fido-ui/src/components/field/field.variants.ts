import { tv, type VariantProps } from 'tailwind-variants';
import {
  fieldControlBox,
  fieldControlBoxStacked,
  fieldControlStateDefault,
  fieldControlStateDisabled,
  fieldControlStateError,
  fieldControlStateSuccess,
  fieldDescription,
  fieldError,
  fieldErrorIcon,
  fieldLabelInternal,
  fieldLabelStacked,
  fieldOptionalText,
  fieldRootDisabled,
  fieldTextP3,
  fieldTextP4,
  fieldTooltipIcon,
} from '../../utils/field-variants';

/**
 * Field chrome: label, control box, adornments, description, and error.
 * Matches FidoUI DS Field anatomy (stacked / internal) from Figma.
 * The boxed control neutralizes nested Input chrome to avoid double borders.
 * `action` sits outside the box in the Field + Btn row.
 */
export const fieldVariants = tv(
  {
    slots: {
      root: 'group/field relative flex flex-col font-fido-ui-paragraph',
      label: fieldLabelStacked,
      internalLabel: fieldLabelInternal,
      optionalText: fieldOptionalText,
      tooltipIcon: fieldTooltipIcon,
      /** Field + optional external button row (Figma: Field + Btn). */
      controlRow: 'flex w-full items-center gap-fido-ui-lg',
      container: [
        fieldControlBox,
        'min-w-0 flex-1',
        // Nested Input is already a styled primitive — strip its chrome inside Field.
        '[&_input]:border-0 [&_input]:bg-transparent [&_input]:shadow-none',
        '[&_input]:h-[18px] [&_input]:min-h-0 [&_input]:rounded-none [&_input]:px-0 [&_input]:py-0',
        '[&_input]:focus-visible:shadow-none',
      ].join(' '),
      content: 'flex min-w-0 flex-1 flex-col items-stretch justify-center',
      icon: 'inline-flex shrink-0 items-center justify-center bg-fido-ui-neutral-100 text-fido-ui-neutral-600',
      fileAction: 'inline-flex shrink-0 items-center',
      prefix: `${fieldTextP3} shrink-0 text-fido-ui-neutral-500 whitespace-nowrap`,
      badgeSlot: 'inline-flex shrink-0 items-center',
      trailingIcon: 'inline-flex shrink-0 items-center justify-center text-fido-ui-neutral-600',
      suffix: 'inline-flex shrink-0 items-center gap-fido-ui-md self-stretch',
      suffixDivider: 'w-px self-stretch bg-fido-ui-neutral-300',
      suffixText: 'text-fido-ui-p2 leading-fido-ui-normal text-fido-ui-neutral-500 whitespace-nowrap',
      controlSlot: 'inline-flex shrink-0 items-center justify-center text-fido-ui-neutral-600',
      actionSlot: 'inline-flex shrink-0 items-center',
      description: fieldDescription,
      error: fieldError,
      errorIcon: fieldErrorIcon,
      validationList: 'm-0 flex list-none flex-col gap-0.5 p-0',
      validationItem: `flex items-center gap-2 ${fieldTextP3} text-fido-ui-neutral-800`,
      validationIcon: 'inline-flex shrink-0 items-center justify-center text-fido-ui-destruct-600',
    },
    variants: {
      labelPlacement: {
        stacked: {
          root: 'gap-fido-ui-xs',
          container: fieldControlBoxStacked,
          content: 'gap-0',
          optionalText: fieldTextP3,
          icon: 'h-[21px] w-5 rounded-[2px]',
        },
        internal: {
          root: 'gap-fido-ui-sm',
          container: 'h-[50px] gap-fido-ui-sm px-fido-ui-md',
          content: 'gap-fido-ui-2xs',
          optionalText: fieldTextP4,
          icon: 'size-8 rounded-fido-ui-xs',
        },
      },
      state: {
        default: {
          container: [
            fieldControlStateDefault,
            'has-[input:not(:placeholder-shown)]:border-fido-ui-primary-500',
          ].join(' '),
        },
        error: {
          container: fieldControlStateError,
        },
        success: {
          container: fieldControlStateSuccess,
        },
        disabled: {
          root: fieldRootDisabled,
          container: fieldControlStateDisabled,
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

export type FieldVariants = VariantProps<typeof fieldVariants>;
