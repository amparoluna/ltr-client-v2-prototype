import { tv, type VariantProps } from 'tailwind-variants';

export const toggleGroupVariants = tv({
  slots: {
    root: 'inline-flex items-center rounded-fido-ui-lg border border-fido-ui-neutral-200 bg-fido-ui-neutral-white font-fido-ui-paragraph',
    item: [
      'inline-flex items-center justify-center px-4 py-2',
      'text-fido-ui-p4 font-bold leading-fido-ui-normal text-fido-ui-neutral-500',
      'transition-colors cursor-pointer',
      'border-r border-fido-ui-neutral-200 last:border-r-0',
      'first:rounded-l-fido-ui-lg last:rounded-r-fido-ui-lg',
      'hover:bg-fido-ui-neutral-50 hover:text-fido-ui-neutral-700',
      'data-[pressed]:bg-fido-ui-primary-50 data-[pressed]:text-fido-ui-primary-700',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fido-ui-primary-500',
      'disabled:opacity-50 disabled:pointer-events-none',
    ],
  },
});

export type ToggleGroupVariants = VariantProps<typeof toggleGroupVariants>;
