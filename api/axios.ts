import axios from "axios";
import Cookie from "js-cookie";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(null, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const path = window?.location?.pathname;

    if ((status === 401 || status === 403) && typeof window !== "undefined") {
      const shouldRedirect =
        path.startsWith("/teacher") || path.startsWith("/student");

      const isAlreadyOnAuthPage = path.startsWith("/auth");

      if (shouldRedirect && !isAlreadyOnAuthPage) {
        window.location.href = "/auth";
      }

      Cookie.remove("isLogged");
    }

    return Promise.reject(error);
  }
);
