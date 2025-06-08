import express from "express";
import cors from "cors";
import "dotenv/config";
import {
  EgressClient,
  EncodedFileOutput,
  EncodedFileType,
} from "livekit-server-sdk";

const app = express();
app.use(cors());
app.use(express.json());

const {
  SERVER_PORT = 6080,
  LIVEKIT_API_KEY,
  LIVEKIT_API_SECRET,
  LIVEKIT_URL,
} = process.env;

const egressClient = new EgressClient(
  LIVEKIT_URL,
  LIVEKIT_API_KEY,
  LIVEKIT_API_SECRET
);

const getActiveRecordingByRoom = async (roomName) => {
  try {
    // List all active egresses for the room
    const egresses = await egressClient.listEgress({
      roomName,
      active: true,
    });
    return egresses.length > 0 ? egresses[0].egressId : null;
  } catch (error) {
    console.error("Error listing egresses.", error);
    return null;
  }
};

app.post("/recordings/start", async (req, res) => {
  const { roomName } = req.body;

  if (!roomName) {
    return res.status(400).json({ error: "roomName is required" });
  }

  const activeRecording = await getActiveRecordingByRoom(roomName);

  console.log("activeRecording", activeRecording);

  // Check if there is already an active recording for this room
  if (activeRecording) {
    return res
      .status(409)
      .json({ errorMessage: "Recording already started for this room" });
  }

  const fileOutput = new EncodedFileOutput({
    fileType: EncodedFileType.MP4,
    filepath: `recording/{room_name}-{time}-{room_id}`,
    disableManifest: true,
  });

  console.log("roomName:", roomName);
  try {
    const egressInfo = await egressClient.startRoomCompositeEgress(roomName, {
      file: fileOutput,
    });

    res.json({ message: "Recording started", egressId: egressInfo.egressId });
  } catch (error) {
    console.error("Recording start failed:", error);
    res.status(500).json({ error: "Failed to start recording" });
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Backend listening on port ${SERVER_PORT}`);
});
