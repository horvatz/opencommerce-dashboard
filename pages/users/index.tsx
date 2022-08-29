import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Card from '../../components/cards/Card';
import EditUserDialog from '../../components/dialogs/EditUserDialog';
import Header from '../../components/layout/Header';
import Loading from '../../components/Loading';
import UsersTable from '../../components/tables/UsersTable';
import {
  UpdateUserInput,
  useRemoveUserMutation,
  useUpdateUserMutation,
  useUsersQuery,
} from '../../generated/graphql';

const UsersIndex: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [editUserDialogOpen, setEditUserDialogOpen] = useState<{
    open: boolean;
    userId: string | null;
  }>({
    open: false,
    userId: null,
  });

  const {
    data: usersData,
    error: usersError,
    loading: usersLoading,
  } = useUsersQuery();

  const [removeUser] = useRemoveUserMutation({ refetchQueries: ['Users'] });

  const [updateUser] = useUpdateUserMutation({ refetchQueries: ['Users'] });

  if (usersLoading) {
    <Loading />;
  }

  if (!usersData || usersError) {
    return <></>;
  }

  const handleRemoveUser = async (id: string) => {
    try {
      await removeUser({ variables: { id } });
      toast.success(t('userRemoved'));
    } catch (error) {}
  };

  const handleUpdateUser = async (id: string, values: UpdateUserInput) => {
    try {
      await updateUser({ variables: { id, user: values } });
      toast.success(t('userUpdated'));
      setEditUserDialogOpen({ open: false, userId: null });
    } catch (error) {}
  };

  const currentUser = usersData.users.find(
    (user) => user.id === editUserDialogOpen.userId
  );

  return (
    <>
      <Header
        title={t('users')}
        actionText={t('createUser')}
        onAction={() => router.push('/users/add')}
      />
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
        <Card margin="m-0" padding="py-3">
          <UsersTable
            users={usersData.users}
            onUserEdit={(id) =>
              setEditUserDialogOpen({ open: true, userId: id })
            }
            onUserRemove={handleRemoveUser}
          />
        </Card>
      </div>
      <EditUserDialog
        open={editUserDialogOpen.open}
        initialValues={{
          firstName: currentUser?.firstName ?? '',
          lastName: currentUser?.lastName ?? '',
          email: currentUser?.email ?? '',
          password: '',
        }}
        onSuccess={(values) =>
          editUserDialogOpen.userId
            ? handleUpdateUser(editUserDialogOpen.userId, values)
            : undefined
        }
        onClose={() => setEditUserDialogOpen({ open: false, userId: null })}
      />
    </>
  );
};

export default UsersIndex;
