import SideMenu from './SideMenu';

type Props = {
  children: React.ReactNode;
};

/**
 * Opencommerce layout with side menu.
 */
const OCLayout = ({ children }: Props) => {
  return (
    <>
      <SideMenu />
      <main>{children}</main>
    </>
  );
};

export default OCLayout;
