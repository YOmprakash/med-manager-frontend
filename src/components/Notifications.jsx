import { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationSettings({ onSave }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    emailAddress: "caretaker@example.com",
    reminderTime: "20:00",
    missedMedNotification: true,
    missedMedDelay: "2",
  });

  const update = (key, value) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      {/* Email Section */}
      <div className="rounded-lg border bg-card shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-blue-600" />
          <h3 className="text-2xl font-semibold">Notification Preferences</h3>
        </div>

        {/* Email Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <label>Email Notifications</label>
            <p className="text-sm text-gray-500">
              Receive medication alerts via email
            </p>
          </div>
          <button
            onClick={() => update("emailNotifications", !settings.emailNotifications)}
            className={`h-6 w-11 rounded-full transition ${settings.emailNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}
          >
            <span
              className={`block h-5 w-5 bg-white rounded-full transform transition ${settings.emailNotifications ? "translate-x-5" : "translate-x-0"
                }`}
            />
          </button>
        </div>

        {settings.emailNotifications && (
          <div className="ml-6 mb-4">
            <label>Email Address</label>
            <input
              type="email"
              value={settings.emailAddress}
              onChange={e => update("emailAddress", e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </div>
        )}

        <hr />

        {/* Missed Med Alerts */}
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label>Missed Medication Alerts</label>
              <p className="text-sm text-gray-500">
                Get notified when medication is not taken on time
              </p>
            </div>
            <button
              onClick={() => update("missedMedNotification", !settings.missedMedNotification)}
              className={`h-6 w-11 rounded-full transition ${settings.missedMedNotification ? "bg-blue-600" : "bg-gray-200"
                }`}
            >
              <span
                className={`block h-5 w-5 bg-white rounded-full transform transition ${settings.missedMedNotification ? "translate-x-5" : "translate-x-0"
                  }`}
              />
            </button>
          </div>

          {settings.missedMedNotification && (
            <>
              <div className="ml-6">
                <label>Alert if not taken within</label>
                <select
                  value={settings.missedMedDelay}
                  onChange={e => update("missedMedDelay", e.target.value)}
                  className="mt-1 w-full rounded-md border px-3 py-2"
                >
                  {["1", "2", "3", "4", "6"].map(h => (
                    <option key={h} value={h}>{h} hour{h !== "1" ? "s" : ""}</option>
                  ))}
                </select>
              </div>
              <div className="ml-6">
                <label>Daily reminder time</label>
                <input
                  type="time"
                  value={settings.reminderTime}
                  onChange={e => update("reminderTime", e.target.value)}
                  className="mt-1 w-full rounded-md border px-3 py-2"
                />
                <p className="text-xs text-gray-500">
                  Time to check if today’s medication was taken
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => onSave(settings)}
            className="h-10 px-4 rounded-md bg-green-600 hover:bg-green-700 text-white"
          >
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
}
