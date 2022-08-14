import { Box, Container } from '@mui/material';
import Sidebar, { drawerWidth } from './Sidebar';

type Props = {
  children: React.ReactNode;
};

/**
 * Opencommerce layout with sidebar.
 */
const OCLayout = ({ children }: Props) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box
        component="main"
        position="relative"
        height="100vh"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Container sx={{ py: 8 }}>{children}</Container>
      </Box>
    </Box>
  );
};

export default OCLayout;
