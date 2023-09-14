import React from "react";
import Heatmap from "../components/Heatmap";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center h-full flex-col">
      <h1 className="my-10 md:text-2xl text-lg text-center">Heatmap</h1>
      <div className="md:h-[30rem] h-full w-full">
        <Heatmap />
      </div>
    </div>
  );
}
