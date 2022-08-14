import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { FormAddProduct } from '../../../pages/products/add';

const AddProductVariantForm = (): JSX.Element => {
  const { t } = useTranslation();

  const formik = useFormikContext<FormAddProduct>();

  return (
    <Grid container rowSpacing={2}>
      <Typography variant="subtitle1">{t('productVariant')}</Typography>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="variant.name"
          name="variant.name"
          value={formik.values.variant.name}
          onChange={formik.handleChange}
          error={
            formik.touched.variant?.name && Boolean(formik.errors.variant?.name)
          }
          helperText={
            formik.touched.variant?.name && formik.errors.variant?.name
          }
          label={t('variantName')}
          type="text"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="variant.description"
          name="variant.description"
          value={formik.values.variant.description}
          onChange={formik.handleChange}
          error={
            formik.touched.variant?.description &&
            Boolean(formik.errors.variant?.description)
          }
          helperText={
            formik.touched.variant?.description &&
            formik.errors.variant?.description
          }
          label={t('variantDescription')}
          type="text"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="variant.sku"
          name="variant.sku"
          value={formik.values.variant.sku}
          onChange={formik.handleChange}
          error={
            formik.touched.variant?.sku && Boolean(formik.errors.variant?.sku)
          }
          helperText={formik.touched.variant?.sku && formik.errors.variant?.sku}
          label={t('sku')}
          type="text"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="variant.weight"
          name="variant.weight"
          value={formik.values.variant.weight}
          onChange={formik.handleChange}
          error={
            formik.touched.variant?.weight &&
            Boolean(formik.errors.variant?.weight)
          }
          helperText={
            formik.touched.variant?.weight && formik.errors.variant?.weight
          }
          label={t('weight')}
          type="number"
          inputProps={{
            step: '0.001',
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="variant.price"
          name="variant.price"
          value={formik.values.variant.price}
          onChange={formik.handleChange}
          error={
            formik.touched.variant?.price &&
            Boolean(formik.errors.variant?.price)
          }
          helperText={
            formik.touched.variant?.price && formik.errors.variant?.price
          }
          label={t('price')}
          type="number"
          inputProps={{
            step: '0.01',
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="variant.salePrice"
          name="variant.salePrice"
          value={formik.values.variant.salePrice}
          onChange={formik.handleChange}
          error={
            formik.touched.variant?.salePrice &&
            Boolean(formik.errors.variant?.salePrice)
          }
          helperText={
            formik.touched.variant?.salePrice &&
            formik.errors.variant?.salePrice
          }
          label={t('salePrice')}
          type="number"
          inputProps={{
            step: '0.01',
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="variant.available"
              checked={formik.values.variant.available}
              onChange={formik.handleChange}
            />
          }
          label={t('available')}
        />
      </Grid>
    </Grid>
  );
};

export default AddProductVariantForm;
