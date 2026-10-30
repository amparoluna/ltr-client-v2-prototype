import { tv, type VariantProps } from 'tailwind-variants';

/**
 * `twMerge: false` — FidoUI utilities share prefixes (`text-fido-ui-*`, `border-fido-ui-*`)
 * for size and color. Default twMerge treats those as conflicts and drops font-size /
 * border-width when a color class is present (same pattern as Badge / NumericCounter).
 */
export const attachmentVariants = tv(
  {
    slots: {
      root: [
        'bg-fido-ui-neutral-white border-fido-ui-xs border-solid overflow-clip',
        'rounded-fido-ui-md p-fido-ui-md gap-fido-ui-sm',
        'font-fido-ui-paragraph relative w-full',
      ],
      media: [
        'bg-fido-ui-neutral-100 rounded-fido-ui-sm overflow-clip',
        'flex items-center justify-center shrink-0 text-fido-ui-neutral-600',
      ],
      mediaIcon: 'size-fido-ui-xs shrink-0',
      content: 'bg-fido-ui-neutral-white flex flex-col items-start overflow-clip min-w-0',
      titleRow: 'flex gap-fido-ui-md items-center justify-center w-full',
      title: [
        'flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap',
        // Figma Paragraph title uses Font Sizes/P2 (16) with ~1.2 line-height → tight
        'text-fido-ui-p2 leading-fido-ui-tight font-normal text-fido-ui-neutral-700',
      ],
      description: [
        'w-full overflow-hidden text-ellipsis whitespace-nowrap',
        // Figma Paragraph/P3 (14) / leading 1.4
        'text-fido-ui-p3 leading-fido-ui-normal font-normal',
      ],
      action: [
        'inline-flex shrink-0 items-center justify-center',
        'size-fido-ui-xs text-fido-ui-neutral-700',
        'cursor-pointer hover:text-fido-ui-neutral-900 transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fido-ui-primary-500',
      ],
      actionIcon: 'size-full',
    },
    variants: {
      size: {
        // Figma Size=MED — horizontal list row; height hugs title + feedback.
        // CSS grid (not flex): flex + aspect-ratio + stretch leaves media width
        // at the icon's 20px min-content while the box paints ~40px, overlapping
        // the title. Grid `auto` tracks honor the aspect-ratio transferred size.
        md: {
          root: 'grid grid-cols-[auto_1fr] items-center',
          media: 'aspect-square h-full w-auto',
          content: 'min-w-0',
        },
        // Figma Size=LG — vertical card; fixed 175px frame height from design
        lg: {
          root: 'flex flex-col items-start h-[175px]',
          media: 'flex-1 min-h-px w-full',
          content: 'shrink-0 w-full',
        },
      },
      state: {
        default: {
          root: 'border-fido-ui-neutral-200',
          description: 'text-fido-ui-neutral-500',
        },
        uploading: {
          root: 'border-fido-ui-neutral-300',
          description: 'text-fido-ui-primary-700',
        },
        success: {
          root: 'border-fido-ui-neutral-200',
          description: 'text-fido-ui-success-600',
        },
        error: {
          root: 'border-fido-ui-destruct-400',
          description: 'text-fido-ui-destruct-600',
        },
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  },
  {
    twMerge: false,
  },
);

export type AttachmentVariants = VariantProps<typeof attachmentVariants>;
