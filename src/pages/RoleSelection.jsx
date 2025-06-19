import { Heart, User, Users } from 'lucide-react'

export default function RoleSelection() {
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-50 to-green-50 px-4">
      <div className="flex flex-col items-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-sm mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
        <h1 className="text-3xl font-bold mt-4 text-center">Welcome to MediCare Companion</h1>
        <p className="text-gray-600 text-center mt-2 max-w-md">
          Your trusted partner in medication management. Choose your role to get started with personalized features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Patient Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
              <i className="fas fa-user"></i><User className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center text-blue-700">I'm a Patient</h2>
          <p className="text-center text-gray-600 mt-1 mb-4">
            Track your medication schedule and maintain your health records
          </p>
          <ul className="text-sm text-gray-700 space-y-1 pl-6 mb-4 list-disc">
            <li>Mark medications as taken</li>
            <li>Upload proof photos (optional)</li>
            <li>View your medication calendar</li>
            <li>Large, easy-to-use interface</li>
          </ul>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            
          >
            Continue as Patient
          </button>
        </div>

        {/* Caretaker Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full text-2xl">
              <i className="fas fa-user-friends"></i> <Users className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center text-green-700">I'm a Caretaker</h2>
          <p className="text-center text-gray-600 mt-1 mb-4">
            Monitor and support your loved one's medication adherence
          </p>
          <ul className="text-sm text-gray-700 space-y-1 pl-6 mb-4 list-disc">
            <li>Monitor medication compliance</li>
            <li>Set up notification preferences</li>
            <li>View detailed reports</li>
            <li>Receive email alerts</li>
          </ul>
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
            
          >
            Continue as Caretaker
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        You can switch between roles anytime after setup
      </p>
    </div>
  )
}
