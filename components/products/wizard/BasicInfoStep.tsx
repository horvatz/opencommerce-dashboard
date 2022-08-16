import { useTranslation } from 'react-i18next';
import { FiInfo } from 'react-icons/fi';
import { useSetRecoilState } from 'recoil';
import { ProductCategoryDetailsFragment } from '../../../generated/graphql';
import { productWizardState } from '../../../utils/atoms';
import Card from '../../cards/Card';
import TextCard from '../../cards/TextCard';
import { SelectItem } from '../../inputs/SelectField';
import { StepProps } from '../forms/interfaces';
import ProductBasicInfoForm from '../forms/ProductBasicInfoForm';

type Props = StepProps & {
  productCategories: ProductCategoryDetailsFragment[];
};

/**
 * Step for add product wizard that allows the user to enter basic product information.
 */
const BasicInfoStep = ({ productCategories }: Props) => {
  const { t } = useTranslation();
  const setProductWizard = useSetRecoilState(productWizardState);

  const selectableCategoryOptions: SelectItem[] = productCategories.map(
    (category) => ({ value: category.id, label: category.name })
  );

  // Update wizard with next step and product id
  const updateWizardData = (productId: string) => {
    setProductWizard({
      productId: productId,
      step: 'product-variants',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <ProductBasicInfoForm
          productCategories={selectableCategoryOptions}
          onSuccess={(productId) =>
            productId ? updateWizardData(productId) : null
          }
        />
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
