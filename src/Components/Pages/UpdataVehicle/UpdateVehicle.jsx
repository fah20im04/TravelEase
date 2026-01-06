import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axiosPrivate from "../../../Api/AxiosPrivate";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useTheme } from "../../Theame/ThemeProvider";

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    vehicleName: "",
    owner: "",
    category: "",
    pricePerDay: "",
    location: "",
    availability: "",
    description: "",
    coverImage: "",
    userEmail: "",
  });

  // Fetch vehicle data on mount
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axiosPrivate.get(`/vehicles/${id}`);
        const data = res.data;

        setVehicle(data);
        setFormData({
          vehicleName: data.vehicleName || "",
          owner: data.owner || "",
          category: data.category || "",
          pricePerDay: data.pricePerDay || "",
          location: data.location || "",
          availability: data.availability || "",
          description: data.description || "",
          coverImage: data.coverImage || "",
          userEmail: data.userEmail || "",
        });
      } catch (err) {
        console.error("Failed to fetch vehicle:", err);
        Swal.fire({
          title: "Error",
          text: "Failed to load vehicle data",
          icon: "error",
          background: theme === "dark" ? "#1f2937" : "#fff",
          color: theme === "dark" ? "#fef3c7" : "#000",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, theme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.put(`/vehicles/${id}`, formData);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: res.data.message || "Vehicle updated successfully",
        timer: 2000,
        showConfirmButton: false,
        background: theme === "dark" ? "#1f2937" : "#fff",
        color: theme === "dark" ? "#fef3c7" : "#000",
      });
      navigate("/myVehicles");
    } catch (err) {
      console.error("Error updating vehicle:", err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.error || "Something went wrong",
        icon: "error",
        background: theme === "dark" ? "#1f2937" : "#fff",
        color: theme === "dark" ? "#fef3c7" : "#000",
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!vehicle)
    return (
      <p
        className={`text-center mt-20 ${
          theme === "dark" ? "text-yellow-400" : "text-gray-700"
        }`}
      >
        Vehicle not found.
      </p>
    );

  return (
    <div
      className={`max-w-full mx-auto p-6 rounded-2xl mt-10 shadow-lg transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6">Update Vehicle</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "vehicleName",
          "owner",
          "category",
          "pricePerDay",
          "location",
          "availability",
          "coverImage",
        ].map((field) => (
          <input
            key={field}
            type={field === "pricePerDay" ? "number" : "text"}
            name={field}
            placeholder={field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            value={formData[field]}
            onChange={handleChange}
            className={`w-full border p-2 rounded-lg transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
            required={field !== "coverImage"}
          />
        ))}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className={`w-full border p-2 rounded-lg transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
          required
          rows={4}
        />

        <button
          type="submit"
          className={`w-full py-2 rounded-lg font-semibold transition-colors duration-300 ${
            theme === "dark"
              ? "bg-green-600 text-gray-900 hover:bg-green-700"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
