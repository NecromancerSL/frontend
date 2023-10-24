import { Dispatch } from 'redux';
import api from '../services/api';

// Define tipos de ação
type UserAction = {
  type: 'USER_LOGIN_SUCCESS' | 'USER_LOGIN_FAILURE' | 'USER_LOGOUT';
  payload?: unknown;
};

// Define uma função de ação assíncrona para o login
export const userLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      // Substitua isso com a chamada real à API de login
      const response = await api.post('/loginusuario', { email, password });

      // Simulação de sucesso do login
      const user = response.data;

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: user,
      });
    } catch (error) {
      // Simulação de falha no login
      const errorMessage = 'Login falhou. Verifique suas credenciais.';

      dispatch({
        type: 'USER_LOGIN_FAILURE',
        payload: errorMessage,
      });
    }
  };
};

// Função de ação para logout
export const logoutUser = () => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: 'USER_LOGOUT',
    });
  };
};
