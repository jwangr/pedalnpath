"use client";

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const bikePathsApi = createApi({
  reducerPath: "bikePathsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/bikepath" }),
  endpoints: (builder) => ({
    getBikePaths: builder.query({
      query: ({ title, id }) => {
        const searchParams = new URLSearchParams();
        if (title) searchParams.set("title", title);
        if (id) searchParams.set("userId", id);
        return `?${searchParams.toString()}`;
      },
    }),

    createBikePath: builder.mutation({
      query: (newPath) => ({
        url: "",
        method: "POST",
        body: newPath, // JSON body sent to API
      }),
    }),

    deleteBikePath: builder.mutation({
      query: (pathId) => ({
        url: "",
        method: "DELETE",
        body: { pathId }, // JSON body sent to API
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBikePathsQuery,
  useCreateBikePathMutation,
  useDeleteBikePathMutation,
} = bikePathsApi;
