import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./VolunteerDashboard.css";
import axios from "axios";
import Layout from "../Layout/Layout";
import "../Dashboard/neartovictim.css";

const VolunteerDashboard = () => {
  const [profile, setProfile] = useState({});
  const [selectedOption, setSelectedOption] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // New state for fetching nearby volunteers
  const [nearbyVolunteers, setNearbyVolunteers] = useState([]);
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);

  const [editMode, setEditMode] = useState({
    name: false,
    contact: false,
    email: false,
    location: false,
  });

  const handleEditToggle = (field) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleFieldChange = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleSaveChanges = async (field) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        await axios.put(
          `/users/${user._id}`, // Proxy will forward this to the backend
          { [field]: profile[field] },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        alert(`${field} updated successfully!`);
      }
    } catch (error) {
      console.error("Error updating profile field:", error.response ? error.response.data : error);
    } finally {
      setEditMode((prevState) => ({
        ...prevState,
        [field]: false,
      }));
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        try {
          const { data } = await axios.get(`/users/${user._id}`, { // Proxy will forward this request
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setProfile(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error.response ? error.response.data : error);
          setError("Error fetching profile.");
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, []);

  // Fetch nearby volunteers when selected option changes
  useEffect(() => {
    const fetchNearbyVolunteers = async () => {
      if (!profile.location) return;
      setLoadingVolunteers(true);
      try {
        const { data } = await axios.get(`/volunteers/nearby`, { // Proxy will forward this request
          params: { location: profile.location },
        });
        setNearbyVolunteers(data.volunteers);
      } catch (err) {
        console.error("Error fetching nearby volunteers:", err);
      } finally {
        setLoadingVolunteers(false);
      }
    };

    if (selectedOption === "neartovictim" && profile.location) {
      fetchNearbyVolunteers();
    }
  }, [selectedOption, profile]);
  return (

      <div className="dashboard-container">
        <Sidebar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <div className="dashboard-content">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : selectedOption === "profile" ? (
            <div className="profile-section">
              <h1>Profile</h1>
              <div className="profile-field">
                <p>
                  <strong>Name:</strong>
                </p>
                {editMode.name ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
                <button
                  onClick={() =>
                    editMode.name
                      ? handleSaveChanges("name")
                      : handleEditToggle("name")
                  }
                >
                  {editMode.name ? "Save Changes" : "Edit"}
                </button>
              </div>
              <div className="profile-field">
                <p>
                  <strong>Contact:</strong>
                </p>
                {editMode.contact ? (
                  <input
                    type="text"
                    value={profile.contact}
                    onChange={(e) =>
                      handleFieldChange("contact", e.target.value)
                    }
                  />
                ) : (
                  <p>{profile.contact}</p>
                )}
                <button
                  onClick={() =>
                    editMode.contact
                      ? handleSaveChanges("contact")
                      : handleEditToggle("contact")
                  }
                >
                  {editMode.contact ? "Save Changes" : "Edit"}
                </button>
              </div>
              <div className="profile-field">
                <p>
                  <strong>Email:</strong>
                </p>
                {editMode.email ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      handleFieldChange("email", e.target.value)
                    }
                  />
                ) : (
                  <p>{profile.email}</p>
                )}
                <button
                  onClick={() =>
                    editMode.email
                      ? handleSaveChanges("email")
                      : handleEditToggle("email")
                  }
                >
                  {editMode.email ? "Save Changes" : "Edit"}
                </button>
              </div>
              <div className="profile-field">
                <p>
                  <strong>Location:</strong>
                </p>
                {editMode.location ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) =>
                      handleFieldChange("location", e.target.value)
                    }
                  />
                ) : (
                  <p>{profile.location}</p>
                )}
                <button
                  onClick={() =>
                    editMode.location
                      ? handleSaveChanges("location")
                      : handleEditToggle("location")
                  }
                >
                  {editMode.location ? "Save Changes" : "Edit"}
                </button>
              </div>
            </div>
          ) : selectedOption === "neartovictim" ? (
            <div className="volunteers-section">
              <h1>Nearby Volunteers</h1>
              {loadingVolunteers ? (
                <p>Loading nearby volunteers...</p>
              ) : (
                <div className="volunteer-cards">
                  {nearbyVolunteers.length > 0 ? (
                    nearbyVolunteers.map((volunteer) => (
                      <div key={volunteer._id} className="volunteer-card">
                        <h3>{volunteer.name}</h3>
                        <p>
                          <strong>Email:</strong> {volunteer.email}
                        </p>
                        <p>
                          <strong>Contact:</strong> {volunteer.contact}
                        </p>
                        <p>
                          <strong>Location:</strong> {volunteer.location}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No volunteers found nearby.</p>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
  );
};

export default VolunteerDashboard;
