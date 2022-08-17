//import { ProductType } from '../../../src/generated/graphql';
import * as yup from 'yup';
import { Formik } from 'formik';
import TextField from '../../inputs/TextField';
import { useTranslation } from 'react-i18next';
import i18n from '../../../utils/i18n';
import Button from '../../buttons/Button';
import SelectField, { SelectItem } from '../../inputs/SelectField';
import { PRODUCT_TYPES } from '../../../utils/constants';
import MultiSelectField from '../../inputs/MultiSelectField';
import { useState } from 'react';
import {
  ProductType,
  useProductCategoriesQuery,
} from '../../../generated/graphql';

export interface ProductBasicInfoFormProps {
  name: string;
  description: string;
  type: ProductType;
  categories: { id: number; name: string }[];
}

type Props = {
  onSuccess: (values: ProductBasicInfoFormProps) => void;
  values?: ProductBasicInfoFormProps;
  loading?: boolean;
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
  categories: yup
    .array()
    .of(
      yup
        .object()
        .shape({ id: yup.number().required(), name: yup.string().required() })
    )
    .optional(),
});

const ProductBasicInfoForm = ({
  onSuccess,
  values,
  loading = false,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<SelectItem[]>(
    []
  );

  const {
    data: categoriesData,
    loading: categoriesDataLoading,
    error: categoriesDataError,
  } = useProductCategoriesQuery();

  const initialValues = values
    ? { name: values.name, description: values.description, type: values.type }
    : { name: '', description: '', type: 'REGULAR' };

  const selectableCategoryOptions: SelectItem[] =
    categoriesData?.productCategories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  if (categoriesDataLoading || categoriesDataError || !categoriesData) {
    return <></>;
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={formProductBasicInfoValidationSchema}
        onSubmit={(values) => {
          const { type, ...other } = values;

          const productType = type as ProductType;

          const categories = selectedCategories.map((category) => ({
            id: Number(category.value),
            name: category.label,
          }));

          onSuccess({
            name: other.name,
            description: other.description,
            type: productType,
            categories: categories,
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
              options={selectableCategoryOptions}
            />
            <Button type="submit" loading={loading} text={t('createProduct')} />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductBasicInfoForm;
