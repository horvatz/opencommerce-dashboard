import Image from 'next/image';
import { FiPackage, FiXCircle } from 'react-icons/fi';
import { ProductDetailsFragment } from '../../generated/graphql';

type Props = {
  product: Pick<
    ProductDetailsFragment,
    'id' | 'name' | 'description' | 'media'
  >;
  onRemove: (id: string) => void;
};

const ProductItem = ({ product, onRemove }: Props): JSX.Element => {
  return (
    <div className="relative py-6 block h-min rounded-xl">
      <div className="flex flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-6">
          <div className="h-10 w-10">
            {product.media.length > 0 ? (
              <Image
                src={`http://localhost:3000${product.media[0].path}`}
                alt={product.name}
                height={50}
                width={50}
                objectFit="cover"
                objectPosition="center"
              />
            ) : (
              <FiPackage className="h-full w-full" />
            )}
          </div>
          <div>
            <h5 className="text-md font-bold text-gray-900">{product.name}</h5>
            <div className="inline-flex gap-1 items-center text-gray-500">
              {product.description}
            </div>
          </div>
        </div>
        <span
          onClick={() => onRemove(product.id)}
          className="cursor-pointer right-4 top-4 rounded-full text-red-600 font-medium text-xl"
        >
          <FiXCircle />
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
