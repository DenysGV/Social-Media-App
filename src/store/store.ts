import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { postsApi } from "../services/postsApi";
import { reportsApi } from "../services/reportsApi";
import { usersApi } from "../services/usersApi";
import { likesApi } from "../services/likesApi";
import { commentsApi } from "../services/commentsApi";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import { subscribersApi } from "../services/subscribersApi";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['user', 'theme']
};

const rootReducer = combineReducers({
   [postsApi.reducerPath]: postsApi.reducer,
   [usersApi.reducerPath]: usersApi.reducer,
   [reportsApi.reducerPath]: reportsApi.reducer,
   [likesApi.reducerPath]: likesApi.reducer,
   [commentsApi.reducerPath]: commentsApi.reducer,
   [subscribersApi.reducerPath]: subscribersApi.reducer,
   user: userReducer,
   theme: themeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(usersApi.middleware)
      .concat(reportsApi.middleware)
      .concat(likesApi.middleware)
      .concat(commentsApi.middleware)
      .concat(subscribersApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch