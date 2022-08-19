import { useTranslation } from 'react-i18next';
import { AddressDetailsFragment } from '../../generated/graphql';
import Card from './Card';

type Props = {
  email?: string;
  phone?: string | null;
  shippingAddress: AddressDetailsFragment;
  billingAddress: AddressDetailsFragment;
};

/**
 * Card for showing shipping and billing address on orders page.
 */
const AddressCard = ({
  shippingAddress,
  billingAddress,
  email,
  phone,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Card margin="m-0" padding="p-0">
      <div className="border-b p-8">
        <h2 className="text-xl pb-3 font-medium text-gray-900">
          {t('contactDetails')}
        </h2>
        <p className="text-gray-500">{email}</p>
        <p className="text-gray-500">{phone}</p>
      </div>
      <div className="border-b p-8">
        <h2 className="text-xl pb-3 font-medium text-gray-900">
          {t('billingAddress')}
        </h2>
        <p className="text-gray-500">
          {billingAddress.firstName} {billingAddress.lastName}
        </p>
        <p className="text-gray-500">{billingAddress.streetAddress}</p>
        <p className="text-gray-500">
          {billingAddress.zipCode} {billingAddress.city}
        </p>
        <p className="text-gray-500">
          {billingAddress.country.name}, {billingAddress.country.code}
        </p>
      </div>
      <div className="border-b p-8">
        <h2 className="text-xl pb-3 font-medium text-gray-900">
          {t('shippingAddress')}
        </h2>
        <p className="text-gray-500">
          {shippingAddress.firstName} {shippingAddress.lastName}
        </p>
        <p className="text-gray-500">{shippingAddress.streetAddress}</p>
        <p className="text-gray-500">
          {shippingAddress.zipCode} {shippingAddress.city}
        </p>
        <p className="text-gray-500">
          {shippingAddress.country.name}, {shippingAddress.country.code}
        </p>
      </div>
    </Card>
  );
};

export default AddressCard;
