import { useTranslation } from 'react-i18next';
import { CheckoutItemDetailsFragment } from '../../generated/graphql';
import { formatPrice } from '../../utils/helpers';

type Props = {
  checkoutItems?: CheckoutItemDetailsFragment[] | null;
};

const OrderTable = ({ checkoutItems }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="pl-2 text-left bg-white"></th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">{t('product')}</div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">{t('sku')}</div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">{t('price')}</div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">{t('quantity')}</div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">{t('totalPrice')}</div>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {checkoutItems?.map((item) => {
            const { id, variant, quantity } = item;
            return (
              <tr key={id}>
                <td className="bg-white"></td>
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {variant.name}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {variant.sku}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {formatPrice(variant.price)}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {quantity}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {formatPrice(quantity * variant.price)}
                </td>
              </tr>
            );
          }) ?? null}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
