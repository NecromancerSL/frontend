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
  const [admin, setAdmin] = useState<AdminLogin | null>(null);
  const [erroradmin, setErrorAdmin] = useState<string | null>(null);

  const loginadmin = async (credentials: unknown) => {
    try {
      const response = await api.post('/loginadmin', credentials);
      const loggedInAdmin: AdminLogin = response.data;
      console.log("Login de administrador bem-sucedido:", loggedInAdmin);
      setAdmin(loggedInAdmin);
      setErrorAdmin(null);
    } catch (error) {
      console.error("Erro no login de administrador:", error);
      setErrorAdmin("Email ou senha de administrador incorretos. Por favor, tente novamente.");
    }
  };

  const logoutadmin = () => {
    setAdmin(null);
    setErrorAdmin(null);
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
