import React, { useContext, useState, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../index.css";
import { HiMenu, HiX } from "react-icons/hi";
import SearchBar from "./SearchBar";
import { AuthContext } from "../Auth/AuthContext";
import useTheme from "../Theame/useTheme";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  // 1. Define the navigation links ONCE
  // useMemo to prevent unnecessary re-creation on every render
  const navLinks = useMemo(
    () => [
      { to: "/", label: "Home", requiresAuth: false },
      { to: "/addVehicle", label: "Add Vehicle", requiresAuth: true },
      { to: "/allVehicles", label: "All Vehicles", requiresAuth: false },
      { to: "/myVehicles", label: "My Vehicles", requiresAuth: true },
      { to: "/myBookings", label: "My Bookings", requiresAuth: true },
      {
        to: "/aboutUs",
        label: "About Us",
        requiresAuth: false,
        showIfLoggedOut: true,
      },
      {
        to: "/dashboard",
        label: "Dashboard",
        requiresAuth: true,
        showIfLoggedOut: false,
      },
    ],
    []
  );

  // Filter links based on authentication status
  const visibleNavLinks = navLinks.filter((link) => {
    // If it requires auth, only show if user exists
    if (link.requiresAuth && !user) return false;
    // If it should only show when logged out, only show if user is null
    if (link.showIfLoggedOut && user) return false;
    return true;
  });

  // Reusable component for a single navigation item
  const NavItem = ({ to, label, isMobile }) => (
    <li>
      <NavLink
        to={to}
        // Close the mobile menu on click
        onClick={() => isMobile && setMenuOpen(false)}
      >
        {label}
      </NavLink>
    </li>
  );

  return (
    <div className="sticky top-0 z-50 w-full bg-gray-500 dark:bg-darkBg dark:text-white shadow-lg">
      {menuOpen && (
        <div className="md:hidden absolute text-black dark:text-gray-300 top-[76px] left-1/2 transform -translate-x-1/2 w-[60%] max-w-xs rounded-2xl shadow-xl border border-gray-600 z-50 bg-white dark:bg-darkCard">
          <ul className="flex flex-col gap-2 p-3 font-semibold">
            {visibleNavLinks.map((link) => (
              <NavItem
                key={link.to}
                to={link.to}
                label={link.label}
                isMobile={true}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Navbar Content */}
      <div className="flex justify-between items-center px-6 md:px-12 py-4 relative">
        {/* Logo */}
        <div className="bg-none bg-opacity-0 p-3 rounded-2xl shadow-md border border-gray-300 w-fit">
          <Link to="/" className="font-bold text-2xl">
            TRA<span className="text-primary">VELE</span>ASE
          </Link>
        </div>

        {/* 3. Desktop menu (hidden on mobile, shown on md screens) */}
        <div className="hidden md:flex bg-opacity-80 p-4 rounded-2xl w-fit md:w-full lg:w-fit shadow-md border items-center justify-center border-gray-300 gap-6 font-semibold text-black dark:text-white text-sm h-10">
          <ul className="flex items-center text-center gap-6 md:gap-2 lg:gap-6 text-sm list-none p-0 m-0">
            {/* Map over the unified array for desktop */}
            {visibleNavLinks.map((link) => (
              <NavItem
                key={link.to}
                to={link.to}
                label={link.label}
                isMobile={false}
              />
            ))}
          </ul>
        </div>

        {/* Login / Logout / Theme */}
        <div className="flex items-center gap-4">
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            title="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user ? (
            <>
              <button
                title={user.displayName}
                onClick={logOut}
                className="bg-blue-800 bg-opacity-90 rounded-2xl font-bold text-sm text-white border-gray-300 transform transition-transform duration-300 hover:scale-105 px-6 py-2"
              >
                LogOut
              </button>
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </>
          ) : (
            <Link
              to="/login"
              className="bg-primary bg-opacity-90 rounded-2xl font-bold text-xl text-white border-gray-300 transform transition-transform duration-300 hover:scale-105 px-6 py-2"
            >
              LogIn
            </Link>
          )}

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black dark:text-white text-3xl"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
