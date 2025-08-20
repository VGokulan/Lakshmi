// AnnouncementModal.jsx
import axios from "axios";
import React, { useState } from "react";

const AnnouncementModal = ({ onClose, onSubmit, setShowModal }) => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const announcement = { heading, description, date };
    await axios.post(
      `${process.env.REACT_APP_BACKEND}/appCrud/announcements`,
      announcement
    );
    onSubmit();
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-16 rounded-3xl shadow-lg w-[40vw]">
        <h2 className="text-[30px] font-bold mb-4">Make Announcement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-2xl">Heading:</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full border text-2xl rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-2xl font-medium">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border text-2xl rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-2xl font-medium">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border text-2xl rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <label className="block text-lg font-medium">
            ( * this announcement will be visible to all the mobile application
            users <br /> and will be deleted after the given date is crossed )
          </label>

          <div className="flex justify-end space-x-8 pt-10">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-2xl hover:bg-gray-400 text-white px-6 py-4 rounded-2xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-700 text-2xl hover:bg-green-600 text-white px-6 py-4 rounded-2xl"
            >
              Post Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementModal;
