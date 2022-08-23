import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import i18n from '../../utils/i18n';
import Button from '../buttons/Button';
import TextField from '../inputs/TextField';

export interface LoginFormProps {
  email: string;
  password: string;
}

const formProductCategorySchema = yup.object().shape({
  email: yup
    .string()
    .email(i18n.t('fieldRequired', { field: i18n.t('email') }))
    .required(i18n.t('fieldRequired', { field: i18n.t('email') })),
  password: yup
    .string()
    .required(i18n.t('fieldRequired', { field: i18n.t('password') })),
});

type Props = {
  loading?: boolean;
  onSuccess: (values: LoginFormProps) => void;
};

const ProductCategoryForm = ({ loading = false, onSuccess }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={formProductCategorySchema}
        onSubmit={onSuccess}
      >
        {({ touched, handleSubmit, errors, getFieldProps }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField
              id="email"
              label={t('email')}
              error={touched.email && Boolean(errors.email)}
              errorMessage={touched.email ? errors.email : undefined}
              {...getFieldProps('email')}
            />
            <TextField
              id="password"
              label={t('password')}
              type="password"
              error={touched.password && Boolean(errors.password)}
              errorMessage={touched.password ? errors.password : undefined}
              {...getFieldProps('description')}
            />
            <Button type="submit" loading={loading} text={t('login')} />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductCategoryForm;
