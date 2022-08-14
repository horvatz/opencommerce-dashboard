import { createTheme, ThemeOptions } from '@mui/material';

/**
 * Opencommerce light theme
 */
const OCThemeLight: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00AB55',
    },
    background: {
      default: 'rgb(255, 255, 255, 0.8)',
    },
  },
  typography: {
    subtitle1: {
      fontWeight: '500',
      lineHeight: 2.5,
    },
  },
});

export default OCThemeLight;
