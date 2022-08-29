import { useTranslation } from 'react-i18next';
import UserForm, { UserFormProps } from '../users/forms/UserForm';
import OCDialog from './OCDialog';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (values: UserFormProps) => void;
  initialValues?: UserFormProps;
};

const EditUserDialog = ({ open, onClose, onSuccess, initialValues }: Props) => {
  const { t } = useTranslation();

  return (
    <OCDialog open={open} onClose={onClose} title={t('editUser')}>
      <div className="pt-6" />
      <UserForm
        mode="create"
        initialValues={initialValues}
        onSuccess={onSuccess}
      />
    </OCDialog>
  );
};

export default EditUserDialog;
