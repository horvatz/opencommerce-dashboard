import { FiHash, FiPackage, FiXCircle } from 'react-icons/fi';

type Props = {
  onDelete: () => void;
};

const ProductVariantCard = ({ onDelete }: Props): JSX.Element => {
  return (
    <div className="relative p-6 block h-min border border-gray-100 shadow-lg rounded-xl">
      <span
        onClick={onDelete}
        className="absolute cursor-pointer right-4 top-4 rounded-full text-red-600 font-medium text-xl"
      >
        <FiXCircle />
      </span>
      <div className="flex flex-col">
        <h5 className="text-md font-bold text-gray-900">Grey variant</h5>
        <div className="inline-flex gap-1 items-center text-gray-500">
          <FiHash /> 192321
        </div>
        <div className="inline-flex gap-1 items-center text-gray-500">
          <FiPackage /> 12,12 g
        </div>
        <p className="text-gray-900 font-medium">12,99 EUR</p>
      </div>
    </div>
  );
};

export default ProductVariantCard;
