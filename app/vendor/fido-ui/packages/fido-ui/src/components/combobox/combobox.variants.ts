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
 * Combobox chrome shares the FidoUI Field anatomy (stacked / internal label,
 * bordered control box, description / error rows) so the search input aligns
 * visually with Field and Select across the Primary and FidoAlert
 * themes. The dropdown popup / item styling mirrors Select.
 */
export const comboboxVariants = tv(
  {
    slots: {
      root: 'group/field relative flex flex-col font-fido-ui-paragraph',
      label: fieldLabelStacked,
      internalLabel: fieldLabelInternal,
      optionalText: fieldOptionalText,
      tooltipIcon: fieldTooltipIcon,
      inputGroup: [fieldControlBox, 'min-w-0'].join(' '),
      content: 'flex min-w-0 flex-1 flex-col items-stretch justify-center',
      // Match the Input primitive text treatment (text-fido-ui-p2, neutral-500
      // placeholder, primary-700 once filled) so the control reads identically
      // to Input/Field when they coexist in the same form.
      input: [
        'w-full bg-transparent outline-none',
        'font-fido-ui-paragraph text-fido-ui-p2 leading-fido-ui-normal text-fido-ui-neutral-500',
        'placeholder:text-fido-ui-neutral-500',
        'not-placeholder-shown:text-fido-ui-primary-700',
      ].join(' '),
      clear: 'shrink-0 size-4 text-fido-ui-neutral-400 cursor-pointer hover:text-fido-ui-neutral-700',
      trigger: 'shrink-0 size-[18px] text-fido-ui-neutral-500 cursor-pointer transition-transform data-[popup-open]:rotate-180',
      // Removable selection tags (Base UI Combobox.Chips). `empty:hidden` keeps
      // the root flex gap tidy when nothing is selected.
      chips: 'flex flex-wrap gap-fido-ui-xs empty:hidden',
      // Matches the FidoUI Badge neutral/light look so native chips read as badges.
      chip: [
        'inline-flex items-center justify-center gap-fido-ui-xs',
        'font-fido-ui-paragraph font-normal text-fido-ui-p4 leading-fido-ui-normal',
        'rounded-fido-ui-xs px-fido-ui-md py-[2px] whitespace-nowrap',
        'cursor-default select-none border-[0.5px] border-fido-ui-neutral-500',
        'bg-fido-ui-neutral-white text-fido-ui-neutral-black outline-none',
        'data-[highlighted]:bg-fido-ui-neutral-100 focus-within:bg-fido-ui-neutral-100',
      ],
      chipRemove: [
        'inline-flex shrink-0 cursor-pointer items-center justify-center',
        'text-current opacity-70 outline-none hover:opacity-100',
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
        'data-[hidden]:hidden',
      ],
      itemIndicator: 'size-4 shrink-0 text-fido-ui-primary-700',
      empty: 'px-2 py-4 text-center text-fido-ui-p3 text-fido-ui-neutral-500',
      groupLabel: [
        'flex h-[34px] items-center px-2 py-1.5',
        `${fieldTextP3} font-normal text-fido-ui-neutral-700`,
      ],
      separator: 'my-1 h-px bg-fido-ui-neutral-200',
      description: fieldDescription,
      error: fieldError,
      errorIcon: fieldErrorIcon,
    },
    variants: {
      labelPlacement: {
        stacked: {
          root: 'gap-fido-ui-xs',
          inputGroup: 'h-10 gap-fido-ui-sm px-fido-ui-md',
          content: 'gap-0',
          optionalText: fieldTextP3,
        },
        internal: {
          root: 'gap-fido-ui-sm',
          inputGroup: 'h-[50px] gap-fido-ui-sm px-fido-ui-md',
          content: 'gap-fido-ui-2xs',
          optionalText: fieldTextP4,
        },
      },
      state: {
        default: {
          inputGroup: [
            fieldControlStateDefault,
            'has-[input:not(:placeholder-shown)]:border-fido-ui-primary-500',
          ].join(' '),
        },
        error: {
          inputGroup: fieldControlStateError,
        },
        success: {
          inputGroup: fieldControlStateSuccess,
        },
        disabled: {
          root: fieldRootDisabled,
          inputGroup: fieldControlStateDisabled,
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

export type ComboboxVariants = VariantProps<typeof comboboxVariants>;
