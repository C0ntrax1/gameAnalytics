import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  checkLoginFromLogin,
} from "../CONSTANT";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (checkLoginFromLogin()) {
      navigate("/");
    }
  }, []);
  const login = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (payload.userid !== "") {
      await axios
        .post(CONSTANT.server + "login", payload)
        .then((responce) => {
          if (responce.status === 200) {
            let res = responce.data;
            if (res.message) {
              setMessage(res.message, "red-500");
            } else {
              sessionStorage.setItem(
                "loggedin",
                JSON.stringify({
                  data: res,
                })
              );
              navigate("/");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setMessage("Please enter user id.", "red-500");
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Log In";
  };

  const init__payload = {
    userid: "",
  };
  const [payload, setPayload] = useState(init__payload);
  const changePayload = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Link to="/">
              <h1 className="text-lg text-center mb-10 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Point Analytics
              </h1>
            </Link>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="userid"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User ID
                </label>
                <input
                  type="number"
                  name="userid"
                  value={payload.userid}
                  onChange={changePayload}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </div>
              <button
                onClick={login}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log In
              </button>
              <div
                className="my-10"
                id="error"
                style={{ display: "none" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
