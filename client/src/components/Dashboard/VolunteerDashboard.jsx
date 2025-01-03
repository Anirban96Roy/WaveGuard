import React, { useEffect, useState, useRef } from "react";
import VolSidebar from "./VolSidebar";
import "./VolunteerDashboard.css";
import axios from "axios";
import Layout from "../Layout/Layout";
import "../Dashboard/nearbyvictim.css";
import { useNavigate } from "react-router-dom";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { AiOutlineClose } from "react-icons/ai";
import NotificationList from "./NotificationList"
import ChatInterface from "./ChatInterface";
import { MapPin, MessageCircle, RefreshCw } from 'lucide-react';
import NearbyShelters from './NearbyShelters';  // or adjust the path based on your file structure
const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [selectedOption, setSelectedOption] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearbyVictims, setnearbyVictims] = useState([]);
  const [loadingVictims, setloadingVictims] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedVictim, setSelectedVictim] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routingControlRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const [editMode, setEditMode] = useState({
    name: false,
    contact: false,
    email: false,
    location: false,
  });

// In VolunteerDashboard.js, modify the handlePictureUpload function:



const handlePictureUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      // Remove the duplicate /api/v1 from the URL
      const { data } = await axios.post(`/users/${user._id}/upload-picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProfilePicture(data.imagePath);
    } catch (error) {
      console.error("Error uploading profile picture:", error.response?.data || error);
      alert("Failed to upload picture. Please try again.");
    }
  }
};

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        try {
          const { data } = await axios.get(`/users/${user._id}/profile-picture`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setProfilePicture(data.imagePath); // Assuming server sends the image path
        } catch (error) {
          console.error("Error fetching profile picture:", error.response?.data || error);
        }
      }
    };
  
    fetchProfilePicture();
  }, []);
  

  const cleanupMap = () => {
    if (routingControlRef.current && mapInstanceRef.current) {
      routingControlRef.current.remove();
      routingControlRef.current = null;
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
  };

   useEffect(() => {
    return () => {
      cleanupMap();
    };
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };



  const handleEditToggle = (field) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleFieldChange = (field, value) => {
    setProfile((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const saveToDatabase = async (field, value) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        await axios.put(
          `/users/${user._id}`,
          { [field]: value },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("Updating field:", field, "with value:", value);
        
        // Update local state after successful save
        setProfile(prevState => ({
          ...prevState,
          [field]: value
        }));
      }
    } catch (error) {
      console.error("Error updating profile field:", error.response ? error.response.data : error);
      throw error; // Propagate error to caller
    }
  };

  const getDeviceLocation = () => {
    setGettingLocation(true);
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`
          );

          console.log("Location response:", response.data);

          const address = response.data.address;
          const locationParts = [];
          if (address.city || address.town || address.village) {
            locationParts.push(address.city || address.town || address.village);
          }
          if (address.county) {
            locationParts.push(address.county);
          }
          if (address.state_district) {
            locationParts.push(address.state_district);
          }
          if (address.state) {
            locationParts.push(address.state);
          }

          const locationString = locationParts.join(", ");
          
          // Save directly to database
          await saveToDatabase("location", locationString);
          setGettingLocation(false);
        } catch (error) {
          console.error("Error getting or saving location:", error);
          alert("Error updating location. Please try again.");
          setGettingLocation(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Error getting location. Please make sure location services are enabled.");
        setGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const getCoordinates = async (locationString) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationString)}`
      );
      if (response.data && response.data[0]) {
        return {
          lat: parseFloat(response.data[0].lat),
          lon: parseFloat(response.data[0].lon)
        };
      }
      throw new Error('Location not found');
    } catch (error) {
      console.error('Error getting coordinates:', error);
      throw error;
    }
  };

  // const showDirections = async (victimLocation) => {
  //   try {
  //     setSelectedVictim(victimLocation);
  //     setShowMap(true);

  //     // Get coordinates for both locations
  //     const volunteerCoords = await getCoordinates(profile.location);
  //     const victimCoords = await getCoordinates(victimLocation);

  //     // Initialize map if not already initialized
  //     let mapInstance = map;
  //     if (!mapInstance) {
  //       mapInstance = L.map('map').setView([volunteerCoords.lat, volunteerCoords.lon], 13);
  //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         attribution: '© OpenStreetMap contributors'
  //       }).addTo(mapInstance);
  //       setMap(mapInstance);
  //     }

  //     // Remove existing routing control if any
  //     if (routingControl) {
  //       mapInstance.removeControl(routingControl);
  //     }

  //     // Add new routing control
  //     const newRoutingControl = L.Routing.control({
  //       waypoints: [
  //         L.latLng(volunteerCoords.lat, volunteerCoords.lon),
  //         L.latLng(victimCoords.lat, victimCoords.lon)
  //       ],
  //       routeWhileDragging: true,
  //       lineOptions: {
  //         styles: [{ color: '#3737d4', weight: 6 }]
  //       },
  //       // createMarker: function(i, waypoint, n) {
  //       //   const marker = L.marker(waypoint.latLng);
  //       //   marker.bindPopup(i === 0 ? "Your Location" : "Victim's Location");
  //       //   return marker;
  //       // }
  //     }).addTo(mapInstance);

  //     setRoutingControl(newRoutingControl);

  //   } catch (error) {
  //     console.error('Error showing directions:', error);
  //     alert('Error getting directions. Please try again.');
  //   }
  // };

  
  const showDirections = async (victimLocation) => {
    try {
      setSelectedVictim(victimLocation);
      setShowMap(true);

      // Get coordinates for both locations
      const volunteerCoords = await getCoordinates(profile.location);
      const victimCoords = await getCoordinates(victimLocation);

      // Cleanup existing map instance if any
      cleanupMap();

      // Create new map instance
      mapInstanceRef.current = L.map(mapRef.current).setView([volunteerCoords.lat, volunteerCoords.lon], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Create new routing control
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(volunteerCoords.lat, volunteerCoords.lon),
          L.latLng(victimCoords.lat, victimCoords.lon)
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: '#3737d4', weight: 6 }]
        }
      }).addTo(mapInstanceRef.current);

    } catch (error) {
      console.error('Error showing directions:', error);
      alert('Error getting directions. Please try again.');
    }
  };

  
  useEffect(() => {
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);



  const handleSaveChanges = async (field) => {
    try {
      await saveToDatabase(field, profile[field]);
    } catch (error) {
      console.error("Error saving changes:", error);
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
          const { data } = await axios.get(`/users/${user._id}`, {
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

  useEffect(() => {
    const fetchnearbyVictims = async () => {
      if (!profile.location) return;
      setloadingVictims(true);
      try {
        const { data } = await axios.get(`/volunteers/nearby`, {
          params: { location: profile.location },
        });
        setnearbyVictims(data.victims);
      } catch (err) {
        console.error("Error fetching nearby volunteers:", err);
      } finally {
        setloadingVictims(false);
      }
    };

    if (selectedOption === "nearbyvictim" && profile.location) {
      fetchnearbyVictims();
    }
  }, [selectedOption, profile]);



  return (
    <Layout className="volunteer-dashboard-layout">
      <div className="voldashboard-container">
        <VolSidebar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <div className="voldashboard-content">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : selectedOption === "profile" ? (
            <div className="profile-section">
              <div className="profile-picture-container">
  <div className="profile-picture-frame">
  <img
  src={profilePicture ? `http://localhost:8081${profilePicture}` : "/dummy-avatar.png"}
  alt="Profile"
  className="profile-picture"
