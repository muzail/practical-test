/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { token } = useContext(AuthContext);

  // Jika tidak ada token, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  // Jika ada token, tampilkan elemen yang dilindungi
  return element;
};

export default ProtectedRoute;
