type User = {
    isAuthenticated: boolean;
    user: unknown; // Substitua 'any' pelo tipo de usuário apropriado
    error: string | null;
  };
  
  type Admin = {
    isAuthenticated: boolean;
    admin: unknown; // Substitua 'any' pelo tipo de administrador apropriado
    error: string | null;
  };
  
  type UserAction =
    | { type: 'USER_LOGIN_SUCCESS'; payload: User['user'] }
    | { type: 'USER_LOGIN_FAILURE'; payload: string }
    | { type: 'USER_LOGOUT' };
  
  type AdminAction =
    | { type: 'ADMIN_LOGIN_SUCCESS'; payload: Admin['admin'] }
    | { type: 'ADMIN_LOGIN_FAILURE'; payload: string }
    | { type: 'ADMIN_LOGOUT' };
  
  export type YourActionType = UserAction | AdminAction;
  