"use client";

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const osrmApi = createApi({
  reducerPath: "osrmApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/directions" }),
  endpoints: (builder) => ({
    getOSRMRoute: builder.mutation({
      query: ({ waypoints }) => ({
        url: "",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ waypoints }), // JSON body sent to API
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOSRMRouteMutation } = osrmApi;
