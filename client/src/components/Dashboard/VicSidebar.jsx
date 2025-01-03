import React from "react";
import "./VicSidebar.css";

const VicSidebar = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="vicsidebar">
      <h2>Victim Dashboard</h2>
      <ul>
        <li
          className={selectedOption === "profile" ? "active" : ""}
          onClick={() => setSelectedOption("profile")}
        >
          Profile
        </li>



        <li
          className={selectedOption === "nearbyvolunteer" ? "active" : ""}
          onClick={() => setSelectedOption("nearbyvolunteer")}
        >
          Nearby Volunteers
        </li>
        <li
  className={selectedOption === "all-chat" ? "active" : ""}
  onClick={() => setSelectedOption("all-chat")}
>
  All Chat
</li>
        <li
          className={selectedOption === "notifications" ? "active" : ""}
          onClick={() => setSelectedOption("notifications")}
        >
          Notifications
        </li>
        <li
          className={selectedOption === "logout" ? "active" : ""}
          onClick={() => setSelectedOption("logout")}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default VicSidebar;