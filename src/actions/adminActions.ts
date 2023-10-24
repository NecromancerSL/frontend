import { Dispatch } from 'redux';
import api from '../services/api';

// Importe a função da API para login de administrador, se necessário
// import { adminLogin } from './suaApi';

// Defina o tipo de ação para administrador
type AdminAction = {
  type: 'ADMIN_LOGIN_SUCCESS' | 'ADMIN_LOGIN_FAILURE' | 'ADMIN_LOGOUT';
  payload?: unknown;
};

// Defina ação assíncrona para o login do administrador
export const adminLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<AdminAction>) => {
    try {
      const response = await api.post('/loginadmin',{email, password});
      const admin = response.data;

      dispatch({
        type: 'ADMIN_LOGIN_SUCCESS',
        payload: admin,
      });
    } catch (error) {
      // Simulação de falha no login
      const errorMessage = 'Login de administrador falhou. Verifique suas credenciais.';

      dispatch({
        type: 'ADMIN_LOGIN_FAILURE',
        payload: errorMessage,
      });
    }
  };
};

// Ação para logout do administrador
export const adminLogout = () => {
  return (dispatch: Dispatch<AdminAction>) => {
    dispatch({
      type: 'ADMIN_LOGOUT',
    });
  };
};
