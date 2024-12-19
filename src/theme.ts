import { createTheme, Theme } from '@mui/material/styles';
import { Components } from '@mui/material/styles/components';

const components: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: '#f5f5f5',
      },
    },
  },
  MuiSvgIcon: {
    defaultProps: {
      fontSize: 'medium',
    },
    styleOverrides: {
      root: {
        fontSize: '1.5rem',
      },
    },
  },
};

const theme = createTheme({
  components,
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
