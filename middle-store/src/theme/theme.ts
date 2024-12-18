import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196F3',      // Bright blue
      light: '#64B5F6',     // Lighter blue
      dark: '#1976D2',      // Darker blue
    },
    secondary: {
      main: '#2C3E50',      // Deep blue-gray
      light: '#34495E',     // Lighter blue-gray
      dark: '#1A2634',      // Darker blue-gray
    },
    background: {
      default: '#F4F6F7',   // Very light gray
      paper: '#FFFFFF',     // White
    },
    text: {
      primary: '#2C3E50',   // Dark text
      secondary: '#7F8C8D', // Muted text
    },
    error: {
      main: '#E74C3C',      // Vibrant red
    },
    success: {
      main: '#2ECC71',      // Green
    },
    warning: {
      main: '#F39C12',      // Orange
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.05em',
      color: '#2C3E50',
    },
    h6: {
      fontWeight: 600,
      color: '#2C3E50',
    },
    body1: {
      fontWeight: 400,
      color: '#7F8C8D',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            '& fieldset': {
              borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: '#2196F3',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2196F3',
            },
          },
        },
      },
    },
  },
});
