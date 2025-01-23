import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { moviesApi } from "../features/movieApiSlice";
import moviesReducer from "../features/movieSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware), // Middleware for API queries
});

setupListeners(store.dispatch);
