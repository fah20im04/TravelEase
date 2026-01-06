import React from 'react';
import Car from '../../assets/dodge.jpg';

const Banner = () => {
  return (
    <div className="relative mt-[-90px] w-full">
      {/* Background Image */}
      <img
        src={Car}
        alt="Car"
        className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh] object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0  bg-black/30"></div>

      {/* Hero Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
        <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl drop-shadow-lg">
          Drive More
        </h2>
        <p className="text-white mt-2 text-sm sm:text-lg md:text-2xl lg:text-3xl drop-shadow-md">
          Experience the ultimate driving journey
        </p>
      </div>
    </div>
  );
};

export default Banner;
