const express = require("express");
const Chat = require("../models/ChatModel"); // Import Chat model
const router = express.Router();

// Save a message
router.post("/chat", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const chatMessage = new Chat({ senderId, receiverId, message });
    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch chat history
router.get("/chat", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    const chatHistory = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 }); // Sort by timestamp
    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
