import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./apiUrl";
import type { ISubscribers } from "../types/types";

export const subscribersApi = createApi({
   reducerPath: 'subscribersApi',
   baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
   tagTypes: ['subscribers'],
   endpoints: (builder) => ({
      getAllSubscribers: builder.query<ISubscribers[], void>({
         query: () => 'subscribers',
         providesTags: ['subscribers']
      }),
      addSubscriber: builder.mutation<ISubscribers, ISubscribers>({
         query: (newSubscriber) => ({
            url: `subscribers`,
            body: newSubscriber,
            method: 'POST',
         }),
         invalidatesTags: ['subscribers']
      }),
      deleteSubscriber: builder.mutation<void, string>({
         query: (id) => ({
            url: `subscribers/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['subscribers']
      })
   })
})

export const {
   useGetAllSubscribersQuery,
   useAddSubscriberMutation,
   useDeleteSubscriberMutation
} = subscribersApi