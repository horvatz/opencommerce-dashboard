import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import {
  CreateProductVariantWithProductInput,
  useCreateProductVariantMutation,
  useProductByIdQuery,
  useRemoveProductVariantMutation,
} from '../../../generated/graphql';
import { productWizardState } from '../../../utils/atoms';
import Card from '../../cards/Card';
import ProductVariantCard from '../../cards/ProductVariantCard';
import ProductVariantForm from '../forms/ProductVariantForm';

/**
 * Step for add product wizard that allows the user to create variants for the product.
 */
const VariantsStep = (): JSX.Element => {
  const { t } = useTranslation();
  const productWizard = useRecoilValue(productWizardState);

  const {
    data: productsData,
    error,
    refetch: refetchProductById,
  } = useProductByIdQuery({
    variables: { id: productWizard.productId ?? '' },
    skip: !productWizard.productId,
  });

  const [createProductVariant, { loading: createProductVariantLoading }] =
    useCreateProductVariantMutation();

  const [removeProductVariant] = useRemoveProductVariantMutation();

  const removeProductVariantHandler = async (variantId: string) => {
    try {
      await removeProductVariant({
        variables: {
          id: variantId,
        },
      });
      toast.success(t('productVariantRemoved'));
    } catch (error) {}

    refetchProductById();
  };

  const createProductVariantHandler = async (
    data: CreateProductVariantWithProductInput
  ) => {
    if (productWizard.productId) {
      try {
        await createProductVariant({
          variables: { productId: productWizard.productId, variant: data },
        });

        toast.success(t('productVariantCreated'));
      } catch (error) {}
      refetchProductById();
    }
  };

  if (!productWizard.productId || error) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <ProductVariantForm
          loading={createProductVariantLoading}
          showNextStepButton={Boolean(productsData?.product.variants?.length)}
          productId={productWizard.productId}
          onSuccess={(values) => createProductVariantHandler(values)}
        />
      </Card>
      <div className="flex flex-col gap-6">
        {productsData?.product.variants?.map((variant) => (
          <ProductVariantCard
            variant={variant}
            key={variant.id}
            onRemove={() => removeProductVariantHandler(variant.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default VariantsStep;
