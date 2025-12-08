import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import router from "./routes/user.js";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);



// ============================
// ✅ SOCKET.IO SETUP (FIXED)
// ============================
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://experience-x.onrender.com"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
  });

  socket.on("sendMessage", (data) => {
    const { senderId, receiverId, message } = data;

    // ✅ Send to RECEIVER
    io.to(receiverId).emit("receiveMessage", {
      sender: senderId,
      message,
    });

    // ✅ Also send back to SENDER (prevents refresh issue)
    io.to(senderId).emit("receiveMessage", {
      sender: senderId,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});



// ============================
// ✅ EXPRESS CORS (FIXED)
// ============================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://experience-x.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));



// ============================
// ✅ ROUTES
// ============================

// ✅ API ROUTES
app.use("/api", router);
app.use("/api/chat", chatRoutes);



// ============================
// ✅ DATABASE + SERVER START
// ============================
const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MONGO Connected: ${connectionDb.connection.host}`);

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
  }
};

start();
