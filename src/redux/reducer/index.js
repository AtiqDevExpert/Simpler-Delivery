import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './user';
import theme from './theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

let persistconfig = {
  key: 'root',
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  user: user,
  theme: theme,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistconfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};
