import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ILike } from "../types/types";
import { API_URL } from "./apiUrl";

export const likesApi = createApi({
   reducerPath: 'likesApi',
   baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
   tagTypes: ['likes'],
   endpoints: (builder) => ({
      createLike: builder.mutation<ILike, ILike>({
         query: (newLike) => ({
            url: 'likes',
            body: newLike,
            method: 'POST'
         }),
         invalidatesTags: ['likes']
      }),
      deleteLike: builder.mutation<void, string>({
         query: (id) => ({
            url: `likes/${id}`,
            method: 'DELETE'
         }),
         invalidatesTags: ['likes']
      })
   })
})

export const {
   useCreateLikeMutation,
   useDeleteLikeMutation
} = likesApi