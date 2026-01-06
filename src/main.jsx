import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; 
import "./index.css";
import App from "./App.jsx";

import { RouterProvider } from "react-router-dom"; 
import router from "./route/Route.jsx";
import AuthProvider from "./Components/Auth/AuthProvider.jsx";
import { ThemeProvider } from "./Components/Theame/ThemeProvider.jsx";

// use createRoot directly
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
