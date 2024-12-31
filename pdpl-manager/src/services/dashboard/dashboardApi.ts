import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardConsentApi = createApi({
  reducerPath: 'dashboardConsentApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://suite.snapsec.co/pdpl/api/consent/dashboard', 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); // Fetch the token from localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Attach the token in the header
      }
      return headers;
    },
  }),
  tagTypes: ['ConsentForm'],
  endpoints: (builder) => ({
    // Fetch consent form dashboard data
    fetchConsentDashboard: builder.query({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: [{ type: 'ConsentForm', id: 'DASHBOARD' }],
    }),
    
    // Fetch all consent forms based on organizationId
    
})});

export const {
  useFetchConsentDashboardQuery
} = dashboardConsentApi;
