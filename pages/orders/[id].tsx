import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Badge from '../../components/Badge';
import Button, { ButtonColor } from '../../components/buttons/Button';
import AddressCard from '../../components/cards/AddressCard';
import Card from '../../components/cards/Card';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import EditCheckoutStatusDialog from '../../components/dialogs/EditCheckoutStatusDialog';
import OrderTable from '../../components/tables/OrderTable';
import {
  CheckoutStatus,
  useCheckoutByIdLazyQuery,
  useUpdateCheckoutStatusMutation,
} from '../../generated/graphql';
import { formatPrice } from '../../utils/helpers';

const OrderDetails: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  // Fetch checkout
  const [getCheckoutById, { loading, error, data }] =
    useCheckoutByIdLazyQuery();

  const [updateCheckoutStatus, { loading: updateLoading }] =
    useUpdateCheckoutStatusMutation();

  useEffect(() => {
    if (router.query.id) {
      getCheckoutById({ variables: { id: router.query.id as string } });
    }
  }, [getCheckoutById, router.query.id]);

  if (loading || updateLoading || error || !data) {
    return <div>Loading...</div>;
  }

  const checkout = data.completedCheckout;

  const handleStatusChange = async (status: CheckoutStatus) => {
    if (statusDialogOpen) {
      setStatusDialogOpen(false);
    } else if (cancelDialogOpen) {
      setCancelDialogOpen(false);
    }

    try {
      await updateCheckoutStatus({
        variables: {
          id: checkout.id,
          status,
        },
      });
      toast.success(t('orderStatusUpdated'));
    } catch (error) {}
  };

  const subtotalPrice =
    checkout.items?.reduce((a, b) => a + b.quantity * b.variant.price, 0) ?? 0;

  const totalPrice: number =
    Number(checkout.shippingMethod?.price) + Number(subtotalPrice);

  return (
    <>
      <div className="pb-8 inline-flex items-center justify-between w-full">
        <div className="inline-flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {t('order', { id: checkout.id })}
          </h1>
          <Badge
            text={checkout.status}
            variant={
              checkout.status === CheckoutStatus.Closed
                ? 'success'
                : checkout.status === CheckoutStatus.Canceled
                ? 'error'
                : 'primary'
            }
          />
        </div>
        <div className="space-x-3">
          <Button
            onClick={() => setStatusDialogOpen(true)}
            variant="outlined"
            color={ButtonColor.PRIMARY}
            text={t('changeStatus')}
          />
          {checkout.status !== CheckoutStatus.Canceled && (
            <Button
              color={ButtonColor.ALERT}
              text={t('cancelOrder')}
              onClick={() => setCancelDialogOpen(true)}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="grid grid-cols-1 gap-3">
            <Card margin="m-0" padding="p-0">
              <h2 className="text-xl p-8 font-medium text-gray-900">
                {t('products')}
              </h2>
              <OrderTable checkoutItems={checkout.items} />
            </Card>
            <Card margin="m-0">
              <div className="inline-flex gap-3 items-center">
                <h2 className="text-xl font-medium text-gray-900">
                  {t('paymentDetails')}
                </h2>
                <Badge text="Paid by card" variant="success" />
              </div>
              <div className="flex flex-col gap-3 pt-6">
                <div className="inline-flex justify-between">
                  <p>{t('subtotal')}</p>
                  <span>{formatPrice(subtotalPrice)}</span>
                </div>
                <div className="inline-flex justify-between">
                  <p>{t('shipping')}</p>
                  <span>{formatPrice(checkout.shippingMethod?.price)}</span>
                </div>
                <div className="inline-flex font-bold justify-between">
                  <p>{t('totalPrice')}</p>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {checkout.shippingAddress && checkout.billingAddress && (
          <AddressCard
            email={checkout.email}
            phone={checkout.phone}
            billingAddress={checkout.billingAddress}
            shippingAddress={checkout.shippingAddress}
          />
        )}
      </div>
      <EditCheckoutStatusDialog
        value={checkout.status}
        onSuccess={handleStatusChange}
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
      />
      <ConfirmDialog
        text={t('cancelOrder')}
        description={t('cancelOrderDescription')}
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        onConfirm={() => handleStatusChange(CheckoutStatus.Canceled)}
      />
    </>
  );
};

export default OrderDetails;
