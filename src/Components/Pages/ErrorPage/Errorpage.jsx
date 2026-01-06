
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message = "Oops! Something went wrong.", code = 404 }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">{code}</h1>
      <p className="text-2xl font-semibold mb-6">{message}</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
      >
        Go Back to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;
