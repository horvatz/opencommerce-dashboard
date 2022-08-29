import Button from '../buttons/Button';

type Props = {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
};

/**
 * Header for opencommerce pages, to show action button on right pass actionText + onAction.
 */
const Header = ({
  title,
  subtitle,
  actionText,
  onAction,
}: Props): JSX.Element => {
  return (
    <header>
      <div className="w-full gap-6 sm:gap-0 flex items-center justify-between flex-col sm:flex-row pb-8">
        <div className="sm:justify-between sm:items-center sm:flex">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        {actionText && onAction && (
          <Button text={actionText} onClick={onAction} />
        )}
      </div>
    </header>
  );
};

export default Header;
