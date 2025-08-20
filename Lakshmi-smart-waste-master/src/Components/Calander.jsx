// Calendar.jsx
import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
} from "date-fns";

const Calendar = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const hasEvent = (date) =>
    events.find((event) => isSameDay(new Date(event.date), date));

  const renderWeekDays = () => {
    const weekStart = startOfWeek(currentMonth);
    return [...Array(7)].map((_, i) => (
      <div key={i} className="text-lg font-medium text-gray-700 text-center">
        {format(addDays(weekStart, i), "EEE")}
      </div>
    ));
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      const event = hasEvent(day);
      const isSelected = isSameDay(day, selectedDate);
      const isCurrentMonth = isSameMonth(day, monthStart);

      days.push(
        <div
          key={day}
          className={`relative flex items-center justify-center h-20 w-20 text-xl font-medium rounded-lg border
            ${isCurrentMonth ? "" : "text-gray-400"}
            ${event ? "bg-green-700 text-white" : "bg-white"}
            ${isSelected ? "border-2 border-blue-500" : "border-gray-300"}
            hover:bg-gray-100 transition-all duration-200 cursor-pointer`}
          // eslint-disable-next-line no-loop-func
          onClick={() => setSelectedDate(day)}
          onMouseEnter={() => setHoveredEvent(event)}
          onMouseLeave={() => setHoveredEvent(null)}
        >
          {format(day, "d")}
          {event && hoveredEvent === event && (
            <div className="absolute top-full mt-2 z-50 w-60 p-6 bg-gray-50 text-sm text-gray-800 rounded-lg shadow-lg">
              <strong className="text-2xl">{event.type}</strong>
              <p>
                <a
                  href={event.address}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-lg"
                >
                  Open in Maps
                </a>
              </p>
              <p className="text-lg">Vehicle: {event.vehicleNeeded}</p>
              <p className="text-lg">Personnel: {event.personnelNeeded}</p>
            </div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }

    return days;
  };

  const nextMonth = () =>
    setCurrentMonth((prev) => addDays(endOfMonth(prev), 1));
  const prevMonth = () =>
    setCurrentMonth((prev) => addDays(startOfMonth(prev), -1));

  return (
    <div className="w-[49%] h-[500px]  bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevMonth}
          className="px-5 py-2 text-lg text-white bg-gray-800 rounded-md hover:bg-gray-700 transition"
        >
          Prev
        </button>
        <h2 className="text-3xl font-semibold text-gray-800">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={nextMonth}
          className="px-5 py-2 text-lg text-white bg-gray-800 rounded-md hover:bg-gray-700 transition"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-3 mb-4">{renderWeekDays()}</div>
      <div className="grid grid-cols-7 gap-3">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
