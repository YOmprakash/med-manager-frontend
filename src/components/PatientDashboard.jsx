import { useState } from "react";
import { format, isToday, isBefore, startOfDay } from "date-fns";
import { Calendar as CalendarIcon, Check } from "lucide-react";

import WelcomeStats from "./WelcomeStats";
import MedicationTracker from "./MedicationTracker";
import CustomCalendar from "./CustomCalendar";
import MedicationList from "./MedicationsList";
import Legend from "./Legend";

const PatientDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [takenDates, setTakenDates] = useState(new Set());

  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const isTodaySelected = isToday(selectedDate);
  const isSelectedDateTaken = takenDates.has(selectedDateStr);

  const handleMarkTaken = (date, imageFile) => {
    setTakenDates((prev) => new Set(prev).add(date));
    if (imageFile) console.log("Proof image uploaded:", imageFile.name);
  };

  const getStreakCount = () => {
    let streak = 0;
    let currentDate = new Date(today);
    while (takenDates.has(format(currentDate, "yyyy-MM-dd")) && streak < 30) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return streak;
  };

  return (
    <div className="space-y-6">
      <WelcomeStats
        streak={getStreakCount()}
        isTodayTaken={takenDates.has(todayStr)}
        takenDates={takenDates}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white ">
          <div className="rounded-lg  bg-card text-card-foreground shadow-sm h-full">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
                {isTodaySelected
                  ? "Today's Medication"
                  : `Medication for ${format(selectedDate, "MMMM d, yyyy")}`}
              </h3>
            </div>
            <MedicationList />
            <div className="p-6 pt-0 bg-white">
              <MedicationTracker
                date={selectedDateStr}
                isTaken={isSelectedDateTaken}
                onMarkTaken={handleMarkTaken}
                isToday={isTodaySelected}
              />
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div>
          <div className="rounded-lg   bg-white text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-xl font-semibold">Medication Calendar</h3>
            </div>
            <div className="p-6 pt-0">
              <CustomCalendar
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                modifiersClassNames={{
                  selected: "bg-blue-600 text-white hover:bg-blue-700",
                }}
                components={{
                  DayContent: ({ date }) => {
                    const dateStr = format(date, "yyyy-MM-dd");
                    const isTaken = takenDates.has(dateStr);
                    const isPast = isBefore(date, startOfDay(today));
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
                  },
                }}
                takenDates={takenDates}
              />

              <div className="mt-4 space-y-2 text-sm">
                <Legend color="green-500" label="Medication taken" />
                <Legend color="red-400" label="Missed medication" />
                <Legend color="blue-500" label="Today" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default PatientDashboard;
