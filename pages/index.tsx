import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { FiShoppingBag, FiUsers } from 'react-icons/fi';
import StatisticCard from '../components/cards/StatisticCard';
import Header from '../components/layout/Header';
import Loading from '../components/Loading';
import { useStatisticsQuery } from '../generated/graphql';

const Home: NextPage = () => {
  const { t } = useTranslation();

  const {
    data: statisticsData,
    loading: statisticsLoading,
    error: statisticsError,
  } = useStatisticsQuery();

  const statistics = statisticsData?.statistics;

  if (statisticsLoading) {
    return <Loading />;
  }

  if (!statistics || statisticsError) {
    return <></>;
  }

  return (
    <>
      <Header title={t('welcomeBack')} />
      <div className="flex gap-6 flex-wrap">
        <div className="basis-1/3">
          <StatisticCard
            title={t('openOrders')}
            value={statistics.openOrders}
          />
        </div>
        <div className="basis-1/3">
          <StatisticCard
            title={t('closedOrders')}
            value={statistics.closedOrders}
          />
        </div>
        <div className="basis-1/3">
          <StatisticCard title={t('allOrders')} value={statistics.allOrders} />
        </div>
        <div className="basis-1/3">
          <StatisticCard
            icon={<FiShoppingBag />}
            title={t('products')}
            value={statistics.productsCount}
          />
        </div>
        <div className="basis-1/3">
          <StatisticCard
            icon={<FiUsers className="h-5 w-5" />}
            title={t('users')}
            value={statistics.usersCount}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
