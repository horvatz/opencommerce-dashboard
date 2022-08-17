import {
  ProductDetailsFragment,
  useUploadProductMediaMutation,
} from '../generated/graphql';

type Props = {
  product: ProductDetailsFragment;
};

/**
 * Dropzone for uploading images.
 *
 * @returns {JSX.Element}
 */
const ImageDropzone = ({ product }: Props): JSX.Element => {
  /*const [uploadMedia] = useUploadProductMediaMutation({
    onCompleted(data) {
      console.log(data);
    },
  });

  const onFileDrop = (e) => {
    const file = e.currentTarget.files[0];
    if (!file) return;
    /*uploadMedia({
      variables: { productId: product.id, media: file },
    });
  }*/
  return (
    <section className="py-5">
      {/*<div
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
    */}
      {/*<input type="file" onChange={onFileDrop} />*/}
    </section>
  );
};

export default ImageDropzone;
