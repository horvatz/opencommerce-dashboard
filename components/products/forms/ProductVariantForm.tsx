import { FormProps } from './interfaces';
import * as yup from 'yup';
import i18n from '../../../utils/i18n';
import { Formik } from 'formik';
import TextField from '../../inputs/TextField';
import { useTranslation } from 'react-i18next';
import Button from '../../buttons/Button';
import {
  CreateProductVariantWithProductInput,
  useCreateProductVariantMutation,
} from '../../../generated/graphql';
import { toast } from 'react-toastify';

type Props = FormProps & {
  productId: string;
};

const formProductVariantValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required(i18n.t('fieldRequired', { field: i18n.t('name') })),
  description: yup.string().optional(),
  sku: yup.string().optional(),
  weight: yup.number().optional(),
  available: yup.boolean().optional(),
  price: yup
    .number()
    .required(i18n.t('fieldRequired', { field: i18n.t('price') })),
  salePrice: yup.number().optional(),
});

const ProductVariantForm = ({ productId, onSuccess }: Props) => {
  const { t } = useTranslation();

  const [createProductVariant, { loading }] = useCreateProductVariantMutation();

  const submit = async (values: CreateProductVariantWithProductInput) => {
    try {
      await createProductVariant({
        variables: { productId: productId, variant: values },
      });
      toast.success(t('productVariantCreated'));
      onSuccess();
    } catch (error) {}
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          description: '',
          sku: '',
          weight: undefined,
          available: true,
          price: '',
          salePrice: undefined,
        }}
        validationSchema={formProductVariantValidationSchema}
        onSubmit={(values, { resetForm }) => {
          submit(values).then(() => resetForm());
        }}
      >
        {({ values, touched, handleChange, handleSubmit, errors }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField
              id="name"
              name="name"
              label={t('name')}
              value={values.name}
              error={touched.name && Boolean(errors.name)}
              errorMessage={touched.name ? errors.name : undefined}
              onChange={handleChange}
            />
            <TextField
              id="description"
              name="description"
              label={t('description')}
              value={values.description}
              error={touched.description && Boolean(errors.description)}
              errorMessage={
                touched.description ? errors.description : undefined
              }
              onChange={handleChange}
            />
            <TextField
              id="sku"
              name="sku"
              label={t('sku')}
              value={values.sku}
              error={touched.sku && Boolean(errors.sku)}
              errorMessage={touched.sku ? errors.sku : undefined}
              onChange={handleChange}
            />
            <TextField
              id="weight"
              name="weight"
              label={t('weight')}
              value={values.weight}
              type="number"
              step={0.001}
              error={touched.weight && Boolean(errors.weight)}
              errorMessage={touched.weight ? errors.weight : undefined}
              onChange={handleChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <TextField
                id="price"
                name="price"
                label={t('price')}
                value={values.price}
                type="number"
                step={0.01}
                error={touched.price && Boolean(errors.price)}
                errorMessage={touched.price ? errors.price : undefined}
                onChange={handleChange}
              />
              <TextField
                id="salePrice"
                name="salePrice"
                label={t('salePrice')}
                value={values.salePrice}
                type="number"
                step={0.01}
                error={touched.salePrice && Boolean(errors.salePrice)}
                errorMessage={touched.salePrice ? errors.salePrice : undefined}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              loading={loading}
              text={t('addProductVariant')}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductVariantForm;
