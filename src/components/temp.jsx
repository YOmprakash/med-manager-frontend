import { useState } from "react";
import { Calendar, Mail, Bell } from "lucide-react";
import Recent from "./recent";
import Notification from "./Notifications";
import CalendarView from "./Calender";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Recent Activity", "Calendar View", "Notifications"];

  const actions = [
    {
      icon: Mail,
      title: "Send Reminder Email",
      description: "Send a medication reminder"
    },
    {
      icon: Bell,
      title: "Configure Notifications",
      description: "Set up notification preferences"
    },
    {
      icon: Calendar,
      title: "View Full Calendar",
      description: "See complete schedule"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Overview Tab Content */}
        {activeTab === "Overview" && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Today's Status */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-6">
                    <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">Today's Status</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-800">Daily Medication Set</h3>
                        <p className="text-sm text-gray-600">8:00 AM</p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
                  
                  <div className="space-y-4">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        <action.icon className="h-5 w-5 text-gray-600 mr-3" />
                        <span className="font-medium text-gray-800">{action.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Monthly Progress */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Monthly Adherence Progress</h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                  <span className="text-sm font-semibold text-gray-800">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-800 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">22 days</div>
                  <div className="text-sm text-gray-600">Taken</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">3 days</div>
                  <div className="text-sm text-gray-600">Missed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5 days</div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Recent Activity Tab Content */}
        {activeTab === "Recent Activity" && (
          <div className="mt-8">
           <Recent />
          </div>
        )}
        
        {/* Calendar View Tab Content */}
        {activeTab === "Calendar View" && (
          <div className="mt-8">
<CalendarView />
          </div>
        )}
        
        {/* Notifications Tab Content */}
        {activeTab === "Notifications" && (
          <div className="mt-8">
           <Notification />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
