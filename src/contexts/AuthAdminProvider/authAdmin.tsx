import { createContext, useState, ReactNode } from 'react';
import api from '../../services/api';
import { AdminLogin } from '../../interfaces/Admin';

interface AuthContextType {
  admin: AdminLogin | null;
  erroradmin: string | null;
  loginadmin: (credentials: unknown) => Promise<void>;
  logoutadmin: () => void;
}

const AuthAdminContext = createContext<AuthContextType | undefined>(undefined);

export const AuthAdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setUser] = useState<AdminLogin | null>(null);
  const [erroradmin, setError] = useState<string | null>(null);

  const loginadmin = async (credentials: unknown) => {
    try {
      const response = await api.post('/loginadmin', credentials);
      const loggedInAdmin: AdminLogin = response.data;
      console.log("Login de adminastrador bem-sucedido:", loggedInAdmin);
      setUser(loggedInAdmin);
      setError(null);
    } catch (erroradmin) {
      console.error("Erro no login de administrador:", erroradmin);
      setError("Email ou senha incorretos. Por favor, tente novamente.");
    }
  };

  const logoutadmin = () => {
    setUser(null);
    setError(null);
  };

  const authContextValue: AuthContextType = {
    admin,
    erroradmin,
    loginadmin,
    logoutadmin,
  };

  return (
    <AuthAdminContext.Provider value={authContextValue}>
      {children}
    </AuthAdminContext.Provider>
  );
};

export default AuthAdminProvider;
export { AuthAdminContext };