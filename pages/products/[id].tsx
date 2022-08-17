import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Card from '../../components/cards/Card';
import ImageDropzone from '../../components/ImageDropzone';
import Header from '../../components/layout/Header';
import ProductVariantItem from '../../components/products/ProductVariantItem';
import ProductBasicInfoForm from '../../components/products/forms/ProductBasicInfoForm';
import {
  ProductVariantDetailsFragment,
  UpdateProductInput,
  useProductByIdLazyQuery,
  useRemoveProductVariantMutation,
  useUpdateProductMutation,
} from '../../generated/graphql';
import { FiPlusCircle } from 'react-icons/fi';
import EditVariantDialog from '../../components/dialogs/EditVariantDialog';

const ProductDetails: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // Product variant edit dialog
  const [variantDialog, setVariantDialog] = useState<{
    open: boolean;
    variant: ProductVariantDetailsFragment | null;
  }>({
    open: false,
    variant: null,
  });

  // Fetch product
  const [
    getProductById,
    { refetch: refetchProductById, loading, error, data: productData },
  ] = useProductByIdLazyQuery();
  // Product update mutation
  const [updateProductData, { loading: updateLoading }] =
    useUpdateProductMutation();
  // Remove product variant
  const [removeProductVariantData, { loading: removeVariantLoading }] =
    useRemoveProductVariantMutation();

  useEffect(() => {
    if (router.query.id) {
      getProductById({ variables: { id: router.query.id as string } });
    }
  }, [getProductById, router.query.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !productData) {
    return <></>;
  }

  const product = productData.product;

  const updateProduct = async (productId: string, data: UpdateProductInput) => {
    try {
      await updateProductData({ variables: { id: productId, product: data } });
      toast.success(t('productUpdated'));
    } catch (error) {}
  };

  const handleRemoveVariant = async (productId: string) => {
    try {
      await removeProductVariantData({ variables: { id: productId } });
      refetchProductById();
      toast.success(t('productVariantRemoved'));
    } catch (error) {}
  };

  const handleEditDialogSuccess = () => {
    try {
      setVariantDialog({ open: false, variant: null });
      refetchProductById();
    } catch (error) {}
  };

  /**
   * TODO handle loading and error
   */

  return (
    <>
      <Header
        title={product.name}
        subtitle={product.description ?? undefined}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card margin="m-0">
          <h2 className="text-xl font-medium text-gray-900 pb-6">
            {t('basicDetails')}
          </h2>
          <ProductBasicInfoForm
            loading={updateLoading}
            values={{
              name: product.name,
              description: product.description ?? '',
              type: product.type,
              categories: product.categories.map((c) => ({
                id: Number(c.id),
                name: c.name,
              })),
            }}
            onSuccess={(values) => updateProduct(product.id, values)}
          />
        </Card>
        <div>
          <Card margin="0">
            <div className="inline-flex justify-between items-center w-full pb-6">
              <h2 className="text-xl font-medium text-gray-900">
                {t('variants')}{' '}
                {product.variants.length > 0
                  ? `(${product.variants.length})`
                  : ''}
              </h2>
              <span
                onClick={() => setVariantDialog({ open: true, variant: null })}
                className="inline-flex items-center gap-2 text-blue-600 cursor-pointer"
              >
                {t('newVariant')}
                <FiPlusCircle />
              </span>
            </div>
            <div className="overflow-y-scroll flex flex-col gap-6">
              {product.variants?.map((variant) => (
                <ProductVariantItem
                  onRemove={() => handleRemoveVariant(variant.id)}
                  onEdit={() =>
                    setVariantDialog({ open: true, variant: variant })
                  }
                  key={variant.id}
                  variant={variant}
                />
              ))}
            </div>
          </Card>
        </div>
        <ImageDropzone product={product} />
      </div>
      <EditVariantDialog
        variant={variantDialog.variant}
        productId={product.id}
        open={variantDialog.open}
        onClose={() => setVariantDialog({ open: false, variant: null })}
        onSuccess={handleEditDialogSuccess}
      />
    </>
  );
};

export default ProductDetails;
