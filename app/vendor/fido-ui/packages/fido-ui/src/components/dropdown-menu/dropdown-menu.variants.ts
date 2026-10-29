import { tv, type VariantProps } from 'tailwind-variants';

export const dropdownMenuVariants = tv({
  slots: {
    /**
     * Base UI keeps `position: absolute` on the Positioner, so the stacking
     * token has to live here — `z-index` is ignored on the static Popup.
     */
    positioner: 'z-fido-ui-overlay',
    popup: [
      'min-w-[180px] rounded-fido-ui-lg border border-fido-ui-neutral-300 bg-fido-ui-neutral-white py-1 overflow-clip',
      'shadow-[0_4px_16px_0_rgba(0,0,0,0.12)]',
      'animate-fido-ui-fade-in',
    ],
    item: [
      'flex w-full cursor-pointer items-center gap-2 px-3 py-2',
      'text-fido-ui-p3 leading-fido-ui-normal text-fido-ui-neutral-950',
      'rounded-fido-ui-md outline-none',
      'data-[highlighted]:bg-fido-ui-neutral-100',
      'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
    ],
    separator: 'my-1 h-px bg-fido-ui-neutral-200',
    group: '',
    label: 'px-3 py-1.5 text-fido-ui-p4 font-bold text-fido-ui-neutral-500',
  },
  variants: {
    destructive: {
      true: {
        item: 'text-fido-ui-destruct-600 data-[highlighted]:bg-fido-ui-destruct-50',
      },
    },
  },
});

export type DropdownMenuVariants = VariantProps<typeof dropdownMenuVariants>;
