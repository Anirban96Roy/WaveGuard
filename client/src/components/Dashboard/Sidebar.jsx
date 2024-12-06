import React from "react";
import "./Sidebar.css"; // Add CSS for styling

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
        {/* Add more options here later */}
      </ul>
    </div>
  );
};

export default Sidebar;
