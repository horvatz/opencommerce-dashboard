import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { FiImage } from 'react-icons/fi';

/**
 * Dropzone for uploading images.
 *
 * @returns {JSX.Element}
 */
const ImageDropzone = (): JSX.Element => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { t } = useTranslation();

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <section>
      <div
        {...getRootProps({
          className:
            'bg-gray-50 p-5 text-center border-dashed border-2 border-blue-200',
        })}
      >
        <input {...getInputProps()} />
        <div className="flex gap-2 flex-col justify-center items-center">
          <FiImage className="text-gray-200 h-10 w-10" />
          <p className="text-gray-500 text-xs font-medium">{t('dropImage')}</p>
        </div>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default ImageDropzone;
