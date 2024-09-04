/* eslint-disable react/prop-types */
const SalaryRangeInput = ({ min, max, onMinChange, onMaxChange }) => (
  <>
    <input
      name="min"
      type="number"
      value={min}
      onChange={onMinChange}
      placeholder="Min Salary"
      className="border p-2 rounded ml-2"
    />
    <input
      name="max"
      type="number"
      value={max}
      onChange={onMaxChange}
      placeholder="Max Salary"
      className="border p-2 rounded ml-2"
    />
  </>
);

export default SalaryRangeInput;
