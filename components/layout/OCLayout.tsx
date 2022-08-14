import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
};

/**
 * Opencommerce layout with side menu.
 */
const OCLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default OCLayout;
