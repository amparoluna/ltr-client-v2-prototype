import { tv, type VariantProps } from 'tailwind-variants';

/**
 * `twMerge: false` preserves semantic typography size classes alongside
 * `text-fido-ui-*` color classes (the same constraint as Badge and Attachment).
 */
export const choiceCardVariants = tv(
  {
    slots: {
      root: [
        'relative flex w-full flex-col items-start gap-fido-ui-md overflow-clip',
        'rounded-fido-ui-md bg-fido-ui-neutral-white p-fido-ui-xl',
        'outline outline-1 -outline-offset-1 outline-fido-ui-neutral-200',
        'transition-[background-color,border-color,box-shadow] duration-150',
        'hover:bg-fido-ui-neutral-50 hover:outline-fido-ui-primary-700',
        'hover:shadow-[0_0_0_3px_rgba(212,212,212,0.8)]',
        'has-[:focus-visible]:outline-fido-ui-primary-700',
        'has-[:focus-visible]:shadow-[0_0_0_3px_rgba(212,212,212,0.8)]',
        'has-[[data-checked]]:bg-fido-ui-primary-50 has-[[data-checked]]:outline-fido-ui-primary-700',
        'has-[[data-checked]]:hover:bg-fido-ui-primary-50',
      ],
      selectionLabel: 'absolute inset-0 z-0 cursor-pointer rounded-fido-ui-md',
      main: 'relative z-[1] flex w-full items-start gap-fido-ui-md pointer-events-none',
      content: 'flex min-w-0 flex-1 flex-wrap items-center gap-fido-ui-md',
      text: 'flex flex-1 flex-col items-start justify-center text-left',
      title: [
        'w-full font-fido-ui-heading text-fido-ui-h5 font-bold leading-fido-ui-tight',
        'text-fido-ui-neutral-black break-words',
      ],
      description: [
        'w-full font-fido-ui-paragraph text-fido-ui-p3 font-normal leading-fido-ui-normal',
        'text-fido-ui-neutral-700 break-words',
      ],
      adornment: 'shrink-0',
      action: 'pointer-events-auto shrink-0',
      control: 'pointer-events-auto relative z-[1] shrink-0',
      children: 'pointer-events-auto relative z-[1] w-full',
    },
    variants: {
      disabled: {
        true: {
          root: [
            'cursor-not-allowed opacity-50 shadow-none',
            'hover:bg-fido-ui-neutral-white hover:shadow-none hover:outline-fido-ui-neutral-200',
          ],
          selectionLabel: 'cursor-not-allowed',
        },
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
  { twMerge: false },
);

export type ChoiceCardVariants = VariantProps<typeof choiceCardVariants>;

export const choiceCardGroupVariants = tv(
  {
    slots: {
      root: 'flex w-full flex-col gap-fido-ui-md',
      label: [
        'font-fido-ui-label text-fido-ui-p2 font-bold leading-fido-ui-normal',
        'text-fido-ui-neutral-900',
      ],
      description: [
        'font-fido-ui-paragraph text-fido-ui-p4 font-normal leading-fido-ui-normal',
        'text-fido-ui-neutral-500',
      ],
      options: 'flex w-full flex-col gap-fido-ui-md',
      error: [
        'font-fido-ui-paragraph text-fido-ui-p4 font-normal leading-fido-ui-normal',
        'text-fido-ui-destruct-600',
      ],
    },
  },
  { twMerge: false },
);

export type ChoiceCardGroupVariants = VariantProps<typeof choiceCardGroupVariants>;
