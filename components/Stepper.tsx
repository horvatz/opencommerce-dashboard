import { cloneElement } from 'react';
import { useTranslation } from 'react-i18next';

export type StepperStep = {
  id: string;
  name: string;
  icon: React.ReactElement;
};

type Props = {
  steps: StepperStep[];
  currentStepId: string;
};

const Stepper = ({ steps, currentStepId }: Props): JSX.Element => {
  const { t } = useTranslation();

  const indexOfCurrentStep = steps.findIndex(
    (step) => step.id === currentStepId
  );

  const blueLineWidth =
    indexOfCurrentStep === 0
      ? 'w-0'
      : indexOfCurrentStep === 1
      ? 'w-1/2'
      : 'w-full';

  return (
    <div>
      <h2 className="sr-only">{t('steps')}</h2>
      <div>
        <div className="overflow-hidden bg-gray-200 rounded-full">
          <div
            className={`${blueLineWidth} h-2 bg-blue-500 rounded-full`}
          ></div>
        </div>

        <ol className="flex justify-between items-center mt-4 text-sm font-medium text-gray-500">
          <li
            key={steps[0].id}
            className={`flex items-center justify-start ${
              currentStepId === steps[0].id && 'text-blue-600'
            }`}
          >
            <span className="hidden sm:inline">{steps[0].name}</span>
            {cloneElement(steps[0].icon, {
              className: 'w-6 h-6 sm:w-5 sm:h-5 sm:ml-2',
            })}
          </li>
          <li
            key={steps[1].id}
            className={`flex items-center justify-center ${
              currentStepId === steps[1].id && 'text-blue-600'
            }`}
          >
            <span className="hidden sm:inline">{steps[1].name}</span>
            {cloneElement(steps[1].icon, {
              className: 'w-6 h-6 sm:w-5 sm:h-5 sm:ml-2',
            })}
          </li>
          <li
            key={steps[2].id}
            className={`flex items-center justify-end ${
              currentStepId === steps[2].id && 'text-blue-600'
            }`}
          >
            <span className="hidden sm:inline">{steps[2].name}</span>
            {cloneElement(steps[2].icon, {
              className: 'w-6 h-6 sm:w-5 sm:h-5 sm:ml-2',
            })}
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Stepper;
