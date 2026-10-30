import { tv, type VariantProps } from 'tailwind-variants';

/** P3 body type (14px) + normal line-height, shared by the content row. */
const textP3 = 'text-fido-ui-p3 leading-fido-ui-normal';

export const progressStepperVariants = tv({
  slots: {
    root: 'flex flex-col gap-2 w-full font-fido-ui-paragraph',
    content: 'flex items-start gap-3 leading-fido-ui-normal',
    detail: 'flex flex-1 min-w-0 gap-1 items-start',
    title: `shrink-0 ${textP3} font-bold text-fido-ui-neutral-900`,
    description: `${textP3} font-normal text-fido-ui-neutral-800`,
    count: `shrink-0 ${textP3} font-normal text-fido-ui-neutral-800`,
    bar: 'flex items-center gap-2 h-1 w-full',
    segmentRoot: 'relative flex-1 h-full min-w-px',
    segmentTrack: 'relative h-full w-full overflow-hidden bg-fido-ui-neutral-300',
    segmentIndicator: 'h-full bg-fido-ui-primary-800 transition-all duration-300 ease-in-out',
  },
});

export type ProgressStepperVariants = VariantProps<typeof progressStepperVariants>;
