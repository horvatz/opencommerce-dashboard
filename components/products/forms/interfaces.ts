/**
 * Props for all form components.
 */
export type FormProps = {
  onSuccess: (id?: string) => void;
};

/**
 * Form mode
 */
export type FormMode = 'create' | 'edit';

/**
 * Step type for the form stepper.
 */
export type StepProps = {
  onComplete?: () => void;
};
