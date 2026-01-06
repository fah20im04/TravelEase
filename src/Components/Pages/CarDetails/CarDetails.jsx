import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import axiosPrivate from "../../../Api/AxiosPrivate";
import axiosInstance from "../../../Api/axiosInstance";
import { useTheme } from "../../Theame/ThemeProvider";
import Swal from "sweetalert2";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingMessage, setBookingMessage] = useState("");

  // Fetch single vehicle
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axiosInstance.get(`/vehicles/${id}`);
        setVehicle(res.data);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  // Handle booking
  const handleBooking = async () => {
    if (!user) return alert("You must be logged in to book.");
    if (!vehicle) return alert("Vehicle data not loaded yet.");

    const bookingData = {
      vehicleImg: vehicle.coverImage,
      vehicleId: vehicle._id,
      vehicleName: vehicle.vehicleName,
      userEmail: user.email,
      ownerEmail: vehicle.userEmail,
      bookedAt: new Date(),
    };

    try {
      const res = await axiosPrivate.post("/bookings", bookingData);
      setBookingMessage(
        res.data.message || "Booking request sent successfully!"
      );
      Swal.fire({
        icon: "success",
        title: "Vehicle booked successfully!",
        text: "Your booking request has been sent.",
        showConfirmButton: true,
        confirmButtonText: "OK",
        background: theme === "dark" ? "#1f2937" : "#ffffff", // dark gray or white
        color: theme === "dark" ? "#facc15" : "#111827", // yellow or black
        iconColor: theme === "dark" ? "#facc15" : "#10b981", // yellow or green
      });
    } catch (error) {
      console.error("Booking error:", error);
      setBookingMessage(
        error.response?.data?.error || "Booking failed. Try again later."
      );
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Booking Failed",
        text: error.response?.data?.error || "Something went wrong",
        showConfirmButton: true,
        background: theme === "dark" ? "#1f2937" : "#ffffff",
        color: theme === "dark" ? "#facc15" : "#111827",
        iconColor: theme === "dark" ? "#f87171" : "#ef4444",
      });
    }
  };

  if (loading)
    return (
      <p
        className={`text-center mt-20 ${
          theme === "dark" ? "text-yellow-400" : "text-gray-700"
        }`}
      >
        Loading vehicle details...
      </p>
    );
  if (!vehicle)
    return (
      <p
        className={`text-center mt-20 ${
          theme === "dark" ? "text-yellow-400" : "text-red-500"
        }`}
      >
        Vehicle not found or unauthorized.
      </p>
    );

  return (
    <div
      className={`max-w-[1240px] min-h-screen p-4 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Vehicle Image */}
        <div className="lg:w-2/3 w-full rounded-2xl overflow-hidden shadow-lg">
          <img
            src={vehicle.coverImage}
            alt={vehicle.vehicleName}
            className="w-full h-80 md:h-[450px] object-cover transform hover:scale-105 transition duration-500"
          />
        </div>

        {/* Vehicle Details */}
        <div
          className={`lg:w-1/3 w-full p-6 rounded-2xl shadow-lg flex flex-col justify-between transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">{vehicle.vehicleName}</h2>
            <p
              className={`mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {vehicle.description}
            </p>

            <div
              className={`space-y-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <p>
                <strong>Owner:</strong> {vehicle.owner}
              </p>
              <p>
                <strong>Category:</strong> {vehicle.category}
              </p>
              <p>
                <strong>Price/Day:</strong> ${vehicle.pricePerDay}
              </p>
              <p>
                <strong>Location:</strong> {vehicle.location}
              </p>
              <p>
                <strong>Availability:</strong> {vehicle.availability}
              </p>
              <p>
                <strong>Posted By:</strong> {vehicle.userEmail}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(
                  vehicle.createdAt || vehicle.created_at
                ).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleBooking}
            disabled={bookingMessage.includes("already booked")}
            className={`w-full py-3 rounded-xl font-semibold transition-colors duration-300 mt-4 ${
              bookingMessage.includes("already booked")
                ? "bg-gray-400 cursor-not-allowed"
                : theme === "dark"
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {bookingMessage.includes("already booked")
              ? "Already Booked"
              : "Book Now"}
          </button>

          {bookingMessage && (
            <p
              className={`mt-3 text-center text-sm ${
                theme === "dark" ? "text-green-300" : "text-green-600"
              }`}
            >
              {bookingMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
