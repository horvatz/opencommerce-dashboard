import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { FiImage } from 'react-icons/fi';

type Props = {
  onDrop: (acceptedFiles: unknown) => void;
};

/**
 * Dropzone for uploading images.
 *
 * @returns {JSX.Element}
 */
const ImageDropzone = ({ onDrop }: Props): JSX.Element => {
  const { t } = useTranslation();

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <section className="py-5">
      <div
        {...getRootProps({
          className:
            'bg-gray-50 p-8 text-center border-dashed border-2 border-blue-200',
        })}
      >
        <input {...getInputProps()} />
        <div className="flex gap-2 flex-col justify-center items-center">
          <FiImage className="text-gray-200 h-10 w-10" />
          <p className="text-gray-500 text-xs font-medium">{t('dropImage')}</p>
        </div>
      </div>
    </section>
  );
};

export default ImageDropzone;
