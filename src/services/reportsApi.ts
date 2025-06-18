import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IReport } from "../types/types";
import { API_URL } from "./apiUrl";

export const reportsApi = createApi({
   reducerPath: 'reportsApi',
   baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
   tagTypes: ['reports'],
   endpoints: (builder) => ({
      getReports: builder.query<IReport[], void>({
         query: () => 'reports',
         providesTags: ['reports']
      }),
      deleteReport: builder.mutation<void, string>({
         query: (id) => ({
            url: `reports/${id}`,
            method: 'DELETE'
         }),
         invalidatesTags: ['reports']
      })
   })
})

export const {
   useGetReportsQuery,
   useDeleteReportMutation,
} = reportsApi