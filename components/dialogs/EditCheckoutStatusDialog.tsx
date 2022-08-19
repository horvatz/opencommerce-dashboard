import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckoutStatus } from '../../generated/graphql';
import Button from '../buttons/Button';
import SelectField from '../inputs/SelectField';
import OCDialog from './OCDialog';

type Props = {
  open: boolean;
  onClose: () => void;
  value?: CheckoutStatus;
  onSuccess: (status: CheckoutStatus) => void;
};

const EditCheckoutStatusDialog = ({
  open,
  onClose,
  value,
  onSuccess,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const statusOptions = [
    { value: CheckoutStatus.Closed, label: t('orderStatusClosed') },
    { value: CheckoutStatus.Open, label: t('orderStatusOpen') },
    { value: CheckoutStatus.Canceled, label: t('orderStatusCanceled') },
  ];

  const [currentStatus, setCurrentStatus] = useState(
    value ?? CheckoutStatus.Open
  );

  return (
    <OCDialog
      title={t('changeOrderStatus')}
      description={t('changeOrderStatusDescription')}
      open={open}
      onClose={onClose}
    >
      <div className="pt-6 flex flex-col gap-6">
        <SelectField
          name="order-status"
          options={statusOptions}
          value={currentStatus}
          onChange={(e) => {
            setCurrentStatus(e.target.value as CheckoutStatus);
          }}
          label={t('orderStatus')}
        />
        <Button
          onClick={() => {
            onSuccess(currentStatus);
          }}
          text={t('confirm')}
        />
      </div>
    </OCDialog>
  );
};

export default EditCheckoutStatusDialog;
