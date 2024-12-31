import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Set the base query to the provided URL
const BASE_URL = 'https://suite.snapsec.co/pdpl/api/purposes-fields';

export const purposesAndFieldsApi = createApi({
  reducerPath: 'purposesAndFieldsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add authorization token from the store if available
      const token = localStorage.getItem('token'); 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // Create or update purposes and fields
    createOrUpdate: builder.mutation({
      query: (data) => ({
        url: '/purposes-and-fields',
        method: 'POST',
        body: data,
      }),
    }),

    // Get purposes and fields for an organization
    getByOrganization: builder.query({
      query: () => '/purposes-and-fields',
    }),

    // Delete purposes and fields for an organization
    deleteByOrganization: builder.mutation({
      query: () => ({
        url: '/purposes-and-fields',
        method: 'DELETE',
      }),
    }),

    // Add a new purpose
    addPurpose: builder.mutation({
      query: (data) => {
        console.log(data);
        return{
        url: '/purposes',
        method: 'POST',
        body: data,}
      },
    }),

    // Add a new field
    addField: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
        url: '/fields',
        method: 'POST',
        body: data,}
      },
    }),

    // Update an existing purpose
    updatePurpose: builder.mutation({
      query: (data) => ({
        url: '/purposes',
        method: 'PUT',
        body: data,
      }),
    }),

    // Update an existing field
    updateField: builder.mutation({
      query: ({ fieldId, data }) => ({
        url: `/fields/${fieldId}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateOrUpdateMutation,
  useGetByOrganizationQuery,
  useDeleteByOrganizationMutation,
  useAddPurposeMutation,
  useAddFieldMutation,
  useUpdatePurposeMutation,
  useUpdateFieldMutation,
} = purposesAndFieldsApi;

