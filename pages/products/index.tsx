import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import { useProductsQuery } from '../../generated/graphql';
import ProductsTable from '../../components/tables/ProductsTable';
import { useRouter } from 'next/router';
import Loading from '../../components/Loading';

const ProductIndex: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    data: productsData,
    error: productsError,
    loading: productsDataLoading,
  } = useProductsQuery();

  if (productsDataLoading) {
    <Loading />;
  }

  if (!productsData || productsError) {
    return <></>;
  }

  return (
    <>
      <Header
        title={t('products')}
        actionText={t('createProduct')}
        onAction={() => router.push('/products/add')}
      />
      <ProductsTable products={productsData.products} />
    </>
  );
};

export default ProductIndex;
