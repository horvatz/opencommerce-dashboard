import { useTranslation } from 'react-i18next';
import { FiInfo } from 'react-icons/fi';
import Card from '../../cards/Card';
import TextCard from '../../cards/TextCard';
import { StepProps } from '../forms/interfaces';
import ProductBasicInfoForm from '../forms/ProductBasicInfoForm';

/**
 * Step for add product wizard that allows the user to enter basic product information.
 */
const BasicInfoStep = ({ onComplete }: StepProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <ProductBasicInfoForm onSuccess={onComplete} />
      </Card>
      <TextCard
        icon={<FiInfo className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />}
        title={t('basicDetails')}
        subtitle={t('basicDetailsDescription')}
      />
    </div>
  );
};

export default BasicInfoStep;
