import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Replace with your TMDb API key
const TMDB_API_KEY = "f53be3900d98bb754b1c1988618d89da";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  movies : [],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    fetchPopularMovies: builder.query({
      query: (page = 1) => ({
        url: `movie/popular`,
        params: {
          api_key: TMDB_API_KEY,
          language: "en-US",
          page,
        },
      }),
    }),
    fetchMovieDetails: builder.query({
      query: (movieId) => ({
        url: `movie/${movieId}`,
        params: {
          api_key: TMDB_API_KEY,
          language: "en-US",
        },
      }),
    }),
    fetchGenres: builder.query({
      query: () => ({
        url: `genre/movie/list`,
        params: {
          api_key: TMDB_API_KEY,
          language: "en-US",
        },
      }),
    }),
    fetchMoviesByGenre: builder.query({
      query: ({ genreId, page = 1 }) => ({
        url: `discover/movie`,
        params: {
          api_key: TMDB_API_KEY,
          language: "en-US",
          with_genres: genreId,
          page,
        },
      }),
    }),
    fetchMoviesByFilters: builder.query({
      query: ({ selectedGenres, page, releaseDateGte, releaseDateLte, minRating, sortBy, minScore }) => ({
        url: `discover/movie`,
        params: {
          api_key: 'f53be3900d98bb754b1c1988618d89da', // Your TMDB API key
          language: "en-US",
          with_genres: selectedGenres?.join(","),
          page,
          primary_release_date_gte: releaseDateGte,
          primary_release_date_lte: releaseDateLte,
          vote_average_gte: minRating || minScore, // Apply score filtering
          sort_by: sortBy || "popularity.desc", // Default sorting
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchPopularMoviesQuery,
  useFetchMovieDetailsQuery,
  useFetchGenresQuery,
  useFetchMoviesByGenreQuery,
  useFetchMoviesByFiltersQuery
} = moviesApi;
