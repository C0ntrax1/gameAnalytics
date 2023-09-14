import React, { useContext, useEffect, useState } from "react";
import PointChart from "../components/PointChart";
import { checkLoginFromNonLogin } from "../CONSTANT";
import { useNavigate } from "react-router-dom";
import UserData from "../contexts/UserData";

export default function Profile() {
  const { session } = useContext(UserData);
  let navigate = useNavigate();
  useEffect(() => {
    if (checkLoginFromNonLogin()) {
      navigate("/login");
    }
  }, [session]);

  return (
    <div className="w-full flex justify-center items-center h-full flex-col">
      <h1 className="my-2 md:text-2xl text-lg text-center">
        Personal Analytics
      </h1>
      <h1 className="my-2 mt-10 mb-5 text-md text-gray-500">Point Chart</h1>
      <div className="md:h-96 h-full w-full">
        <PointChart user_id={session?.personal?.userid} />
      </div>
    </div>
  );
}
