import React, { useState } from "react";
import axios from "axios";

const StartRecording = () => {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");

  const startRecording = async () => {
    try {
      const response = await axios.post(
        "http://localhost:6080/recordings/start",
        {
          roomName,
        }
      );
      setMessage(`${response.data.message}`);
    } catch (error) {
      setMessage("Failed to start recording");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>LiveKit Room Recorder</h1>
      <input
        placeholder="Enter room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <br />
      <br />
      <button onClick={startRecording} style={{ padding: "0.5rem 1rem" }}>
        Start Recording
      </button>
      <p>{message}</p>
    </div>
  );
};

export default StartRecording;
