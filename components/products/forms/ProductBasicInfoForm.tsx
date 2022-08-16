//import { ProductType } from '../../../src/generated/graphql';
import * as yup from 'yup';
import { Formik } from 'formik';
import TextField from '../../inputs/TextField';
import { useTranslation } from 'react-i18next';
import i18n from '../../../utils/i18n';
import Button from '../../buttons/Button';
import SelectField, { SelectItem } from '../../inputs/SelectField';
import { PRODUCT_TYPES } from '../../../utils/constants';
import { FormProps } from './interfaces';
import MultiSelectField from '../../inputs/MultiSelectField';
import { useState } from 'react';
import {
  CreateProductInput,
  ProductType,
  useCreateProductMutation,
} from '../../../generated/graphql';
import { toast } from 'react-toastify';

type Props = FormProps & {
  productCategories: SelectItem[];
};

const selectProductTypes: SelectItem[] = PRODUCT_TYPES.map((type) => ({
  value: type.toUpperCase(),
  label: i18n.t(`productType${type}`),
}));

const formProductBasicInfoValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required(i18n.t('fieldRequired', { field: i18n.t('name') })),
  description: yup.string().optional(),
  type: yup.mixed().oneOf(['REGULAR', 'DIGITAL']).required(),
});

const ProductBasicInfoForm = ({
  productCategories,
  onSuccess,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<SelectItem[]>(
    []
  );

  const [createProduct, { loading, data: createProductData }] =
    useCreateProductMutation();

  const submit = async (values: CreateProductInput) => {
    try {
      //await createProduct({ variables: { product: values } });
      toast.success(t('productCreated'));
      // Send product id to parent
      onSuccess('cl6p7lf5p0000usgnzp9otrah');
    } catch (error) {}
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          description: '',
          type: 'REGULAR',
        }}
        validationSchema={formProductBasicInfoValidationSchema}
        onSubmit={(values) => {
          const { type, ...other } = values;

          const productType = type as ProductType;

          const categories = selectedCategories.map((category) => ({
            id: Number(category.value),
            name: category.label,
          }));

          submit({ type: productType, categories, ...other });
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
              error={Boolean(errors.description)}
              errorMessage={errors.description}
              onChange={handleChange}
            />
            <SelectField
              name="type"
              label={t('productType')}
              options={selectProductTypes}
              value={values.type}
              error={Boolean(errors.type)}
              errorMessage={errors.type}
              onChange={handleChange}
            />
            <MultiSelectField
              name="categories"
              placeholder={t('categories')}
              onChange={(categories) =>
                setSelectedCategories(categories as SelectItem[])
              }
              options={productCategories}
            />
            <Button type="submit" loading={loading} text={t('createProduct')} />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductBasicInfoForm;
