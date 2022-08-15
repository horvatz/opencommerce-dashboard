import Card from '../../cards/Card';
import ProductVariantCard from '../../cards/ProductVariantCard';
import { StepProps } from '../forms/interfaces';
import ProductVariantForm from '../forms/ProductVariantForm';

/**
 * Step for add product wizard that allows the user to create variants for the product.
 */
const VariantsStep = ({ onComplete }: StepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <ProductVariantForm onSuccess={onComplete} />
      </Card>
      <div className="flex flex-col gap-6">
        <ProductVariantCard onDelete={() => {}} />
        <ProductVariantCard onDelete={() => {}} />
      </div>
    </div>
  );
};

export default VariantsStep;
