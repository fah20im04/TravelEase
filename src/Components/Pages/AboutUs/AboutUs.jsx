import React from "react";
import useTheme from "../../Theame/useTheme";

const AboutUs = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`max-w-[1200px] mx-auto p-8 rounded-xl transition-colors duration-300 ${
        theme === "dark" ? "bg-darkCard text-white" : "bg-black text-black"
      }`}
    >
      {/* Header */}
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
        About TravelEase
      </h2>

      {/* Description */}
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        TravelEase is your ultimate vehicle rental platform, making it simple
        and safe to book vehicles for any adventure. Whether you’re exploring
        the city or heading out for a road trip, we provide a seamless booking
        experience with verified owners and vehicles.
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 border rounded-xl bg-blue-700 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Book vehicles in just a few clicks with our user-friendly platform.
          </p>
        </div>

        <div className="p-6 border bg-blue-700 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Verified Vehicles</h3>
          <p className="text-gray-600 dark:text-gray-300">
            All vehicles are verified to ensure safety and reliability for your
            journey.
          </p>
        </div>

        <div className="p-6 border bg-blue-700 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Our support team is always ready to help you, anytime, anywhere.
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-12">
        © {new Date().getFullYear()} TravelEase. All rights reserved.
      </p>
    </div>
  );
};

export default AboutUs;
