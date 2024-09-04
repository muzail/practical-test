/* eslint-disable react/prop-types */
const PositionFilter = ({ value, onChange }) => (
  <select
    name="positionFilter"
    value={value}
    onChange={onChange}
    className="border p-2 rounded ml-2"
  >
    <option value="">All Positions</option>
    <option value="web dev">Web Dev</option>
    <option value="web dev intern">Web Dev Intern</option>
  </select>
);

export default PositionFilter;
