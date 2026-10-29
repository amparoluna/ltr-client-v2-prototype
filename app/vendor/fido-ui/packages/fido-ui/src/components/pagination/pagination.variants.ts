import { tv } from 'tailwind-variants';
import { focusRing } from '../../utils/variant-styles';

/** Hover ring stays literal so Tailwind detects it — mirrors `focusRingShadow`. */
const itemBase = [
  'inline-flex size-9 shrink-0 items-center justify-center rounded-fido-ui-md',
  'text-fido-ui-p2 leading-fido-ui-normal',
  'transition-colors cursor-pointer',
  'hover:bg-fido-ui-neutral-white hover:shadow-[0_0_0_3px_rgba(212,212,212,0.8)]',
  `focus-visible:bg-fido-ui-neutral-white focus-visible:outline-none ${focusRing}`,
];

export const paginationVariants = tv(
  {
    slots: {
      root: 'flex items-center gap-fido-ui-xs font-fido-ui-paragraph',
      item: [...itemBase, 'font-normal text-fido-ui-neutral-700'],
      itemActive: [
        ...itemBase,
        'border border-fido-ui-primary-500 bg-fido-ui-primary-50 font-bold text-fido-ui-primary-900',
      ],
      ellipsis:
        'inline-flex size-9 shrink-0 items-center justify-center text-fido-ui-neutral-700',
    },
  },
  // Preserve text-fido-ui-p2 alongside text-fido-ui-* colors (twMerge collapses them).
  { twMerge: false },
);
