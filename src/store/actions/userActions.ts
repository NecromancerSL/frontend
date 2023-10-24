import { Dispatch } from 'redux';
import api from '../../services/api';
import { User } from '../../types/User';

type UserAction =
  | {
      type: 'USER_LOGIN_SUCCESS';
      payload: User;
    }
    | {
      type: 'USER_LOGIN_FAILURE';
      payload: string; 
    }
    | {
      type: 'USER_LOGOUT';
    };


export const userLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await api.post('/loginusuario', { email, password });
      const user = response.data;

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: user,
      });
    } catch (error) {

      const errorMessage = 'Login failed. Check your credentials.';

      dispatch({
        type: 'USER_LOGIN_FAILURE',
        payload: errorMessage,
      });
    }
  };
};


export const logoutUser = () => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: 'USER_LOGOUT',
    });
  };
};
