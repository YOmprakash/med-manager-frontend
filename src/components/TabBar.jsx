
export default function TabBar({ activeTab, onChange }) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Recent Activity" },
    { id: "calendar", label: "Calendar View" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <div className="h-10 grid grid-cols-4 bg-muted p-1 rounded-md text-muted-foreground">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`px-3 py-1.5 text-sm font-medium transition-all focus:ring-2 focus:ring-offset-2 ${
            activeTab === id
              ? "bg-white text-gray-900 shadow"
              : "rounded-sm"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
