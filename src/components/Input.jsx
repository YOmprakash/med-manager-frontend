
const Input = ({ label, name, type, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      required
      placeholder={`Enter your ${label.toLowerCase()}`}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
    />
  </div>
)

export default Input
