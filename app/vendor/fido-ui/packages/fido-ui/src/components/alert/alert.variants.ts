import { tv, type VariantProps } from 'tailwind-variants';

export const alertVariants = tv({
  slots: {
    root: [
      'flex min-w-[345px] overflow-clip border-[0.5px] border-solid font-fido-ui-paragraph',
      'rounded-fido-ui-md',
    ],
    iconStrip: 'flex shrink-0 self-stretch items-start px-fido-ui-md py-fido-ui-xl',
    iconWrapper: 'size-fido-ui-sm shrink-0',
    spinnerWrapper: 'size-fido-ui-md shrink-0',
    wrapper: [
      'flex min-w-px flex-1 flex-wrap content-start items-center',
      'gap-x-fido-ui-xs gap-y-fido-ui-md p-fido-ui-xl',
    ],
    textContent: 'flex min-w-[240px] flex-1 basis-0 flex-col items-start justify-center gap-fido-ui-xs',
    title: [
      'w-full break-words font-fido-ui-heading font-bold',
      'text-fido-ui-h5 leading-fido-ui-tight',
    ],
    description: [
      'w-full break-words font-fido-ui-paragraph font-normal text-fido-ui-neutral-700',
      'text-fido-ui-p2 leading-fido-ui-normal',
    ],
    actions: 'flex shrink-0 items-center gap-fido-ui-sm',
    close: [
      'inline-flex size-5 shrink-0 items-center justify-center self-start',
      'cursor-pointer transition-colors',
    ],
  },
  variants: {
    purpose: {
      primary: {
        root: 'border-fido-ui-primary-600 bg-fido-ui-primary-50',
        iconStrip: 'bg-fido-ui-primary-100 text-fido-ui-primary-900',
        title: 'text-fido-ui-primary-900',
        close: 'text-fido-ui-primary-900',
      },
      secondary: {
        root: 'border-fido-ui-secondary-600 bg-fido-ui-secondary-50',
        iconStrip: 'bg-fido-ui-secondary-100 text-fido-ui-secondary-900',
        title: 'text-fido-ui-secondary-900',
        close: 'text-fido-ui-secondary-900',
      },
      inform: {
        root: 'border-fido-ui-utility-inform-600 bg-fido-ui-utility-inform-50',
        iconStrip: 'bg-fido-ui-utility-inform-100 text-fido-ui-utility-inform-900',
        title: 'text-fido-ui-utility-inform-900',
        close: 'text-fido-ui-utility-inform-900',
      },
      warning: {
        root: 'border-fido-ui-utility-warning-500 bg-fido-ui-utility-warning-50',
        iconStrip: 'bg-fido-ui-utility-warning-100 text-fido-ui-utility-warning-700',
        title: 'text-fido-ui-utility-warning-700',
        close: 'text-fido-ui-utility-warning-700',
      },
      destruct: {
        root: 'border-fido-ui-utility-destruct-600 bg-fido-ui-utility-destruct-50',
        iconStrip: 'bg-fido-ui-utility-destruct-100 text-fido-ui-utility-destruct-600',
        title: 'text-fido-ui-utility-destruct-600',
        close: 'text-fido-ui-utility-destruct-600',
      },
      success: {
        root: 'border-fido-ui-utility-success-600 bg-fido-ui-utility-success-50',
        iconStrip: 'bg-fido-ui-utility-success-100 text-fido-ui-utility-success-900',
        title: 'text-fido-ui-utility-success-900',
        close: 'text-fido-ui-utility-success-900',
      },
    },
    showRemainingTimeSpinner: {
      true: {
        iconStrip: 'items-center justify-center px-fido-ui-lg py-fido-ui-xl',
      },
      false: {},
    },
  },
  defaultVariants: {
    purpose: 'primary',
    showRemainingTimeSpinner: false,
  },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
