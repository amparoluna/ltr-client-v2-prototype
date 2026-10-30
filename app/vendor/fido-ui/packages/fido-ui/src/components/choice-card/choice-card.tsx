'use client';

import * as React from 'react';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { SingleBuildingIcon } from '@petscreeninginc/fido-ui-icons';
import { Badge } from '../badge';
import { Checkbox } from '../checkbox';
import { IconWrapper } from '../icon-wrapper';
import { radioVariants } from '../radio-group/radio-group.variants';
import { cn } from '../../utils/cn';
import { choiceCardGroupVariants, choiceCardVariants } from './choice-card.variants';

interface ChoiceCardBaseProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'onChange' | 'title'
> {
  /** Visible primary label and, when selectable, the control's accessible name. */
  title: React.ReactNode;
  /** Optional secondary copy and, when selectable, the control's accessible description. */
  description?: React.ReactNode;
  /** Disables this card and applies disabled styling. */
  disabled?: boolean;
  /** Leading icon. Omit for the FidoUI SingleBuildingIcon default; pass `false` to hide it. */
  icon?: React.ReactNode | false;
  /** Trailing badge. Omit for “Recommended”; pass `false` to hide it. */
  badge?: React.ReactNode | false;
  /** Optional content rendered below the main row. */
  children?: React.ReactNode;
}

export interface ChoiceCardOptionProps extends ChoiceCardBaseProps {
  /** Unique value managed by the nearest ChoiceCardGroup. */
  value: string;
  action?: never;
}

export interface ChoiceCardActionProps extends ChoiceCardBaseProps {
  /** Trailing action. Action cards do not participate in selection. */
  action: React.ReactNode;
  value?: never;
}

export type ChoiceCardProps = ChoiceCardOptionProps | ChoiceCardActionProps;

interface ChoiceCardGroupBaseProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  /** Visible label for the group. */
  label?: React.ReactNode;
  /** Optional helper text displayed above the choices. */
  description?: React.ReactNode;
  /** Validation message displayed below the choices. */
  error?: React.ReactNode;
  /** Form field name shared by every choice. */
  name?: string;
  /** Disables every choice in the group. */
  disabled?: boolean;
  /** Prevents selection changes while keeping controls focusable. */
  readOnly?: boolean;
  /** ChoiceCard options rendered by the group. */
  children: React.ReactNode;
}

export interface ChoiceCardSingleGroupProps extends ChoiceCardGroupBaseProps {
  /** Allows one selected value and renders radio controls. */
  selectionMode: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Requires one radio option for native form submission. */
  required?: boolean;
}

export interface ChoiceCardMultipleGroupProps extends ChoiceCardGroupBaseProps {
  /** Allows multiple selected values and renders checkbox controls. */
  selectionMode: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  required?: never;
}

export type ChoiceCardGroupProps = ChoiceCardSingleGroupProps | ChoiceCardMultipleGroupProps;

interface ChoiceCardGroupContextValue {
  selectionMode: ChoiceCardGroupProps['selectionMode'];
  name?: string;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
}

const ChoiceCardGroupContext = React.createContext<ChoiceCardGroupContextValue | null>(null);

function DefaultVisual() {
  return <SingleBuildingIcon aria-hidden="true" />;
}

/**
 * An option rendered inside a ChoiceCardGroup, or as a standalone action card.
 *
 * The nearest group owns radio or checkbox selection semantics. Consumers own
 * form orchestration and any behavior rendered through `action` or `children`.
 *
 * @example
 * ```tsx
 * <ChoiceCardGroup selectionMode="single" defaultValue="professional">
 *   <ChoiceCard
 *     title="Professional plan"
 *     description="For growing property teams"
 *     value="professional"
 *   />
 * </ChoiceCardGroup>
 * ```
 */
