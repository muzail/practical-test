/* eslint-disable react/prop-types */
const SearchInput = ({ value, onChange }) => (
  <div className="relative">
    <input
      name="searchQuery"
      value={value}
      onChange={onChange}
      type="text"
      className="block w-80 p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Search for employees"
    />
  </div>
);

export default SearchInput;
