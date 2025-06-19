// components/Navbar.jsx
import { User } from 'lucide-react'

const Navbar = ({ currentRole = 'Caretaker', onSwitchRole }) => {
  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between">
      {/* Left: Logo + Name */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-semibold text-lg">
          M
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">MediCare Companion</h1>
          <p className="text-sm text-gray-500">{currentRole} View</p>
        </div>
      </div>

      {/* Right: Switch Button */}
      <button
        onClick={onSwitchRole}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-100 transition"
      >
        <User size={16} />
        <span>Switch to {currentRole === 'Caretaker' ? 'Patient' : 'Caretaker'}</span>
      </button>
    </nav>
  )
}

export default Navbar
