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

export default function PointChart(props) {
  const fetchPoints = async () => {
    await axios
      .get(CONSTANT.server + `points/${props?.user_id}`)
      .then((responce) => {
        setPayload(responce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (props?.user_id) {
      fetchPoints();
    }
  }, [props]);

  const [payload, setPayload] = useState([]);

  const [config, setConfig] = useState({
    options: null,
    data: null,
  });

  useEffect(() => {
    if (payload.length > 0) {
      setConfig({
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: Math.max(...payload.map((point) => point.y)) + 0.2,
              min: Math.min(...payload.map((point) => point.y)) - 0.2,
            },
            x: {
              beginAtZero: true,
              max: Math.max(...payload.map((point) => point.x)) + 0.2,
              min: Math.min(...payload.map((point) => point.x)) - 0.2,
            },
          },
          responsive: true,
          plugins: {
            annotation: {
              drawTime: "afterDatasetsDraw",
              annotations: {
                xLine: {
                  type: "line",
                  borderColor: "black",
                  borderWidth: 1,
                  scaleID: "x",
                  value: 0,
                },
                yLine: {
                  type: "line",
                  borderColor: "black",
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
              callbacks: {
                label: function (context) {
                  const label =
                    context.dataset.data[context.dataIndex].label || "";
                  return `${label} (${
                    context.dataset.data[context.dataIndex].x
                  }, ${context.dataset.data[context.dataIndex].y})`;
                },
              },
            },
          },
        },
        data: {
          datasets: [
            {
              label: "Point",
              data: payload,
              backgroundColor: "red",
            },
          ],
        },
      });
    }
  }, [payload]);

  return (
    <div className="h-[inherit] w-full flex items-center justify-center">
      {payload && config.data && config.options && (
        <Scatter options={config.options} data={config.data} />
      )}
    </div>
  );
}
