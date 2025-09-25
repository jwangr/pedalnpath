"use client";

import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./CounterSlice";
import { bikePathsApi } from "@/services/bikePaths";
import { userPathsApi } from "@/services/userPaths";
import { reviewsApi } from "@/services/reviews";
import { usersApi } from "@/services/Auth";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // Add the generated reducer as a specific top-level slice
    [bikePathsApi.reducerPath]: bikePathsApi.reducer,
    [userPathsApi.reducerPath]: userPathsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      bikePathsApi.middleware,
      userPathsApi.middleware,
      reviewsApi.middleware,
      usersApi.middleware
    ),
});
