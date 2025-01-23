import React from "react";
import { useSelector } from "react-redux";
import MoviesByYear from "../ui/MoviesByYear";
import MoviesByGenre from "../ui/MoviesByGenre";
import MoviesByYearGenre from "../ui/MoviesByYearGenre";
import FilterBar from "../ui/FilterBar";
import CountryLanguageInsights from "../ui/CountryLanguage";
import TopPerformers from "../ui/TopPerformers";

const Statistics = () => {
  const { movies } = useSelector((state) => state.movies);

  return (
    <div>
      <FilterBar />

      <div className="flex flex-wrap gap-4 p-4">
        <div className="w-full md:w-[48%]">
          <MoviesByGenre movies={movies} />
        </div>
        <div className="w-full md:w-[48%]">
          <MoviesByYear movies={movies} />
        </div>
        <div className="w-full md:w-[48%]">
          <MoviesByYearGenre movies={movies} />
        </div>
        <div className="w-full md:w-[48%]">
          <CountryLanguageInsights movies={movies} />
        </div>
        <div className="w-full md:w-[48%]">
          <TopPerformers movies={movies} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
