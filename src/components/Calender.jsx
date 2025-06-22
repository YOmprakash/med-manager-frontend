import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 30)); // June 30, 2025
  const [selectedDate, setSelectedDate] = useState(30);

  const medicationData = {
    taken: [9, 10, 11, 12, 15, 16, 17, 18],
    missed: [1, 2, 3, 4, 5, 6, 7, 8, 13, 14]
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getDayStatus = (day) => {
    if (day === 30) return 'today';
    if (medicationData.taken.includes(day)) return 'taken';
    if (medicationData.missed.includes(day)) return 'missed';
    return 'default';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'taken': return 'bg-green-500 text-white';
      case 'missed': return 'bg-red-400 text-white';
      case 'today': return 'bg-blue-500 text-white';
      default: return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
    }
  };

  const calendarViewDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    const remainingCells = 42 - days.length; 
    for (let i = 1; i <= remainingCells && i <= 12; i++) {
      days.push(`next-${i}`);
    }

    return days;
  }, [currentDate]);

  const getSelectedDateDetails = () => {
    const status = getDayStatus(selectedDate);
    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate);
    const isToday = selectedDate === 30;
    const isFuture = selectedDate > 30;
    
    return {
      date: dateObj,
      status,
      isToday,
      isFuture,
      statusText: isFuture ? 'Future Date' : isToday ? 'Today' : status === 'taken' ? 'Medication Taken' : status === 'missed' ? 'Missed Medication' : 'No Data',
      description: isFuture ? 'This date is in the future.' : isToday ? 'Today\'s medication schedule.' : status === 'taken' ? 'Medication was taken successfully.' : status === 'missed' ? 'Medication was missed on this date.' : 'No medication data available.'
    };
  };

  const selectedDetails = getSelectedDateDetails();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-3 gap-0">
            {/* CalendarView Section */}
            <div className="md:col-span-2 p-6 md:p-8">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Medication CalendarView Overview
                </h1>
                
                {/* Month Navigation */}
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-6">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-white rounded-lg transition-colors duration-200 shadow-sm"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <h2 className="text-xl font-semibold text-gray-800">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-white rounded-lg transition-colors duration-200 shadow-sm"
                  >
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* CalendarView Grid */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                    {dayNames.map(day => (
                      <div key={day} className="p-3 text-center">
                        <span className="text-sm font-medium text-gray-600">{day}</span>
                      </div>
                    ))}
                  </div>

                  {/* CalendarView Days */}
                  <div className="grid grid-cols-7">
                    {calendarViewDays.map((day, CalendarView) => {
                      if (day === null) {
                        return <div key={`empty-${CalendarView}`} className="aspect-square"></div>;
                      }
                      
                      if (typeof day === 'string') {
                        const nextMonthDay = parseInt(day.split('-')[1]);
                        return (
                          <div key={day} className="aspect-square border-r border-b border-gray-100 flex items-center justify-center">
                            <span className="text-gray-300 text-sm">{nextMonthDay}</span>
                          </div>
                        );
                      }

                      const status = getDayStatus(day);
                      const isSelected = selectedDate === day;
                      
                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(day)}
                          className={`aspect-square border-r border-b border-gray-100 flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105 ${
                            getStatusColor(status)
                          } ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Medication taken</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Missed medication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-gray-50 p-6 md:p-8 border-l border-gray-200">
              <div className="sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Details for {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
                </h3>

                <div className=" rounded-xl p-6  ">
                  

                  {selectedDetails.status === 'today' && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Reminder:</span> Don't forget to take your medication today!
                      </p>
                    </div>
                  )}

                  {selectedDetails.status === 'missed' && (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm text-red-800">
                        <span className="font-medium">Note:</span> Consider setting up reminders to avoid missing future doses.
                      </p>
                    </div>
                  )}

                  {selectedDetails.status === 'taken' && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Great job!</span> You successfully took your medication on this day.
                      </p>
                    </div>
                  )}
                </div>

        
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
