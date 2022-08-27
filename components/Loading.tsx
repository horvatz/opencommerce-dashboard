import { FiLoader } from 'react-icons/fi';

const Loading = (): JSX.Element => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <FiLoader className="h-8 w-8 animate-spin" />
    </div>
  );
};

export default Loading;
