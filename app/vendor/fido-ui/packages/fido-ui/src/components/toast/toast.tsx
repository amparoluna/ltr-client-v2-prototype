import * as React from 'react';
import {
  CheckAltBoldIcon,
  CloseAltBoldIcon,
  InfoTooltipBoldIcon,
  WarningBoldIcon,
  type IconComponent,
} from '@petscreeninginc/fido-ui-icons';
import { CloseIcon } from '../../utils/icons';
import { Spinner } from '../spinner';
import { cn } from '../../utils/cn';
import { toastVariants, type ToastVariants } from './toast.variants';

export type ToastIconType = NonNullable<ToastVariants['iconType']>;
export type ToastIconSize = NonNullable<ToastVariants['iconSize']>;

const toastIcons: Record<ToastIconType, IconComponent> = {
  success: CheckAltBoldIcon,
  error: CloseAltBoldIcon,
  warning: WarningBoldIcon,
  info: InfoTooltipBoldIcon,
};

const ToastIconHalo = () => (
  <svg
    className="pointer-events-none absolute inset-0 size-full"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    data-toast-icon-halo=""
  >
    <circle
      cx="16"
      cy="16"
      r="14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="2 2.5"
      opacity="0.16"
    />
    <circle
      cx="16"
      cy="16"
      r="11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="2 2.2"
      opacity="0.3"
    />
    <circle
      cx="16"
      cy="16"
      r="9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="1.5 2"
      opacity="0.48"
    />
  </svg>
);

function hasContent(value: React.ReactNode): boolean {
  return value != null && value !== false && value !== '';
}

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'title'>,
    ToastVariants {
  /** The toast layout: a compact progress message or a detailed status update. */
  type?: 'loading' | 'info';
  /** Surface color matching the Figma White and Black variants. */
  color?: 'white' | 'black';
  /** Primary toast message. Defaults to “Loading...” for loading toasts. */
  title?: React.ReactNode;
  /** Supporting status text. Keep this to two lines or fewer. */
  description?: React.ReactNode;
  /** Semantic icon rendered from the FidoUI icon library. */
  iconType?: ToastIconType;
  /** Size applied by Toast to both semantic and loading icons. */
  iconSize?: ToastIconSize;
  /** Optional action, normally a FidoUI Button such as “Undo”. */
  action?: React.ReactNode;
  /** Callback fired from the accessible dismiss control. */
  onClose?: () => void;
  /** Accessible name for the dismiss control. */
  closeLabel?: string;
  /** Additional content rendered below the description. */
  children?: React.ReactNode;
}

/**
 * A presentational toast surface for temporary feedback. Positioning, duration,
 * stacking, and removal stay with the consumer's notification manager.
 *
 * @example
 * ```tsx
 * <Toast type="info" title="Payment method added" description="You're all set for future charges."
 *   iconType="success" iconSize="md" action={<Button color="neutral" shade="dark" size="sm">Undo</Button>}
 *   onClose={dismiss} />
 * ```
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      type = 'loading',
      color = 'white',
      title,
      description,
      iconType,
      iconSize = 'md',
      action,
      onClose,
      closeLabel = 'Dismiss notification',
      children,
      role = 'status',
      ...props
    },
    ref,
  ) => {
    const styles = toastVariants({ type, color, iconType, iconSize });
    const resolvedTitle = title ?? (type === 'loading' ? 'Loading...' : undefined);
    const Icon = iconType ? toastIcons[iconType] : null;
    const resolvedIcon =
      type === 'loading' ? (
        <Spinner size={iconSize} color="current" />
      ) : Icon ? (
        <>
          <ToastIconHalo />
          <Icon className="relative size-[calc(50%+2px)] shrink-0" aria-hidden="true" />
        </>
      ) : null;
    const showTitle = hasContent(resolvedTitle);
    const showDescription = hasContent(description);

    return (
      <div ref={ref} role={role} className={cn(styles.root(), className)} {...props}>
        {resolvedIcon ? (
          <span className={styles.icon()} aria-hidden="true">
            {resolvedIcon}
          </span>
        ) : null}
        <div className={styles.content()}>
          {showTitle ? <p className={styles.title()}>{resolvedTitle}</p> : null}
          {showDescription ? <p className={styles.description()}>{description}</p> : null}
          {hasContent(children) ? <div className={styles.extra()}>{children}</div> : null}
        </div>
        {action ? <div className={styles.action()}>{action}</div> : null}
        {onClose ? (
          <button type="button" className={styles.close()} onClick={onClose} aria-label={closeLabel}>
            <CloseIcon className="size-fido-ui-xs" />
          </button>
        ) : null}
      </div>
    );
  },
);

Toast.displayName = 'Toast';
