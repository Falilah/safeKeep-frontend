import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';

// https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#injecting-endpoints
const baseUrl = '/api';
export const inheritorsApi = createApi({
  reducerPath: 'inheritorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers, { getState }) {
      const store = getState() as RootState;
      const token = store?.authReducer?.auth.accessToken;
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Inheritors'],
  endpoints: (builder) => ({
    getInheritors: builder.query({
      query: () => {
        return {
          url: '/inheritors',
          method: 'GET',
          // keepUnusedDataFor: 0.0001,
        };
      },
      providesTags: ['Inheritors'],
    }),
    updateInheritors: builder.mutation({
      query: (body) => {
        return {
          url: '/inheritors',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Inheritors'],
    }),
    createInheritors: builder.mutation({
      query: (body) => {
        return {
          url: '/inheritors',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useGetInheritorsQuery, useUpdateInheritorsMutation, useCreateInheritorsMutation } = inheritorsApi;
