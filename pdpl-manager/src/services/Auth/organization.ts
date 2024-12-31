import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const organizationApi = createApi({
  reducerPath: 'organizationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://suite.snapsec.co/pdpl/api' ,
    prepareHeaders:(headers)=>{
        const token= localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`); // Attach the token
          }
          return headers;
    }
  }),
  endpoints: (builder) => ({
    getOrganization: builder.query({
      query: () => '/organization',
    }),
    getAllOrganization:builder.query({
      query:()=>{
        return '/organization/all'
      }
    }),
    updateOrganization: builder.mutation({
      query: (orgData) => ({
        url: '/organization',
        method: 'PUT',
        body: orgData,
      }),
    }),
    deleteOrganization: builder.mutation({
      query: () => ({
        url: '/organization',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {useGetAllOrganizationQuery,
  useGetOrganizationQuery,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationApi;
