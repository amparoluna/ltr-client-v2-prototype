'use client';

import * as React from 'react';
import { dragDropVariants, type DragDropVariants } from './drag-drop.variants';
import { ErrorIcon, UploadIcon } from '../../utils/icons';
import { cn } from '../../utils/cn';

export type DragDropState = NonNullable<DragDropVariants['state']>;

const DEFAULT_TITLE = 'Drag & drop or choose file';

export interface DragDropProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onDrop' | 'onDragEnter' | 'onDragLeave' | 'onDragOver'> {
  /**
   * Visual state. When omitted, derives from `disabled`, `error`, and drag-over.
   * Figma: State = Default | Active | Disabled | Error.
   */
  state?: DragDropState;
  /** Disables the dropzone and file input. */
  disabled?: boolean;
  /**
   * Error message below the dropzone. Also forces the Error visual state
   * unless `state` is set explicitly.
   */
  error?: string;
  /** Helper text below the dropzone. Stacks with `error` when both are set. */
  description?: string;
  /**
   * When false, omits the helper description row.
   * Does not affect `error` — errors always render when set.
   * Figma: Supporting Text.
   * @default true
   */
  supportingText?: boolean;
  /**
   * Primary call-to-action label inside the dropzone.
   * @default 'Drag & drop or choose file'
   */
  title?: React.ReactNode;
  /**
   * Accepted formats line.
   * @default 'PNG, JPG, PDF, ZIP.'
   */
  secondaryText?: React.ReactNode;
  /**
   * Size / constraint line.
   * @default 'Maximum file size: 2 MB'
   */
  tertiaryText?: React.ReactNode;
  /**
   * Props for the hidden file input (accept, multiple, name, onChange, …).
   * Consumers own validation and upload logic.
   */
  inputProps?: Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'disabled'>;
  /** Called when files are chosen via click or drop. */
  onFilesChange?: (files: FileList | null) => void;
  /** Accessible name for the dropzone control. Defaults to the string `title`. */
  'aria-label'?: string;
}

function resolveState(
  state: DragDropState | undefined,
  disabled: boolean,
  error: string | undefined,
  dragging: boolean,
): DragDropState {
  if (state) return state;
  if (disabled) return 'disabled';
  if (error) return 'error';
  if (dragging) return 'active';
  return 'default';
}

/**
 * Drag-and-drop / click-to-choose file surface.
 *
 * Dumb: consumers own file validation, upload, and selected-file UI via
 * `inputProps` and `onFilesChange`. Active (drag-over) styling is handled
 * internally unless `state` is controlled.
 *
 * @example
 * ```tsx
 * import { DragDrop } from '@petscreeninginc/fido-ui/drag-drop';
 *
 * <DragDrop
 *   description="Helper Text"
 *   inputProps={{ accept: '.png,.jpg,.pdf,.zip', multiple: true }}
 *   onFilesChange={(files) => console.log(files)}
 * />
 * ```
 */
export const DragDrop = React.forwardRef<HTMLDivElement, DragDropProps>(
  (
    {
      className,
      state: stateProp,
      disabled = false,
      error,
      description,
      supportingText = true,
      title = DEFAULT_TITLE,
      secondaryText = 'PNG, JPG, PDF, ZIP.',
      tertiaryText = 'Maximum file size: 2 MB',
      inputProps,
      onFilesChange,
      'aria-label': ariaLabelProp,
      ...props
    },
    ref,
  ) => {
    const [dragging, setDragging] = React.useState(false);
    const dragDepth = React.useRef(0);

    const state = resolveState(stateProp, disabled, error, dragging);
    const styles = dragDropVariants({ state });
    const isDisabled = disabled || state === 'disabled';
    // Drag-over styling only applies when state is derived (not forced).
    const tracksDrag = stateProp == null && !disabled && !error;
    const ariaLabel =
      ariaLabelProp ?? (typeof title === 'string' ? title : DEFAULT_TITLE);

    const {
      className: inputClassName,
      onChange: inputOnChange,
      ref: inputRef,
      ...restInputProps
    } = inputProps ?? {};

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilesChange?.(event.target.files);
      inputOnChange?.(event);
    };

    const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
      if (!tracksDrag) return;
      event.preventDefault();
      event.stopPropagation();
      dragDepth.current += 1;
      if (dragDepth.current === 1) {
        setDragging(true);
      }
    };

    const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
      if (!tracksDrag) return;
      event.preventDefault();
      event.stopPropagation();
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) {
        setDragging(false);
      }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
      if (isDisabled) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'copy';
      }
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      if (isDisabled) return;
      event.preventDefault();
      event.stopPropagation();
      dragDepth.current = 0;
      setDragging(false);
      onFilesChange?.(event.dataTransfer?.files ?? null);
    };

    const showError = Boolean(error);
    const showDescription = supportingText && Boolean(description);

    return (
      <div ref={ref} className={cn(styles.root(), className)} {...props}>
        <label
          className={styles.dropzone()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            {...restInputProps}
            ref={inputRef}
            type="file"
            disabled={isDisabled}
            aria-label={ariaLabel}
            aria-invalid={state === 'error' || undefined}
            className={cn(styles.input(), inputClassName)}
            onChange={handleInputChange}
          />
          <div className={styles.content()}>
            <span className={styles.icon()}>
              <UploadIcon />
            </span>
            <p className={styles.title()}>{title}</p>
            <div className={styles.textBlock()}>
              {secondaryText ? <p className={styles.secondaryText()}>{secondaryText}</p> : null}
              {tertiaryText ? <p className={styles.tertiaryText()}>{tertiaryText}</p> : null}
            </div>
          </div>
        </label>
        {showDescription ? <p className={styles.description()}>{description}</p> : null}
        {showError ? (
          <p role="alert" className={styles.error()}>
            <span className={styles.errorIcon()}>
              <ErrorIcon className="size-fido-ui-xs" />
            </span>
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

DragDrop.displayName = 'DragDrop';
