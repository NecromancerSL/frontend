import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './store/reducers/userReducer';
import adminReducer from './store/reducers/adminReducer';
import thunk from 'redux-thunk'; // Middleware para chamadas assíncronas

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));


import Routes from './routes'; // Importe suas rotas

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;