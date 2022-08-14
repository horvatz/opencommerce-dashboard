import { Box, Grid } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import MainHeader from '../../components/MainHeader';
import ProductCard from '../../components/products/ProductCard';
import { useAllProductsQuery } from '../../src/generated/graphql';

const ProductsPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data } = useAllProductsQuery();

  if (data) {
    console.log(data.products);
  }

  return (
    <Box>
      <MainHeader
        title={t('products')}
        actionTitle={t('createProduct')}
        onAction={() => router.push('products/add')}
      />
      <Grid container spacing={2}>
        {data?.products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsPage;
