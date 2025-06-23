import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser } from "../types/types";
import { API_URL } from "./apiUrl";

export const usersApi = createApi({
   reducerPath: 'usersApi',
   baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
   tagTypes: ['users'],
   endpoints: (builder) => ({
      getUserById: builder.query<IUser, string>({
         query: (id) => `users/${id}`,
         providesTags: (_, __, id) => [{ type: 'users', id }]
      }),
      searchUser: builder.query<IUser[], string>({
         query: (searchQuery) => `users?name=${searchQuery}`,
         providesTags: ['users'],
      }),
      createUser: builder.mutation<IUser, IUser>({
         query: (newUser) => ({
            url: 'users',
            body: newUser,
            method: 'POST',
         }),
         invalidatesTags: ['users'],
      }),
      editUserData: builder.mutation<IUser, IUser>({
         query: (newUser) => ({
            url: `users/${newUser.id}`,
            body: newUser,
            method: 'PUT',
         }),
         invalidatesTags: ['users'],
      }),
      deleteUser: builder.mutation<void, string>({
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
   useGetUserByIdQuery,
   useSearchUserQuery,
   useEditUserDataMutation,
   useDeleteUserMutation,
} = usersApi