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

// ✅ SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
  });

  socket.on("sendMessage", (data) => {
    const { senderId, receiverId, message } = data;

    io.to(receiverId).emit("receiveMessage", {
      senderId,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/home", (req, res) => {
  res.send("Hello World!");
});

// ✅ ROUTES
app.use("/api", router);
app.use("/api/chat", chatRoutes);

// ✅ START SERVER
const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

start();
