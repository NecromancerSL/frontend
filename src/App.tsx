import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './redux/store/store'; // Import your Redux store
import Routes from './routes/routes';

export default function App() {
  
  const [, , removeCookie] = useCookies(['userName', 'userId']);

  useEffect(() => {
    // Function to remove all cookies
    const removeAllCookies = () => {
      removeCookie('userName');
      removeCookie('userId');
      // Add other cookie removals here if necessary
    };

    // Add an event listener before the page is closed
    window.addEventListener('beforeunload', removeAllCookies);

    return () => {
      // Make sure to remove the event listener when the component is unmounted
      window.removeEventListener('beforeunload', removeAllCookies);
    };
  }, [removeCookie]);

  return (
    <Provider store={store}> {/* Provide the Redux store to your components */}
      <Routes />
    </Provider>
  )
}
