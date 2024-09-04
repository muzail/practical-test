/* eslint-disable react/prop-types */
const EmployeeTableContent = ({ employees, onShow, onEdit, onDelete }) => (
  <table className="w-full text-sm text-left text-gray-500">
    <thead className="text-xs text-gray-700 uppercase">
      <tr>
        <th className="px-6 py-3">Name</th>
        <th className="px-6 py-3">Email</th>
        <th className="px-6 py-3">Position</th>
        <th className="px-6 py-3">Salary</th>
        <th className="px-6 py-3">
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee, index) => (
        <tr key={index} className="border-b">
          <td className="px-6 py-4 font-medium text-gray-900">
            {employee.name}
          </td>
          <td className="px-6 py-4">{employee.email}</td>
          <td className="px-6 py-4">{employee.position.toUpperCase()}</td>
          <td className="px-6 py-4">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(employee.salary)}
          </td>
          <td className="px-6 py-4 flex gap-2">
            <button
              onClick={() => onShow("show", employee)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Show
            </button>
            <button
              onClick={() => onEdit("edit", employee)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(employee.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EmployeeTableContent;
