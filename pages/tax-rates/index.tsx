import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Card from '../../components/cards/Card';
import Header from '../../components/layout/Header';

const TaxRatesIndex: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header title={t('taxRates')} subtitle={t('taxRatesDescription')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card margin="m-0">ffda</Card>
      </div>
    </>
  );
};

export default TaxRatesIndex;
