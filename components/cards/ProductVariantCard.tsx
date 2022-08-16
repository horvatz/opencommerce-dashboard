import { FiHash, FiPackage, FiXCircle } from 'react-icons/fi';
import { ProductVariantDetailsFragment } from '../../generated/graphql';

type Props = {
  variant: ProductVariantDetailsFragment;
  onRemove: () => void;
};

const ProductVariantCard = ({ variant, onRemove }: Props): JSX.Element => {
  return (
    <div className="relative p-6 block h-min border border-gray-100 shadow-lg rounded-xl">
      <span
        onClick={onRemove}
        className="absolute cursor-pointer right-4 top-4 rounded-full text-red-600 font-medium text-xl"
      >
        <FiXCircle />
      </span>
      <div className="flex flex-col">
        <h5 className="text-md font-bold text-gray-900">{variant.name}</h5>
        <div className="inline-flex gap-1 items-center text-gray-500">
          <FiHash /> {variant.sku}
        </div>
        <div className="inline-flex gap-1 items-center text-gray-500">
          <FiPackage /> {variant.weight} g
        </div>
        <p className="text-gray-900 font-medium">{variant.price} EUR</p>
      </div>
    </div>
  );
};

export default ProductVariantCard;
