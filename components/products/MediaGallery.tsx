import Image from 'next/image';
import { FiXCircle } from 'react-icons/fi';
import { ProductMediaDetailsFragment } from '../../generated/graphql';
import { IMAGE_HOST } from '../../utils/constants';

type Props = {
  onRemove: (mediaId: string) => void;
  media: ProductMediaDetailsFragment[];
};

const MediaGallery = ({ media, onRemove }: Props): JSX.Element => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center pt-5">
      {media.map((media) => (
        <div key={media.id} className="h-32 w-32 shadow-xl relative rounded-xl">
          <Image
            src={`${IMAGE_HOST}${media.path}`}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
            alt=""
          />
          <FiXCircle
            onClick={() => onRemove(media.id)}
            className="cursor-pointer h-6 w-6 fill-red-600 absolute -top-2 -right-2 text-white"
          />
        </div>
      ))}
    </div>
  );
};

export default MediaGallery;
