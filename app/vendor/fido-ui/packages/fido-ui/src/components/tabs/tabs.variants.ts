import { tv, type VariantProps } from 'tailwind-variants';
import { focusRing } from '../../utils/variant-styles';

export const tabsVariants = tv({
  slots: {
    root: 'flex flex-col font-fido-ui-paragraph',
    list: 'relative flex items-center',
    tab: [
      'relative inline-flex shrink-0 items-center justify-center gap-fido-ui-xs whitespace-nowrap px-fido-ui-base py-fido-ui-sm',
      'font-fido-ui-paragraph text-fido-ui-p2 font-normal leading-fido-ui-normal transition-colors duration-150',
      'focus-visible:outline-none',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-fido-ui-neutral-400',
    ],
    panel: 'mt-2 focus:outline-none',
    badge: 'flex size-5 shrink-0 items-center justify-center rounded-fido-ui-sm bg-fido-ui-primary-100 text-fido-ui-p4 font-normal leading-fido-ui-normal text-fido-ui-primary-700',
    icon: 'size-5 shrink-0',
  },
  variants: {
    style: {
      tabs: {
        list: 'h-10 w-fit border-b border-fido-ui-neutral-200',
        tab: 'h-10 border-b-2 border-transparent text-fido-ui-neutral-500 hover:border-fido-ui-neutral-300 hover:bg-fido-ui-neutral-white hover:text-fido-ui-neutral-950 focus-visible:border-fido-ui-neutral-300 focus-visible:bg-fido-ui-neutral-white focus-visible:text-fido-ui-neutral-950 data-[active]:border-fido-ui-primary-700 data-[active]:text-fido-ui-primary-700',
      },
      elevated: {
        list: 'w-fit gap-0 rounded-fido-ui-md border border-fido-ui-neutral-200 bg-fido-ui-neutral-100 px-fido-ui-lg py-fido-ui-sm',
        tab: `rounded-fido-ui-md border border-transparent text-fido-ui-neutral-500 hover:border-fido-ui-primary-700 hover:bg-fido-ui-neutral-white hover:text-fido-ui-neutral-950 focus-visible:border-fido-ui-primary-700 focus-visible:bg-fido-ui-neutral-white focus-visible:text-fido-ui-neutral-950 ${focusRing} data-[active]:border-fido-ui-primary-700 data-[active]:bg-fido-ui-neutral-white data-[active]:text-fido-ui-primary-700 data-[active]:shadow-fido-ui-sm`,
      },
      selector: {
        list: 'w-fit rounded-fido-ui-md border border-fido-ui-neutral-200',
        tab: `rounded-fido-ui-md border border-transparent text-fido-ui-neutral-500 hover:border-fido-ui-primary-700 hover:bg-fido-ui-neutral-100 hover:text-fido-ui-neutral-950 focus-visible:border-fido-ui-primary-700 focus-visible:bg-fido-ui-neutral-100 focus-visible:text-fido-ui-neutral-950 ${focusRing} data-[active]:border-fido-ui-primary-700 data-[active]:bg-fido-ui-primary-100 data-[active]:text-fido-ui-primary-700`,
      },
    },
  },
  defaultVariants: {
    style: 'tabs',
  },
});

export type TabsVariants = VariantProps<typeof tabsVariants>;
