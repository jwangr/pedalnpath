"use client";

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userPathsApi = createApi({
  reducerPath: "userPathsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/userpath" }),
  tagTypes: ["UserPaths", "BikePaths"],
  endpoints: (builder) => ({
    // GET route
    getUserPaths: builder.query({
      query: ({ title, id }) =>
        title ? `?title=${encodeURIComponent(title)}&id=${id}` : `?id=${id}`,
      providesTags: (result, error, { id }) =>
        id ? [{ type: "UserPaths", id }] : [{ type: "UserPaths", id: "LIST" }],
    }),

    // POST route - triggers a reload of bikepaths cache
    toggleAddDelete: builder.mutation({
      query: ({ userId, path }) => ({
        url: "",
        method: "POST",
        body: { userId, path }, // JSON body sent to API
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "UserPaths", id: userId },
        { type: "BikePaths", id: userId }, // ensures getBikePaths refreshes
      ],
    }),

    // PUT route
    toggleCompleted: builder.mutation({
      query: ({ userId, pathId }) => ({
        url: "",
        method: "PUT",
        body: { userId, pathId },
      }),
      invalidatesTags: ["UserPaths"],
    }),

    // DELETE route
    deleteUserPath: builder.mutation({
      query: ({ id, pathId }) => ({
        url: `?id=${id}&pathId=${pathId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserPaths"],
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
