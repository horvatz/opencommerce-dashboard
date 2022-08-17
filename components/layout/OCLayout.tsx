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
      <main className="container bg-white grow overflow-y-scroll pt-20 2xl:pt-28 pb-14">
        {children}
      </main>
    </div>
  );
};

export default OCLayout;
