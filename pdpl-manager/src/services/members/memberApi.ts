import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const membersApi = createApi({
  reducerPath: 'membersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://suite.snapsec.co/pdpl/api/members',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); // Assumes you store the token in `auth` slice
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Member'],
  endpoints: (builder) => ({
    // Members
    getMembers: builder.query({
      query: (teamId) => {
        console.log(teamId);
        return `/members/${teamId}`},
      providesTags: ['Member'],
    }),
    addMember: builder.mutation({
      query: (data) => ({   
        url: '/members',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Member'],
    }),
    updateMember: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/members/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Member', id }],
    }),
    deleteMember: builder.mutation({
      query: (id) => ({
        url: `/members/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Member'],
    }),
  }),
});

export const {
  useGetMembersQuery,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = membersApi;
