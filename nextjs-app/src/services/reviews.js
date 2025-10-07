"use client";

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (bikepathId) => `bikepath/${bikepathId}/reviews`,
      providesTags: ["Reviews"],
    }),

    getAllReviews: builder.query({
      query: ({limit, userId}) => `reviews?limit=${limit}&userId=${userId}`,
      providesTags: ["Reviews"],
    }),

    getOverallStats: builder.query({
      query: (bikepathId) => `bikepath/${bikepathId}/reviews/stats`,
      providesTags: ["Reviews"],
    }),

    createReview: builder.mutation({
      query: ({ bikepathId, userId, score, comment }) => ({
        url: `bikepath/${bikepathId}/reviews`,
        method: "POST",
        body: { score, comment, userId }, // JSON body sent to API
      }),
      invalidatesTags: ["Reviews"],
    }),

    updateReview: builder.mutation({
      query: ({ bikepathId, review }) => ({
        url: `bikepath/${bikepathId}/reviews`,
        method: "PUT",
        body: { ...review }, // JSON body sent to API
      }),
      invalidatesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation({
      query: ({ bikepathId, userId, reviewId }) => ({
        url: `bikepath/${bikepathId}/reviews`,
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
  useGetAllReviewsQuery,
  useGetOverallStatsQuery,
  useUpdateReviewMutation,
} = reviewsApi;
