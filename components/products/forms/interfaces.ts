/**
 * Props for all form components.
 */
export type FormProps = {
  onSuccess: (id?: string) => void;
};

/**
 * Step type for the form stepper.
 */
export type StepProps = {
  onComplete?: () => void;
};
