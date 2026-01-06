import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:3000",
});

axiosPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosPrivate;
