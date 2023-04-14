import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import suitReducer from "./slices/suits";
import caseReducer from './slices/cases';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer, caseReducer)

export const store = configureStore({
  reducer: {
    persistedReducer,
    user : userReducer,
    suits : suitReducer,
    cases: caseReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)