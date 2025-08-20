import React, { useState } from "react";
import axios from "axios";
import Layout from "../Layout";
import { marked } from "marked";

const Chat = () => {
  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Send message to backend (dummy API call for now)
    try {
      const response = await axios.post("http://localhost:8888/appCrud/chat", {
        message,
      });

      setChatLog((prev) => [
        ...prev,
        { role: "user", message },
        { role: "bot", message: response.data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8888/appCrud/classify-waste",
        formData
      );

      setChatLog((prev) => [
        ...prev,
        { role: "bot", message: response.data.response },
      ]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setSelectedFile(null);
  };

  return (
    <Layout>
      <div className="w-full h-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Chat with Lakshmi
        </h1>

        <div className="h-[60vh] overflow-y-auto p-4 border rounded-md bg-yellow-100">
          {chatLog.map((entry, index) => (
            <div
              key={index}
              className={`mb-2 ${
                entry.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                dangerouslySetInnerHTML={{ __html: marked(entry.message) }}
                className={`inline-block px-4 py-2 rounded-lg ${
                  entry.role === "user"
                    ? "bg-green-400 text-white"
                    : "bg-blue-400 text-white"
                }`}
              ></span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-green-500 file:text-white
              hover:file:bg-green-600"
          />

          <button
            onClick={handleFileUpload}
            className="w-full bg-blue-500 text-white py-2 mt-2 rounded-md hover:bg-blue-600"
          >
            Upload & Classify Image
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
