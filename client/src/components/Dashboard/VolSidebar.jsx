import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VolSidebar.css";

const VolSidebar = ({ selectedOption, setSelectedOption, currentUserId }) => {
  const [allChats, setAllChats] = useState([]);

  useEffect(() => {
    if (selectedOption === "all-chat") {
      const fetchAllChats = async () => {
        try {
          console.log("Fetching all chats for userId:", currentUserId);
          const response = await axios.get("/all-chats", {
            params: { userId: currentUserId },
          });
          console.log("All chats response:", response.data);
          setAllChats(response.data);
        } catch (error) {
          console.error("Error fetching all chats:", error.response?.data || error.message);
        }
      };

      fetchAllChats();
    }
  }, [selectedOption, currentUserId]);

  return (
    <div className="volsidebar">
      <h2>Volunteer Dashboard</h2>
      <ul>
        <li
          className={selectedOption === "profile" ? "active" : ""}
          onClick={() => setSelectedOption("profile")}
        >
          Profile
        </li>
        <li
          className={selectedOption === "nearbyvictim" ? "active" : ""}
          onClick={() => setSelectedOption("nearbyvictim")}
        >
          Nearby Victims
        </li>
        <li
          className={selectedOption === "all-chat" ? "active" : ""}
          onClick={() => setSelectedOption("all-chat")}
        >
          All Chat
        </li>
        <li
          className={selectedOption === "logout" ? "active" : ""}
          onClick={() => setSelectedOption("logout")}
        >
          Logout
        </li>
      </ul>

      {selectedOption === "all-chat" && (
        <div className="chat-list">
          <h3>All Chats</h3>
          <ul>
            {allChats.length > 0 ? (
              allChats.map((chat) => (
                <li
                  key={chat.conversationWith} // Use conversationWith as the key
                  onClick={() =>
                    setSelectedOption({
                      type: "chat-detail",
                      participantId: chat.conversationWith,
                      participantName: chat.userDetails?.name || "Unknown",
                    })
                  }
                >
                  <strong>{chat.userDetails?.name || "Unknown"}</strong>
                  <p>{chat.lastMessage}</p>
                </li>
              ))
            ) : (
              <p>No chats found.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VolSidebar;
