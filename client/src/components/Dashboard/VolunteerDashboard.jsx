import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./VolunteerDashboard.css";
import axios from "axios";

const VolunteerDashboard = () => {
  const [profile, setProfile] = useState({});
  const [selectedOption, setSelectedOption] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          try {
            const { data } = await axios.get(`/users/${user._id}`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
                "Cache-Control": "no-cache", // Prevent caching
                "Pragma": "no-cache", // Older HTTP header for no cache
              },
            });
            console.log(data);
            setProfile(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching profile:", error.response ? error.response.data : error);
            setProfile({ error: "Error fetching profile" });
            setLoading(false);
          }
        }
      };
      
      

    fetchProfile();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <div className="dashboard-content">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : selectedOption === "profile" && (
          <div className="profile-section">
            <h1>Profile</h1>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Contact:</strong> {profile.contact}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Location:</strong> {profile.location}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
