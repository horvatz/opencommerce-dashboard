//import { ProductType } from '../../../src/generated/graphql';
import * as yup from 'yup';
import { Formik } from 'formik';
import TextField from '../../inputs/TextField';
import { useTranslation } from 'react-i18next';
import i18n from '../../../utils/i18n';
import Button from '../../buttons/Button';

/*interface FormProductBasicInfo {
  name: string;
  description?: string;
  type: ProductType;
}*/

const formProductBasicInfoValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required(i18n.t('fieldRequired', { field: i18n.t('name') })),
  description: yup.string().optional(),
  type: yup.mixed().oneOf(['REGULAR', 'DIGITAL']).required(),
});

const ProductBasicInfoForm = (): JSX.Element => {
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
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField
              id="name"
              name="name"
              label={t('name')}
              value={values.name}
              error={Boolean(errors.name)}
              errorMessage={errors.name}
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
            <Button type="submit" background="bg-blue-600" text={t('next')} />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductBasicInfoForm;
