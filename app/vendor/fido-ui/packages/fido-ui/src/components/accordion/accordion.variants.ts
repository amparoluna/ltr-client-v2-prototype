import { tv, type VariantProps } from 'tailwind-variants';
import { focusRing } from '../../utils/variant-styles';

/**
 * Accordion slots aligned to FidoUI DS Figma `.Accordion (Single)`
 * (node 19484:7392).
 *
 * Figma props Active + State map to open/closed + CSS :active /
 * :focus-visible — not public visual variants.
 *
 * Token notes:
 * - Figma Spacing/BASE (12px) → `py-fido-ui-xl`
 * - Trigger: Heading/H5 Bold → `font-fido-ui-heading text-fido-ui-h5 font-bold`
 * - Content: Paragraph/P2 → `font-fido-ui-paragraph text-fido-ui-p2`
 * - Focal Ring/Neutral → shared `focusRing`
 */
export const accordionVariants = tv(
  {
    slots: {
      root: 'w-full font-fido-ui-paragraph',
      item: 'flex flex-col gap-fido-ui-xs border-b border-fido-ui-neutral-200',
      trigger: [
        'group flex w-full cursor-pointer flex-row items-center justify-between',
        'rounded-fido-ui-md bg-fido-ui-neutral-white px-fido-ui-md py-fido-ui-xl text-left',
        'font-fido-ui-heading text-fido-ui-h5 font-bold leading-fido-ui-tight text-fido-ui-neutral-black',
        'transition-opacity duration-150',
        'active:opacity-60',
        'focus-visible:outline-none',
        focusRing,
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:opacity-50',
      ],
      content: 'overflow-hidden',
      contentInner: [
        'px-fido-ui-md pb-fido-ui-lg',
        'font-fido-ui-paragraph text-fido-ui-p2 font-normal leading-fido-ui-normal text-fido-ui-neutral-black',
      ],
      icon: [
        'size-fido-ui-xs shrink-0 text-fido-ui-neutral-black transition-transform duration-200',
        'group-data-[panel-open]:rotate-180',
      ],
    },
  },
  // Preserve text-fido-ui-h5/p2 + text-fido-ui-neutral-* (twMerge collapses text-fido-ui-*).
  {
    twMerge: false,
  },
);

export type AccordionVariants = VariantProps<typeof accordionVariants>;
