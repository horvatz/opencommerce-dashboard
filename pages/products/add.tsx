import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { FiEdit, FiInfo, FiSave } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import Header from '../../components/layout/Header';
import BasicInfoStep from '../../components/products/wizard/BasicInfoStep';
import ReviewStep from '../../components/products/wizard/ReviewStep';
import VariantsStep from '../../components/products/wizard/VariantStep';
import Stepper, { StepperStep } from '../../components/Stepper';
import { productWizardState } from '../../utils/atoms';
import i18n from '../../utils/i18n';

// Product add steps
const steps: StepperStep[] = [
  {
    id: 'product-basic-details',
    name: i18n.t('basicDetails'),
    icon: <FiInfo />,
  },
  { id: 'product-variants', name: i18n.t('productVariants'), icon: <FiEdit /> },
  { id: 'product-review', name: i18n.t('reviewAndSave'), icon: <FiSave /> },
];

/**
 * Contains wizard for adding product.
 *
 * @returns {JSX.Element}
 */
const ProductAdd: NextPage = () => {
  const { t } = useTranslation();

  // Get current step of add product wizard
  const productWizard = useRecoilValue(productWizardState);

  // Step by step wizard for product creationg
  return (
    <>
      <Header title={t('newProduct')} subtitle={t('newProductDescription')} />
      <div className="pt-4 py-8">
        <Stepper steps={steps} currentStepId={productWizard.step} />
      </div>
      {(() => {
        switch (productWizard.step) {
          case 'product-basic-details':
            return <BasicInfoStep />;
          case 'product-variants':
            return <VariantsStep />;
          case 'product-review':
            return <ReviewStep />;
          default:
            return <></>;
        }
      })()}
    </>
  );
};

export default ProductAdd;
