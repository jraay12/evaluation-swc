import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import JwtDecoder from "../../utils/JwtDecoder"
const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const userData = JwtDecoder().decodedToken
  const role = userData ? userData?.role : ""

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

   
    const label = (role === "Teacher" || role === "Non-Teaching") 
    ? ["1", "2", "3", "4"]  
    : ["1", "2", "3", "4", "5"]; 
  
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: label,
        datasets: [
          {
            data: data, 
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(100, 4, 192, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          datalabels: {
            color: "white",
            display: true,
            formatter: (value) => console.log(value), 
            font: {
              weight: "bold",
              size: 16,
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [role]);

  return (
    <div>
      <canvas ref={chartRef} className="max-w-44 max-h-44"></canvas>
    </div>
  );
};

export default PieChart;
