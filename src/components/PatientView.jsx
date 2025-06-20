import { useState } from 'react';
import { Calendar, Camera, Check, ChevronLeft, ChevronRight, User } from 'lucide-react';

const 
PatientView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [medicationTaken, setMedicationTaken] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);

  // Mock data for demonstration
  const dayStreak = 0;
  const monthlyRate = 0;
  const todaysStatus = 'pending';

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 35; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      let status = null;
      if (date.getMonth() === month) {
        // Mock some medication statuses
        if (date.getDate() <= 19 && date <= today) {
          status = Math.random() > 0.3 ? 'taken' : 'missed';
        }
        if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth()) {
          status = 'today';
        }
      }
      
      days.push({
        date: date.getDate(),
        isCurrentMonth: date.getMonth() === month,
        status,
        fullDate: new Date(date)
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleTakePhoto = () => {
    setPhotoTaken(true);
    // In a real app, this would open camera
  };

  const handleMarkAsTaken = () => {
    setMedicationTaken(true);
  };

  return (
    <div className="min-h-screen w-full md:max-w-6xl mx-auto mt-8 pb-10 ">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-green-400 rounded-3xl p-8 text-white">
        {/* User Greeting */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Good Morning!</h1>
            <p className="text-white/80">Ready to stay on track with your medication?</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-3xl font-bold">{dayStreak}</div>
            <div className="text-sm text-white/80">Day Streak</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="w-8 h-8 border-2 border-white rounded-full mb-2"></div>
            <div className="text-sm text-white/80">Today's Status</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-3xl font-bold">{monthlyRate}%</div>
            <div className="text-sm text-white/80">Monthly Rate</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-6 flex items-center justify-between w-full  gap-6">
        {/* Today's Medication */}
        <div className="bg-white rounded-2xl w-full max-w-2/3 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Today's Medication</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Daily Medication Set</h3>
                <p className="text-gray-500 text-sm">Complete set of daily tablets</p>
              </div>
              <div className="text-sm text-gray-500">8:00 AM</div>
            </div>

            {/* Photo Proof Section */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center flex-col p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium mb-2">Add Proof Photo (Optional)</h3>
              <p className="text-gray-500 text-sm mb-6">Take a photo of your medication or pill organizer as confirmation</p>
              
              <button 
                onClick={handleTakePhoto}
                variant="outline" 
                className="mb-4 flex items-center gap-2"
                disabled={photoTaken}
              >
                <Camera className="w-4 h-4" />
                {photoTaken ? 'Photo Taken' : 'Take Photo'}
              </button>
            </div>

            {/* Mark as Taken button */}
            <button 
              onClick={handleMarkAsTaken}
              className="w-full bg-green-600 flex items-center justify-center hover:bg-green-600 text-white py-2 rounded-md font-medium"
              disabled={medicationTaken}
            >
              <Check className="w-5 h-5 mr-2" />
              {medicationTaken ? 'Marked as Taken' : 'Mark as Taken'}
            </button>
          </div>
        </div>

        {/* Medication Calendar */}
        <div className="bg-white rounded-2xl p-6 w-full max-w-1/3 shadow-sm">
          <div className="flex items-center justify-center flex-col gap-5 mb-6">
            <h2 className="text-xl font-semibold">Medication Calendar</h2>
            <div className="flex items-center gap-2">
              <button variant="ghost" size="sm" onClick={prevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-medium px-4">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button variant="ghost" size="sm" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  relative w-10 h-10 flex items-center justify-center text-sm rounded-lg
                  ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                  ${day.status === 'today' ? 'bg-blue-500 text-white font-semibold' : ''}
                  ${day.status === 'taken' ? 'bg-green-100 text-green-700' : ''}
                  ${day.status === 'missed' ? 'bg-red-100 text-red-700' : ''}
                `}
              >
                {day.date}
                {day.status && day.status !== 'today' && (
                  <div className={`
                    absolute top-0 right-0 w-2 h-2 rounded-full
                    ${day.status === 'taken' ? 'bg-green-500' : 'bg-red-500'}
                  `} />
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Medication taken</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Missed medication</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default 
PatientView;
