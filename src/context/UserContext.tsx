import { createContext, ReactNode, useState } from "react";
import api from "../services/api";
import { UserLogin } from "../interfaces/User";

interface UserContextData {
  user: UserLogin | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignIn) => Promise<void>;
}

interface SignIn {
    email: string;
    password: string;
}

type UserProviderProps = {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserLogin>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignIn) {
    try {
      const response = await api.post('/loginusuario', {
        email,
        password
      });
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  

  return (
    <UserContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </UserContext.Provider>
  );
}
