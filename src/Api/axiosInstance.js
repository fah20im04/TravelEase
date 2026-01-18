import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://travel-ease-server-ruddy.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
