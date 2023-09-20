import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import axios from "axios";
import { CONSTANT } from "../CONSTANT";

ChartJS.register(annotationPlugin);
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Heatmap(props) {
  const fetchPoints = async () => {
    await axios
      .get(CONSTANT.server + `heatmap`)
      .then((response) => {
        setPayload(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPoints();
  }, []);
  const [payload, setPayload] = useState([]);

  const [config, setConfig] = useState({
    options: null,
    data: null,
  });

  useEffect(() => {
    if (payload.length > 0) {
      let maxs = [
        Math.max(...payload.map((point) => point.y)),
        Math.min(...payload.map((point) => point.y)) < 0
          ? -Math.min(...payload.map((point) => point.y))
          : Math.min(...payload.map((point) => point.y)),
        Math.max(...payload.map((point) => point.x)),
        Math.min(...payload.map((point) => point.x)) < 0
          ? -Math.min(...payload.map((point) => point.x))
          : Math.min(...payload.map((point) => point.x)),
      ];
      let maximum = Math.max(...maxs.map((point) => point));
      const customPointCanvas = function (context, options) {
        let cvs = document.createElement("canvas");
        let ctx = cvs.getContext("2d");
        let radius = options.pointRadius || 5;

        cvs.height = 2 * radius;
        cvs.width = 2 * radius;

        // Draw a black circle
        ctx.beginPath();
        ctx.arc(radius, radius, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#fcc401";
        ctx.fill();
        ctx.closePath();

        // Add the point's label inside the circle
        ctx.font = "15px Arial";
        ctx.fillStyle = "#fcc401"; // Text color
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        return cvs;
      };
      setConfig({
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: maximum + 0.5,
              min: -maximum - 0.5,
              display: false, // Remove Y-axis labels
              grid: {
                display: false, // Remove Y-axis grid
              },
            },
            x: {
              beginAtZero: true,
              max: maximum + 0.5,
              min: -maximum - 0.5,
              display: false, // Remove X-axis labels
              grid: {
                display: false, // Remove X-axis grid
              },
            },
          },
          responsive: true,
          plugins: {
            annotation: {
              drawTime: "afterDatasetsDraw",
              annotations: {
                xLine: {
                  type: "line",
                  borderColor: "white",
                  borderWidth: 1,
                  scaleID: "x",
                  value: 0,
                },
                yLine: {
                  type: "line",
                  borderColor: "white",
                  borderWidth: 1,
                  scaleID: "y",
                  value: 0,
                },
              },
            },
            legend: {
              display: false, // Hide the legend
            },
            tooltip: {
              enabled: false, // Disable the tooltip
            },
          },
        },
        data: {
          datasets: [
            {
              label: "Point",
              data: payload.map((point) => ({
                x: point.x,
                y: point.y,
                label: point?.label,
              })),
              // Use 'custom' as the point style to display HTML content
              pointStyle: customPointCanvas,
              pointRadius: 10, // Adjust the point radius as needed
              pointBackgroundColor: "transparent", // Make the point background transparent
            },
          ],
        },
      });
    }
  }, [payload]);

  return (
    <div className="h-[calc(100vh-15rem)] w-full flex items-center justify-center">
      {payload && config.data && config.options && (
        <Scatter
          options={config.options}
          data={config.data}
          height={"700"}
          width={"700"}
        />
      )}
    </div>
  );
}
