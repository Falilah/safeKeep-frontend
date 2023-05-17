import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { safeKeepApi, inheritorsApi } from '../services';
import auth from './auth';

const reducers = combineReducers({
  [safeKeepApi.reducerPath]: safeKeepApi.reducer,
  [inheritorsApi.reducerPath]: inheritorsApi.reducer,
  authReducer: auth,
  //...
});

const persistConfig = {
  key: 'safekeep-root@0.0.1',
  version: 1,
  storage,
  blacklist: ['inheritorsApi', 'Product'],
  //not to be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

const authMiddleware = (store) => (next) => (action) => {
  const currentState = store.getState() as RootState;
  // console.log(currentState.authReducer,  "next middleware")
  next(action);
};
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(safeKeepApi.middleware)
      .concat(inheritorsApi.middleware)
      .concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
