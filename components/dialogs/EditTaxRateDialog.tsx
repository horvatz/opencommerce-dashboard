import { useTranslation } from 'react-i18next';
import TaxRateForm, { TaxRateFormProps } from '../tax-rates/forms/TaxRateForm';
import OCDialog from './OCDialog';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (values: TaxRateFormProps) => void;
  initialValues?: TaxRateFormProps;
};

const EditTaxRateDialog = ({
  open,
  onClose,
  onSuccess,
  initialValues,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <OCDialog open={open} onClose={onClose} title={t('taxRate')}>
      <div className="pt-6" />
      <TaxRateForm initialValues={initialValues} onSuccess={onSuccess} />
    </OCDialog>
  );
};

export default EditTaxRateDialog;
