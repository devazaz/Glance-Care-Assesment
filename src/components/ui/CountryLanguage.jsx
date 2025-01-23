import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CountryLanguageInsights = ({ movies }) => {
  // 1) Aggregate languages
  const languageCounts = movies.reduce((acc, movie) => {
    const language = movie.original_language || "Unknown";
    acc[language] = (acc[language] || 0) + 1;
    return acc;
  }, {});

  // 2) Aggregate countries
  const countryCounts = movies.reduce((acc, movie) => {
    const countries = movie.production_countries || [];
    countries.forEach((country) => {
      acc[country] = (acc[country] || 0) + 1;
    });
    return acc;
  }, {});

  // 3) Prepare language chart data
  const languageLabels = Object.keys(languageCounts);
  const languageData = Object.values(languageCounts);

  const languageChartData = {
    labels: languageLabels,
    datasets: [
      {
        label: "Languages",
        data: languageData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // 4) Prepare country chart data
  const countryLabels = Object.keys(countryCounts);
  const countryData = Object.values(countryCounts);

  const countryChartData = {
    labels: countryLabels,
    datasets: [
      {
        label: "Countries",
        data: countryData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Language Insights</h2>
      <div className="w-[300px] h-[300px] mx-auto">
        <Pie data={languageChartData} />
      </div>
    </div>
  );
};

export default CountryLanguageInsights;
