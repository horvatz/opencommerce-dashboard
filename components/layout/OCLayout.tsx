import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
};

/**
 * Opencommerce layout with sidebar.
 */
const OCLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-row h-screen w-screen">
      <Sidebar />
      <main className="container grow overflow-y-scroll pt-28">{children}</main>
    </div>
  );
};

export default OCLayout;
