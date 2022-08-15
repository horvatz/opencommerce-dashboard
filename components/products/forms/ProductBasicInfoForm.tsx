//import { ProductType } from '../../../src/generated/graphql';
import * as yup from 'yup';
import { Formik } from 'formik';
import TextField from '../../inputs/TextField';
import { useTranslation } from 'react-i18next';
import i18n from '../../../utils/i18n';
import Button from '../../buttons/Button';
import SelectField, { SelectItem } from '../../inputs/SelectField';
import { PRODUCT_TYPES } from '../../../utils/constants';
import { FormProps } from './interfaces';

/*interface FormProductBasicInfo {
  name: string;
  description?: string;
  type: ProductType;
}*/

const selectProductTypes: SelectItem[] = PRODUCT_TYPES.map((type) => ({
  value: type.toUpperCase(),
  label: i18n.t(`productType${type}`),
}));

const formProductBasicInfoValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required(i18n.t('fieldRequired', { field: i18n.t('name') })),
  description: yup.string().optional(),
  type: yup.mixed().oneOf(['REGULAR', 'DIGITAL']).required(),
});

const ProductBasicInfoForm = ({ onSuccess }: FormProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          description: '',
          type: 'REGULAR',
        }}
        validationSchema={formProductBasicInfoValidationSchema}
        onSubmit={() => {
          onSuccess();
        }}
      >
        {({ values, touched, handleChange, handleSubmit, errors }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField
              id="name"
              name="name"
              label={t('name')}
              value={values.name}
              error={touched.name && Boolean(errors.name)}
              errorMessage={touched.name ? errors.name : undefined}
              onChange={handleChange}
            />
            <TextField
              id="description"
              name="description"
              label={t('description')}
              value={values.description}
              error={Boolean(errors.description)}
              errorMessage={errors.description}
              onChange={handleChange}
            />
            <SelectField
              name="type"
              label={t('productType')}
              options={selectProductTypes}
              value={values.type}
              error={Boolean(errors.type)}
              errorMessage={errors.type}
              onChange={handleChange}
            />
            <Button
              type="submit"
              background="bg-blue-600"
              text={t('createProduct')}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductBasicInfoForm;
