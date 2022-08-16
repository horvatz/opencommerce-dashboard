import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import {
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
const VariantsStep = () => {
  const { t } = useTranslation();
  const [productWizard, setProductWizard] = useRecoilState(productWizardState);

  const {
    data: productsData,
    error,
    refetch: refetchProductById,
  } = useProductByIdQuery({
    variables: { id: productWizard.productId ?? '' },
    skip: !productWizard.productId,
  });

  const [removeProductVariant] = useRemoveProductVariantMutation();

  if (!productWizard.productId || error) {
    return <></>;
  }

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <ProductVariantForm
          productId={productWizard.productId}
          onSuccess={async () => await refetchProductById()}
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
