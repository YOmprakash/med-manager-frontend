import React, { useState } from "react";
import { format, startOfDay, isBefore, isToday } from "date-fns";
import { Check, AlertTriangle, Clock, Calendar as CalendarIcon } from "lucide-react";
import CustomCalendar from "./CustomCalendar";

export default function CalendarView({ takenDates, patientName }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderDetail = () => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const isTaken = takenDates.has(dateStr);
    const past = isBefore(selectedDate, startOfDay(new Date()));
    const today = isToday(selectedDate);

    let bg, icon, title, text;
    if (isTaken) {
      bg = "bg-green-50 border-green-200"; icon = <Check className="w-5 h-5 text-green-600" />;
      title = "Medication Taken"; text = `${patientName} successfully took their medication.`;
    } else if (past) {
      bg = "bg-red-50 border-red-200"; icon = <AlertTriangle className="w-5 h-5 text-red-600" />;
      title = "Medication Missed"; text = `${patientName} did not take their medication.`;
    } else if (today) {
      bg = "bg-blue-50 border-blue-200"; icon = <Clock className="w-5 h-5 text-blue-600" />;
      title = "Today"; text = `Monitor ${patientName}’s status for today.`;
    } else {
      bg = "bg-gray-50 border-gray-200"; icon = <CalendarIcon className="w-5 h-5 text-gray-600" />;
      title = "Future Date"; text = "This date is in the future.";
    }

    return (
      <div className={`p-4 rounded-lg border ${bg}`}>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        <p className="text-sm">{text}</p>
      </div>
    );
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="text-2xl font-semibold mb-4">
        Medication Calendar Overview
      </h3>
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <CustomCalendar
            selected={selectedDate}
            onSelect={d => d && setSelectedDate(d)}
            modifiersClassNames={{ selected: "bg-blue-600 text-white hover:bg-blue-700" }}
            components={{
              DayContent: ({ date }) => {
                const dateStr = format(date, "yyyy-MM-dd");
                const taken = takenDates.has(dateStr);
                const past = isBefore(date, startOfDay(new Date()));
                const today = isToday(date);

                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <span>{date.getDate()}</span>
                    {taken ? (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-white" />
                      </div>
                    ) : past && !today && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full" />
                    )}
                  </div>
                );
              },
            }}
          />
          {/* Legend */}
          <div className="mt-4 space-y-2 text-sm">
            {[
              { color: "bg-green-500", label: "Medication taken" },
              { color: "bg-red-400", label: "Missed medication" },
              { color: "bg-blue-500", label: "Today" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`}></div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-4">
            Details for {format(selectedDate, "MMMM d, yyyy")}
          </h4>
          {renderDetail()}
        </div>
      </div>
    </div>
  );
}
