import EmployeeTableContent from "./EmployeeTableContent";
import EmployeeModal from "./EmployeeModal";
import SalaryRangeInput from "./SalaryRangeInput";
import PositionFilter from "./PositionFilter";
import SearchInput from "./SearchInput";
import ENDPOINTS from "../utils/endpoints";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import api from "../services/api";

const EmployeeTable = () => {
  const { token } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: "",
    positionFilter: "",
    salaryRange: { min: "", max: "" },
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "", // 'edit', 'add', or 'show'
    employee: null,
  });
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
  });

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await api.get(ENDPOINTS.EMPLOYEE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  }, [token]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployees = employees.filter((employee) => {
    const { searchQuery, positionFilter, salaryRange } = filters;
    return (
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (positionFilter === "" || employee.position === positionFilter) &&
      (salaryRange.min === "" || employee.salary >= Number(salaryRange.min)) &&
      (salaryRange.max === "" || employee.salary <= Number(salaryRange.max))
    );
  });

  const openModal = (type, employee = null) => {
    setEditForm(
      employee
        ? {
            name: employee.name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
          }
        : { name: "", email: "", position: "", salary: "" }
    );
    setModalState({ isOpen: true, type, employee });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "", employee: null });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalState.type === "edit") {
        const response = await api.put(
          `${ENDPOINTS.EMPLOYEE}/${modalState.employee.id}`,
          editForm,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.id === modalState.employee.id
              ? { ...emp, ...response.data }
              : emp
          )
        );
        alert("Employee updated successfully.");
      } else if (modalState.type === "add") {
        const response = await api.post(ENDPOINTS.EMPLOYEE, editForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees((prevEmployees) => [...prevEmployees, response.data]);
        alert("Employee added successfully.");
      }
      closeModal();
    } catch (error) {
      console.error("Failed to update employee", error);
      alert("Failed to update employee.");
    }
  };

  const handleDelete = async (employeeId) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.delete(`${ENDPOINTS.EMPLOYEE}/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== employeeId)
        );
        alert("Employee deleted successfully.");
      } catch (error) {
        console.error("Failed to delete employee", error);
        alert("Failed to delete employee.");
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSalaryRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      salaryRange: {
        ...prevFilters.salaryRange,
        [name]: value,
      },
    }));
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg bg-white p-7">
      <div className="pb-4 flex justify-between">
        <div className="relative mt-1">
          <SearchInput
            value={filters.searchQuery}
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex">
          <button
            onClick={() => openModal("add")}
            className="bg-blue-500 text-white px-4 py-2 rounded flex"
          >
            <svg
              className="me-1 -ms-1 w-5 h-5 my-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Add Data
          </button>
          <PositionFilter
            value={filters.positionFilter}
            onChange={handleFilterChange}
          />
          <SalaryRangeInput
            min={filters.salaryRange.min}
            max={filters.salaryRange.max}
            onMinChange={handleSalaryRangeChange}
            onMaxChange={handleSalaryRangeChange}
          />
        </div>
      </div>
      <EmployeeTableContent
        employees={filteredEmployees}
        onShow={openModal}
        onEdit={openModal}
        onDelete={handleDelete}
      />
      <EmployeeModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        employee={modalState.employee}
        formValues={editForm}
        onChange={handleEditChange}
        onSubmit={handleEditSubmit}
        onClose={closeModal}
      />
    </div>
  );
};

export default EmployeeTable;
