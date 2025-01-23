import React from "react";
import BarChart from "./Bar";
import { useSelector } from "react-redux";

const MoviesByGenre = ({ movies }) => {
  const genres = useSelector((state) => state.movies.genres);
  console.log("genres: ", genres);

  const genreCounts = movies.reduce((acc, movie) => {
    movie.genre_ids.forEach((genreId) => {
      const foundGenre = genres?.find((g) => g.id === genreId);
      const genreName = foundGenre ? foundGenre.name : `Unknown-${genreId}`;
      acc[genreName] = (acc[genreName] || 0) + 1;
    });
    return acc;
  }, {});

  const labels = Object.keys(genreCounts).sort();
  const data = labels.map((genre) => genreCounts[genre]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Movies by Genre",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Movies by Genre",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Genre",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Movies",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Movies By Genre</h2>
      <BarChart data={chartData} options={chartOptions} />
    </div>
  );
};

export default MoviesByGenre;
