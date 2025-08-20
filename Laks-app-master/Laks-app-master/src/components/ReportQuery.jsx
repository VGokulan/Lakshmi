import Layout from "../Layout.jsx";
import CameraCapture from "./CameraCapture.jsx";
import { useState } from "react";

const ReportQuery = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [image, setImage] = useState(null); // Store captured image

  const handleCapture = (capturedImage) => {
    setImage(capturedImage);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => console.error("Error getting location:", error)
    );
  };

  const handleSubmit = async () => {
    if (!image || !latitude || !longitude) {
      alert("Please capture an image and allow location access.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    // Convert the base64 image to Blob
    const blob = await fetch(image).then((res) => res.blob());
    formData.append("image", blob, "captured.png");

    try {
      const response = await fetch("http://localhost:8888/appCrud/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Complaint registered successfully! " + result.complaint_id);
      } else {
        const error = await response.json();
        alert("Error: " + error.message);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("An error occurred while submitting the complaint.");
    }
  };

  return (
    <Layout>
      <div className="h-auto pb-20 bg-[#fefae0] p-6 rounded-3xl">
        <h2 className="text-[30px] font-semibold text-green-600 mb-4">
          Report a Query
        </h2>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded-2xl mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded-2xl mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Describe your query"
          className="w-full p-2 border rounded-2xl mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <CameraCapture onCapture={handleCapture} />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={getLocation}
        >
          Get Location
        </button>
        <button
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mt-4"
          onClick={handleSubmit}
        >
          Submit Query
        </button>
      </div>
    </Layout>
  );
};

export default ReportQuery;
