import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './authSlice';
// import tasksReducer from './tasksSlice';
// import snackbarReducer from './snackbarSlice';
import storage from './storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'tasks'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  // tasks: tasksReducer,
  // snackbar: snackbarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.MODE !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
