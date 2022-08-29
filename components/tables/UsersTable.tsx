import { useTranslation } from 'react-i18next';
import { FiEdit, FiXCircle } from 'react-icons/fi';
import { UserDetailsFragment } from '../../generated/graphql';
import { formatDate } from '../../utils/helpers';

type Props = {
  users: UserDetailsFragment[];
  onUserRemove: (id: string) => void;
  onUserEdit: (id: string) => void;
};

const UsersTable = ({
  users,
  onUserRemove,
  onUserEdit,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="pl-2 text-left bg-white"></th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">{t('firstName')}</div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">{t('lastName')}</div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">{t('createdAt')}</div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap" />
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users?.map((item) => {
            const { id, firstName, lastName, createdAt } = item;
            return (
              <tr key={id}>
                <td className="bg-white"></td>
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {firstName}
                </td>
                <td className="p-4 font-medium whitespace-nowrap">
                  {lastName}
                </td>
                <td className="p-4 text-gray-700 text-gray-900 whitespace-nowrap">
                  {formatDate(createdAt)}
                </td>
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="inline-flex items-center gap-6 font-medium text-xl">
                    <FiEdit
                      className="cursor-pointer"
                      onClick={() => onUserEdit(id)}
                    />
                    <FiXCircle
                      onClick={() => onUserRemove(id)}
                      className="text-red-600 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            );
          }) ?? null}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
