import { tv, type VariantProps } from 'tailwind-variants';

/**
 * Arrow uses Base UI's empty positioning wrapper + a rotated square (::before),
 * matching Figma's 10px diamond caret. `fill-*` alone does nothing on a div.
 */
export const tooltipVariants = tv(
  {
    slots: {
      /**
       * Base UI keeps `position: absolute` on the Positioner, so the stacking
       * token has to live here — `z-index` is ignored on the static Popup.
       */
      positioner: 'z-fido-ui-overlay',
      // `relative` anchors the ::before arrow, it is not a stacking hook.
      popup: [
        'relative max-w-sm rounded-fido-ui-sm bg-fido-ui-neutral-black',
        'px-fido-ui-lg py-fido-ui-sm break-words',
        'font-fido-ui-paragraph text-fido-ui-p4 leading-fido-ui-normal text-fido-ui-neutral-white',
        'animate-fido-ui-fade-in',
      ],
      arrow: [
        'pointer-events-none relative block h-[7px] w-[14px] overflow-hidden',
        'data-[side=bottom]:top-[-7px]',
        'data-[side=top]:bottom-[-7px] data-[side=top]:rotate-180',
        'data-[side=left]:right-[-10px] data-[side=left]:rotate-90',
        'data-[side=right]:left-[-10px] data-[side=right]:-rotate-90',
        "before:absolute before:bottom-0 before:left-1/2 before:size-2.5 before:content-['']",
        'before:rounded-[2px] before:bg-fido-ui-neutral-black',
        'before:[transform:translate(-50%,50%)_rotate(45deg)]',
      ],
    },
  },
  // Preserve text-fido-ui-p4 + text-fido-ui-neutral-white (twMerge collapses text-fido-ui-*).
  {
    twMerge: false,
  },
);

export type TooltipVariants = VariantProps<typeof tooltipVariants>;
