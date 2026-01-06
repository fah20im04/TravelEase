import React, { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import axiosPrivate from "../../../Api/AxiosPrivate";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useTheme } from "../../Theame/ThemeProvider";

const AddVehicle = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme(); // get current theme

  const [formData, setFormData] = useState({
    vehicleName: "",
    owner: "",
    category: "",
    pricePerDay: "",
    location: "",
    availability: "",
    description: "",
    coverImage: "",
    userEmail: user?.email || "",
  });

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
      };
      const res = await axiosPrivate.post("/vehicles", payload);
      setToastMessage(res.data.message || "Vehicle added successfully!");

      setFormData({
        vehicleName: "",
        owner: "",
        category: "",
        pricePerDay: "",
        location: "",
        availability: "",
        description: "",
        coverImage: "",
        userEmail: user?.email || "",
      });
    } catch (err) {
      console.error("Add Vehicle Error:", err);
      setToastMessage(
        err.response?.data?.error || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
      setTimeout(() => setToastMessage(""), 4000);
    }
  };

  return (
    <div
      className={`relative max-w-full mx-auto px-4 py-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6">Add Vehicle</h2>

      <form
        className={`space-y-4 p-6 rounded-2xl shadow-lg transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="vehicleName"
          placeholder="Vehicle Name"
          value={formData.vehicleName}
          onChange={handleChange}
          required
          className={`w-full p-3 border rounded-lg outline-none transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <input
          type="text"
          name="owner"
          placeholder="Owner Name"
          value={formData.owner}
          onChange={handleChange}
          required
          className={`w-full p-3 border rounded-lg outline-none transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <input
          type="text"
          name="category"
          placeholder="Category (Sedan/SUV/Van/Electric)"
          value={formData.category}
          onChange={handleChange}
          required
          className={`w-full p-3 border rounded-lg outline-none transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <input
          type="number"
          name="pricePerDay"
          placeholder="Price per Day"
          value={formData.pricePerDay}
          onChange={handleChange}
          required
          className={`w-full p-3 border rounded-lg outline-none transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className={`w-full p-3 border rounded-lg outline-none transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability (Available/Booked)"
          value={formData.availability}
          onChange={handleChange}
          required
          className={`w-full p-3 border rounded-lg outline-none transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className={`w-full p-3 border rounded-lg outline-none transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL"
          value={formData.coverImage}
          onChange={handleChange}
          required
          className={`w-full p-3 border rounded-lg outline-none transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          readOnly
          className={`w-full p-3 border rounded-lg cursor-not-allowed transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-600 text-gray-300 border-gray-600"
              : "bg-gray-100 text-gray-800 border-gray-300"
          }`}
        />

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-semibold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </form>

      {toastMessage && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-xl shadow-lg transition-colors duration-300 ${
            theme === "dark"
              ? "bg-green-700 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {toastMessage}
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default AddVehicle;
