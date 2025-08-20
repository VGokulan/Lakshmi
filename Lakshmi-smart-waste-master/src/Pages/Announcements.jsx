// AdminPanel.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AnnouncementModal from "../Components/AnnouncementModal"; // Popup component
import Layout from "../layout";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false); // Control for the popup

  // Fetch announcements from API
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/appCrud/announcements`
      );
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  // Trigger the fetch function on component mount
  useEffect(() => {
    fetchAnnouncements();
  }, [showModal]);

  // Function to handle posting a new announcement
  const handlePostAnnouncement = async (announcement) => {
    try {
      await axios.post("/api/announcements", announcement);
      fetchAnnouncements(); // Refresh the list after posting
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  return (
    <Layout>
      <div className="px-8 w-[92%] mx-auto">
        <div className="w-full flex justify-between items-center my-20">
          <h1 className="text-[40px] font-bold text-left">Announcements</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-700 hover:bg-green-600 text-white px-6 py-4 h-16 text-xl rounded-2xl mb-4"
          >
            Make Announcement
          </button>
        </div>

        <div className="space-y-4">
          {announcements.length === 0 ? (
            <p className="text-center text-gray-500">
              No announcements available.
            </p>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white shadow-md p-14 rounded-3xl"
              >
                <div className="w-fill flex justify-between items-center">
                  <h3 className="text-3xl pb-4 font-semibold">
                    {announcement.heading}
                  </h3>
                  <small className="text-gray-500 text-lg">
                    {new Date(announcement.date).toDateString()}
                  </small>
                </div>
                <p className="text-gray-700 text-2xl w-[90%]">
                  {announcement.description}
                </p>
              </div>
            ))
          )}
        </div>

        {showModal && (
          <AnnouncementModal
            onClose={() => setShowModal(false)}
            onSubmit={handlePostAnnouncement}
            setShowModal={() => setShowModal(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Announcements;
