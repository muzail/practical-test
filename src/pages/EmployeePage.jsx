import { useContext } from "react";
import EmployeeTable from "../components/EmployeeTable";
import AuthContext from "../context/AuthContext";

const EmployeePage = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="h-screen bg-blue-50 w-screen">
      <div className="container mx-auto">
        <div className="flex justify-between mb-8 bg-white px-7 py-4 mt-4">
          <h1 className="text-2xl font-semibold my-auto">Employee Manager</h1>
          <div className="my-auto">
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
        <EmployeeTable />
      </div>
    </div>
  );
};

export default EmployeePage;
