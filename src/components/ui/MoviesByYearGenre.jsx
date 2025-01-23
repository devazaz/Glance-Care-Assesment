import React from "react";
import BarChart from "./Bar";
import { useSelector } from "react-redux";

const MoviesByYearGenre = ({ movies }) => {
  const genres = useSelector((state) => state.movies.genres);

  const dataByYearGenre = {};

  // 1) Build the nested object: year -> genreName -> count
  movies.forEach((movie) => {
    const year = movie.release_date.slice(0, 4); // Extract the year
    if (!dataByYearGenre[year]) {
      dataByYearGenre[year] = {};
    }
    movie.genre_ids.forEach((genreId) => {
      const foundGenre = genres.find((g) => g.id === genreId);
      const genreName = foundGenre ? foundGenre.name : `Unknown-${genreId}`;
      dataByYearGenre[year][genreName] =
        (dataByYearGenre[year][genreName] || 0) + 1;
    });
  });

  // 2) Get all unique years and genres
  const allYears = Object.keys(dataByYearGenre).sort();
  const genreSet = new Set();
  Object.values(dataByYearGenre).forEach((genresObj) => {
    Object.keys(genresObj).forEach((genreName) => genreSet.add(genreName));
  });
  const allGenres = Array.from(genreSet).sort();

  // 3) Build datasets for each genre
  const datasets = allGenres.map((genreName, index) => {
    const colorIndex = (index * 50) % 360; // Generate unique colors
    return {
      label: genreName,
      data: allYears.map((year) => dataByYearGenre[year][genreName] || 0),
      backgroundColor: `hsl(${colorIndex}, 70%, 50%)`,
      borderColor: `hsl(${colorIndex}, 70%, 40%)`,
      borderWidth: 1,
    };
  });

  const chartData = {
    labels: allYears, // X-axis: years
    datasets, // Data grouped by genres
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Movies Released Per Year by Genre",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
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
      <h2 style={{ textAlign: "center" }}>Movies By Year & Genre</h2>
      <BarChart data={chartData} options={chartOptions} />
    </div>
  );
};

export default MoviesByYearGenre;
