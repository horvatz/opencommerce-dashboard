import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/layout/Header';
import ProductCategoryTable from '../../../components/tables/ProductCategoryTable';
import { useProductCategoriesQuery } from '../../../generated/graphql';

const ProductCategoriesIndex: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: categories, loading, error } = useProductCategoriesQuery();

  if (!categories || loading || error) {
    return <></>;
  }

  return (
    <>
      <Header
        title={t('productCategories')}
        actionText={t('createCategory')}
        onAction={() => router.push('/products/categories/add')}
      />
      <ProductCategoryTable categories={categories.productCategories} />
    </>
  );
};

export default ProductCategoriesIndex;
