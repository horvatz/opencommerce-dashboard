import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button, { ButtonColor } from '../../../components/buttons/Button';
import Card from '../../../components/cards/Card';
import Header from '../../../components/layout/Header';
import ProductCategoryForm from '../../../components/products/forms/ProductCategoryForm';
import ProductItem from '../../../components/products/ProductItem';
import {
  UpdateProductCategoryInput,
  useProductCategoryByIdLazyQuery,
  useRemoveProductCategoryMutation,
  useUpdateProductCategoryMutation,
} from '../../../generated/graphql';

const ProductCategoryDetails: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // Fetches the product category with the given id from the server.
  const [
    getProductCategoryById,
    {
      data: categoryData,
      loading: categoryDataLoading,
      error: categoryDataError,
    },
  ] = useProductCategoryByIdLazyQuery();
  // Updates the product category with the given id on the server.
  const [updateProductCategory, { loading: updateCategoryDataLoading }] =
    useUpdateProductCategoryMutation();
  // Remove the product category with the given id from the server.
  const [removeProductCategory, { loading: removeCategoryLoading }] =
    useRemoveProductCategoryMutation({ refetchQueries: ['ProductCategories'] });

  const handleCategoryUpdate = async (
    categoryId: number,
    data: UpdateProductCategoryInput
  ) => {
    try {
      await updateProductCategory({
        variables: { id: categoryId, category: data },
      });
      toast.success(t('productCategoryUpdated'));
    } catch (error) {}
  };

  const handleRemoveCategory = async (categoryId: number) => {
    try {
      await removeProductCategory({ variables: { id: categoryId } });
      toast.success(t('productCategoryRemoved'));
      router.push('/products/categories');
    } catch (error) {}
  };

  useEffect(() => {
    if (router.query.id) {
      getProductCategoryById({
        variables: { id: parseInt(router.query.id as string) },
      });
    }
  }, [getProductCategoryById, router.query.id]);

  if (!categoryData || categoryDataLoading || categoryDataError) {
    return <></>;
  }

  const category = categoryData.productCategory;

  return (
    <>
      <Header title={category.name} subtitle={category.description ?? ''} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card margin="m-0">
          <h2 className="text-xl font-medium text-gray-900 pb-6">
            {t('basicDetails')}
          </h2>
          <ProductCategoryForm
            loading={updateCategoryDataLoading}
            mode="edit"
            initialValues={{
              name: category.name,
              description: category.description ?? '',
            }}
            onSuccess={(data) =>
              handleCategoryUpdate(parseInt(category.id), {
                ...data,
                id: parseInt(category.id),
              })
            }
          />
          <div className="flex flex-col pt-3">
            <Button
              loading={removeCategoryLoading}
              color={ButtonColor.ALERT}
              text={t('removeCategory')}
              onClick={() => handleRemoveCategory(parseInt(category.id))}
            />
          </div>
        </Card>
        <Card margin="0">
          <h2 className="text-xl font-medium text-gray-900">
            {t('productsInCategory', {
              category: category.name.toLowerCase(),
              count: category.products?.length,
            })}
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:block">
            {t('productsInCategoryDescription')}
          </p>
          {category.products?.map((product) => (
            <ProductItem
              onRemove={() => null}
              key={product.id}
              product={product}
            />
          ))}
        </Card>
      </div>
    </>
  );
};

export default ProductCategoryDetails;
