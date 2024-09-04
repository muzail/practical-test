import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route
            path="/"
            element={<ProtectedRoute element={<EmployeePage />} />}
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
