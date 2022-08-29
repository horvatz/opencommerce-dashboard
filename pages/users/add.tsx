import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Card from '../../components/cards/Card';
import TextCard from '../../components/cards/TextCard';
import Header from '../../components/layout/Header';
import UserForm from '../../components/users/forms/UserForm';
import {
  CreateUserInput,
  useCreateUserMutation,
} from '../../generated/graphql';

const UserAdd: NextPage = () => {
  const { t } = useTranslation();

  const [createUser, { loading }] = useCreateUserMutation({
    refetchQueries: ['Users'],
  });

  const handleCreateUser = async (data: CreateUserInput) => {
    try {
      await createUser({ variables: { user: data } });
      toast.success(t('userCreated'));
    } catch (error) {}
  };

  return (
    <>
      <Header title={t('newUser')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <UserForm loading={loading} onSuccess={handleCreateUser} />
        </Card>
        <TextCard
          icon={<HiOutlineLightBulb />}
          title={t('creatingUser')}
          subtitle={t('creatingUserDescription')}
        />
      </div>
    </>
  );
};

export default UserAdd;
