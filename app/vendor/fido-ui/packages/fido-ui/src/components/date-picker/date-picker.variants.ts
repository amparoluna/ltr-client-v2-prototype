import { tv, type VariantProps } from 'tailwind-variants';
import {
  fieldControlBox,
  fieldControlBoxStacked,
  fieldControlStateDefault,
  fieldControlStateDisabled,
  fieldControlStateError,
  fieldError,
  fieldLabelStacked,
  fieldOptionalText,
  fieldRootDisabled,
} from '../../utils/field-variants';

export const datePickerVariants = tv(
  {
    slots: {
      root: 'group/field relative flex flex-col gap-fido-ui-xs font-fido-ui-paragraph',
      label: fieldLabelStacked,
      optionalText: `${fieldOptionalText} font-normal`,
      /** Full control chrome — anchors the calendar popover. */
      field: [
        fieldControlBox,
        fieldControlBoxStacked,
        'group/trigger justify-between',
        'font-fido-ui-paragraph text-fido-ui-p2 font-normal leading-fido-ui-normal',
      ].join(' '),
      input: [
        'min-w-0 flex-1 truncate bg-transparent',
        'font-fido-ui-paragraph text-fido-ui-p2 font-normal leading-fido-ui-normal',
        'placeholder:text-fido-ui-neutral-500',
        'outline-none focus:outline-none',
        'disabled:cursor-not-allowed',
      ].join(' '),
      triggerIcon: [
        'inline-flex size-[18px] shrink-0 items-center justify-center',
        'text-current cursor-pointer',
        'rounded-fido-ui-xs focus:outline-none',
        'focus-visible:shadow-[0_0_0_3px_rgba(212,212,212,0.8)]',
        'disabled:cursor-not-allowed',
      ].join(' '),
      /**
       * Base UI keeps `position: absolute` on the Positioner, so the stacking
       * token has to live here — `z-index` is ignored on the static Popup.
       */
      positioner: 'z-fido-ui-overlay',
      popup: [
        'w-fit rounded-fido-ui-lg border border-fido-ui-neutral-300 bg-fido-ui-neutral-white',
        'p-fido-ui-lg shadow-[0_1px_4px_0_rgba(0,0,0,0.1)] animate-fido-ui-fade-in',
      ],
      /** Legacy button trigger used by DateRangePicker. */
      triggerWrap: 'w-full',
      trigger: [
        fieldControlBox,
        fieldControlBoxStacked,
        'group/trigger justify-between',
        'font-fido-ui-paragraph text-fido-ui-p2 font-normal leading-fido-ui-normal text-fido-ui-neutral-500',
        'cursor-pointer focus:outline-none',
      ].join(' '),
      triggerText: 'min-w-0 flex-1 truncate text-left',
      rangeTriggerIcon:
        'size-[18px] shrink-0 text-current transition-transform group-data-[popup-open]/trigger:rotate-180',
      error: fieldError,
    },
    variants: {
      state: {
        default: {
          field: [
            fieldControlStateDefault,
            'data-[popup-open]:border-fido-ui-primary-600',
          ].join(' '),
          trigger: [
            fieldControlStateDefault,
            'data-[popup-open]:border-fido-ui-primary-600 data-[popup-open]:text-fido-ui-primary-700',
          ].join(' '),
        },
        error: {
          field: fieldControlStateError,
          trigger: fieldControlStateError,
        },
        disabled: {
          root: fieldRootDisabled,
          field: [fieldControlStateDisabled, 'text-fido-ui-neutral-500 cursor-not-allowed'].join(' '),
          trigger: [fieldControlStateDisabled, 'text-fido-ui-neutral-500 cursor-not-allowed'].join(
            ' ',
          ),
          label: 'text-fido-ui-neutral-400',
        },
      },
      hasValue: {
        true: {
          field: 'border-fido-ui-primary-500',
          input: 'text-fido-ui-primary-700',
          trigger: 'border-fido-ui-primary-500',
          triggerText: 'text-fido-ui-primary-700',
          triggerIcon: 'text-fido-ui-primary-700',
        },
        false: {
          input: 'text-fido-ui-neutral-500',
          triggerText: 'text-fido-ui-neutral-500',
          triggerIcon: 'text-fido-ui-neutral-500',
        },
      },
    },
    defaultVariants: {
      state: 'default',
      hasValue: false,
    },
  },
  { twMerge: false },
);

export type DatePickerVariants = VariantProps<typeof datePickerVariants>;
