import { t } from 'i18next';
import Button, { ButtonColor } from '../buttons/Button';
import OCDialog from './OCDialog';

type Props = {
  open: boolean;
  text: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
};

/**
 * Confirmation dialog
 */
const ConfirmDialog = ({
  open,
  text,
  description,
  onClose,
  onConfirm,
}: Props): JSX.Element => {
  return (
    <OCDialog
      open={open}
      title={text}
      description={description}
      onClose={onClose}
    >
      <div className="pt-6 flex flex-col gap-3">
        <Button
          text={t('confirm')}
          color={ButtonColor.ALERT}
          onClick={onConfirm}
        />
        <Button
          text={t('cancel')}
          color={ButtonColor.PRIMARY}
          onClick={onClose}
        />
      </div>
    </OCDialog>
  );
};

export default ConfirmDialog;
