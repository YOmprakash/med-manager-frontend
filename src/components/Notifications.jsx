import React, { useState } from 'react';
import { Bell, Clock } from 'lucide-react';

const Notification = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [medicationAlerts, setMedicationAlerts] = useState(true);
  const [emailAddress, setEmailAddress] = useState('caretaker@example.com');
  const [alertWindow, setAlertWindow] = useState('2 hours');
  const [reminderTime, setReminderTime] = useState('20:00');

  const handleSaveSettings = () => {
    console.log('Saving notification settings:', {
      emailNotifications,
      medicationAlerts,
      emailAddress,
      alertWindow,
      reminderTime
    });
    // In a real app, this would save to backend
    alert('Notification settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Bell className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Notification Preferences</h1>
          </div>

          {/* Email Notifications Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Email Notifications</h2>
                <p className="text-sm text-gray-600">Receive medication alerts via email</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Email Address Input */}
            <div className="ml-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder="Enter email address"
              />
            </div>
          </div>

          {/* Missed Medication Alerts Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Missed Medication Alerts</h2>
                <p className="text-sm text-gray-600">Get notified when medication is not taken on time</p>
              </div>
              <button
                onClick={() => setMedicationAlerts(!medicationAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  medicationAlerts ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    medicationAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Alert Window Setting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-0">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alert me if medication isn't taken within
                </label>
                <select
                  value={alertWindow}
                  onChange={(e) => setAlertWindow(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="4 hours">4 hours</option>
                  <option value="6 hours">6 hours</option>
                </select>
              </div>

              {/* Daily Reminder Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily reminder time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Time to check if today's medication was taken</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Preview Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Email Preview</h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900">Subject: Medication Alert - Eleanor Thompson</p>
            </div>
            
            <div className="space-y-3 text-sm text-gray-700">
              <p>Hello,</p>
              <p>This is a reminder that Eleanor Thompson has not taken her medication today.</p>
              <p>Please check with her to ensure she takes her prescribed medication.</p>
              <p className="text-gray-600">Current adherence rate: 85% (5-day streak)</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
