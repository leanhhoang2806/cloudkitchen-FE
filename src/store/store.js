// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'store/slices/userSlice'
import appReducer from 'store/slices/appSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can specify which parts of your state to persist
  // whitelist: ['user'],
}

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  // Add other reducers here
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export default store
