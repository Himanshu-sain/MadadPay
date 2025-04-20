"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import socket from "../path-to-your-socket"; // 👈 Update this path

// Fix for marker icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function FreeMap() {
  const [userLocation, setUserLocation] = useState([28.6, 77.2]); // default Delhi
  const [activeUsers, setActiveUsers] = useState([]);

  // Get your own location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLoc = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserLocation(currentLoc);

          // Register yourself on the server
          socket.emit("register", {
            userId: "user_" + Math.random().toString(36).substr(2, 5),
            name: "You", // or get from profile
            location: {
              lat: currentLoc[0],
              lng: currentLoc[1],
            },
            available: true,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Listen for real-time active users
  useEffect(() => {
    socket.on("active_users", (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.off("active_users");
    };
  }, []);

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Your marker */}
      <Marker position={userLocation}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Active users */}
      {activeUsers.map((user, idx) => (
        <Marker key={idx} position={[user.location.lat, user.location.lng]}>
          <Popup>
            {user.name} <br />
            {user.available ? "Available" : "Busy"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
