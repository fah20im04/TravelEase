import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function useTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement; // <html />
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    Swal.fire({
      title: "Hello!",
      text: "Reload to get the theme",
      icon: "success",
      background: theme === "dark" ? "#1f2937" : "#fff", // dark gray / white
      color: theme === "dark" ? "#f9fafb" : "#111", // text color
      confirmButtonColor: theme === "dark" ? "#facc15" : "#3b82f6", // button color
    });
  };

  return { theme, toggleTheme };
}
