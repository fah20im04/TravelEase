import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import Swal from "sweetalert2";
import axiosInstance from "../../../Api/axiosInstance";
import LoadingSpinner from "../Loading/LoadingSpinner";
import axiosPrivate from "../../../Api/AxiosPrivate";
import { useTheme } from "../../Theame/ThemeProvider"; // import theme hook

const MyVehicles = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme(); // get current theme
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchVehicles = async () => {
      try {
        const res = await axiosPrivate.get("/allVehicles");
        const data = res.data;
        const userVehicles = data.filter((v) => v.userEmail === user.email);
        setVehicles(userVehicles);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: theme === "dark" ? "#1f2937" : "#fff",
      color: theme === "dark" ? "#fef3c7" : "#000",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/vehicles/${id}`);
        const data = res.data;
        setVehicles((prev) => prev.filter((v) => v._id !== id));
        Swal.fire("Deleted!", data.message || "Vehicle deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!user)
    return (
      <p
        className={`text-center mt-20 text-xl ${
          theme === "dark" ? "text-yellow-400" : "text-gray-700"
        }`}
      >
        Please log in to see your vehicles.
      </p>
    );

  return (
    <div
      className={`max-w-full mx-auto px-4 py-8 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6">My Vehicles</h2>

      {vehicles.length === 0 ? (
        <p
          className={`text-gray-500 ${theme === "dark" ? "text-gray-300" : ""}`}
        >
          You haven't added any vehicles yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <img
                src={vehicle.coverImage || "https://via.placeholder.com/300"}
                alt={vehicle.vehicleName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-xl font-bold">{vehicle.vehicleName}</h3>
                <p
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {vehicle.category}
                </p>
                <p
                  className={`font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  ${vehicle.pricePerDay}/day
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/CarDetails/${vehicle._id}`)}
                    className={`flex-1 py-2 rounded-lg transition ${
                      theme === "dark"
                        ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate(`/updateVehicle/${vehicle._id}`)}
                    className={`flex-1 py-2 rounded-lg transition ${
                      theme === "dark"
                        ? "bg-green-500 text-gray-900 hover:bg-green-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className={`flex-1 py-2 rounded-lg transition ${
                      theme === "dark"
                        ? "bg-red-500 text-gray-900 hover:bg-red-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
