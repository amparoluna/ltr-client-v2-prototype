import * as React from 'react';
import { FileText, Image, LoaderCircle, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { attachmentVariants, type AttachmentVariants } from './attachment.variants';
import type { IconComponent } from '../../utils/types';

export type AttachmentType = 'document' | 'image' | 'loader';
export type AttachmentState = NonNullable<AttachmentVariants['state']>;
export type AttachmentSize = NonNullable<AttachmentVariants['size']>;

const defaultDescriptions: Record<AttachmentState, string | undefined> = {
  default: undefined,
  uploading: 'Uploading',
  success: 'Upload Successful',
  error: 'Upload failed. Try again.',
};

const mediaIcons: Record<AttachmentType, IconComponent> = {
  document: FileText,
  image: Image,
  loader: LoaderCircle,
};

export interface AttachmentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    AttachmentVariants {
  /**
   * Layout size. Matches Figma `Size`:
   * - `md` — horizontal list row (MED)
   * - `lg` — vertical card (LG)
   */
  size?: AttachmentSize;
  /**
   * Upload lifecycle state. Matches Figma `State`.
   * Drives border and description color.
   */
  state?: AttachmentState;
  /**
   * Leading media kind. Matches Figma `Type` on the variant visibility frame.
   * Ignored when `media` is provided.
   */
  type?: AttachmentType;
  /** Filename / primary label. Matches Figma title text. */
  title?: string;
  /**
   * Secondary feedback or metadata line (e.g. `PDF · 2.4 MB`, `Uploading · 64%`).
   * When omitted, state-specific default copy is used for uploading/success/error.
   */
  description?: string;
  /**
   * Upload progress percentage shown when `state="uploading"` and `description`
   * is omitted (e.g. `64` → `Uploading · 64%`).
   */
  progress?: number;
  /** Whether to render the description line. Matches Figma `Feedback`. */
  showFeedback?: boolean;
  /** Whether to render the remove action. Matches Figma `Action`. */
  showAction?: boolean;
  /** Callback fired when the remove action is clicked. */
  onRemove?: () => void;
  /** Accessible label for the remove action. */
  removeLabel?: string;
  /**
   * Custom leading media (icon, spinner, or image). Overrides `type`.
   */
  media?: React.ReactNode;
  /**
   * Icon component for the remove action (lucide-react or Heroicons).
   * Defaults to `Trash2`.
   */
  actionIcon?: IconComponent;
}

function resolveDescription({
  state,
  description,
  progress,
}: {
  state: AttachmentState;
  description?: string;
  progress?: number;
}): string | undefined {
  if (description != null) return description;
  if (state === 'uploading' && progress != null) {
    return `Uploading · ${progress}%`;
  }
  return defaultDescriptions[state];
}

function DefaultMedia({ type, className }: { type: AttachmentType; className: string }) {
  const Icon = mediaIcons[type];
  return (
    <Icon
      className={clsx(className, type === 'loader' && 'animate-spin')}
      aria-hidden="true"
    />
  );
}

/**
 * Displays a file or image attachment with media, metadata, upload state, and an optional remove action.
 *
 * Dumb: consumers own upload orchestration, progress values, and file selection.
 *
 * @example
 * ```tsx
 * <Attachment
 *   title="sales-dashboard.pdf"
 *   description="PDF · 2.4 MB"
 *   type="document"
 *   onRemove={() => {}}
 * />
 * <Attachment
 *   size="lg"
 *   state="uploading"
 *   type="loader"
 *   title="sales-dashboard.pdf"
 *   progress={64}
 *   onRemove={() => {}}
 * />
 * ```
 */
export const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>(
  (
    {
      className,
      size = 'md',
      state = 'default',
      type = 'document',
      title,
      description,
      progress,
      showFeedback = true,
      showAction = true,
      onRemove,
      removeLabel,
      media,
      actionIcon: ActionIcon = Trash2,
      ...props
    },
    ref,
  ) => {
    const styles = attachmentVariants({ size, state });
    const feedback = resolveDescription({ state, description, progress });
    const resolvedRemoveLabel =
      removeLabel ?? (title ? `Remove ${title}` : 'Remove attachment');

    return (
      <div
        ref={ref}
        role="group"
        aria-label={title}
        aria-busy={state === 'uploading' ? true : undefined}
        data-state={state}
        className={clsx(styles.root(), className)}
        {...props}
      >
        <div className={styles.media()} data-slot="media">
          {media ?? <DefaultMedia type={type} className={styles.mediaIcon()} />}
        </div>
        <div className={styles.content()} data-slot="content">
          <div className={styles.titleRow()}>
            {title ? <p className={styles.title()}>{title}</p> : <span className="flex-1" />}
            {showAction ? (
              <button
                type="button"
                className={styles.action()}
                onClick={onRemove}
                aria-label={resolvedRemoveLabel}
              >
                <ActionIcon className={styles.actionIcon()} aria-hidden="true" />
              </button>
            ) : null}
          </div>
          {showFeedback && feedback ? (
            <p
              className={styles.description()}
              {...(state === 'error' ? { role: 'alert' } : {})}
            >
              {feedback}
            </p>
          ) : null}
        </div>
      </div>
    );
  },
);

Attachment.displayName = 'Attachment';
