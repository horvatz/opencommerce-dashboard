import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { FiCommand, FiPackage, FiSliders } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { useProductByIdQuery } from '../../../generated/graphql';
import { productWizardState } from '../../../utils/atoms';
import Button from '../../buttons/Button';
import Card from '../../cards/Card';

const ReviewStep = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  const [productWizard, setProductWizard] = useRecoilState(productWizardState);

  const { data: productsData, error } = useProductByIdQuery({
    variables: { id: productWizard.productId ?? '' },
    skip: !productWizard.productId,
  });

  if (error || !productsData) {
    return <></>;
  }

  const resetWizard = () => {
    setProductWizard({
      productId: null,
      step: 'product-basic-details',
    });
    router.replace('/');
  };

  return (
    <div className="flex flex-col pt-8 gap-6 place-content-center text-center">
      <div>
        <h2 className="text-4xl font-bold text-gray-900">{t('congrats')}</h2>
        <p className="mt-1.5 text-sm text-gray-500">
          {t('productCreatedDescription')}
        </p>
      </div>
      <div className="mt-16">
        <Card>
          <div className="flex flex-col h-48 justify-between items-center">
            <div className="flex flex-col gap-2 justify-center items-center">
              <FiPackage className="h-12 w-12" />
              <h4 className="text-xl font-bold text-gray-900">
                {productsData.product.name}
              </h4>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="inline-flex gap-1 items-center text-gray-500">
                <FiSliders /> {productsData.product.variants?.length ?? 0}{' '}
                {t('variants').toLowerCase()}
              </div>
              <div className="inline-flex gap-1 items-center text-gray-500">
                <FiCommand /> {t('productType')}:{' '}
                {productsData.product.type.toLowerCase()}
              </div>
              <p className="text-gray-900 text-base font-bold">
                {productsData.product?.variants
                  ? [0]
                    ? productsData.product.variants[0].price
                    : 0
                  : 0}{' '}
                EUR
              </p>
            </div>
          </div>
        </Card>
        <div className="mt-16">
          <Button onClick={resetWizard} text={t('backHome')} />
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
