
import { Users, User } from "lucide-react";

const Header = ({ userRole, toggleUserRole }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">MediCare Companion</h1>
            <p className="text-sm text-gray-500">
              {userRole === "patient" ? "Patient View" : "Caretaker View"}
            </p>
          </div>
        </div>

        <button
          onClick={toggleUserRole}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition"
        >
          {userRole === "patient" ? <Users className="w-4 h-4" /> : <User className="w-4 h-4" />}
          Switch to {userRole === "patient" ? "Caretaker" : "Patient"}
        </button>
      </div>
    </header>
  );
};

export default Header;