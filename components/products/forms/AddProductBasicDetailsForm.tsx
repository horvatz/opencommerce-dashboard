import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { FormAddProduct } from '../../../pages/products/add';

/**
 * Add Product - basic details form with
 * - name
 * - description
 * - product type
 *
 * @returns {JSX.Element}
 */
const AddProductBasicDetailsForm = (): JSX.Element => {
  const { t } = useTranslation();

  const formik = useFormikContext<FormAddProduct>();

  return (
    <Grid container rowSpacing={2}>
      <Typography variant="subtitle1">{t('basicDetails')}</Typography>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          label={t('name')}
          type="text"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          label={t('description')}
          type="text"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="type-label">{t('productType')}</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            error={formik.touched.type && Boolean(formik.errors.type)}
            label={t('productType')}
          >
            <MenuItem value="REGULAR">{t('productTypePhysical')}</MenuItem>
            <MenuItem value="DIGITAL">{t('productTypeDigital')}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AddProductBasicDetailsForm;
