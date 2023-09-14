import React, { useEffect, useState } from "react";
import { CONSTANT } from "../CONSTANT";
import Plot from "react-plotly.js";
import axios from "axios";

export default function HeatmapComponent() {
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
    data: null,
  });

  useEffect(() => {
    if (payload.length > 0) {
      setConfig({
        data: {
          x: payload.map((point) => point.x),
          y: payload.map((point) => point.y),
          mode: "markers",
          marker: {
            size: 20,
            color: "rgba(0, 0, 0, 0.2)",
          },
          type: "scatter",
        },
      });
    }
  }, [payload]);

  return (
    <div className="h-[inherit] w-full flex items-center justify-center">
      {payload?.length > 0 && (
        <Plot
          data={[config.data]}
          layout={{
            title: "Scatter Plot Heatmap",
            xaxis: {
              title: "X Axis",
            },
            yaxis: {
              title: "Y Axis",
            },
          }}
        />
      )}
    </div>
  );
}
