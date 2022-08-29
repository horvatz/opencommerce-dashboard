import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import i18n from '../../../utils/i18n';
import Button from '../../buttons/Button';
import TextField from '../../inputs/TextField';
import { FormMode } from '../../products/forms/interfaces';

export interface UserFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const formUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(i18n.t('fieldRequired', { field: i18n.t('firstName') })),
  lastName: yup
    .string()
    .required(i18n.t('fieldRequired', { field: i18n.t('lastName') })),
  email: yup
    .string()
    .email(i18n.t('fieldRequired', { field: i18n.t('email') }))
    .required(i18n.t('fieldRequired', { field: i18n.t('email') })),
  password: yup
    .string()
    .required(i18n.t('fieldRequired', { field: i18n.t('password') })),
});

type Props = {
  initialValues?: UserFormProps;
  mode?: FormMode;
  loading?: boolean;
  onSuccess: (values: UserFormProps) => void;
};

const UserForm = ({
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
          firstName: initialValues?.firstName ?? '',
          lastName: initialValues?.lastName ?? '',
          email: initialValues?.email ?? '',
          password: '',
        }}
        validationSchema={formUserSchema}
        onSubmit={onSuccess}
      >
        {({ touched, handleSubmit, errors, getFieldProps }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField
              id="firstName"
              label={t('firstName')}
              error={touched.firstName && Boolean(errors.firstName)}
              errorMessage={touched.firstName ? errors.firstName : undefined}
              {...getFieldProps('firstName')}
            />
            <TextField
              id="lastName"
              label={t('lastName')}
              error={touched.lastName && Boolean(errors.lastName)}
              errorMessage={touched.lastName ? errors.lastName : undefined}
              {...getFieldProps('lastName')}
            />
            <TextField
              id="email"
              label={t('email')}
              error={touched.email && Boolean(errors.email)}
              errorMessage={touched.email ? errors.email : undefined}
              {...getFieldProps('email')}
            />
            <TextField
              id="password"
              type="password"
              label={t('password')}
              error={touched.password && Boolean(errors.password)}
              errorMessage={touched.password ? errors.password : undefined}
              {...getFieldProps('password')}
            />
            <Button
              type="submit"
              loading={loading}
              text={t(mode === 'create' ? 'createUser' : 'updateUser')}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
