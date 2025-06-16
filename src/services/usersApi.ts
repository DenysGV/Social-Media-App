import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser } from "../types/types";
import { API_URL } from "./apiUrl";

export const usersApi = createApi({
   reducerPath: 'usersApi',
   baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
   tagTypes: ['users'],
   endpoints: (builder) => ({
      createUser: builder.mutation<IUser, IUser>({
         query: (newUser) => ({
            url: 'users',
            body: newUser,
            method: 'POST',
         }),
         invalidatesTags: ['users'],
      }),
      deleteUser: builder.mutation<void, number>({
         query: (id) => ({
            url: `users/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['users'],
      })
   })
})

export const {
   useCreateUserMutation,
   useDeleteUserMutation
} = usersApi