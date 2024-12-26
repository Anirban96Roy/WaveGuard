const express = require("express");
const Chat = require("../models/ChatModel"); // Import Chat model
const router = express.Router();
const mongoose = require("mongoose");

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

// Fetch all chats for a user
router.get("/all-chats", async (req, res) => {
  try {
    const { userId } = req.query;

    const chats = await Chat.aggregate([
      {
        $match: {
          $or: [
            { senderId: new mongoose.Types.ObjectId(userId) },
            { receiverId: new mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      {
        $group: {
          _id: {
            conversationWith: {
              $cond: [
                { $eq: ["$senderId", new mongoose.Types.ObjectId(userId)] },
                "$receiverId",
                "$senderId",
              ],
            },
          },
          lastMessage: { $last: "$message" },
          timestamp: { $last: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users", // Replace with your users collection name
          localField: "_id.conversationWith",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $project: {
          conversationWith: "$_id.conversationWith",
          lastMessage: 1,
          timestamp: 1,
          userDetails: { $arrayElemAt: ["$userDetails", 0] },
        },
      },
      { $sort: { timestamp: -1 } },
    ]);

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching all chats:", error);
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;