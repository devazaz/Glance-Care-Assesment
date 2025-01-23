import React from "react";

const Rating = ({ progress }) => {
  // Limit progress value to a maximum of 100
  const progressValue = Math.min(Math.max(progress, 0), 100);

  // Calculate stroke-dashoffset for the progress circle
  const strokeDashoffset = 100 - progressValue;

  // Determine colors based on progress value
  const circleColor = progressValue > 70 ? "#21d07a" : "#d2d532";

  return (
    <div className="relative w-10 h-10 rounded-full bg-[#081c22]">
      <svg
        className="w-full h-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-[#081c22]"
          strokeWidth="3"
        ></circle>
        {/* Progress Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke={circleColor}
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        ></circle>
      </svg>
      {/* Percentage Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-[#081c22]">
        <span className="text-center font-bold" style={{ fontSize: "12px", color: "white" }}>
          {progressValue}
        </span>
      </div>
    </div>
  );
};

export default Rating;
