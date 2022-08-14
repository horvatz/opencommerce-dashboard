import Card from './Card';

type Props = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

/**
 * Card with text (i. e. for information)
 *
 * @returns {JSX.Element}
 */
const TextCard = ({ title, subtitle, icon }: Props) => {
  return (
    <Card>
      {icon}
      <h5 className="mt-4 text-xl font-bold text-gray-900">{title}</h5>
      <p className="hidden text-gray-500 mt-2 text-sm sm:block">{subtitle}</p>
    </Card>
  );
};

export default TextCard;
