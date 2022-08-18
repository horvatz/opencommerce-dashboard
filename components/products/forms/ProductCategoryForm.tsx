import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from '../../buttons/Button';
import TextField from '../../inputs/TextField';
import { FormMode } from './interfaces';
import * as yup from 'yup';
import i18n from '../../../utils/i18n';

export interface ProductCategoryFormProps {
  name: string;
  description?: string;
}

const formProductCategorySchema = yup.object().shape({
  name: yup
    .string()
    .required(i18n.t('fieldRequired', { field: i18n.t('name') })),
  description: yup.string().optional(),
});

type Props = {
  initialValues?: ProductCategoryFormProps;
  mode?: FormMode;
  loading?: boolean;
  onSuccess: (values: ProductCategoryFormProps) => void;
};

const ProductCategoryForm = ({
  initialValues,
  mode = 'create',
  loading = false,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <Formik
        initialValues={{
          name: initialValues?.name ?? '',
          description: initialValues?.description ?? '',
        }}
        validationSchema={formProductCategorySchema}
        onSubmit={onSuccess}
      >
        {({ touched, handleSubmit, errors, getFieldProps }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField
              id="name"
              label={t('name')}
              error={touched.name && Boolean(errors.name)}
              errorMessage={touched.name ? errors.name : undefined}
              {...getFieldProps('name')}
            />
            <TextField
              id="description"
              label={t('description')}
              error={touched.description && Boolean(errors.description)}
              errorMessage={
                touched.description ? errors.description : undefined
              }
              {...getFieldProps('description')}
            />
            <Button
              type="submit"
              loading={loading}
              text={t(mode === 'create' ? 'createCategory' : 'updateCategory')}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductCategoryForm;
