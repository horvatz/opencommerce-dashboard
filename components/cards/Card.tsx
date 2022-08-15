type Props = {
  children: React.ReactNode;
  padding?: string;
};

/**
 * Opencommerce card component
 *
 * @returns {JSX.Element}
 */
const Card = ({ children, padding = 'p-8' }: Props): JSX.Element => {
  return (
    <div
      className={`relative block h-min ${padding} border border-gray-100 shadow-xl rounded-xl`}
    >
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default Card;
