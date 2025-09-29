"use client";

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const geminiApi = createApi({
  reducerPath: "geminiApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/gemini" }),
  endpoints: (builder) => ({
    requestGemini: builder.mutation({
      query: (value) => ({
        url: "",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: value, // JSON body sent to Gemini
      }),
    }),
  }),
});

export const { useRequestGeminiMutation } = geminiApi;
