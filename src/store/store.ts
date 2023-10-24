import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from '../reducers/userReducer';
import adminReducer from '../reducers/adminReducer';
import thunk from 'redux-thunk'; // Middleware para chamadas assíncronas

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
