import React, { useState } from "react";
import { format, subDays, isToday, isBefore, startOfDay } from "date-fns";
import { Users, Bell, Calendar as CalendarIcon, Mail, AlertTriangle, Check, Clock, Camera } from "lucide-react";

// Custom Calendar component (reused from PatientDashboard example)
const CustomCalendar = ({ selected, onSelect, modifiersClassNames, components }) => {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth);
    const startDay = firstDayOfMonth(currentMonth);
    const days = [];

    // Fill leading empty days
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    // Fill days of the month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const isSelected = format(selected, 'yyyy-MM-dd') === dateStr;

      // This part needs to be aware of how the parent component (CaretakerDashboard) handles date styling
      // For now, it directly uses getDayClassName from its scope if it were an inner function,
      // but since it's a shared utility, we'll pass enough info or define styling rules within it.
      // For this specific integration, we'll keep `getDayClassName` as a helper in CaretakerDashboard
      // and let the DayContent component handle specific badge/icon rendering.

      const baseClassName = "w-10 h-10 flex items-center justify-center rounded-full text-sm cursor-pointer";
      const selectedClassName = isSelected ? (modifiersClassNames?.selected || "bg-blue-600 text-white hover:bg-blue-700") : "hover:bg-gray-100";

      days.push(
        <div
          key={dateStr}
          className={`${baseClassName} ${selectedClassName}`}
          onClick={() => onSelect(date)}
        >
          {components?.DayContent ? components.DayContent({ date }) : <span>{i}</span>}
        </div>
      );
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="px-3 py-1 rounded-md hover:bg-gray-100">&lt;</button>
        <h4 className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</h4>
        <button onClick={handleNextMonth} className="px-3 py-1 rounded-md hover:bg-gray-100">&gt;</button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2">
        {weekdays.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};


const CaretakerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data for demonstration
  const patientName = "Eleanor Thompson";
  const adherenceRate = 85;
  const currentStreak = 5;
  const missedDoses = 3;

  // Mock data for taken medications (same as in PatientDashboard)
  const takenDates = new Set([
    "2024-06-10", "2024-06-09", "2024-06-07", "2024-06-06",
    "2024-06-05", "2024-06-04", "2024-06-02", "2024-06-01"
  ]);

  const recentActivity = [
    { date: "2024-06-10", taken: true, time: "8:30 AM", hasPhoto: true },
    { date: "2024-06-09", taken: true, time: "8:15 AM", hasPhoto: false },
    { date: "2024-06-08", taken: false, time: null, hasPhoto: false },
    { date: "2024-06-07", taken: true, time: "8:45 AM", hasPhoto: true },
    { date: "2024-06-06", taken: true, time: "8:20 AM", hasPhoto: false },
  ];

  const dailyMedication = {
    name: "Daily Medication Set",
    time: "8:00 AM",
    status: takenDates.has(format(new Date(), 'yyyy-MM-dd')) ? "completed" : "pending"
  };

  const handleSendReminderEmail = () => {
    console.log("Sending reminder email to patient...");
    // Here you would implement email sending functionality
    alert("Reminder email sent to " + patientName);
  };

  const handleConfigureNotifications = () => {
    setActiveTab("notifications");
  };

  const handleViewCalendar = () => {
    setActiveTab("calendar");
  };

  // NotificationSettings component integrated
  const NotificationSettings = () => {
    const [settings, setSettings] = useState({
      emailNotifications: true,
      emailAddress: "caretaker@example.com",
      reminderTime: "20:00", // 8 PM
      pushNotifications: true, // Not explicitly used in UI, but kept for state
      criticalAlerts: true, // Not explicitly used in UI, but kept for state
      missedMedNotification: true,
      missedMedDelay: "2" // hours
    });

    const handleSettingChange = (key, value) => {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    };

    const handleSaveSettings = () => {
      console.log("Notification settings saved:", settings);
      // Here you would typically save to backend
      alert("Notification settings saved!");
    };

    return (
      <div className="space-y-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm"> {/* Card */}
          <div className="flex flex-col space-y-1.5 p-6"> {/* CardHeader */}
            <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2"> {/* CardTitle */}
              <Bell className="w-5 h-5 text-blue-600" />
              Notification Preferences
            </h3>
          </div>
          <div className="p-6 pt-0 space-y-6"> {/* CardContent */}
            {/* Email Notifications */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Notifications</label> {/* Label */}
                  <p className="text-sm text-gray-500">
                    Receive medication alerts via email
                  </p>
                </div>
                {/* Custom Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.emailNotifications}
                  data-state={settings.emailNotifications ? "checked" : "unchecked"}
                  onClick={() => handleSettingChange("emailNotifications", !settings.emailNotifications)}
                  className={`peer  h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${settings.emailNotifications ? 'translate-x-5' : 'translate-x-0'}`}></span>
                </button>
              </div>

              {settings.emailNotifications && (
                <div className="ml-6 space-y-3">
                  <div>
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Address</label> {/* Label */}
                    <input
                      id="email"
                      type="email"
                      value={settings.emailAddress}
                      onChange={e => handleSettingChange("emailAddress", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1" // Input
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="shrink-0 bg-border h-[1px] w-full" /> {/* Separator */}

            {/* Missed Medication Alerts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Missed Medication Alerts</label> {/* Label */}
                  <p className="text-sm text-gray-500">
                    Get notified when medication is not taken on time
                  </p>
                </div>
                {/* Custom Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.missedMedNotification}
                  data-state={settings.missedMedNotification ? "checked" : "unchecked"}
                  onClick={() => handleSettingChange("missedMedNotification", !settings.missedMedNotification)}
                  className={`peer  h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${settings.missedMedNotification ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${settings.missedMedNotification ? 'translate-x-5' : 'translate-x-0'}`}></span>
                </button>
              </div>

              {settings.missedMedNotification && (
                <div className="ml-6 space-y-3">
                  <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Alert me if medication isn't taken within</label> {/* Label */}
                    <select
                      value={settings.missedMedDelay}
                      onChange={e => handleSettingChange("missedMedDelay", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1" // Select
                    >
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="6">6 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Daily reminder time</label> {/* Label */}
                    <input
                      type="time"
                      value={settings.reminderTime}
                      onChange={e => handleSettingChange("reminderTime", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1" // Input
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Time to check if today's medication was taken
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm"> {/* Card */}
          <div className="flex flex-col space-y-1.5 p-6"> {/* CardHeader */}
            <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2"> {/* CardTitle */}
              <Mail className="w-5 h-5 text-green-600" />
              Email Preview
            </h3>
          </div>
          <div className="p-6 pt-0"> {/* CardContent */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="text-sm">
                <div className="font-medium mb-2">Subject: Medication Alert - Eleanor Thompson</div>
                <div className="text-gray-500">
                  <p className="mb-2">Hello,</p>
                  <p className="mb-2">
                    This is a reminder that Eleanor Thompson has not taken her medication today.
                  </p>
                  <p className="mb-2">
                    Please check with her to ensure she takes her prescribed medication.
                  </p>
                  <p>
                    Current adherence rate: 85% (5-day streak)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className=" items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-green-600 hover:bg-green-700 text-white" // Button
          >
            Save Notification Settings
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Caretaker Dashboard</h2>
            <p className="text-white/90 text-lg">Monitoring {patientName}'s medication adherence</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{adherenceRate}%</div>
            <div className="text-white/80">Adherence Rate</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{currentStreak}</div>
            <div className="text-white/80">Current Streak</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{missedDoses}</div>
            <div className="text-white/80">Missed This Month</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{recentActivity.filter(a => a.taken).length}</div>
            <div className="text-white/80">Taken This Week</div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      {/* Tabs */}
      <div className="space-y-6">
        <div className=" h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full grid grid-cols-4"> {/* TabsList */}
          <button
            onClick={() => setActiveTab("overview")}
            className={` items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${activeTab === "overview" ? 'bg-white text-gray-900 shadow' : ''}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={` items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${activeTab === "activity" ? 'bg-white text-gray-900 shadow' : ''}`}
          >
            Recent Activity
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={` items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${activeTab === "calendar" ? 'bg-white text-gray-900 shadow' : ''}`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={` items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${activeTab === "notifications" ? 'bg-white text-gray-900 shadow' : ''}`}
          >
            Notifications
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6"> {/* TabsContent */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Today's Status */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm"> {/* Card */}
                <div className="flex flex-col space-y-1.5 p-6"> {/* CardHeader */}
                  <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2"> {/* CardTitle */}
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                    Today's Status
                  </h3>
                </div>
                <div className="p-6 pt-0"> {/* CardContent */}
                  <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                    <div>
                      <h4 className="font-medium">{dailyMedication.name}</h4>
                      <p className="text-sm text-gray-500">{dailyMedication.time}</p>
                    </div>
                    <div className={` items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${dailyMedication.status === "pending" ? "bg-red-100 text-red-800 border-transparent" : "bg-gray-100 text-gray-800 border-transparent"}`}> {/* Badge */}
                      {dailyMedication.status === "pending" ? "Pending" : "Completed"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm"> {/* Card */}
                <div className="flex flex-col space-y-1.5 p-6"> {/* CardHeader */}
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Quick Actions</h3> {/* CardTitle */}
                </div>
                <div className="p-6 pt-0 space-y-3"> {/* CardContent */}
                  <button
                    className=" items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start" // Button
                    onClick={handleSendReminderEmail}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Reminder Email
                  </button>
                  <button
                    className=" items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start" // Button
                    onClick={handleConfigureNotifications}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Configure Notifications
                  </button>
                  <button
                    className=" items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start" // Button
                    onClick={handleViewCalendar}
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    View Full Calendar
                  </button>
                </div>
              </div>
            </div>

            {/* Adherence Progress */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm"> {/* Card */}
              <div className="flex flex-col space-y-1.5 p-6"> {/* CardHeader */}
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Monthly Adherence Progress</h3> {/* CardTitle */}
              </div>
              <div className="p-6 pt-0"> {/* CardContent */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{adherenceRate}%</span>
                  </div>
                  {/* Progress */}
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-primary/20"> {/* Progress track */}
                    <div
                      className="h-full w-full flex-1 bg-blue-600 transition-all"
                      style={{ transform: `translateX(-${100 - adherenceRate}%)` }} // Progress bar
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-medium text-green-600">22 days</div>
                      <div className="text-gray-500">Taken</div>
                    </div>
                    <div>
                      <div className="font-medium text-red-600">3 days</div>
                      <div className="text-gray-500">Missed</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-600">5 days</div>
                      <div className="text-gray-500">Remaining</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-6"> {/* TabsContent */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm"> {/* Card */}
              <div className="flex flex-col space-y-1.5 p-6"> {/* CardHeader */}
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Medication Activity</h3> {/* CardTitle */}
              </div>
              <div className="p-6 pt-0"> {/* CardContent */}
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.taken ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {activity.taken ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {format(new Date(activity.date), 'EEEE, MMMM d')}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.taken ? `Taken at ${activity.time}` : 'Medication missed'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {activity.hasPhoto && (
                          <div className=" items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-semibold"> {/* Badge */}
                            <Camera className="w-3 h-3 mr-1" />
                            Photo
                          </div>
                        )}
                        <div className={` items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${activity.taken ? "bg-gray-100 text-gray-800 border-transparent" : "bg-red-100 text-red-800 border-transparent"}`}> {/* Badge */}
                          {activity.taken ? "Completed" : "Missed"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="space-y-6"> {/* TabsContent */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm"> {/* Card */}
              <div className="flex flex-col space-y-1.5 p-6"> {/* CardHeader */}
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Medication Calendar Overview</h3> {/* CardTitle */}
              </div>
              <div className="p-6 pt-0"> {/* CardContent */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <CustomCalendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="w-full"
                      modifiersClassNames={{
                        selected: "bg-blue-600 text-white hover:bg-blue-700",
                      }}
                      components={{
                        DayContent: ({ date }) => {
                          const dateStr = format(date, 'yyyy-MM-dd');
                          const isTaken = takenDates.has(dateStr);
                          const isPast = isBefore(date, startOfDay(new Date()));
                          const isCurrentDay = isToday(date);

                          return (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <span>{date.getDate()}</span>
                              {isTaken && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                  <Check className="w-2 h-2 text-white" />
                                </div>
                              )}
                              {!isTaken && isPast && !isCurrentDay && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full"></div>
                              )}
                            </div>
                          );
                        }
                      }}
                    />

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Medication taken</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span>Missed medication</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Today</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">
                      Details for {format(selectedDate, 'MMMM d, yyyy')}
                    </h4>

                    <div className="space-y-4">
                      {takenDates.has(format(selectedDate, 'yyyy-MM-dd')) ? (
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Check className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-800">Medication Taken</span>
                          </div>
                          <p className="text-sm text-green-700">
                            {patientName} successfully took their medication on this day.
                          </p>
                        </div>
                      ) : isBefore(selectedDate, startOfDay(new Date())) ? (
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                            <span className="font-medium text-red-800">Medication Missed</span>
                          </div>
                          <p className="text-sm text-red-700">
                            {patientName} did not take their medication on this day.
                          </p>
                        </div>
                      ) : isToday(selectedDate) ? (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-blue-800">Today</span>
                          </div>
                          <p className="text-sm text-blue-700">
                            Monitor {patientName}'s medication status for today.
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <CalendarIcon className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-800">Future Date</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            This date is in the future.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div> {/* TabsContent */}
            <NotificationSettings />
          </div>
        )}
      </div>
    </div>
  );
};

export default CaretakerDashboard;