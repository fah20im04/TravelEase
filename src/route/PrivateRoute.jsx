import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Components/Auth/AuthContext";
import LoadingSpinner from "../Components/Pages/Loading/LoadingSpinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const token = localStorage.getItem("accessToken");

    if (loading) return <LoadingSpinner />;
    if (!user || !token) return <Navigate to="/login" replace />;

    return children;
};

export default PrivateRoute;
