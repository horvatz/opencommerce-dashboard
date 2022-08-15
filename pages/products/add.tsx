import { NextPage } from 'next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiEdit, FiInfo, FiSave } from 'react-icons/fi';
import Header from '../../components/layout/Header';
import BasicInfoStep from '../../components/products/wizard/BasicInfoStep';
import VariantsStep from '../../components/products/wizard/VariantStep';
import Stepper, { StepperStep } from '../../components/Stepper';
import i18n from '../../utils/i18n';

// Product add steps
const steps: StepperStep[] = [
  {
    id: 'product-basic-details',
    name: i18n.t('basicDetails'),
    icon: <FiInfo />,
  },
  { id: 'product-variants', name: i18n.t('productVariants'), icon: <FiEdit /> },
  { id: 'product-save', name: i18n.t('reviewAndSave'), icon: <FiSave /> },
];

/**
 * Contains wizard for adding product.
 *
 * @returns {JSX.Element}
 */
const ProductAdd: NextPage = () => {
  const { t } = useTranslation();

  // Current step of add product wizard
  const [currentStep, setCurrentStep] = useState<StepperStep>(steps[0]);

  return (
    <>
      <Header title={t('newProduct')} subtitle={t('newProductDescription')} />
      <div className="pt-4 py-8">
        <Stepper steps={steps} currentStepId={currentStep.id} />
      </div>
      {(() => {
        switch (currentStep.id) {
          case 'product-basic-details':
            return (
              <BasicInfoStep onComplete={() => setCurrentStep(steps[1])} />
            );
          case 'product-variants':
            return <VariantsStep onComplete={() => setCurrentStep(steps[2])} />;
          default:
            return <></>;
        }
      })()}
    </>
  );
};

export default ProductAdd;
