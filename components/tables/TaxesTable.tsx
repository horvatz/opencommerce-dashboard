import { useTranslation } from 'react-i18next';
import { FiEdit, FiXCircle } from 'react-icons/fi';
import { TaxRateDetailsFragment } from '../../generated/graphql';

type Props = {
  rates: TaxRateDetailsFragment[];
  onTaxRateRemove: (id: number) => void;
  onTaxRateEdit: (id: number) => void;
};

const TaxesTable = ({
  rates,
  onTaxRateRemove,
  onTaxRateEdit,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="pl-2 text-left bg-white"></th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">{t('name')}</div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">{t('description')}</div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">{t('ratePercent')}</div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap" />
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {rates?.map((item) => {
            const { id, name, description, rate } = item;
            return (
              <tr key={id}>
                <td className="bg-white"></td>
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {name}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {description}
                </td>
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {rate}
                </td>
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="inline-flex items-center gap-6 font-medium text-xl">
                    <FiEdit
                      className="cursor-pointer"
                      onClick={() => onTaxRateEdit(parseInt(id))}
                    />
                    <FiXCircle
                      onClick={() => onTaxRateRemove(parseInt(id))}
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

export default TaxesTable;
