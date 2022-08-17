import { ProductVariantDetailsFragment } from '../../generated/graphql';
import { BiPalette } from 'react-icons/bi';
import { formatPrice } from '../../utils/helpers';
import { FiEdit, FiXCircle } from 'react-icons/fi';

type Props = {
  variant: ProductVariantDetailsFragment;
  onEdit: () => void;
  onRemove: () => void;
};

const ProductVariantItem = ({ variant, onRemove, onEdit }: Props) => {
  return (
    <div className="inline-flex w-full gap-3 items-center relative">
      <BiPalette className="h-6 w-6" />
      <div>
        <h5 className="text-base text-gray-700">{variant.name}</h5>
        <p className="text-sm text-gray-500">{variant.description}</p>
        <h5 className="text-base text-gray-700 font-medium">
          {formatPrice(variant.price)}
        </h5>
      </div>
      <span className="absolute flex flex-col justify-evenly items-center cursor-pointer inset-y-0 right-0 rounded-full  font-medium text-xl">
        <FiXCircle className="text-red-600" onClick={onRemove} />
        <FiEdit className="text-grey-500" onClick={onEdit} />
      </span>
    </div>
  );
};

export default ProductVariantItem;
