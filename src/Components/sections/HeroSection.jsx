import React from "react";

const HeroSection = () => (
  <section
    id="hero"
    className="h-[65vh] flex items-center justify-center text-center bg-blue-900 text-white px-6"
  >
    <div>
      <h1 className="text-5xl font-bold mb-4">
        Explore the World with TravelEase
      </h1>
      <p className="text-lg mb-6">
        Book trusted vehicles & travel experiences with ease
      </p>
      <a
        href="/allVehicles"
        className="bg-white text-primary px-8 py-3 rounded-xl font-semibold"
      >
        Explore Trips
      </a>
    </div>
  </section>
);

export default HeroSection;
