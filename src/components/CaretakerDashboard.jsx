
import { useState } from "react";
import { format } from "date-fns";
import HeaderStats from "./HeaderStats";
import TabBar from "./TabBar";
import Activity from "./Activity";
import CalendarView from "./CalendarView";
import NotificationSettings from "./Notifications";
import Overview from "./Overview";

export default function CaretakerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock patient data
  const patientName = "Eleanor Thompson";
  const adherenceRate = 85;
  const currentStreak = 5;
  const missedDoses = 3;

  // Taken dates set for calendar and status
  const takenDates = new Set([
    "2024-06-10", "2024-06-09", "2024-06-07", "2024-06-06",
    "2024-06-05", "2024-06-04", "2024-06-02", "2024-06-01"
  ]);

  // Recent activity array
  const recentActivity = [
    { date: "2024-06-10", taken: true, time: "8:30 AM", hasPhoto: true },
    { date: "2024-06-09", taken: true, time: "8:15 AM", hasPhoto: false },
    { date: "2024-06-08", taken: false, time: null, hasPhoto: false },
    { date: "2024-06-07", taken: true, time: "8:45 AM", hasPhoto: true },
    { date: "2024-06-06", taken: true, time: "8:20 AM", hasPhoto: false },
  ];

  // Today's medication status
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const dailyMedication = {
    name: "Daily Medication Set",
    time: "8:00 AM",
    status: takenDates.has(todayStr) ? "completed" : "pending"
  };

  // Handlers
  const sendReminderEmail = () => {
    alert(`Reminder email sent to ${patientName}`);
  };

  const saveSettings = (settings) => {
    console.log("Saved Settings:", settings);
    alert("Notification settings saved!");
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <HeaderStats
        name={patientName}
        adherenceRate={adherenceRate}
        streak={currentStreak}
        missed={missedDoses}
        takenThisWeek={recentActivity.filter(a => a.taken).length}
      />

      {/* Tabs and Content */}
      <div className="space-y-6">
        <TabBar activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "overview" && (
          <Overview
            dailyMedication={dailyMedication}
            onEmail={sendReminderEmail}
            onConfigure={() => setActiveTab("notifications")}
            onViewCalendar={() => setActiveTab("calendar")}
            adherenceRate={adherenceRate}
            recentActivity={recentActivity}
          />
        )}

        {activeTab === "activity" && (
          <Activity items={recentActivity} />
        )}

        {activeTab === "calendar" && (
          <CalendarView takenDates={takenDates} patientName={patientName} />
        )}

        {activeTab === "notifications" && (
          <NotificationSettings onSave={saveSettings} />
        )}
      </div>
    </div>
  );
}