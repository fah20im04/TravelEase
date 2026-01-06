import React from "react";
import Car from "../../../assets/images.png";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Road */}
      <div className="absolute bottom-0 w-full h-24 bg-gray-800"></div>

      {/* Car */}
      <img
        src={Car}
        alt="Moving Car"
        className="w-32 animate-carMove absolute"
      />

      {/* Loading Text */}
      <p className="text-4xl font-bold text-red-700 mt-40">
        Loading...
      </p>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes carMove {
            0% { right: -150px; }
            100% { right: 1000vw; }
          }

          .animate-carMove {
            animation: carMove 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
