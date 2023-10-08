import { createContext, useState, ReactNode } from 'react';
import api from '../../services/api';
import { UserLogin } from '../../interfaces/User';

interface AuthContextType {
  user: UserLogin | null;
  erroruser: string | null;
  loginuser: (credentials: unknown) => Promise<void>;
  logoutuser: () => void;
}

const AuthUserContext = createContext<AuthContextType | undefined>(undefined);

export const AuthUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserLogin | null>(null);
  const [erroruser, setError] = useState<string | null>(null);

  const loginuser = async (credentials: unknown) => {
    try {
      const response = await api.post('/loginusuario', credentials);
      const loggedInUser: UserLogin = response.data;
      console.log("Login de usuário comum bem-sucedido:", loggedInUser);
      setUser(loggedInUser);
      setError(null);
    } catch (erroruser) {
      console.error("Erro no login de usuário comum:", erroruser);
      setError("Email ou senha incorretos. Por favor, tente novamente.");
    }
  };

  const logoutuser = () => {
    setUser(null);
    setError(null);
  };

  const authContextValue: AuthContextType = {
    user,
    erroruser,
    loginuser,
    logoutuser,
  };

  return (
    <AuthUserContext.Provider value={authContextValue}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
export { AuthUserContext };