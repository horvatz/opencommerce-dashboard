import { useState } from 'react';
import { FiSidebar } from 'react-icons/fi';
import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
};

/**
 * Opencommerce layout with sidebar.
 */
const OCLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex relative bg-slate-50 flex-row h-screen w-screen">
      <div
        className="absolute text-gray-500 h-10 w-10"
        onClick={() => setSidebarOpen(true)}
      >
        <FiSidebar className="h-full w-full" />
      </div>
      <Sidebar mobileOpen={sidebarOpen} />
      <main
        onClick={() =>
          sidebarOpen === true ? setSidebarOpen(false) : undefined
        }
        className="sm:container grow overflow-y-scroll pt-20 2xl:pt-28 pb-14"
      >
        {children}
      </main>
    </div>
  );
};

export default OCLayout;
