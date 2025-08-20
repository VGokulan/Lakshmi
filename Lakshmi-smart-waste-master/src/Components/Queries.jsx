import React, { useState } from "react";

const Queries = ({ queries }) => {
  const [eventDetails, setEventDetails] = useState(null);
  const showDetails = (id, description, latitude, longitude, imageUrl) => {
    setEventDetails({
      id,
      description,
      latitude,
      longitude,
      image_url: imageUrl,
    });
  };

  return (
    <div className="grid grid-cols-12 gap-4 mb-20">
      {/* Queries List */}
      <div className="col-span-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-300">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-2xl font-semibold text-green-800">Queries</h3>
          </div>
          <div className="p-6 space-y-4">
            {queries.map((event) => (
              <div
                key={event._id}
                onClick={() =>
                  showDetails(
                    event._id,
                    event.description,
                    event.latitude,
                    event.longitude,
                    event.image_url
                  )
                }
                className="flex items-center bg-gray-50 rounded-lg p-4 hover:shadow-lg transition duration-200 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full border-2 border-white bg-green-600 text-white flex items-center justify-center text-xl font-bold">
                  {event.name[0]}
                </div>
                <div className="ml-4 flex-grow">
                  <div className="text-lg font-medium text-gray-900">
                    {event.name}
                  </div>
                  <div className="text-sm text-gray-500">{event.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Queries Info Section */}
      <div className="col-span-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-300">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-green-800">
              Queries Information
            </h3>
            <div className="relative">
              <button className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-ellipsis-v"></i>
              </button>
              {/* Dropdown content if needed */}
            </div>
          </div>
          <div className="p-6">
            <div id="complaint-details">
              {eventDetails ? (
                <div className="space-y-4">
                  <h5 className="text-xl font-semibold">
                    Complaint ID: {eventDetails.id}
                  </h5>
                  <img
                    src={eventDetails.image_url}
                    alt="Complaint"
                    className="rounded-lg border border-gray-200"
                  />
                  <p className="text-gray-700">
                    <span className="font-medium">Description:</span>{" "}
                    {eventDetails.description}
                  </p>
                  <div className="space-y-2">
                    <a
                      href={`https://www.google.com/maps/@${eventDetails.latitude},${eventDetails.longitude},12z`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 underline"
                    >
                      View on Google Maps
                    </a>
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${eventDetails.latitude}&mlon=${eventDetails.longitude}#map=12/${eventDetails.latitude}/${eventDetails.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 underline"
                    >
                      View on OpenStreetMap
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  No complaint selected. Please click on an event to see
                  details.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queries;
