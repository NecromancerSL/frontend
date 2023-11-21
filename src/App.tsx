import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from './redux/store/store'; 
import Routes from './routes/routes';
import theme from './theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './global.css'


export default function App() {
  
  const [, , removeCookie] = useCookies(['userName', 'userId']);

  useEffect(() => {
    const removeAllCookies = () => {
      removeCookie('userName');
      removeCookie('userId');
    };
    window.addEventListener('beforeunload', removeAllCookies);

    return () => {
      window.removeEventListener('beforeunload', removeAllCookies);
    };
  }, [removeCookie]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}> 
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </Provider>
  )
}
