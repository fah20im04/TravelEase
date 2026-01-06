import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Components/RootLayout/RootLayout";
import Home from "../Components/Pages/Home/Home";
import Banner from "../Components/Banner/Banner";
import Login from "../Components/Navbar/Login";
import Register from "../Components/Navbar/Register";
import CarDetails from "../Components/Pages/CarDetails/CarDetails";
import AllVehicle from "../Components/Pages/AllVehivle/AllVehicle";
import PrivateRoute from "./PrivateRoute";
import MyBookings from "../Components/Pages/MyBookings/MyBookings";
import MyVehicle from "../Components/Pages/MyVehicle/MyVehicle";
import AddVehicle from "../Components/Pages/AddVehicle/AddVehicle";
import UpdateVehicle from "../Components/Pages/UpdataVehicle/UpdateVehicle";
import LoadingSpinner from "../Components/Pages/Loading/LoadingSpinner";
import ErrorPage from "../Components/Pages/ErrorPage/Errorpage";
import axiosPrivate from "../Api/AxiosPrivate";
import axiosInstance from "../Api/axiosInstance";
import DashboardLayout from "../Components/DasboardLayout/DashboardLayout";
import DashboardHome from "../Components/DasboardLayout/DashboardHome";
import Profile from "../Components/DasboardLayout/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },

      {
        path: "/allVehicles",
        loader: async () => {
          const res = await axiosPrivate.get("/allVehicles");
          return res.data;
        },
        element: <AllVehicle />,
        hydrateFallbackElement: <LoadingSpinner />,
      },

      { path: "/banner", element: <Banner /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "/CarDetails/:id",
        loader: async ({ params }) => {
          const res = await axiosInstance.get(`/vehicles/${params.id}`);
          return res.data;
        },
        element: <CarDetails />,
      },

      {
        path: "/myBookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },

      {
        path: "/myVehicles",
        element: <MyVehicle />,
      },
      {
        path: "/addVehicle",
        element: <AddVehicle />,
      },

      {
        path: "/updateVehicle/:id",
        element: (
          <PrivateRoute>
            <UpdateVehicle />
          </PrivateRoute>
        ),
      },

      {
        path: "*",
        element: <ErrorPage message="Page not found!" code={404} />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "bookings",
        element: <MyBookings />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
