import { tv, type VariantProps } from 'tailwind-variants';

export const stepperVariants = tv({
  slots: {
    root: 'flex items-start w-full font-fido-ui-paragraph',
    stepWrapper: 'flex flex-col items-center gap-2 min-w-[100px] flex-1',
    stepRow: 'flex items-center w-full',
    stepIndicator: [
      'flex size-6 shrink-0 items-center justify-center rounded-[16px]',
      'text-fido-ui-p3 font-normal leading-none transition-colors',
    ],
    stepLabels: 'flex flex-col items-center text-center w-full leading-fido-ui-normal',
    stepTitle: 'text-fido-ui-p3 font-bold text-[#4b4b4b]',
    stepDescription: 'text-fido-ui-p3 font-normal text-[#4b4b4b]',
    connector: 'h-[2px] min-h-[2px] flex-1 bg-fido-ui-neutral-200 transition-colors',
  },
  variants: {
    stepStatus: {
      active: {
        stepIndicator: 'bg-fido-ui-primary-700 text-fido-ui-neutral-white',
        connector: 'bg-fido-ui-primary-700',
      },
      completed: {
        stepIndicator: 'bg-fido-ui-primary-700 text-fido-ui-neutral-white',
        connector: 'bg-fido-ui-primary-700',
      },
      upcoming: {
        stepIndicator: 'bg-fido-ui-neutral-200 text-[#4b4b4b]',
        connector: 'bg-fido-ui-neutral-200',
      },
      disabled: {
        stepIndicator: 'bg-fido-ui-neutral-100 text-fido-ui-neutral-400',
        stepTitle: 'text-fido-ui-neutral-400',
        stepDescription: 'text-fido-ui-neutral-400',
      },
    },
  },
  defaultVariants: {
    stepStatus: 'upcoming',
  },
});

export type StepperVariants = VariantProps<typeof stepperVariants>;
