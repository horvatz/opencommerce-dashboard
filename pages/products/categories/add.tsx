import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Card from '../../../components/cards/Card';
import TextCard from '../../../components/cards/TextCard';
import Header from '../../../components/layout/Header';
import ProductCategoryForm from '../../../components/products/forms/ProductCategoryForm';
import {
  CreateProductCategoryInput,
  useCreateProductCategoryMutation,
} from '../../../generated/graphql';
import { HiOutlineLightBulb } from 'react-icons/hi';

const ProductCategoryAdd: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [createProductCategory, { loading }] =
    useCreateProductCategoryMutation();

  const createProductCategoryHandler = async (
    data: CreateProductCategoryInput
  ) => {
    try {
      await createProductCategory({ variables: { category: data } });
      toast.success(t('productCategoryCreated'));
      router.push('/products/categories');
    } catch (error) {}
  };

  return (
    <>
      <Header title={t('newCategory')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <ProductCategoryForm
            loading={loading}
            onSuccess={(data) => createProductCategoryHandler(data)}
          />
        </Card>
        <TextCard
          icon={<HiOutlineLightBulb />}
          title={t('creatingCategory')}
          subtitle={t('creatingCategoryDescription')}
        />
      </div>
    </>
  );
};

export default ProductCategoryAdd;
