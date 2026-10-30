import * as React from 'react';
import { CircleAlert, CircleCheck, CircleX, Info, LoaderCircle } from 'lucide-react';
import { alertVariants, type AlertVariants } from './alert.variants';
import { CloseIcon } from '../../utils/icons';
import type { IconComponent } from '../../utils/types';
import { cn } from '../../utils/cn';

export type AlertPurpose = NonNullable<AlertVariants['purpose']>;

const alertIcons: Record<AlertPurpose, IconComponent> = {
  primary: Info,
  secondary: Info,
  inform: Info,
  warning: CircleAlert,
  destruct: CircleX,
  success: CircleCheck,
};

const AlertContext = React.createContext(false);

function useAlertContext(component: string) {
  const isInsideAlert = React.useContext(AlertContext);
  if (!isInsideAlert) {
    throw new Error(`${component} must be used within an Alert`);
  }
}

function hasContent(value: React.ReactNode): boolean {
  return value != null && value !== false && value !== '';
}

export type AlertActionsProps = React.HTMLAttributes<HTMLDivElement>;

const AlertActions = React.forwardRef<HTMLDivElement, AlertActionsProps>(
  ({ className, children, ...props }, ref) => {
    useAlertContext('Alert.Actions');
    const styles = alertVariants();

    return (
      <div ref={ref} className={cn(styles.actions(), className)} {...props}>
        {children}
      </div>
    );
  },
);

AlertActions.displayName = 'Alert.Actions';

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    Pick<AlertVariants, 'purpose' | 'showRemainingTimeSpinner'> {
  /** Heading text of the alert. */
  title?: React.ReactNode;
  /** Secondary content below the title — plain text or any ReactNode. */
  description?: React.ReactNode;
  showIcon?: boolean;
  icon?: IconComponent;
  /** When provided, renders a dismiss control that calls this handler. */
  onClose?: () => void;
  /** Composed slots such as Alert.Actions. */
  children?: React.ReactNode;
}

const AlertRoot = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      purpose,
      title,
      description,
      showIcon = true,
      icon: Icon,
      showRemainingTimeSpinner = false,
      onClose,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedPurpose = purpose ?? 'primary';
    const styles = alertVariants({ purpose: resolvedPurpose, showRemainingTimeSpinner });
    const DefaultIcon = alertIcons[resolvedPurpose];
    const showIconStrip = showIcon || showRemainingTimeSpinner;
    const StripIcon = Icon ?? DefaultIcon;
    const showTitle = hasContent(title);
    const showDescription = hasContent(description);
    const showText = showTitle || showDescription;

    return (
      <AlertContext.Provider value={true}>
        <div ref={ref} role="alert" className={cn(styles.root(), className)} {...props}>
          {showIconStrip && (
            <div className={styles.iconStrip()}>
              {showRemainingTimeSpinner ? (
                <span className={styles.spinnerWrapper()}>
                  <LoaderCircle className="size-full animate-spin" aria-hidden="true" />
                </span>
              ) : (
                showIcon && (
                  <span className={styles.iconWrapper()}>
                    <StripIcon className="size-full shrink-0" aria-hidden="true" />
                  </span>
                )
              )}
            </div>
          )}
          <div className={styles.wrapper()}>
            {showText && (
              <div className={styles.textContent()}>
                {showTitle && <p className={styles.title()}>{title}</p>}
                {showDescription && <div className={styles.description()}>{description}</div>}
              </div>
            )}
            {children}
            {onClose && (
              <button
                type="button"
                aria-label="Close alert"
                className={styles.close()}
                onClick={onClose}
              >
                <CloseIcon className="size-full" />
              </button>
            )}
          </div>
        </div>
      </AlertContext.Provider>
    );
  },
);

AlertRoot.displayName = 'Alert';

type AlertComponent = typeof AlertRoot & {
  Actions: typeof AlertActions;
};

/**
 * Contextual alert banner. Pass title, description, and onClose as props;
 * compose action buttons with Alert.Actions. `description` accepts any ReactNode.
 *
 * @example
 * ```tsx
 * <Alert
 *   purpose="inform"
 *   title="Alert heading message"
 *   description="Description"
 *   onClose={handleClose}
 * >
 *   <Alert.Actions>
 *     <Button color="neutral" shade="light">Confirm</Button>
 *   </Alert.Actions>
 * </Alert>
 * ```
 *
 * @example
 * ```tsx
 * <Alert
 *   purpose="warning"
 *   title="Please note"
 *   description={
 *     <ul>
 *       <li>Registration documents are not sufficient…</li>
 *     </ul>
 *   }
 * />
 * ```
 */
export const Alert = Object.assign(AlertRoot, {
  Actions: AlertActions,
}) as AlertComponent;
