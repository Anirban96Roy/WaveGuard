import React from "react";
import "./Sidebar.css";

const Sidebar = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="sidebar">
      <h2>Volunteer Dashboard</h2>
      <ul>
        <li
          className={selectedOption === "profile" ? "active" : ""}
          onClick={() => setSelectedOption("profile")}
        >
          Profile
        </li>
        <li
          className={selectedOption === "neartovictim" ? "active" : ""}
          onClick={() => setSelectedOption("neartovictim")}
        >
          Near to Victim
        </li>
        <li  className={selectedOption === "logout" ? "active" : ""}
          onClick={() => setSelectedOption("logout")}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
