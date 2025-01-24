import React from "react";
import { useParams } from "react-router-dom";
import { useFetchMovieDetailsQuery } from "../../features/movieApiSlice";

function MovieDetailsCard() {
  const { id } = useParams();
  const { data: movie, error, isLoading } = useFetchMovieDetailsQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      {/* Movie Poster */}
      <div
        className="h-72 bg-contain bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        }}
      >
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center text-white text-3xl font-bold">
          {movie.original_title}
        </div>
      </div>

      {/* Movie Content */}
      <div className="p-6">
        {/* Title and Tagline */}
        <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
        <p className="italic text-gray-600 mb-4">"{movie.tagline}"</p>

        {/* Overview */}
        <p className="text-gray-700 mb-4">{movie.overview}</p>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} mins
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)
          </p>
          <p>
            <strong>Status:</strong> {movie.status}
          </p>
        </div>

        {/* Genres */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        {/* Production Companies */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Production Companies</h3>
          <div className="flex flex-wrap gap-4">
            {movie.production_companies.map((company) => (
              <div key={company.id} className="text-center">
                {company.logo_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    className="h-12 mx-auto"
                  />
                )}
                <p className="text-sm mt-2">{company.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {movie.spoken_languages.map((lang) => (
              <span
                key={lang.iso_639_1}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
              >
                {lang.english_name}
              </span>
            ))}
          </div>
        </div>

        {/* Homepage Link */}
        <div className="mt-6 text-center">
          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Visit Official Website
          </a>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsCard;
