import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "../services/postsApi";
import { reportsApi } from "../services/reportsApi";
import { usersApi } from "../services/usersApi";
import { likesApi } from "../services/likesApi";
import { commentsApi } from "../services/commentsApi";
import userReducer from "./slices/userSlice";
import { subscribersApi } from "../services/subscribersApi";

export const store = configureStore({
   reducer: {
      [postsApi.reducerPath]: postsApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
      [reportsApi.reducerPath]: reportsApi.reducer,
      [likesApi.reducerPath]: likesApi.reducer,
      [commentsApi.reducerPath]: commentsApi.reducer,
      [subscribersApi.reducerPath]: subscribersApi.reducer,
      user: userReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(usersApi.middleware)
      .concat(reportsApi.middleware)
      .concat(likesApi.middleware)
      .concat(commentsApi.middleware)
      .concat(subscribersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch