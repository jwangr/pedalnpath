"use client";

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userPathsApi = createApi({
  reducerPath: "userPathsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/bikepath" }),
  endpoints: (builder) => ({
    // GET route
    getUserPaths: builder.query({
      query: ({ title, id }) =>
        title ? `?title=${encodeURIComponent(title)}&id=${id}` : `?id=${id}`,
    }),

    // POST route
    toggleAddDelete: builder.mutation({
      query: ({ userId, path }) => ({
        url: "",
        method: "POST",
        body: { userId, path }, // JSON body sent to API
      }),
    }),

    // PUT route
    toggleCompleted: builder.mutation({
      query: ({ userId, pathId }) => ({
        url: "",
        method: "PUT",
        body: { userId, pathId },
      }),
    }),

    // DELETE route
    deleteUserPath: builder.mutation({
      query: ({ id, pathId }) => ({
        url: `?id=${id}&pathId=${pathId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserPathsQuery,
  useToggleAddDeleteMutation,
  useToggleCompletedMutation,
  useDeleteUserPathMutation,
} = userPathsApi;
