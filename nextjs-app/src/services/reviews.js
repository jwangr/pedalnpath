"use client";

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/bikepath" }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (bikepathId) => `${bikepathId}/reviews`,
      providesTags: ["Reviews"],
    }),

    getOverallStats: builder.query({
      query: (bikepathId) => `${bikepathId}/reviews/stats`,
      providesTags: ["Reviews"],
    }),

    createReview: builder.mutation({
      query: ({ bikepathId, userId, score, comment }) => ({
        url: `${bikepathId}/reviews`,
        method: "POST",
        body: { score, comment, userId }, // JSON body sent to API
      }),
      invalidatesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation({
      query: ({ bikepathId, userId, reviewId }) => ({
        url: `${bikepathId}/reviews`,
        method: "DELETE",
        body: { userId, reviewId }, // JSON body sent to API
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsQuery,
  useGetOverallStatsQuery,
} = reviewsApi;
