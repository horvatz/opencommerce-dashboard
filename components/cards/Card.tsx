type Props = {
  children: React.ReactNode;
  background?: string;
  padding?: string;
};

/**
 * Opencommerce card component
 *
 * @returns {JSX.Element}
 */
const Card = ({
  children,
  padding = 'p-8',
  background,
}: Props): JSX.Element => {
  return (
    <div
      className={`relative ${background}  block h-min ${padding} border border-gray-100 shadow-xl rounded-xl`}
    >
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default Card;
