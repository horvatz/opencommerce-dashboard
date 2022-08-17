type Props = {
  children: React.ReactNode;
  background?: string;
  padding?: string;
  margin?: string;
  fullHeight?: boolean;
};

/**
 * Opencommerce card component
 *
 * @returns {JSX.Element}
 */
const Card = ({
  children,
  padding = 'p-8',
  margin = 'mt-4',
  fullHeight = false,
  background = 'bg-white',
}: Props): JSX.Element => {
  return (
    <div
      className={`relative ${background} block ${
        fullHeight ? 'h-full' : 'h-min'
      } ${padding} border border-gray-100 shadow-xl rounded-xl`}
    >
      <div className={margin}>{children}</div>
    </div>
  );
};

export default Card;
