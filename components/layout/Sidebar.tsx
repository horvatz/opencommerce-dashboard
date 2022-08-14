import {
  LocalOfferOutlined,
  PaidOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

type SidebarOption = {
  id: string;
  label: string;
  icon: React.ReactElement;
};

const SIDEBAR_OPTIONS: SidebarOption[] = [
  { id: 'products', label: 'products', icon: <ShoppingBagOutlined /> },
  { id: 'categories', label: 'categories', icon: <LocalOfferOutlined /> },
  { id: 'orders', label: 'orders', icon: <PaidOutlined /> },
];

export const drawerWidth = 250;

const Sidebar = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        elevation={0}
        hidden={true}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        //PaperProps={{ style: { width: '17%' } }}
      >
        <Box p={3} textAlign="center">
          <Typography variant="h6">{t('appName')}</Typography>
        </Box>
        <List>
          {SIDEBAR_OPTIONS.map(({ id, label, icon }) => (
            <ListItem key={id}>
              <ListItemButton
                onClick={() => router.push(`/${id}`)}
                sx={{ borderRadius: 3 }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ style: { fontSize: '0.9em' } }}
                  primary={t(label)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
