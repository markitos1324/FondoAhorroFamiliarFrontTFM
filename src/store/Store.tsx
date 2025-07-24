import { createStore, combineReducers, compose, applyMiddleware, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import LoginReducer from './reducers/LoginReducer';
import transactionsReducer from './reducers/transactionsReducer.tsx';

// Define RootState type
export interface RootState {
  loginReducer: ReturnType<typeof LoginReducer>;
  transactionsReducer: ReturnType<typeof transactionsReducer>;
}

const rootReducer = combineReducers({
  loginReducer: LoginReducer,
  transactionsReducer: transactionsReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(): Store<RootState> {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<RootState>))
  );
  return store;
}