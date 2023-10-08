import { AuthUserProvider } from './contexts/AuthUserProvider/authUser';
import Routes from './routes'; 

function App() {
  return (
    <AuthUserProvider>
      <Routes />
    </AuthUserProvider>
  );
}

export default App;