import { useContext } from 'react';
import { AuthAdminContext } from './authAdmin';

export const useAuthAdmin = () => {
    const context = useContext(AuthAdminContext);
    if (!context) {
      throw new Error('useAuthAdmin must be used within an AuthUserProvider');
    }
    return context;
  };