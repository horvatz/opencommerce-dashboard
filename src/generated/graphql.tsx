import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Decimal: any;
  Upload: any;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  companyName?: Maybe<Scalars['String']>;
  country: Country;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  streetAddress: Scalars['String'];
  vatNumber?: Maybe<Scalars['String']>;
  zipCode: Scalars['String'];
};

export type Checkout = {
  __typename?: 'Checkout';
  billingAddress?: Maybe<Address>;
  completed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  items?: Maybe<Array<CheckoutItem>>;
  note?: Maybe<Scalars['String']>;
  shippingAddress?: Maybe<Address>;
  shippingMethod?: Maybe<ShippingMethod>;
  updatedAt: Scalars['DateTime'];
};

export type CheckoutItem = {
  __typename?: 'CheckoutItem';
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  variant: ProductVariant;
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CountryInput = {
  code: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type CreateAddressInput = {
  city: Scalars['String'];
  companyName?: InputMaybe<Scalars['String']>;
  /** Pre-defined country */
  country: CountryInput;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  streetAddress: Scalars['String'];
  vatNumber?: InputMaybe<Scalars['String']>;
  zipCode: Scalars['String'];
};

export type CreateProductCategoryInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateProductInput = {
  categories?: InputMaybe<Array<FindProductCategoryInput>>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  taxRate?: InputMaybe<FindTaxRateInput>;
  /** Type of the product (default is REGULAR), can also be DIGITAL */
  type?: InputMaybe<ProductType>;
  variants?: InputMaybe<Array<CreateProductVariantWithProductInput>>;
};

export type CreateProductVariantWithProductInput = {
  available?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Decimal'];
  salePrice?: InputMaybe<Scalars['Decimal']>;
  sku?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Decimal']>;
};

export type FindProductCategoryInput = {
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type FindTaxRateInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  rate?: InputMaybe<Scalars['Decimal']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  checkoutBillingAddressUpdate: Checkout;
  checkoutComplete: Checkout;
  checkoutShippingAddressUpdate: Checkout;
  createProductCategory: ProductCategory;
  productCreate: Product;
  productRemove: Product;
  productUpdate: Product;
  productVariantCreate: ProductVariant;
  productVariantMediaRemove: ProductVariant;
  productVariantMediaUpload: ProductVariant;
  productVariantRemove: ProductVariant;
  productVariantUpdate: ProductVariant;
  removeProductCategory: ProductCategory;
  updateProductCategory: ProductCategory;
};


export type MutationCheckoutBillingAddressUpdateArgs = {
  address: CreateAddressInput;
  id: Scalars['String'];
};


export type MutationCheckoutCompleteArgs = {
  id: Scalars['String'];
};


export type MutationCheckoutShippingAddressUpdateArgs = {
  address: CreateAddressInput;
  id: Scalars['String'];
};


export type MutationCreateProductCategoryArgs = {
  createProductCategoryInput: CreateProductCategoryInput;
};


export type MutationProductCreateArgs = {
  product: CreateProductInput;
};


export type MutationProductRemoveArgs = {
  id: Scalars['String'];
};


export type MutationProductUpdateArgs = {
  id: Scalars['String'];
  product: UpdateProductInput;
};


export type MutationProductVariantCreateArgs = {
  productId: Scalars['String'];
  variant: CreateProductVariantWithProductInput;
};


export type MutationProductVariantMediaRemoveArgs = {
  mediaId: Scalars['String'];
  productVariantId: Scalars['String'];
};


export type MutationProductVariantMediaUploadArgs = {
  file: Scalars['Upload'];
  productVariantId: Scalars['String'];
};


export type MutationProductVariantRemoveArgs = {
  id: Scalars['String'];
};


export type MutationProductVariantUpdateArgs = {
  id: Scalars['String'];
  variant: UpdateProductVariantWithProductInput;
};


export type MutationRemoveProductCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateProductCategoryArgs = {
  updateProductCategoryInput: UpdateProductCategoryInput;
};

export type Product = {
  __typename?: 'Product';
  categories?: Maybe<Array<ProductCategory>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  taxRate?: Maybe<TaxRate>;
  type: ProductType;
  variants?: Maybe<Array<ProductVariant>>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ProductMedia = {
  __typename?: 'ProductMedia';
  fileName: Scalars['String'];
  id: Scalars['ID'];
  path: Scalars['String'];
};

export enum ProductType {
  Digital = 'DIGITAL',
  Regular = 'REGULAR'
}

export type ProductVariant = {
  __typename?: 'ProductVariant';
  available: Scalars['Boolean'];
  categories?: Maybe<Array<ProductMedia>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Decimal'];
  salePrice?: Maybe<Scalars['Decimal']>;
  sku?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Decimal']>;
};

export type Query = {
  __typename?: 'Query';
  checkout: Checkout;
  product: Product;
  productCategories: Array<ProductCategory>;
  productCategory: ProductCategory;
  productVariant: ProductVariant;
  products: Array<Product>;
};


export type QueryCheckoutArgs = {
  id: Scalars['String'];
};


export type QueryProductArgs = {
  id: Scalars['String'];
};


export type QueryProductCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryProductVariantArgs = {
  id: Scalars['String'];
};

export type ShippingMethod = {
  __typename?: 'ShippingMethod';
  active: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  maxDeliveryDays?: Maybe<Scalars['Int']>;
  minDeliveryDays?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  price: Scalars['Decimal'];
};

export type TaxRate = {
  __typename?: 'TaxRate';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  rate: Scalars['Decimal'];
};

export type UpdateProductCategoryInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateProductInput = {
  categories?: InputMaybe<Array<FindProductCategoryInput>>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  taxRate?: InputMaybe<FindTaxRateInput>;
  /** Type of the product (default is REGULAR), can also be DIGITAL */
  type?: InputMaybe<ProductType>;
  variants?: InputMaybe<Array<CreateProductVariantWithProductInput>>;
};

export type UpdateProductVariantWithProductInput = {
  available?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Decimal']>;
  salePrice?: InputMaybe<Scalars['Decimal']>;
  sku?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Decimal']>;
};

export type ProductVariantDetailsFragment = { __typename?: 'ProductVariant', id: string, sku?: string | null, name: string, description?: string | null, weight?: any | null, available: boolean, price: any, salePrice?: any | null };

export type AllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', name: string }> };

export type ProductCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductCategoriesQuery = { __typename?: 'Query', productCategories: Array<{ __typename?: 'ProductCategory', id: string, name: string, description?: string | null }> };

export const ProductVariantDetailsFragmentDoc = gql`
    fragment ProductVariantDetails on ProductVariant {
  id
  sku
  name
  description
  weight
  available
  price
  salePrice
}
    `;
export const AllProductsDocument = gql`
    query AllProducts {
  products {
    name
  }
}
    `;

/**
 * __useAllProductsQuery__
 *
 * To run a query within a React component, call `useAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProductsQuery(baseOptions?: Apollo.QueryHookOptions<AllProductsQuery, AllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllProductsQuery, AllProductsQueryVariables>(AllProductsDocument, options);
      }
export function useAllProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllProductsQuery, AllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllProductsQuery, AllProductsQueryVariables>(AllProductsDocument, options);
        }
export type AllProductsQueryHookResult = ReturnType<typeof useAllProductsQuery>;
export type AllProductsLazyQueryHookResult = ReturnType<typeof useAllProductsLazyQuery>;
export type AllProductsQueryResult = Apollo.QueryResult<AllProductsQuery, AllProductsQueryVariables>;
export const ProductCategoriesDocument = gql`
    query ProductCategories {
  productCategories {
    id
    name
    description
  }
}
    `;

/**
 * __useProductCategoriesQuery__
 *
 * To run a query within a React component, call `useProductCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<ProductCategoriesQuery, ProductCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductCategoriesQuery, ProductCategoriesQueryVariables>(ProductCategoriesDocument, options);
      }
export function useProductCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductCategoriesQuery, ProductCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductCategoriesQuery, ProductCategoriesQueryVariables>(ProductCategoriesDocument, options);
        }
export type ProductCategoriesQueryHookResult = ReturnType<typeof useProductCategoriesQuery>;
export type ProductCategoriesLazyQueryHookResult = ReturnType<typeof useProductCategoriesLazyQuery>;
export type ProductCategoriesQueryResult = Apollo.QueryResult<ProductCategoriesQuery, ProductCategoriesQueryVariables>;