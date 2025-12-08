import { Router } from "express";


import {
  sendMessage,
  getMyChats,
  getMessages,
} from "../controllers/chat.controller.js";



import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();




router.post("/send", authMiddleware, sendMessage);
router.get("/my-chats", authMiddleware, getMyChats);
router.get("/messages/:userId", authMiddleware, getMessages);




export default router;