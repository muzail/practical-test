/* eslint-disable react/prop-types */
import Modal from "./Modal";

const EmployeeModal = ({
  isOpen,
  type,
  employee,
  formValues,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {(type === "add" || type === "edit") && (
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={formValues.salary}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Position
              </label>
              <select
                name="position"
                value={formValues.position}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="">Select position</option>
                {["web dev", "web dev intern"].map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {type === "add" ? "Add Data" : "Update Data"}
            </button>
          </div>
        </form>
      )}

      {type === "show" && employee && (
        <div>
          <h2 className="text-lg font-bold mb-4">Employee Details</h2>
          <p>
            <strong>Name:</strong> {employee.name}
          </p>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Position:</strong> {employee.position}
          </p>
          <p>
            <strong>Salary:</strong>{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(employee.salary)}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default EmployeeModal;
