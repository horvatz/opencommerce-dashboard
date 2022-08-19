import type { NextPage } from 'next';
import StatisticCard from '../components/cards/StatisticCard';
import Header from '../components/layout/Header';

const Home: NextPage = () => {
  return (
    <>
      <Header title="Welcome, Janez!" />
      <div className="flex gap-6 flex-wrap">
        <div className="basis-1/3">
          <StatisticCard />
        </div>
        <div className="basis-1/3">
          <StatisticCard />
        </div>
        <div className="basis-1/3">
          <StatisticCard />
        </div>
        <div className="basis-1/3">
          <StatisticCard />
        </div>
        <div className="basis-1/3">
          <StatisticCard />
        </div>
      </div>
    </>
  );
};

export default Home;
