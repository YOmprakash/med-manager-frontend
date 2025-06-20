import { format, isToday, isBefore, startOfDay } from "date-fns";

const CustomCalendar = ({ selected, onSelect, modifiersClassNames, components, takenDates }) => {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const getDayClassName = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const isPast = isBefore(date, startOfDay(new Date()));
    const isCurrentDay = isToday(date);
    const isTaken = takenDates?.has?.(dateStr);

    let className = "";

    if (isCurrentDay) className += " bg-blue-100 border-blue-300 ";
    if (isTaken) className += " bg-green-100 text-green-800 ";
    else if (isPast) className += " bg-red-50 text-red-600 ";

    return className;
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth);
    const startDay = firstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const dateStr = format(date, "yyyy-MM-dd");
      const isSelected = format(selected, "yyyy-MM-dd") === dateStr;

      const className = [
        "w-10 h-10 flex items-center justify-center rounded-full text-sm cursor-pointer",
        isSelected ? modifiersClassNames?.selected || "bg-blue-600 text-white" : "hover:bg-gray-100",
        getDayClassName(date),
      ].join(" ");

      days.push(
        <div key={dateStr} className={className} onClick={() => onSelect(date)}>
          {components?.DayContent ? components.DayContent({ date }) : <span>{i}</span>}
        </div>
      );
    }

    return days;
  };

  const handlePrevMonth = () =>
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));

  const handleNextMonth = () =>
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="px-3 py-1 rounded-md hover:bg-gray-100">
          &lt;
        </button>
        <h4 className="font-semibold">{format(currentMonth, "MMMM yyyy")}</h4>
        <button onClick={handleNextMonth} className="px-3 py-1 rounded-md hover:bg-gray-100">
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
};

import { useState } from "react";
export default CustomCalendar;
