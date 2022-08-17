import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  CreateProductVariantWithProductInput,
  ProductVariantDetailsFragment,
  UpdateProductVariantWithProductInput,
  useCreateProductVariantMutation,
  useUpdateProductVariantMutation,
} from '../../generated/graphql';
import ProductVariantForm from '../products/forms/ProductVariantForm';
import OCDialog from './OCDialog';

/**
 * Dialog to edit or create a variant. If variant is null, create mode is used.
 */

type Props = {
  open: boolean;
  productId: string;
  variant?: ProductVariantDetailsFragment | null;
  onClose: () => void;
  onSuccess: () => void;
};

const EditVariantDialog = ({
  open,
  onClose,
  onSuccess,
  productId,
  variant,
}: Props) => {
  const { t } = useTranslation();

  const [createProductVariant, { loading: createProductVariantLoading }] =
    useCreateProductVariantMutation();
  const [updateProductVariant, { loading: updateProductVariantLoading }] =
    useUpdateProductVariantMutation();

  const handleVariantUpdate = async (
    data: UpdateProductVariantWithProductInput
  ) => {
    if (variant) {
      try {
        const productVariant = await updateProductVariant({
          variables: { id: variant.id, variant: data },
        });

        toast.success(t('productVariantUpdated'));

        if (productVariant.data) {
          onSuccess();
        }
      } catch (error) {}
    }
  };

  const handleVariantCreate = async (
    data: CreateProductVariantWithProductInput
  ) => {
    try {
      const productVariant = await createProductVariant({
        variables: { productId: productId, variant: data },
      });

      toast.success(t('productVariantCreated'));

      if (productVariant.data) {
        onSuccess();
      }
    } catch (error) {}
  };

  const formLoading =
    createProductVariantLoading || updateProductVariantLoading;

  const mode = variant ? 'edit' : 'create';

  return (
    <OCDialog title={t('editVariant')} open={open} onClose={onClose}>
      <div className="pt-6" />
      <ProductVariantForm
        loading={formLoading}
        mode={mode}
        productId={productId}
        values={
          variant
            ? {
                name: variant.name,
                description: variant.description ?? '',
                sku: variant.sku ?? '',
                weight: variant.weight ?? '',
                available: variant.available,
                price: variant.price,
                salePrice: variant.salePrice ?? '',
              }
            : undefined
        }
        onSuccess={(values) =>
          mode === 'create'
            ? handleVariantCreate(values)
            : handleVariantUpdate(values)
        }
      />
    </OCDialog>
  );
};

export default EditVariantDialog;
