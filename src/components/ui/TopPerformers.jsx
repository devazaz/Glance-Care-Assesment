import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopPerformers = ({ movies }) => {
  // 1) Sort movies by rating (vote_average) descending, then slice top 10
  const sortedMovies = [...movies]
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10);

  // 2) Prepare chart labels (movie titles) and data (movie ratings)
  const labels = sortedMovies.map((m) => m.title);
  const dataValues = sortedMovies.map((m) => m.vote_average);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Movie Rating",
        data: dataValues,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // 3) Configure chart options for a horizontal bar chart
  const chartOptions = {
    indexAxis: "y", // <--- Horizontal bars
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Top 10 Movies by Rating",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Rating",
        },
        min: 0,
        max: 10, // Adjust if ratings can exceed 10
      },
      y: {
        title: {
          display: true,
          text: "Movie Title",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Top Performers</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default TopPerformers;
