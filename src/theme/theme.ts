import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import 'typeface-poppins';

const theme = createTheme({
  palette: {
    primary: {
      main: '#46565e',
    },
    secondary: {
      main: red[500],
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default theme;

