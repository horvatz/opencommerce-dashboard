import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { FiEdit, FiInfo, FiSave } from 'react-icons/fi';
import Card from '../../components/cards/Card';
import TextCard from '../../components/cards/TextCard';
import Header from '../../components/layout/Header';
import ProductBasicInfoForm from '../../components/products/forms/ProductBasicInfoForm';
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

const ProductAdd: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t('newProduct')} subtitle={t('newProductDescription')} />
      <div className="pb-8">
        <Stepper steps={steps} currentStepId="product-basic-details" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <ProductBasicInfoForm />
        </Card>
        <TextCard
          icon={<FiInfo className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />}
          title={t('basicDetails')}
          subtitle={t('basicDetailsDescription')}
        />
      </div>
    </>
  );
};

export default ProductAdd;
