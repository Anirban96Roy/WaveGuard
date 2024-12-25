import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css";

const Chat = ({ currentUserId, otherUserId,otherUserName}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get("/chat", {
          params: { senderId: currentUserId, receiverId: otherUserId },
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    if (currentUserId && otherUserId) fetchChatHistory();
  }, [currentUserId, otherUserId]);

  // Send a new message
  const sendMessage = async () => {
    try {
      const response = await axios.post("/chat", {
        senderId: currentUserId,
        receiverId: otherUserId,
        message: newMessage,
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
        <div className="chat-header">
        <h2>Chat with {otherUserName}</h2>
        </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.senderId === currentUserId ? "outgoing" : "incoming"}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
