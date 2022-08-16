import { atom } from 'recoil';

export interface ProductWizard {
  productId: string | null;
  step: string;
}

export const productWizardState = atom({
  key: 'productWizardState',
  default: {
    productId: null,
    step: 'product-basic-details',
  } as ProductWizard,
});
