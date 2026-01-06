import React, { useContext, useEffect, useState } from "react";
import axiosPrivate from "../../../Api/AxiosPrivate";
import { AuthContext } from "../../Auth/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Theame/ThemeProvider";
import LoadingSpinner from "../Loading/LoadingSpinner";

const MyBookings = () => {
  const { user, loading } = useContext(AuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const res = await axiosPrivate.get("/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        Swal.fire({
          title: "Error",
          text:
            err.response?.data?.error ||
            "Failed to load bookings. Please try again.",
          icon: "error",
          background: theme === "dark" ? "#1f2937" : "#fff",
          color: theme === "dark" ? "#fef3c7" : "#000",
        });
      } finally {
        setFetching(false);
      }
    };

    fetchBookings();
  }, [user, theme]);

  // Cancel booking
  const handleCancel = async (bookingId) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirm) return;

    try {
      const res = await axiosPrivate.delete(`/bookings/${bookingId}`);
      Swal.fire({
        icon: "success",
        title: "Cancelled!",
        text: res.data.message || "Booking cancelled successfully!",
        timer: 2000,
        showConfirmButton: false,
        background: theme === "dark" ? "#1f2937" : "#fff",
        color: theme === "dark" ? "#fef3c7" : "#000",
      });
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Error cancelling booking:", err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.error || "Something went wrong!",
        icon: "error",
        background: theme === "dark" ? "#1f2937" : "#fff",
        color: theme === "dark" ? "#fef3c7" : "#000",
      });
    }
  };

  if (loading || fetching) {
    return (
      <p
        className={`text-center mt-10 ${
          theme === "dark" ? "text-yellow-400" : "text-gray-700"
        }`}
      >
        <LoadingSpinner></LoadingSpinner>
      </p>
    );
  }

  return (
    <div
      className={`max-w-full mx-auto px-4 py-8 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p
          className={`text-gray-500 ${theme === "dark" ? "text-gray-300" : ""}`}
        >
          You have no bookings yet.
        </p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className={`flex flex-col md:flex-row items-center rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              {/* Vehicle Image */}
              <div className="w-full md:w-1/4 h-48 md:h-32 overflow-hidden p-2">
                <img
                  src={booking.vehicleImg || "https://via.placeholder.com/150"}
                  alt={booking.vehicleName}
                  className="w-full object-cover h-full rounded-2xl"
                />
              </div>

              {/* Vehicle Info */}
              <div className="flex-1 p-4 md:px-6">
                <h3 className="text-2xl font-bold">{booking.vehicleName}</h3>
                <p
                  className={`font-semibold mt-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {booking.ownerEmail}
                </p>
                <p
                  className={`text-sm mt-1 font-semibold ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Booked at: {new Date(booking.bookedAt).toLocaleString()}
                </p>
                <p className="mt-2 font-bold">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      booking.status === "Confirmed"
                        ? "text-green-500"
                        : "text-yellow-400"
                    }`}
                  >
                    {booking.status || "Pending"}
                  </span>
                </p>
              </div>

              {/* Cancel Button */}
              <div className="p-5 flex justify-end md:justify-center">
                <button
                  onClick={() => handleCancel(booking._id)}
                  className={`py-2 px-4 rounded-xl font-semibold transition ${
                    theme === "dark"
                      ? "bg-red-600 text-gray-900 hover:bg-red-700"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
