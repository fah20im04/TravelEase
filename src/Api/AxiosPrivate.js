import axios from "axios";

const axiosPrivate = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://travel-ease-server-ruddy.vercel.app",
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPrivate;
