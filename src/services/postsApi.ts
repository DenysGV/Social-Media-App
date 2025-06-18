import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IPost } from "../types/types";
import { API_URL } from "./apiUrl";

export const postsApi = createApi({
   reducerPath: 'postsApi',
   baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
   tagTypes: ['posts'],
   endpoints: (builder) => ({
      getPosts: builder.query<IPost[], void>({
         query: () => 'posts',
         providesTags: ['posts']
      }),
      getPostById: builder.query<IPost, string>({
         query: (id) => `posts/${id}`,
         providesTags: (_, __, id) => [{ type: 'posts', id }]
      }),
      createPost: builder.mutation<IPost, IPost>({
         query: (newPost) => ({
            url: 'posts',
            body: newPost,
            method: 'POST'
         }),
         invalidatesTags: ['posts'],
      }),
      deletePost: builder.mutation<void, string>({
         query: (id) => ({
            url: `posts/${id}`,
            method: 'DELETE'
         }),
         invalidatesTags: ['posts'],
      })
   })
});

export const {
   useGetPostsQuery,
   useGetPostByIdQuery,
   useCreatePostMutation,
   useDeletePostMutation,
} = postsApi;