
import { Mail, Bell, Calendar as CalendarIcon } from "lucide-react";

export default function QuickActions({
  onEmail,
  onConfigure,
  onViewCalendar,
}) {
  const actions = [
    { icon: Mail, label: "Send Reminder Email", onClick: onEmail },
    {
      icon: Bell,
      label: "Configure Notifications",
      onClick: onConfigure,
    },
    {
      icon: CalendarIcon,
      label: "View Full Calendar",
      onClick: onViewCalendar,
    },
  ];

  return (
    <div className="rounded-lg  bg-white text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-3">Quick Actions</h3>
        <div className="space-y-3">
          {actions.map(({ icon: Icon, label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="flex items-center w-full gap-2 h-10 px-4 border border-gray-300 bg-background hover:bg-accent hover:text-accent-foreground rounded-md"
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
