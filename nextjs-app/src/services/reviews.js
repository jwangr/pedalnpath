"use client";

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/bikepath" }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (bikepathId) => `${bikepathId}/comments`,
    }),

    createReview: builder.mutation({
      query: ({ bikepathId, userId, score, comment }) => ({
        url: `${bikepathId}/comments`,
        method: "POST",
        body: { score, comment, userId }, // JSON body sent to API
      }),
    }),

    deleteReview: builder.mutation({
      query: ({ bikepathId, userId, reviewId }) => ({
        url: `${bikepathId}/comments`,
        method: "DELETE",
        body: { userId, reviewId }, // JSON body sent to API
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetCommentsQuery,
} = reviewsApi;
