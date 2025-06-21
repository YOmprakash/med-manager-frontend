import { Users, User, Heart } from "lucide-react";

const Onboarding = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to MediCare Companion
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in medication management. Choose your role to get started with personalized features.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Patient Card */}
          <div
            className="group hover:shadow-xl border border-gray-200 transition-all duration-300  hover:border-blue-200 rounded-xl p-6 bg-white cursor-pointer"
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl text-blue-700 font-semibold mb-1">I'm a Patient</h2>
              <p className="text-base text-gray-600">
                Track your medication schedule and maintain your health records
              </p>
            </div>
            <div className="space-y-3 text-sm text-gray-500 mt-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Mark medications as taken
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Upload proof photos (optional)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  View your medication calendar
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Large, easy-to-use interface
                </li>
              </ul>
              <button
                onClick={() => onComplete("patient")}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg"
              >
                Continue as Patient
              </button>
            </div>
          </div>

          {/* Caretaker Card */}
          <div
            className="group hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-200 rounded-xl p-6 bg-white cursor-pointer"
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl text-green-700 font-semibold mb-1">I'm a Caretaker</h2>
              <p className="text-base text-gray-600">
                Monitor and support your loved one's medication adherence
              </p>
            </div>
            <div className="space-y-3 text-sm text-gray-500 mt-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Monitor medication compliance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Set up notification preferences
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  View detailed reports
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Receive email alerts
                </li>
              </ul>
              <button
                onClick={() => onComplete("caretaker")}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-lg"
              >
                Continue as Caretaker
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            You can switch between roles anytime after setup
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
