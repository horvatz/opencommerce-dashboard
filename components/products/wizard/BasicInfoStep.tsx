import { useTranslation } from 'react-i18next';
import { FiInfo } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import {
  CreateProductInput,
  useCreateProductMutation,
} from '../../../generated/graphql';
import { productWizardState } from '../../../utils/atoms';
import Card from '../../cards/Card';
import TextCard from '../../cards/TextCard';
import ProductBasicInfoForm from '../forms/ProductBasicInfoForm';

/**
 * Step for add product wizard that allows the user to enter basic product information.
 */
const BasicInfoStep = (): JSX.Element => {
  const { t } = useTranslation();
  const setProductWizard = useSetRecoilState(productWizardState);

  const [createProduct, { loading: createProductLoading }] =
    useCreateProductMutation();

  // Update wizard with next step and product id
  const updateWizardData = (productId: string) => {
    setProductWizard({
      productId: productId,
      step: 'product-variants',
    });
  };

  /**
   * Handle form submit when successfull validation.
   */
  const submit = async (data: CreateProductInput) => {
    try {
      const product = await createProduct({ variables: { product: data } });
      toast.success(t('productCreated'));
      if (product.data) {
        updateWizardData(product.data?.productCreate.id);
      }
    } catch (error) {}
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <ProductBasicInfoForm
          loading={createProductLoading}
          onSuccess={(values) => submit(values)}
        />
      </Card>
      <TextCard
        icon={<FiInfo />}
        title={t('basicDetails')}
        subtitle={t('basicDetailsDescription')}
      />
    </div>
  );
};

export default BasicInfoStep;
