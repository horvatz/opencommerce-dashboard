type Props = {
  title: string;
  subtitle?: string;
};

const Header = ({ title, subtitle }: Props): JSX.Element => {
  return (
    <header>
      <div className="max-w-screen-xl py-8 mx-auto">
        <div className="sm:justify-between sm:items-center sm:flex">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
