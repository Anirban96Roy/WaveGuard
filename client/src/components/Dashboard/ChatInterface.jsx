import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatInterface.css';

const ChatInterface = ({ currentUserId, initialSelectedUser = null }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(initialSelectedUser);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialSelectedUser && !selectedChat) {
      setSelectedChat(initialSelectedUser);
    }
  }, [initialSelectedUser]);

  // Fetch all conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('/all-chats', {
          params: { userId: currentUserId }
        });
        setConversations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setLoading(false);
      }
    };

    fetchConversations();
    // Set up polling for new messages
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, [currentUserId]);

  // Fetch messages for selected chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      try {
        const response = await axios.get('/chat', {
          params: {
            senderId: currentUserId,
            receiverId: selectedChat.conversationWith
          }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (selectedChat) {
      fetchMessages();
      // Poll for new messages in current chat
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedChat, currentUserId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      await axios.post('/chat', {
        senderId: currentUserId,
        receiverId: selectedChat.conversationWith,
        message: newMessage
      });
      setNewMessage('');
      // Refresh messages
      const response = await axios.get('/chat', {
        params: {
          senderId: currentUserId,
          receiverId: selectedChat.conversationWith
        }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Conversations</h2>
        </div>
        {loading ? (
          <div className="chat-list">Loading conversations...</div>
        ) : (
          <div className="chat-list">
            {conversations.map((chat) => (
              <div
                key={chat.conversationWith}
                onClick={() => setSelectedChat(chat)}
                className={`chat-item ${
                  selectedChat?.conversationWith === chat.conversationWith ? 'active' : ''
                }`}
              >
                <div className="chat-item-name">{chat.userDetails?.name || 'Unknown'}</div>
                <div className="chat-item-message">{chat.lastMessage}</div>
                <div className="chat-item-time">
                  {new Date(chat.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  
      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <h3 className="chat-header-title">
                {selectedChat.userDetails?.name || 'Unknown'}
              </h3>
            </div>
            <div className="messages-container">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`message ${message.senderId === currentUserId ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    {message.message}
                    <div className="message-time">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="chat-input">
              <div className="input-container">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="message-input"
                  placeholder="Type a message..."
                />
                <button type="submit" className="send-button">
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="empty-state">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;