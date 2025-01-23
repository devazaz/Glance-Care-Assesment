import React, { useState, useEffect } from "react";
import { useFetchGenresQuery } from "../../features/movieApiSlice";
import MovieCard from "./MovieCard";
import FilterBar from "../ui/FilterBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setGenres, setPage } from "../../features/movieSlice";

const Movies = () => {
  const dispatch = useDispatch();
 // Track the current page
  const { movies , page} = useSelector((state) => state.movies);

  // Fetch genres
  const {
    data: genresData,
    error: genresError,
    isLoading: genresIsLoading,
    isSuccess: genresIsSuccess,
  } = useFetchGenresQuery();

  // Load more movies
  const loadMoreMovies = () => {
    dispatch(setPage(page + 1));
  };

  useEffect(() => {
    if (genresData) {
      dispatch(setGenres({ genres: genresData?.genres }));
    }
  }, [genresIsSuccess]);

  return (
    <div className="container mx-auto ">
      <FilterBar page={page} />

      <div className="flex flex-wrap justify-center gap-4">
        {movies?.length === 0 ? (
          <p className="w-full text-center mt-8">
            No movies available for the selected genres.
          </p>
        ) : (
          movies?.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 flex-grow-0 w-[200px] mb-8"
            >
              <MovieCard movie={movie} />
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button
          onClick={loadMoreMovies}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Movies;
