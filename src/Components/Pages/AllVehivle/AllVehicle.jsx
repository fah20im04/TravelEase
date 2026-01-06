import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../Api/axiosInstance";
import { useTheme } from "../../Theame/ThemeProvider";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";

const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const CATEGORY_OPTIONS = ["Luxury", "Budget", "SUV", "Family", "Adventure"];
const PRICE_SORT_OPTIONS = [
  { label: "Price: High to Low", value: "priceDesc" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Newest Listings", value: "dateDesc" },
];

const AllVehicle = () => {
  const { theme } = useTheme();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("dateDesc");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const vehiclesPerPage = 9;

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);

    const queryParams = new URLSearchParams();
    queryParams.append("page", currentPage);
    queryParams.append("limit", vehiclesPerPage);

    if (debouncedSearch) {
      queryParams.append("search", debouncedSearch);
    }

    if (selectedCategory) {
      queryParams.append("category", selectedCategory);
    }

    if (sortOption) {
      queryParams.append("sort", sortOption);
    }

    try {
      const res = await axiosInstance.get(
        `/allVehicles?${queryParams.toString()}`
      );

      setVehicles(res.data.vehicles || res.data);
      const totalCount = res.data.totalCount || res.data.length;
      setTotalPages(Math.ceil(totalCount / vehiclesPerPage));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, selectedCategory, sortOption]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-xl dark:text-white">
        Loading vehicles...
      </p>
    );

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div
      className={`p-5 min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Banner */}
        <img
          className="h-80 md:h-[450px] w-full object-cover rounded-xl shadow-md"
          src="https://i.ibb.co/qFnRt8dB/john-matychuk-Fg-Tcok-Jpm9w-unsplash.jpg"
          alt="Banner"
        />

        <h1 className="mt-10 font-bold text-primary text-5xl text-center">
          ALL VEHICLES ({vehicles.length})
        </h1>

        {/* SEARCH / FILTER */}
        <div
          className={`mt-10 p-5 rounded-xl shadow-lg ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <form onSubmit={handleSearchSubmit} className="flex gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, location, or description..."
                className={`w-full py-3 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-primary ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className={`py-2 px-3 border rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                <option value="">All Categories</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sortOption}
              onChange={handleSortChange}
              className={`py-2 px-3 border rounded-lg ${
                theme === "dark"
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              {PRICE_SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* GRID */}
        <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className={`card shadow-xl rounded-xl overflow-hidden ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
            >
              <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="h-[250px] w-full object-cover"
              />
              <div className="p-6">
                <h2 className="font-bold text-2xl">{vehicle.vehicleName}</h2>
                <p className="text-gray-500 dark:text-gray-300 line-clamp-2">
                  {vehicle.description}
                </p>
                <p className="text-xl font-bold text-primary mt-3">
                  ${vehicle.pricePerDay} / day
                </p>
                <Link
                  to={`/CarDetails/${vehicle._id}`}
                  className={`mt-4 inline-block px-6 py-2 rounded-xl font-semibold ${
                    theme === "dark"
                      ? "bg-yellow-500 text-gray-900"
                      : "bg-primary text-white"
                  }`}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-primary text-white disabled:opacity-40"
            >
              <ChevronLeft />
            </button>
            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-primary text-white disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllVehicle;
