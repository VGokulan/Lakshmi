import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

// Define the map container style
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

// Default center coordinates (Puducherry)
const defaultCenter = {
  lat: 11.935,
  lng: 79.834,
};

const RealTimeAnalysis = ({ apiKey, topLocations }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey, // Pass the API key as a prop
  });
  const [refresh, setRefresh] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-6 p-4 w-full items-center">
      <div className="bg-white shadow-lg rounded-3xl p-10 w-[91%] min-h-[55vh]">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-[30px] font-bold">Real-time Analysis</h4>
          <div className="space-x-8">
            <button
              className="btn-primary"
              onClick={() => setRefresh(!refresh)}
            >
              <FontAwesomeIcon icon={faSyncAlt} size="2x" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-lg opacity-70">
          Map of Dustbin Distribution in Puducherry
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Table of Locations */}
          <div className="overflow-auto">
            <table className="table-auto w-full text-[20px] text-center border-collapse border rounded-xl border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Location</th>
                  <th className="border px-4 py-2">Weight (kg)</th>
                  <th className="border px-4 py-2">Fill Level (%)</th>
                </tr>
              </thead>
              <tbody>
                {topLocations.map((location, index) => (
                  <tr key={index} className="hover:bg-gray-100 h-24">
                    <td className="border px-4 py-2">{location.Location}</td>
                    <td className="border px-4 py-2 text-center">
                      {location["Weight (kg)"]}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {location["Fill Level (%)"]}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Google Map */}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={defaultCenter}
          >
            {topLocations.map((location, index) => (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(location.Latitude),
                  lng: parseFloat(location.Longitude),
                }}
                onClick={() => setSelectedLocation(location)}
              />
            ))}

            {selectedLocation && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedLocation.Latitude),
                  lng: parseFloat(selectedLocation.Longitude),
                }}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div>
                  <h4 className="font-semibold">{selectedLocation.Location}</h4>
                  <p>Weight: {selectedLocation["Weight (kg)"]} kg</p>
                  <p>Fill Level: {selectedLocation["Fill Level (%)"]}%</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAnalysis;
