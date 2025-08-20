import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon issue (optional, depending on setup)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icons with different colors
const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const RouteAlloc = ({ vehicleName, checkpoints }) => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    // Fetch map data from Flask backend
    const fetchMapData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/routes/api/get_vehicle_map",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ vehicle_name: vehicleName, checkpoints }),
          }
        );

        const data = await response.json();
        setMapData(data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchMapData();
  }, [vehicleName, checkpoints]);

  if (!mapData) return <div>Loading map...</div>;

  const { start, end, checkpoints: checkpointData, polyline } = mapData;

  return (
    <MapContainer
      center={start}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={polyline} color="green" />
      <Marker position={start} icon={greenIcon}>
        <Popup>Start Point</Popup>
      </Marker>
      <Marker position={end} icon={greenIcon}>
        <Popup>End Point</Popup>
      </Marker>
      {checkpointData.map(({ name, coords }) => (
        <Marker key={name} position={coords} icon={greenIcon}>
          <Popup>{name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RouteAlloc;
