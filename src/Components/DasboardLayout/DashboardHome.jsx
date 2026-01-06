import React, { useContext, useEffect, useState } from "react";
import axiosPrivate from "../../Api/AxiosPrivate";
import { AuthContext } from "../Auth/AuthContext";
import useTheme from "../Theame/useTheme";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingRes, vehicleRes] = await Promise.all([
          axiosPrivate.get("/bookings"),
          axiosPrivate.get("/vehicles"),
        ]);

        setBookings(bookingRes.data);
        setVehicles(vehicleRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = bookings.map((b, index) => ({
    name: `#${index + 1}`,
    bookings: index + 1,
  }));

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      {/* ====== CARDS ====== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "dark" ? "bg-darkCard" : "bg-white"
          }`}
        >
          <h3 className="text-sm text-gray-500">Total Bookings</h3>
          <p className="text-3xl font-bold">{bookings.length}</p>
        </div>

        <div
          className={`p-6 rounded-xl shadow ${
            theme === "dark" ? "bg-darkCard" : "bg-white"
          }`}
        >
          <h3 className="text-sm text-gray-500">Available Vehicles</h3>
          <p className="text-3xl font-bold">{vehicles.length}</p>
        </div>

        <div
          className={`p-6 rounded-xl shadow ${
            theme === "dark" ? "bg-darkCard" : "bg-white"
          }`}
        >
          <h3 className="text-sm text-gray-500">Logged In As</h3>
          <p className="text-xl font-semibold">
            {user?.displayName || user?.email}
          </p>
        </div>
      </div>

      {/* ====== CHART ====== */}
      <div
        className={`p-6 rounded-xl shadow ${
          theme === "dark" ? "bg-darkCard" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Booking Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="bookings" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ====== TABLE ====== */}
      <div
        className={`p-6 rounded-xl shadow ${
          theme === "dark" ? "bg-darkCard" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Vehicle</th>
                <th className="py-2">Location</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking._id} className="border-b">
                  <td className="py-2">{booking.vehicleName}</td>
                  <td className="py-2">{booking.location}</td>
                  <td className="py-2">{booking.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <p className="text-center py-4 text-gray-500">No bookings found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
