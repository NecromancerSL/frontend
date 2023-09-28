import { createContext, useContext, useState, ReactNode } from 'react';
import api from '../services/api';
import { UserLogin } from '../interfaces/User';

// Define the shape of your authentication context
interface AuthContextType {
  user: UserLogin | null;
  error: string | null;
  login: (credentials: unknown) => Promise<void>;
  logout: () => void;
}

const AuthUserContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthUser = () => {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw new Error('useAuthUser must be used within an AuthUserProvider');
  }
  return context;
};

export const AuthUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserLogin | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: unknown) => {
    try {
      const response = await api.post('/loginusuario', credentials);
      const loggedInUser: UserLogin = response.data;
      console.log("Login de usuário comum bem-sucedido:", loggedInUser);
      setUser(loggedInUser);
      setError(null);
    } catch (error) {
      console.error("Erro no login de usuário comum:", error);
      setError("Email ou senha incorretos. Por favor, tente novamente.");
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const authContextValue: AuthContextType = {
    user,
    error,
    login,
    logout,
  };

  return (
    <AuthUserContext.Provider value={authContextValue}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
export { AuthUserContext };