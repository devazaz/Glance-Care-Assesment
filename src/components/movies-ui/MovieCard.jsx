import React from "react";
import { FaArrowRight } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import Rating from "../ui/Ratings";
function MovieCard({ movie }) {
  const { original_title, poster_path, release_date, vote_average, id } = movie;
  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`movie-details/${id}`)} className="bg-white p-4 shadow cursor-pointer rounded flex flex-col items-center space-x-4 hover:shadow-lg transition max-w-[200px] mx-[15px] relative">
      {/* Movie Poster */}
      <div className="relative">
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w200${poster_path}`}
            alt={original_title}
            className="rounded-md"
            width="160px"
          />
        )}
        <div className="absolute bottom-[-17px] left-1">
          <Rating progress={vote_average.toFixed(1) * 10} />
        </div>
      </div>
      <div
        className="text-[12px] mt-[20px] w-full text-left font-semibold overflow-hidden whitespace-nowrap text-ellipsis max-w-[180px]"
        title={original_title}
      >
        {original_title}
      </div>
      <p className="text-gray-500 w-full text-[8px] text-left">
        {release_date || "N/A"}
      </p>
    </div>
  );
}

export default MovieCard;
