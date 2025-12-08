import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

 const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    let conversation = await Conversation.findOne({
      members: { $all: [req.user._id, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [req.user._id, receiverId],
      });
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      message,
    });

    conversation.lastMessage = newMessage._id;
    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: "Message send failed",
      error: error.message,
    });
  }
};

const getMyChats = async (req, res) => {
  try {
    const chats = await Conversation.find({
      members: req.user._id,
    })
      .populate("members", "name email")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load chats",
    });
  }
};

 const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get messages",
    });
  }
};


export { 
getMessages,
getMyChats,
sendMessage,

};