import { useTranslation } from 'react-i18next';
import { FormMode } from '../products/forms/interfaces';
import TaxRateForm, { TaxRateFormProps } from '../tax-rates/forms/TaxRateForm';
import OCDialog from './OCDialog';

type Props = {
  open: boolean;
  mode?: FormMode;
  onClose: () => void;
  onSuccess: (values: TaxRateFormProps) => void;
  initialValues?: TaxRateFormProps;
};

const EditTaxRateDialog = ({
  open,
  onClose,
  onSuccess,
  mode = 'create',
  initialValues,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <OCDialog open={open} onClose={onClose} title={t('taxRate')}>
      <div className="pt-6" />
      <TaxRateForm
        mode={mode}
        initialValues={initialValues}
        onSuccess={onSuccess}
      />
    </OCDialog>
  );
};

export default EditTaxRateDialog;
