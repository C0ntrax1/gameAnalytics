import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav className="h-[4rem] w-full bg-black border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-2xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center md:text-lg text-base font-semibold whitespace-nowrap text-white">
            Point Analytics
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-multi-level"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-multi-level"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-white bg-white rounded md:bg-transparent md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
              >
                Heatmap
              </Link>
            </li>
            {props?.isLoggedIn && (
              <li>
                <Link
                  to="/profile"
                  className="block py-2 pl-3 pr-4 text-white bg-white rounded md:bg-transparent md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                >
                  Profile
                </Link>
              </li>
            )}

            {props?.isLoggedIn ? (
              <li>
                <span
                  onClick={props?.logout}
                  className="cursor-pointer block py-2 pl-3 pr-4 text-white bg-red-700 hover:text-red-500 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-500 dark:bg-red-600 md:dark:bg-transparent"
                >
                  Logout
                </span>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 hover:text-blue-500 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
