import { tv } from 'tailwind-variants';

export const breadcrumbVariants = tv({
  slots: {
    root: 'flex items-center font-fido-ui-paragraph',
    list: 'flex items-center gap-fido-ui-xs',
    item: 'flex items-center gap-fido-ui-xs',
    link: [
      'inline-flex items-center gap-1 text-fido-ui-p3 leading-fido-ui-normal text-fido-ui-neutral-600',
      'hover:text-fido-ui-type-heading transition-colors cursor-pointer',
    ],
    currentPage: [
      'inline-flex items-center gap-1 p-1 rounded-fido-ui-xs',
      'text-fido-ui-p3 leading-fido-ui-normal text-fido-ui-type-heading',
    ],
    separator: 'text-fido-ui-neutral-600 shrink-0 select-none size-[14px]',
    ellipsis: [
      'inline-flex items-center justify-center text-fido-ui-neutral-600',
      'cursor-pointer hover:text-fido-ui-type-heading',
    ],
  },
});
