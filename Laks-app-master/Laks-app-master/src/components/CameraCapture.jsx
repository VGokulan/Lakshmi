import { useState, useRef } from "react";

const CameraCapture = ({ onCapture }) => {
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    onCapture(imageData);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {!capturedImage ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            className="w-full max-w-md rounded-md shadow-md"
          ></video>
          <button
            onClick={startCamera}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Start Camera
          </button>
          <button
            onClick={captureImage}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Capture Image
          </button>
          <button
            onClick={stopCamera}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Stop Camera
          </button>
        </>
      ) : (
        <>
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full max-w-md rounded-md shadow-md"
          />
          <button
            onClick={() => setCapturedImage(null)}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Retake
          </button>
        </>
      )}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default CameraCapture;
