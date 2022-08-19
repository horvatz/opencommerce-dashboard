import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import i18n from '../../../utils/i18n';
import Button from '../../buttons/Button';
import TextField from '../../inputs/TextField';
import { FormMode } from '../../products/forms/interfaces';

export interface TaxRateFormProps {
  name: string;
  description?: string;
  rate: number;
}

const formTaxRateValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required(i18n.t('fieldRequired', { field: i18n.t('name') })),
  description: yup.string().optional(),
  rate: yup
    .number()
    .min(0, i18n.t('fieldRequired', { field: i18n.t('rate') }))
    .required(i18n.t('fieldRequired', { field: i18n.t('rate') })),
});

type Props = {
  initialValues?: TaxRateFormProps;
  mode?: FormMode;
  loading?: boolean;
  onSuccess: (values: TaxRateFormProps) => void;
};

const TaxRateForm = ({
  initialValues,
  mode = 'create',
  loading = false,
  onSuccess,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div>
      <Formik
        initialValues={{
          name: initialValues?.name ?? '',
          description: initialValues?.description ?? '',
          rate: initialValues?.rate ?? 0,
        }}
        validationSchema={formTaxRateValidationSchema}
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
            <TextField
              id="rate"
              label={t('ratePercent')}
              error={touched.rate && Boolean(errors.rate)}
              errorMessage={touched.rate ? errors.rate : undefined}
              step={0.1}
              type="number"
              {...getFieldProps('rate')}
            />
            <Button
              type="submit"
              loading={loading}
              text={t(mode === 'create' ? 'addTaxRate' : 'updateTaxRate')}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default TaxRateForm;
