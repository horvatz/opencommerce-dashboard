import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Header from '../../components/layout/Header';
import ProductBasicInfoForm from '../../components/products/forms/ProductBasicInfoForm';
import {
  UpdateProductInput,
  useProductByIdLazyQuery,
  useUpdateProductMutation,
} from '../../generated/graphql';

const ProductDetails: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // Fetch product
  const [getProductById, { loading, error, data: productData }] =
    useProductByIdLazyQuery();
  // Product update mutation
  const [updateProductData, { loading: updateLoading }] =
    useUpdateProductMutation();

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

  /**
   * TODO handle loading and error
   */

  return (
    <>
      <Header
        title={product.name}
        subtitle={product.description ?? undefined}
      />
      <div className="grid grid-cols-2">
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
      </div>
    </>
  );
};

export default ProductDetails;
