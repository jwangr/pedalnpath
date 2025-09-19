"use client";

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const getUserApi = createApi({
  reducerPath: "getUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth/login" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (emailAndPw) => ({
        url: "",
        method: "POST",
        body: emailAndPw, // JSON body sent to API
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {} = getUserApi;
