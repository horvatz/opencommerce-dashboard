import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Loading from '../../components/Loading';
import OrdersFilterTable from '../../components/tables/OrdersFilterTable';
import { useCheckoutsQuery } from '../../generated/graphql';

const OrdersIndex: NextPage = () => {
  const { t } = useTranslation();

  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useCheckoutsQuery({
    variables: { filter: {} },
  });

  if (ordersLoading) {
    return <Loading />;
  }

  if (!ordersData || ordersError) {
    return <></>;
  }

  const orders = ordersData.checkouts;

  return (
    <>
      <Header title={t('orders')} />
      <OrdersFilterTable orders={orders} />
    </>
  );
};

export default OrdersIndex;
