import React, { useEffect, useState } from 'react';

const NearbyShelters = ({ userLocation }) => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {
    const fetchShelters = async () => {
      if (!userLocation) {
        setError('Location not provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/shelters/nearby?location=${encodeURIComponent(userLocation)}`);
        const data = await response.json();
        setShelters(data.data || []);
      } catch (err) {
        setError('Failed to fetch shelters');
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, [userLocation]);

  useEffect(() => {
    const loadMap = () => {
        const center = shelters.length > 0 
        ? { lat: shelters[0].lat, lng: shelters[0].lng }
        : { lat: 23.7254484, lng: 90.4070846 };
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center
      });

      const infoWindowInstance = new window.google.maps.InfoWindow();

      setMap(mapInstance);
      setInfoWindow(infoWindowInstance);

      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);

      // Add new markers
      const newMarkers = shelters.map(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstance,
          title: location.name,
          icon: `http://maps.google.com/mapfiles/ms/icons/${location.color}-dot.png`
        });

        marker.addListener('mouseover', () => {
          infoWindowInstance.setContent(location.name);
          infoWindowInstance.open(mapInstance, marker);
        });

        marker.addListener('mouseout', () => {
          infoWindowInstance.close();
        });

        return marker;
      });

      setMarkers(newMarkers);
    };

    if (window.google && shelters.length > 0) {
      loadMap();
    }
  }, [shelters]);

  if (!userLocation) return <div className="p-4">Please set your location in profile</div>;
  if (loading) return <div className="p-4">Loading shelters...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="shelters-map-container">
      <h2 className="text-xl font-bold mb-4">Nearby Shelters</h2>
      <div id="map" style={{ height: '560px', width: '65%', margin: 'auto', alignContent: 'center'}}></div>
      <script async defer 
        src={`https://maps.googleapis.com/maps/api/js?key=MY_API`}>
      </script>
    </div>
  );
};

export default NearbyShelters;
