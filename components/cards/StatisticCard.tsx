import { ReactNode } from 'react';
import { TiCalculator } from 'react-icons/ti';

type Props = {
  title: string;
  value: number | string;
  icon?: ReactNode | JSX.Element;
};

const StatisticCard = ({
  title,
  value,
  icon = <TiCalculator className="h-5 w-5" />,
}: Props): JSX.Element => {
  return (
    <article className="flex items-end justify-between p-6 bg-white border border-gray-100 rounded-lg">
      <div className="flex items-center gap-4">
        {icon && (
          <span className="hidden p-2 text-gray-600 bg-gray-100 rounded-full sm:block">
            {icon}
          </span>
        )}
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-medium text-gray-900">{value}</p>
        </div>
      </div>
    </article>
  );
};

export default StatisticCard;
