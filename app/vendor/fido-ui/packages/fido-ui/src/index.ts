// Barrel export for convenience imports
// For tree-shaking, prefer per-component imports: import { Button } from '@petscreeninginc/fido-ui/button'

export { Button, type ButtonProps, buttonVariants, type ButtonVariants } from './components/button';
export { ButtonGroup, type ButtonGroupProps } from './components/button-group';
export { IconButton, type IconButtonProps, iconButtonVariants, type IconButtonVariants } from './components/icon-button';
export {
  IconWrapper,
  type IconWrapperProps,
  iconWrapperVariants,
  type IconWrapperVariants,
} from './components/icon-wrapper';
export {
  HelperText,
  type HelperTextProps,
  helperTextVariants,
  type HelperTextVariants,
} from './components/helper-text';
export {
  DragDrop,
  type DragDropProps,
  type DragDropState,
  dragDropVariants,
  type DragDropVariants,
} from './components/drag-drop';
export { Badge, type BadgeProps, badgeVariants, type BadgeVariants } from './components/badge';
export {
  BadgeNumber,
  type BadgeNumberProps,
  badgeNumberVariants,
  type BadgeNumberVariants,
} from './components/badge-number';
export { Pill, type PillProps, pillVariants, type PillVariants } from './components/pill';
export { Input, type InputProps, inputVariants, type InputVariants } from './components/input';
export { Field, type FieldProps, fieldVariants, type FieldVariants } from './components/field';
export {
  NumericCounter,
  type NumericCounterProps,
  numericCounterVariants,
  type NumericCounterVariants,
} from './components/numeric-counter';
export { InputOtp, type InputOtpProps, inputOtpVariants, type InputOtpVariants } from './components/input-otp';
export {
  Textarea,
  type TextareaProps,
  textareaVariants,
  type TextareaVariants,
} from './components/textarea';
export { Switch, type SwitchProps, switchVariants, type SwitchVariants } from './components/switch';
export {
  Checkbox,
  type CheckboxProps,
  checkboxVariants,
  type CheckboxVariants,
} from './components/checkbox';
export {
  ChoiceCard,
  ChoiceCardGroup,
  type ChoiceCardProps,
  type ChoiceCardOptionProps,
  type ChoiceCardActionProps,
  type ChoiceCardGroupProps,
  type ChoiceCardSingleGroupProps,
  type ChoiceCardMultipleGroupProps,
  choiceCardVariants,
  choiceCardGroupVariants,
  type ChoiceCardVariants,
  type ChoiceCardGroupVariants,
} from './components/choice-card';
export {
  RadioGroup,
  RadioItem,
  type RadioGroupProps,
  type RadioItemProps,
  radioGroupVariants,
  radioVariants,
  type RadioGroupVariants,
  type RadioVariants,
} from './components/radio-group';
export {
  Select,
  SelectItem,
  SelectGroup,
  SelectSeparator,
  type SelectProps,
  type SelectItemProps,
  type SelectGroupProps,
  selectVariants,
  type SelectVariants,
} from './components/select';
export { Slider, type SliderProps, sliderVariants, type SliderVariants } from './components/slider';
export {
  Calendar,
  fidoUICalendarClassNames,
  fidoUICalendarComponents,
  calendarVariants,
  type CalendarProps,
  type CalendarVariants,
} from './components/calendar';
export {
  DatePicker, DateRangePicker,
  type DatePickerProps, type DateRangePickerProps,
} from './components/date-picker';
export {
  Combobox, ComboboxItem, ComboboxGroup, ComboboxSeparator,
  type ComboboxProps, type ComboboxItemProps, type ComboboxGroupProps, type ComboboxIndicator,
  comboboxVariants, type ComboboxVariants,
} from './components/combobox';
export {
  Tabs, TabsList, Tab, TabPanel,
  type TabsProps, type TabsListProps, type TabProps, type TabPanelProps,
  tabsVariants, type TabsVariants,
} from './components/tabs';
export {
  Breadcrumb, BreadcrumbLink, BreadcrumbPage, BreadcrumbEllipsis,
  type BreadcrumbProps, type BreadcrumbLinkProps, type BreadcrumbPageProps, type BreadcrumbEllipsisProps,
  breadcrumbVariants,
} from './components/breadcrumb';
export { Pagination, type PaginationProps, paginationVariants } from './components/pagination';
export {
  ToggleGroup, ToggleGroupItem,
  type ToggleGroupProps, type ToggleGroupItemProps,
  toggleGroupVariants, type ToggleGroupVariants,
} from './components/toggle-group';
export {
  Stepper, Step,
  type StepperProps, type StepProps, type StepperStep,
  stepperVariants, type StepperVariants,
} from './components/stepper';
export {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
  type DialogProps, type DialogTriggerProps, type DialogContentProps, type DialogHeaderProps, type DialogTitleProps, type DialogDescriptionProps, type DialogFooterProps,
  dialogVariants, type DialogVariants,
} from './components/dialog';
export { Toast, type ToastProps, toastVariants, type ToastVariants } from './components/toast';
export {
  Alert,
  type AlertProps,
  type AlertActionsProps,
  type AlertPurpose,
  alertVariants,
  type AlertVariants,
} from './components/alert';
export {
  Attachment,
  type AttachmentProps,
  type AttachmentType,
  type AttachmentState,
  type AttachmentSize,
  attachmentVariants,
  type AttachmentVariants,
} from './components/attachment';
export { Tooltip, type TooltipProps, tooltipVariants, type TooltipVariants } from './components/tooltip';
export { Progress, type ProgressProps, progressVariants, type ProgressVariants } from './components/progress';
export {
  ProgressStepper,
  type ProgressStepperProps,
  progressStepperVariants,
  type ProgressStepperVariants,
} from './components/progress-stepper';
export { Spinner, type SpinnerProps, spinnerVariants, type SpinnerVariants } from './components/spinner';
export {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  type AccordionProps, type AccordionItemProps, type AccordionTriggerProps, type AccordionContentProps,
  accordionVariants, type AccordionVariants,
} from './components/accordion';
export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuLabel,
  type DropdownMenuProps, type DropdownMenuTriggerProps, type DropdownMenuItemProps,
  type DropdownMenuSeparatorProps, type DropdownMenuGroupProps, type DropdownMenuLabelProps,
  dropdownMenuVariants, type DropdownMenuVariants,
} from './components/dropdown-menu';

// Utilities
export { cn } from './utils/cn';
export type { IconComponent } from './utils/types';

// Tokens
export {
  colors,
  fidoAlertColors,
  type FidoUIColors,
} from './tokens/colors';
export {
  fidoUIThemes,
  fidoUIThemeIds,
  fidoUIThemeDataAttribute,
  FIDO_UI_THEME_DATA_ATTR,
  type FidoUIThemeId,
} from './tokens/themes';