/>
    <label htmlFor="profile-picture-upload" className="profile-picture-upload">
      <span className="upload-icon">+</span>
    </label>
    <input
      type="file"
      id="profile-picture-upload"
      style={{ display: "none" }}
      accept="image/*"
      onChange={handlePictureUpload}
    />
  </div>
</div>
              <div className="profile-container">
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
                    onChange={(e) => handleFieldChange("contact", e.target.value)}
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
                    onChange={(e) => handleFieldChange("email", e.target.value)}
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
                    onChange={(e) => handleFieldChange("location", e.target.value)}
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
                  <button 
                    onClick={getDeviceLocation}
                    disabled={gettingLocation}
                  >
                    {gettingLocation ? "Getting location..." : "Set Device Location"}
                  </button>
                
              </div>
              </div>
            </div>
          ) : selectedOption === "nearbyvictim" ? (
            <div className="victims-section">
              <h1>Nearby Victims</h1>
              {showMap && (
            <div className="floating-map-container">
     <div id="map" ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
     <AiOutlineClose 
      className="close-map-icon" 
      onClick={() => {
        setShowMap(false);
        setSelectedVictim(null);
        cleanupMap();
      }} 
    />
                </div>
              )}
              {loadingVictims ? (
                <p>Loading nearby victims...</p>
              ) : (
                <div className="victim-cards">
                  {nearbyVictims.length > 0 ? (
                    nearbyVictims.map((victim) => (
                      <div key={victim._id} className="victim-card">
  <h3>{victim.name}</h3>
  <p>
    <strong>Email:</strong> {victim.email}
  </p>
  <p>
    <strong>Contact:</strong> {victim.contact}
  </p>
  <p>
    <strong>Location:</strong> {victim.location}
  </p>
  <div className="icon-container">
  <div className="icon-wrapper">
    <MapPin 
      className={!profile.location ? 'disabled' : ''}
      onClick={() => profile.location && showDirections(victim.location)}
    />
    <span className="icon-tooltip">
      {!profile.location ? "Set your location first" : "See Directions"}
    </span>
  </div>
  
  <div className="icon-wrapper">
    <RefreshCw 
      onClick={async () => {
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          await axios.post(
            '/notifications/rescue-request',
            { victimId: victim._id },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
          const victimElement = document.querySelector(`[data-victim-id="${victim._id}"]`);
          if (victimElement) {
            victimElement.classList.add('pending');
          }
        } catch (error) {
          console.error('Error sending rescue request:', error);
          alert('Error sending rescue request. Please try again.');
        }
      }}
      data-victim-id={victim._id}
    />
    <span className="icon-tooltip">Update to Rescued</span>
  </div>

  <div className="icon-wrapper">
    <MessageCircle 
      onClick={() => {
        setSelectedOption({
          type: "chat-detail",
          participantId: victim._id,
          participantName: victim.name
        });
      }}
    />
    <span className="icon-tooltip">Chat with Victim</span>
  </div>
</div>

</div>
                    ))
                  ) : (
                    <p>No victims found nearby.</p>
                  )}
                </div>
              )}
            </div>
          ) : selectedOption === "notifications" ? ( // Add this new condition
            <NotificationList />
          ): selectedOption === "logout" ? (
            handleLogout()
          ) :
          selectedOption === "all-chat" ? (
            <ChatInterface currentUserId={profile._id} />
          ):
          selectedOption.type === "chat-detail" ? (
            <ChatInterface 
              currentUserId={profile._id} 
              initialSelectedUser={{
                conversationWith: selectedOption.participantId,
                userDetails: {
                  name: selectedOption.participantName
                }
              }}
            />
          ) : null
           }
          {selectedOption === "nearbyshelters" ? (
            <NearbyShelters userLocation={profile.location} />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default VolunteerDashboard;