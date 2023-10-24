const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
  };
  
  // Define tipos de ação
  type UserAction = {
    type: 'USER_LOGIN_SUCCESS' | 'USER_LOGIN_FAILURE' | 'USER_LOGOUT';
    payload?: unknown;
  };
  
  const userReducer = (state = initialState, action: UserAction) => {
    switch (action.type) {
      case 'USER_LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          error: null,
        };
      case 'USER_LOGIN_FAILURE':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
      case 'USER_LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  
  export default userReducer;
  
  