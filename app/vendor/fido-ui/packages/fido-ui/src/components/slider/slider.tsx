'use client';

import * as React from 'react';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import { sliderVariants, type SliderVariants } from './slider.variants';
import { cn } from '../../utils/cn';

export interface SliderProps extends SliderVariants {
  /** The controlled value of the slider. Can be a single number or an array for range sliders. */
  value?: number | number[];
  /** The default value of the slider when uncontrolled. Can be a single number or an array for range sliders. */
  defaultValue?: number | number[];
  /** Callback fired when the slider value changes. */
  onValueChange?: (value: number | number[], event: unknown) => void;
  /** The minimum allowed value of the slider. */
  min?: number;
  /** The maximum allowed value of the slider. */
  max?: number;
  /** The step increment between selectable values. */
  step?: number;
  /** An optional text label displayed above the slider. */
  label?: string;
  /** Whether the slider is disabled and non-interactive. */
  disabled?: boolean;
  /** Error message displayed below the slider */
  error?: string;
  /** Additional CSS class name for the wrapper element. */
  className?: string;
  /** The form field name for the slider input. */
  name?: string;
}

/**
 * A slider input component for selecting a numeric value or range within a given bounds.
 *
 * @example
 * ```tsx
 * <Slider label="Volume" min={0} max={100} step={1} defaultValue={50} />
 * ```
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      label,
      disabled,
      error,
      value,
      defaultValue = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      name,
      ...props
    },
    ref,
  ) => {
    const styles = sliderVariants({ disabled: !!disabled });

    // Normalize to array for consistent thumb rendering
    const normalizedDefault = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    const normalizedValue = value !== undefined ? (Array.isArray(value) ? value : [value]) : undefined;

    return (
      <div ref={ref} className={cn('flex flex-col', className)} {...props}>
        {label && <span className={styles.label()}>{label}</span>}
        <BaseSlider.Root
          className={styles.root()}
          value={normalizedValue}
          defaultValue={normalizedDefault}
          onValueChange={onValueChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          name={name}
        >
          <BaseSlider.Control className="flex items-center w-full">
            <BaseSlider.Track className={styles.track()}>
              <BaseSlider.Indicator className={styles.range()} />
              {normalizedDefault.map((_, i) => (
                <BaseSlider.Thumb
                  key={i}
                  className={styles.thumb()}
                  aria-label={label || 'Slider'}
                />
              ))}
            </BaseSlider.Track>
          </BaseSlider.Control>
        </BaseSlider.Root>
        {error && (
          <p role="alert" className="text-fido-ui-p4 text-fido-ui-destruct-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Slider.displayName = 'Slider';
