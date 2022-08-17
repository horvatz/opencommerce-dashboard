import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import { useProductsQuery } from '../../generated/graphql';
import ProductsTable from '../../components/tables/ProductsTable';

const ProductIndex: NextPage = () => {
  const { t } = useTranslation();

  const { data: productsData, error } = useProductsQuery();

  if (!productsData || error) {
    return <></>;
  }

  return (
    <>
      <Header title={t('products')} />
      <ProductsTable products={productsData.products} />
    </>
  );
};

export default ProductIndex;
