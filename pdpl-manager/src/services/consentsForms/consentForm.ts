import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const consentFormApi = createApi({
  reducerPath: 'consentFormApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://suite.snapsec.co/pdpl/api/consent/forms',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token'); // Assumes you store the token in `auth` slice
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
   },),
  tagTypes: ['ConsentForm'],
  endpoints: (builder) => ({
    // Fetch all consent forms
    fetchConsentForms: builder.query({
      query: (organizationId) => ({
        url: '',
        params: { organizationId },
        method: 'GET',
      }),
      providesTags: [{ type: 'ConsentForm', id: 'LIST' }],}),

    // Fetch a single consent form by ID
    fetchConsentFormById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'ConsentForm', id }],
    }),

    // Create a new consent form
    createConsentForm: builder.mutation({
      query: (newConsentForm) => ({
        url: '',
        method: 'POST',
        body: newConsentForm,
      }),
      invalidatesTags: [{ type: 'ConsentForm', id: 'LIST' }],
    }),

    // Update an existing consent form
    updateConsentForm: builder.mutation({
      query: ({ id, ...updatedFields }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updatedFields,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'ConsentForm', id }],
    }),

    // Delete a consent form
    deleteConsentForm: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'ConsentForm', id }],
    }),
  }),
});

export const {
  useFetchConsentFormsQuery,
  useFetchConsentFormByIdQuery,
  useCreateConsentFormMutation,
  useUpdateConsentFormMutation,
  useDeleteConsentFormMutation,
} = consentFormApi;
