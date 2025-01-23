import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    genres : [],
    page : 1,
  },
  reducers: {
    setMovies(state, action) {
      console.log('action: ', action);
      state.movies = action.payload.movies;
    },
    setGenres(state, action) {
      state.genres = action.payload.genres;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    appendMovies(state, action) {
      // Append more movies (useful for pagination or infinite scroll)
      state.movies = [...state.movies, ...action.payload.movies];
    },
    clearMovies(state) {
      // Clear the global movies state
      state.movies = [];
      state.totalPages = 0;
      state.totalResults = 0;
    },
  },
});

export const { setMovies, appendMovies, clearMovies,setGenres,setPage } = moviesSlice.actions;

export default moviesSlice.reducer;