export const ChoiceCard = React.forwardRef<HTMLDivElement, ChoiceCardProps>(
  (
    {
      className,
      title,
      description,
      disabled = false,
      value,
      icon,
      badge,
      action,
      children,
      ...props
    },
    ref,
  ) => {
    const group = React.useContext(ChoiceCardGroupContext);
    const generatedId = React.useId();
    const controlId = `choice-card-${generatedId}`;
    const titleId = `${controlId}-title`;
    const descriptionId = `${controlId}-description`;
    const hasAction = action != null;
    const isSelectable = group != null && !hasAction;
    const isDisabled = disabled || group?.disabled || false;
    const styles = choiceCardVariants({ disabled: isDisabled });
    const radioStyles = radioVariants();

    if (!group && !hasAction) {
      throw new Error('Selectable ChoiceCard components must be rendered inside ChoiceCardGroup.');
    }

    if (group && hasAction) {
      throw new Error('ChoiceCard action cards cannot be rendered inside ChoiceCardGroup.');
    }

    const resolvedIcon = icon === undefined ? <DefaultVisual /> : icon;
    const resolvedBadge =
      badge === undefined ? (
        <Badge color="primary" shade="light" size="lg">
          Recommended
        </Badge>
      ) : (
        badge
      );

    return (
      <div ref={ref} className={cn(styles.root(), className)} data-slot="choice-card" {...props}>
        {isSelectable ? (
          <label
            htmlFor={controlId}
            className={styles.selectionLabel()}
            data-slot="selection-label"
          />
        ) : null}

        <div className={styles.main()} data-slot="main">
          <div className={styles.content()}>
            {resolvedIcon !== false && resolvedIcon != null ? (
              <IconWrapper color="primary" shade="light" size="lg">
                {resolvedIcon}
              </IconWrapper>
            ) : null}

            <span className={styles.text()}>
              <span id={titleId} className={styles.title()}>
                {title}
              </span>
              {description != null ? (
                <span id={descriptionId} className={styles.description()}>
                  {description}
                </span>
              ) : null}
            </span>
          </div>

          {resolvedBadge !== false && resolvedBadge != null ? (
            <span className={styles.adornment()} data-slot="badge">
              {resolvedBadge}
            </span>
          ) : null}

          {action != null ? (
            <span className={styles.action()} data-slot="action">
              {action}
            </span>
          ) : null}

          {isSelectable && group.selectionMode === 'single' ? (
            <BaseRadio.Root
              id={controlId}
              value={value!}
              aria-labelledby={titleId}
              aria-describedby={description != null ? descriptionId : undefined}
              className={cn(radioStyles.root(), styles.control())}
              disabled={isDisabled}
              readOnly={group.readOnly}
              required={group.required}
            >
              <BaseRadio.Indicator className={radioStyles.indicator()} />
            </BaseRadio.Root>
          ) : null}

          {isSelectable && group.selectionMode === 'multiple' ? (
            <Checkbox
              id={controlId}
              aria-labelledby={titleId}
              aria-describedby={description != null ? descriptionId : undefined}
              className={styles.control()}
              disabled={isDisabled}
              readOnly={group.readOnly}
              name={group.name}
              value={value!}
            />
          ) : null}
        </div>

        {children != null ? (
          <div className={styles.children()} data-slot="content-slot">
            {children}
          </div>
        ) : null}
      </div>
    );
  },
);

ChoiceCard.displayName = 'ChoiceCard';

/**
 * Owns selection, form semantics, validation copy, and layout for ChoiceCard options.
 * `single` mode renders a radio group; `multiple` mode renders a checkbox group.
 */
export const ChoiceCardGroup = React.forwardRef<HTMLDivElement, ChoiceCardGroupProps>(
  (props, ref) => {
    const {
      className,
      label,
      description,
      error,
      name,
      disabled = false,
      readOnly = false,
      children,
      selectionMode,
      ...groupProps
    } = props;
    const generatedId = React.useId();
    const labelId = label != null ? `choice-card-group-${generatedId}-label` : undefined;
    const descriptionId =
      description != null ? `choice-card-group-${generatedId}-description` : undefined;
    const errorId = error != null ? `choice-card-group-${generatedId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
    const styles = choiceCardGroupVariants();
    const required = selectionMode === 'single' ? Boolean(props.required) : false;
    const contextValue = React.useMemo<ChoiceCardGroupContextValue>(
      () => ({ selectionMode, name, disabled, readOnly, required }),
      [selectionMode, name, disabled, readOnly, required],
    );

    const content = (
      <ChoiceCardGroupContext.Provider value={contextValue}>
        {label != null ? (
          <span id={labelId} className={styles.label()}>
            {label}
          </span>
        ) : null}
        {description != null ? (
          <span id={descriptionId} className={styles.description()}>
            {description}
          </span>
        ) : null}
        <div className={styles.options()} data-slot="choice-card-options">
          {children}
        </div>
        {error != null ? (
          <p id={errorId} className={styles.error()} role="alert">
            {error}
          </p>
        ) : null}
      </ChoiceCardGroupContext.Provider>
    );

    if (selectionMode === 'single') {
      const { value, defaultValue, onValueChange, required: _required, ...rootProps } = groupProps;

      return (
        <BaseRadioGroup
          ref={ref}
          className={cn(styles.root(), className)}
          value={value as string | undefined}
          defaultValue={defaultValue as string | undefined}
          onValueChange={(nextValue) =>
            (onValueChange as ChoiceCardSingleGroupProps['onValueChange'])?.(nextValue)
          }
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-invalid={error != null || undefined}
          {...rootProps}
        >
          {content}
        </BaseRadioGroup>
      );
    }

    const { value, defaultValue, onValueChange, ...rootProps } = groupProps;

    return (
      <BaseCheckboxGroup
        ref={ref}
        role="group"
        className={cn(styles.root(), className)}
        value={value as string[] | undefined}
        defaultValue={defaultValue as string[] | undefined}
        onValueChange={(nextValue) =>
          (onValueChange as ChoiceCardMultipleGroupProps['onValueChange'])?.(nextValue)
        }
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-invalid={error != null || undefined}
        {...rootProps}
      >
        {content}
      </BaseCheckboxGroup>
    );
  },
);

ChoiceCardGroup.displayName = 'ChoiceCardGroup';
