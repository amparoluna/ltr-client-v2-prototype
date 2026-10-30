import { tv, type VariantProps } from 'tailwind-variants';
import {
  fieldControlBox,
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
 * Select field chrome matches Field / Textarea label placements (stacked /
 * internal) and shared control-box / helper tokens from `field-variants`.
 *
 * Focus / open rings use the same Figma Focal Ring values as Field until
 * dedicated FidoUI shadow tokens exist.
 */
export const selectVariants = tv(
  {
    slots: {
      root: 'group/field relative flex flex-col font-fido-ui-paragraph',
      /** Stacked label above the trigger (FidoUI DS default). */
      label: fieldLabelStacked,
      /** In-trigger label for `labelPlacement="internal"`. */
      internalLabel: fieldLabelInternal,
      optionalText: `${fieldOptionalText} font-normal`,
      tooltipIcon: fieldTooltipIcon,
      trigger: [
        fieldControlBox,
        'justify-between',
        'font-fido-ui-paragraph text-fido-ui-p2 leading-fido-ui-normal text-fido-ui-neutral-500',
        'cursor-pointer focus:outline-none',
      ].join(' '),
      triggerContent: 'flex min-w-0 flex-1 flex-col items-stretch justify-center',
      value: 'min-w-0 w-full truncate text-left',
      icon: [
        'size-[18px] shrink-0 text-current',
        'transition-transform data-[popup-open]:rotate-180',
      ],
      /**
       * Base UI keeps `position: absolute` on the Positioner, so the stacking
       * token has to live here — `z-index` is ignored on the static Popup.
       */
      positioner: 'z-fido-ui-overlay',
      popup: [
        'max-h-[var(--available-height)] overflow-y-auto',
        'rounded-fido-ui-md border border-fido-ui-neutral-300 bg-fido-ui-neutral-white py-1.5',
        'shadow-fido-ui-md animate-fido-ui-fade-in',
      ],
      item: [
        'group flex w-full cursor-pointer items-center gap-2 px-2 py-1.5',
        `${fieldTextP3} font-normal text-fido-ui-neutral-700`,
        'outline-none select-none',
        'data-[highlighted]:bg-fido-ui-neutral-100',
        'data-[selected]:bg-fido-ui-primary-100 data-[selected]:border-l-2 data-[selected]:border-l-fido-ui-primary-900',
      ],
      itemIndicator: 'size-4 shrink-0 text-fido-ui-primary-700',
      separator: 'my-1 h-px bg-fido-ui-neutral-200',
      groupLabel: [
        'flex h-[34px] items-center px-2 py-1.5',
        `${fieldTextP3} font-normal text-fido-ui-neutral-700`,
      ],
      error: fieldError,
      errorIcon: fieldErrorIcon,
      description: fieldDescription,
    },
    variants: {
      labelPlacement: {
        stacked: {
          root: 'gap-fido-ui-xs',
          trigger: 'h-10 gap-fido-ui-sm px-fido-ui-md',
          triggerContent: 'gap-0',
          optionalText: fieldTextP3,
        },
        internal: {
          root: 'gap-fido-ui-sm',
          trigger: 'h-[50px] gap-fido-ui-sm px-fido-ui-md',
          triggerContent: 'gap-fido-ui-2xs',
          optionalText: fieldTextP4,
        },
      },
      state: {
        default: {
          trigger: [
            fieldControlStateDefault,
            // Open / filled: primary border + text (Base UI sets data-placeholder when empty).
            'data-[popup-open]:border-fido-ui-primary-600 data-[popup-open]:text-fido-ui-primary-700',
            'data-[placeholder]:text-fido-ui-neutral-500',
            '[&:not([data-placeholder])]:border-fido-ui-primary-500 [&:not([data-placeholder])]:text-fido-ui-primary-700',
            'focus-visible:text-fido-ui-primary-700',
          ].join(' '),
        },
        error: {
          trigger: [
            fieldControlStateError,
            'text-fido-ui-neutral-500 data-[popup-open]:border-fido-ui-destruct-600',
          ].join(' '),
        },
        success: {
          trigger: fieldControlStateSuccess,
        },
        disabled: {
          root: fieldRootDisabled,
          trigger: [fieldControlStateDisabled, 'text-fido-ui-neutral-500 cursor-not-allowed'].join(
            ' ',
          ),
          label: 'text-fido-ui-neutral-400',
          internalLabel: 'text-fido-ui-neutral-400',
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

export type SelectVariants = VariantProps<typeof selectVariants>;
