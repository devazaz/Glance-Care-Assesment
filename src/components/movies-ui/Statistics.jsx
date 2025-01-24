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
        <div className="w-full md:w-[48%] border border-slate-200 rounded-[20px] p-[10px]">
          <MoviesByGenre movies={movies} />
        </div>
        <div className="w-full md:w-[48%]  border border-slate-200 rounded-[20px] p-[10px]">
          <MoviesByYear movies={movies} />
        </div>
        <div className="w-full md:w-[48%]  border border-slate-200 rounded-[20px] p-[10px]">
          <MoviesByYearGenre movies={movies} />
        </div>
        <div className="w-full md:w-[48%]  border border-slate-200 rounded-[20px] p-[10px]">
          <CountryLanguageInsights movies={movies} />
        </div>
        <div className="w-full md:w-[48%]  border border-slate-200 rounded-[20px] p-[10px]">
          <TopPerformers movies={movies} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
