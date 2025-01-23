import React from 'react'
import BarChart from './Bar'

const MoviesByYear = ({movies}) => {
    const moviesByYear = movies.reduce((acc, movie) => {
        const year = movie.release_date.slice(0, 4); // e.g. "2024"
        acc[year] = (acc[year] || 0) + 1;
        return acc;
      }, {});
    
      const labels = Object.keys(moviesByYear).sort();
      console.log("labels: ", labels);
      const data = labels.map((year) => moviesByYear[year]);
    
      const chartData = {
        labels,
        datasets: [
          {
            label: "Movies Released",
            data,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
    
      const chartOptions = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Movies Released Per Year",
          },
          legend: {
            display: false,
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
      <h2 style={{ textAlign: "center" }}>Movies Per Year</h2>
      <BarChart data={chartData} options={chartOptions} />
    </div>
  )
}

export default MoviesByYear