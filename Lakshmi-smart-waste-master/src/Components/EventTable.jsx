// EventTable.jsx
import React from "react";
import { format, compareAsc } from "date-fns";

// Helper function to remove time and only compare dates
const stripTime = (date) => new Date(date.setHours(0, 0, 0, 0));

const EventTable = ({ events }) => {
  const today = stripTime(new Date());

  // Filter for upcoming events (today or later)
  const upcomingEvents = events.filter((event) => {
    const eventDate = stripTime(new Date(event.date));
    return eventDate >= today;
  });

  // Sort the upcoming events by date
  const sortedEvents = [...upcomingEvents].sort((a, b) =>
    compareAsc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="w-[50%] h-[500px] bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Upcoming Event Details
      </h2>
      <table className="w-full my-10 table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-xl h-20">
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Type</th>
            <th className="border px-4 py-2 text-left">Address</th>
            <th className="border px-4 py-2 text-left">Vehicle Needed</th>
            <th className="border px-4 py-2 text-left">Personnel Needed</th>
          </tr>
        </thead>
        <tbody>
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event, index) => (
              <tr key={index} className="hover:bg-gray-50 text-lg h-16">
                <td className="border px-4 py-2">
                  {format(new Date(event.date), "dd MMM yyyy")}
                </td>
                <td className="border px-4 py-2">{event.type}</td>
                <td className="border px-4 py-2">
                  <a
                    href={event.address}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Open in Maps
                  </a>
                </td>
                <td className="border px-4 py-2 text-center">
                  {event.vehicleNeeded}
                </td>
                <td className="border px-4 py-2 text-center">
                  {event.personnelNeeded}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="border px-4 py-2 text-center text-gray-500"
              >
                No upcoming events
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
