import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const teamsApi = createApi({
  reducerPath: 'teamsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://suite.snapsec.co/pdpl/api/teams',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Team', 'Member'],
  endpoints: (builder) => ({
    // Teams
    getTeams: builder.query({
      query: (params) => ({
        url: '/teams',
        method: 'GET',
        params,
      }),
      providesTags: ['Team'],
    }),
    getTeamById: builder.query({
      query: (id) => `/teams/${id}`,
      providesTags: (result, error, id) => [{ type: 'Team', id }],
    }),
    createTeam: builder.mutation({
      
      query: (data) =>{
        console.log(data);
        return {
        url: '/teams',
        method: 'POST',
        body: data}
      },
      invalidatesTags: ['Team'],
    }),
    updateTeam: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/teams/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Team', id }],
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Team', id }],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  
} = teamsApi;
