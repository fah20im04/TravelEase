import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosPrivate from "../../../Api/AxiosPrivate";
import { useTheme } from "../../Theame/ThemeProvider";
import LoadingSpinner from "../Loading/LoadingSpinner";

const VehicleCard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError("");
      try {
        // If JWT required, use axiosPrivate
        const res = await axiosPrivate.get("/vehicles");
        console.log("Fetched vehicles:", res.data);

        // Ensure it's an array
        setVehicles(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles. Please try again.");
        setVehicles([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`p-5 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="pl-6 grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl lg:max-w-7xl mx-auto">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className={`card w-full max-w-sm shadow-md hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          >
            <figure>
              <img
                className="h-[200px] w-full object-cover"
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-center">
                {vehicle.vehicleName}
              </h2>
              <p className="mt-2 font-medium text-md">
                <span
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                >
                  {vehicle.description}{" "}
                </span>
                <Link
                  to={`/CarDetails/${vehicle._id}`}
                  className={`font-semibold hover:underline ${
                    theme === "dark" ? "text-blue-500" : "text-blue-700"
                  }`}
                >
                  Car Details...
                </Link>
              </p>

              <div className="card-actions justify-between mt-4 items-center">
                <p className="text-xl font-bold">${vehicle.pricePerDay}/day</p>
                <Link
                  to={`/CarDetails/${vehicle._id}`}
                  className={`btn bg-blue-700   rounded-xl shadow-0 border-0 text-white`}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleCard;
