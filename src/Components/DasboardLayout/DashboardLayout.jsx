import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import useTheme from "../Theame/useTheme";
import { Menu, X, Home, Calendar, User, LogOut } from "lucide-react";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();

  // STATE TO CONTROL SIDEBAR VISIBILITY (Defaulting to open for desktop feel)
  // Let's set the initial state based on screen size for a better desktop default UX
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  // Helper function for NavLink styling
  const getNavLinkClass = (isActive) => {
    const defaultClasses =
      "px-4 py-2 rounded-lg font-medium transition flex items-center gap-3";
    const activeClass = "bg-blue-600 text-white shadow-md";
    const inactiveLight = "text-gray-700 hover:bg-gray-200";
    const inactiveDark = "text-gray-300 hover:bg-gray-700";

    return `${defaultClasses} ${
      isActive ? activeClass : theme === "dark" ? inactiveDark : inactiveLight
    }`;
  };

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        theme === "dark" ? "bg-darkBg text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* MOBILE SIDEBAR BACKDROP - Only show on small screens */}
      {isSidebarOpen && window.innerWidth < 768 && (
        <div
          onClick={toggleSidebar} // Click backdrop to close
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        ></div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 z-50 transform 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
          shadow-xl transition-transform duration-300 
          ${
            theme === "dark"
              ? "bg-darkCard text-white"
              : "bg-white text-gray-900"
          }
        `}
      >
        {/* Logo */}
        <div className="p-6 text-2xl font-bold text-blue-600">
          <Link to="/">TravelEase</Link>
        </div>

        {/* Menu (Remains the same) */}
        <nav className="flex flex-col gap-2 px-4 mt-4">
          <NavLink
            to="/dashboard"
            end
            // Note: Use toggleSidebar here so the button icon updates correctly.
            onClick={() => window.innerWidth < 768 && toggleSidebar()}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <Home size={20} /> Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/bookings"
            onClick={() => window.innerWidth < 768 && toggleSidebar()}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <Calendar size={20} /> My Bookings
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            onClick={() => window.innerWidth < 768 && toggleSidebar()}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <User size={20} /> Profile
          </NavLink>
        </nav>

        {/* Logout Link */}
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg font-medium transition flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <header
          className={`h-16 shadow flex items-center justify-between px-6 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-darkCard text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {/* Dynamic Toggle Button for Sidebar (Works for all sizes) */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar} // Use the toggle function for both mobile/desktop
              className="p-2 text-black bg-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Title */}
            <h1 className="text-xl text-blue-700 font-semibold">
              {isSidebarOpen && window.innerWidth >= 768
                ? "Dashboard"
                : "TravelEase"}
            </h1>
          </div>

          {/* Profile Section (Remains the same) */}
          {user && (
            <div className="relative group">
              <button className="flex items-center gap-3 focus:outline-none">
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-9 h-9 rounded-full border"
                />
                <span className="font-medium hidden sm:block">
                  {user.displayName || "User"}
                </span>
              </button>
              <div
                className={`absolute right-0 mt-2 w-44 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                  theme === "dark" ? "bg-darkBg" : "bg-white"
                }`}
              >
                <NavLink
                  to="/dashboard/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dashboard Home
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </header>

        {/* ================= CONTENT ================= */}
        <main
          className={`flex-1 p-6 transition-colors duration-300 ${
            theme === "dark" ? "bg-darkBg" : "bg-gray-100"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
