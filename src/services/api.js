import axios from "axios";
import { useNavigate } from "react-router-dom";
import ENDPOINTS from "../utils/endpoints";

const api = axios.create({
  baseURL: ENDPOINTS.BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      const navigate = useNavigate();
      navigate("/login");

      console.error("Token expired or invalid, please log in again.");
    }

    // Lanjutkan error handling
    return Promise.reject(error);
  }
);

export default api;
