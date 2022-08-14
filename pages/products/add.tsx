import { Backdrop, Box, CircularProgress, Grid } from '@mui/material';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import ColorButton from '../../components/buttons/ColorButton';
import MainHeader from '../../components/MainHeader';
import AddProductForm from '../../components/products/forms/AddProductBasicDetailsForm';
import RoundedCard from '../../components/RoundedCard';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import AddProductVariantForm from '../../components/products/forms/AddProductVariantForm';
import {
  ProductType,
  useProductCreateMutation,
} from '../../src/generated/graphql';

// Add product with default variant
export interface FormAddProduct {
  name: string;
  description?: string;
  type: 'REGULAR' | 'DIGITAL';
  variant: {
    name: string;
    description?: string;
    sku?: string;
    weight?: number;
    available: boolean;
    price: number;
    salePrice?: number;
  };
}

const addProductValidationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
  type: yup.mixed().oneOf(['REGULAR', 'DIGITAL']).required(),
  variant: yup
    .object({
      name: yup.string().required(),
      description: yup.string().optional(),
      sku: yup.string().optional(),
      weight: yup.number().optional(),
      available: yup.boolean().required(),
      price: yup.number().min(0.01).required(),
      salePrice: yup.number().min(0.01).optional(),
    })
    .required(),
});

const ProductAddPage: NextPage = () => {
  const { t } = useTranslation();

  const [createProduct, { loading }] = useProductCreateMutation();

  return (
    <Box height={1}>
      <MainHeader title={t('createNewProductLong')} />
      <Formik
        initialValues={{
          name: '',
          description: '',
          type: 'REGULAR',
          variant: {
            name: '',
            description: '',
            sku: '',
            price: 0,
            salePrice: undefined,
            weight: undefined,
            available: true,
          },
        }}
        validationSchema={addProductValidationSchema}
        onSubmit={(values) => {
          createProduct({
            variables: {
              product: {
                name: values.name,
                description: values.description,
                type: values.type as ProductType,
                variants: [
                  {
                    name: values.variant.name,
                    description: values.description,
                    sku: values.variant.sku,
                    weight: values.variant.weight,
                    available: values.variant.available,
                    price: values.variant.price,
                    salePrice: values.variant.salePrice,
                  },
                ],
              },
            },
          });
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <RoundedCard>
                <AddProductForm />
              </RoundedCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <RoundedCard>
                <AddProductVariantForm />
              </RoundedCard>
            </Grid>
            <Grid item xs={12}>
              <ColorButton type="submit" variant="contained">
                {t('save')}
              </ColorButton>
            </Grid>
          </Grid>
        </Form>
      </Formik>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ProductAddPage;
