import { useState, useRef } from "react";
import { format, isToday, isBefore, startOfDay } from "date-fns";
import { Check, Calendar as CalendarIcon, Image, User, Camera, Clock } from "lucide-react";

const PatientDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [takenDates, setTakenDates] = useState(new Set());

  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const isTodaySelected = isToday(selectedDate);
  const isSelectedDateTaken = takenDates.has(selectedDateStr);

  const handleMarkTaken = (date, imageFile) => {
    setTakenDates(prev => new Set(prev).add(date));
    console.log('Medication marked as taken for:', date);
    if (imageFile) {
      console.log('Proof image uploaded:', imageFile.name);
    }
  };

  const getStreakCount = () => {
    let streak = 0;
    let currentDate = new Date(today);

    while (takenDates.has(format(currentDate, 'yyyy-MM-dd')) && streak < 30) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  const getDayClassName = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const isPast = isBefore(date, startOfDay(today));
    const isCurrentDay = isToday(date);
    const isTaken = takenDates.has(dateStr);

    let className = "";

    if (isCurrentDay) {
      className += " bg-blue-100 border-blue-300 ";
    }

    if (isTaken) {
      className += " bg-green-100 text-green-800 ";
    } else if (isPast) {
      className += " bg-red-50 text-red-600 ";
    }

    return className;
  };

  // MedicationTracker component logic integrated
  const MedicationTrackerContent = ({ date, isTaken, onMarkTaken, isToday }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const dailyMedication = {
      name: "Daily Medication Set",
      time: "8:00 AM",
      description: "Complete set of daily tablets"
    };

    const handleImageSelect = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleMedicationMarkTaken = () => {
      onMarkTaken(date, selectedImage || undefined);
      setSelectedImage(null);
      setImagePreview(null);
    };

    if (isTaken) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center p-8 bg-green-50 rounded-xl border-2 border-green-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Medication Completed!
              </h3>
              <p className="text-green-600">
                Great job! You've taken your medication for {format(new Date(date), 'MMMM d, yyyy')}.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50/50"> {/* Card */}
            <div className="flex items-center justify-between p-4"> {/* CardContent */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-green-800">{dailyMedication.name}</h4>
                  <p className="text-sm text-green-600">{dailyMedication.description}</p>
                </div>
              </div>
              <div className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-100 text-green-800"> {/* Badge */}
                <Clock className="w-3 h-3 mr-1" />
                {dailyMedication.time}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"> {/* Card */}
          <div className="flex items-center justify-between p-4"> {/* CardContent */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">1</span>
              </div>
              <div>
                <h4 className="font-medium">{dailyMedication.name}</h4>
                <p className="text-sm text-gray-500">{dailyMedication.description}</p>
              </div>
            </div>
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"> {/* Badge */}
              <Clock className="w-3 h-3 mr-1" />
              {dailyMedication.time}
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="rounded-lg border-dashed border-2 border-gray-300"> {/* Card */}
          <div className="p-6"> {/* CardContent */}
            <div className="text-center">
              <Image className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="font-medium mb-2">Add Proof Photo (Optional)</h3>
              <p className="text-sm text-gray-500 mb-4">
                Take a photo of your medication or pill organizer as confirmation
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                ref={fileInputRef}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mb-4" // Button
              >
                <Camera className="w-4 h-4 mr-2" />
                {selectedImage ? "Change Photo" : "Take Photo"}
              </button>

              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Medication proof"
                    className="max-w-full h-32 object-cover rounded-lg mx-auto border-2 border-gray-300"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Photo selected: {selectedImage?.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mark as Taken Button */}
        <button
          onClick={handleMedicationMarkTaken}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white hover:bg-green-700 h-10 px-4 py-2 w-full py-4" // Button
          disabled={!isToday}
        >
          <Check className="w-5 h-5 mr-2" />
          {isToday ? "Mark as Taken" : "Cannot mark future dates"}
        </button>

        {!isToday && (
          <p className="text-center text-sm text-gray-500">
            You can only mark today's medication as taken
          </p>
        )}
      </div>
    );
  };


  // Custom Calendar component to replace Shadcn Calendar
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
        const className = [
          "w-10 h-10 flex items-center justify-center rounded-full text-sm cursor-pointer",
          isSelected ? (modifiersClassNames?.selected || "bg-blue-600 text-white hover:bg-blue-700") : "hover:bg-gray-100",
          getDayClassName(date) // Apply additional styling based on medication status
        ].join(" ");

        days.push(
          <div
            key={dateStr}
            className={className}
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


  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}!</h2>
            <p className="text-white/90 text-lg">Ready to stay on track with your medication?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{getStreakCount()}</div>
            <div className="text-white/80">Day Streak</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{takenDates.has(todayStr) ? "✓" : "○"}</div>
            <div className="text-white/80">Today's Status</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{Math.round((takenDates.size / 30) * 100)}%</div>
            <div className="text-white/80">Monthly Rate</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Medication */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit"> {/* Card */}
            <div className="flex flex-col space-y-1.5 p-6"> {/* CardHeader */}
              <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2"> {/* CardTitle */}
                <CalendarIcon className="w-6 h-6 text-blue-600" />
                {isTodaySelected ? "Today's Medication" : `Medication for ${format(selectedDate, 'MMMM d, yyyy')}`}
              </h3>
            </div>
            <div className="p-6 pt-0"> {/* CardContent */}
              <MedicationTrackerContent
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
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm"> {/* Card */}
            <div className="flex flex-col space-y-1.5 p-6"> {/* CardHeader */}
              <h3 className="text-xl font-semibold leading-none tracking-tight">Medication Calendar</h3> {/* CardTitle */}
            </div>
            <div className="p-6 pt-0"> {/* CardContent */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;