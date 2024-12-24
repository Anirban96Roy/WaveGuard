import React from "react";
import "./VolSidebar.css";

const VolSidebar = ({ selectedOption, setSelectedOption }) => {
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

export default VolSidebar;
