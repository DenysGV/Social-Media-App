import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IComment } from "../types/types";
import { API_URL } from "./apiUrl";

export const commentsApi = createApi({
   reducerPath: 'commentsApi',
   baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
   tagTypes: ['comments'],
   endpoints: (builder) => ({
      createComment: builder.mutation<IComment, IComment>({
         query: (newComment) => ({
            url: 'comments',
            body: newComment,
            method: 'POST'
         }),
         invalidatesTags: ['comments']
      })
   })
})

export const {
   useCreateCommentMutation
} = commentsApi