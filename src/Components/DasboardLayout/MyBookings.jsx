import React, { useEffect, useState } from "react";
import axiosPrivate from "../../Api/AxiosPrivate";
import useTheme from "../Theame/useTheme";

const MyBookings = () => {
  const { theme } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axiosPrivate.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel?");
    if (!confirm) return;

    try {
      await axiosPrivate.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Cancel failed", err);
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div
      className={`p-6 rounded-xl shadow ${
        theme === "dark" ? "bg-darkCard" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">My Bookings</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Vehicle</th>
              <th className="py-2">Location</th>
              <th className="py-2">Date</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b">
                <td className="py-2">{booking.vehicleName}</td>
                <td className="py-2">{booking.location}</td>
                <td className="py-2">{booking.date}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="text-center py-4 text-gray-500">No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
