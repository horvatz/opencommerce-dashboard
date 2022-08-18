import { cloneElement, ReactElement } from 'react';
import Card from './Card';

type Props = {
  title: string;
  subtitle?: string;
  icon?: ReactElement;
};

/**
 * Card with text (i. e. for information)
 *
 * @returns {JSX.Element}
 */
const TextCard = ({ title, subtitle, icon }: Props): JSX.Element => {
  return (
    <Card>
      {icon &&
        cloneElement(icon, {
          className: 'w-6 h-6 sm:w-8 sm:h-8 text-gray-500',
        })}

      <h5 className="mt-4 text-xl font-bold text-gray-900">{title}</h5>
      <p className="hidden text-gray-500 mt-2 text-sm sm:block">{subtitle}</p>
    </Card>
  );
};

export default TextCard;
