import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
};

/**
 * Opencommerce layout with sidebar.
 */
const OCLayout = ({ children }: Props) => {
  return (
    <div className="flex bg-slate-50 flex-row h-screen w-screen">
      <Sidebar />
      <main className="container grow overflow-y-scroll pt-20 2xl:pt-28 pb-14">
        {children}
      </main>
    </div>
  );
};

export default OCLayout;
