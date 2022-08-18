import * as yup from 'yup';
import i18n from '../../../utils/i18n';
import { Formik } from 'formik';
import TextField from '../../inputs/TextField';
import { useTranslation } from 'react-i18next';
import Button from '../../buttons/Button';
import { useSetRecoilState } from 'recoil';
import { productWizardState } from '../../../utils/atoms';
import { FormMode } from './interfaces';

export interface ProductVariantFormProps {
  name: string;
  description: string;
  sku: string;
  weight?: number;
  available: boolean;
  price: number;
  salePrice?: number;
}

type Props = {
  onSuccess: (values: ProductVariantFormProps) => void;
  values?: ProductVariantFormProps;
  mode?: FormMode;
  productId: string;
  loading?: boolean;
  showNextStepButton?: boolean;
};

const formProductVariantValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required(i18n.t('fieldRequired', { field: i18n.t('name') })),
  description: yup.string().optional(),
  sku: yup.string().required(i18n.t('fieldRequired', { field: i18n.t('sku') })),
  weight: yup.number().min(0.001).optional(),
  available: yup.boolean().optional(),
  price: yup
    .number()
    .min(0.01, i18n.t('fieldRequired', { field: i18n.t('price') }))
    .required(i18n.t('fieldRequired', { field: i18n.t('price') })),
  salePrice: yup.number().optional(),
});

const ProductVariantForm = ({
  productId,
  values,
  onSuccess,
  loading = false,
  mode = 'create',
  showNextStepButton = false,
}: Props) => {
  const { t } = useTranslation();
  const setProductWizard = useSetRecoilState(productWizardState);

  // Update wizard with next step
  const updateWizardData = () => {
    setProductWizard({
      productId: productId,
      step: 'product-review',
    });
  };

  const initialValues = values
    ? { ...values }
    : {
        name: '',
        description: '',
        sku: '',
        weight: '',
        available: true,
        price: '',
        salePrice: '',
      };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={formProductVariantValidationSchema}
        onSubmit={(values) => {
          onSuccess({
            ...values,
            weight: values.weight ? Number(values.weight) : undefined,
            price: Number(values.price),
            salePrice: Number(values.salePrice),
          });
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
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                loading={loading}
                text={t(
                  mode === 'create'
                    ? 'addProductVariant'
                    : 'updateProductVariant'
                )}
              />
              {showNextStepButton && (
                <Button
                  type="submit"
                  onClick={updateWizardData}
                  loading={loading}
                  variant="outlined"
                  text={t('nextStep')}
                />
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductVariantForm;
