'use client';

import * as React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { clsx } from 'clsx';
import { tooltipVariants } from './tooltip.variants';

export interface TooltipProps {
  /** The content displayed inside the tooltip popup. */
  content: React.ReactNode;
  /** The preferred side where the tooltip appears relative to the trigger. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** The delay in milliseconds before the tooltip appears on hover. */
  delay?: number;
  /** Additional CSS class name for the tooltip popup element. */
  className?: string;
  /** The trigger element that the tooltip is attached to. */
  children: React.ReactElement;
}

/**
 * A tooltip that displays contextual information when hovering over a trigger element.
 *
 * @example
 * ```tsx
 * <Tooltip content="More info" side="top">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  side = 'top',
  delay = 200,
  className,
  children,
}) => {
  const styles = tooltipVariants();

  return (
    <BaseTooltip.Provider delay={delay}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            className={styles.positioner()}
            side={side}
            sideOffset={7}
          >
            <BaseTooltip.Popup className={clsx(styles.popup(), className)}>
              <BaseTooltip.Arrow className={styles.arrow()} />
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
};

Tooltip.displayName = 'Tooltip';
