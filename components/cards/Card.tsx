type Props = {
  children: React.ReactNode;
};

/**
 * Opencommerce card component
 *
 * @returns {JSX.Element}
 */
const Card = ({ children }: Props): JSX.Element => {
  return (
    <div className="relative block h-min p-8 border border-gray-100 shadow-xl rounded-xl">
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default Card;
