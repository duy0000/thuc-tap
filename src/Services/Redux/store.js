import { combineReducers, configureStore } from '@reduxjs/toolkit'
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
import authReducer from './Slice/authSlice.js'
import userReducer from './Slice/userSlice.js'
import versionReducer from './Slice/versionSlice.js'
import weatherReducer from './Slice/weatherSlice.js'
import hocKyReducer from './Slice/hocKySlice.js'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  versionWeb: versionReducer,
  weather: weatherReducer,
  hocKy: hocKyReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  },
})

export let persistor = persistStore(store)
