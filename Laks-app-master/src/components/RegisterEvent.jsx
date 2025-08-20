import { useState } from "react";
import Layout from "../Layout.jsx";

const RegisterEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [attendees, setAttendees] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get token from storage (or adjust as needed)

      const response = await fetch("http://localhost:8888/appCrud/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token for auth
        },
        body: JSON.stringify({
          eventName,
          eventType,
          attendees: parseInt(attendees),
          date,
          time,
          location,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Event posted successfully!");
      } else {
        setMessage(data.error || "Failed to post the event.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="w-full h-full bg-[#fefae0] rounded-3xl p-10">
        <h2 className="text-[30px] font-semibold text-green-600 mb-4">
          Register an Event
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-4 border rounded-2xl text-xl focus:ring-2 focus:ring-green-300"
          />

          <label htmlFor="eventType" className="w-full p-4 text-xl">
            Event Type:
          </label>
          <select
            name="eventType"
            id="eventType"
            className="w-full p-4 border rounded-2xl text-xl focus:ring-2 focus:ring-green-300"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="wedding">Wedding</option>
            <option value="banquet">Banquet</option>
            <option value="concert">Concert</option>
            <option value="festival">Festival</option>
            <option value="exhibition">Exhibition</option>
            <option value="conference">Conference</option>
            <option value="birthday">Birthday</option>
            <option value="family">Family Gathering</option>
            <option value="anniversary">Anniversary</option>
            <option value="baby">Baby Shower</option>
            <option value="graduation">Graduation Party</option>
            <option value="retirement">Retirement Party</option>
            <option value="engagement">Engagement</option>
            <option value="housewarming">Housewarming</option>
            <option value="picnic">Picnic</option>
            <option value="other">Other</option>
          </select>

          <input
            type="number"
            placeholder="No. of persons"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            className="w-full p-4 border rounded-2xl text-xl focus:ring-2 focus:ring-green-300"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-4 border rounded-2xl text-xl focus:ring-2 focus:ring-green-300"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-4 border rounded-2xl text-xl focus:ring-2 focus:ring-green-300"
          />

          <input
            type="text"
            placeholder="Location (detailed)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-4 border rounded-2xl text-xl focus:ring-2 focus:ring-green-300"
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white text-3xl py-4 rounded-2xl hover:bg-green-600"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="mt-4 text-xl text-red-600 font-semibold">{message}</p>
        )}
      </div>
    </Layout>
  );
};

export default RegisterEvent;
