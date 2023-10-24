const initialState = {
    isAuthenticated: false,
    admin: null,
    error: null,
  };

  type AdminAction = {
    type: 'ADMIN_LOGIN_SUCCESS' | 'ADMIN_LOGIN_FAILURE' | 'ADMIN_LOGOUT';
    payload?: unknown;
  };
  
  const adminReducer = (state = initialState, action: AdminAction) => {
    switch (action.type) {
      case 'ADMIN_LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          admin: action.payload,
          error: null,
        };
      case 'ADMIN_LOGIN_FAILURE':
        return {
          ...state,
          isAuthenticated: false,
          admin: null,
          error: action.payload,
        };
      case 'ADMIN_LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  
  export default adminReducer;