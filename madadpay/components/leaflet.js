"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Marker icon fix for Next.js + Webpack
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

// Custom icon for nearby users
const customIcon = new L.Icon({
  iconUrl:
    "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
  iconSize: [30, 42],
});

// Routing component to draw line between two locations
function Routing({ from, to }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!from || !to) return;

    if (routingRef.current) {
      routingRef.current.setWaypoints([
        L.latLng(from.lat, from.lng),
        L.latLng(to.lat, to.lng),
      ]);
    } else {
      routingRef.current = L.Routing.control({
        waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        createMarker: () => null,
      }).addTo(map);
    }

    return () => {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
    };
  }, [from, to, map]);

  return null;
}

// Main Map Component
export default function LeafletMap({ users, center }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (center) {
      setCurrentLocation(center);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("Geolocation error:", err.message);
          alert("Location permission denied.");
        }
      );
    }
  }, [center]);

  if (typeof window === "undefined" || !center) {
    return <div className="text-center p-4">Loading map...</div>;
  }

  return (
    <div className="relative">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-[600px] rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {users
          .filter((u) => u.lastKnownLocation?.coordinates?.length === 2)
          .map((user) => (
            <Marker
              key={user._id}
              position={[
                user.lastKnownLocation.coordinates[1],
                user.lastKnownLocation.coordinates[0],
              ]}
              icon={customIcon}
              eventHandlers={{
                click: () =>
                  setDestination({
                    lat: user.lastKnownLocation.coordinates[1],
                    lng: user.lastKnownLocation.coordinates[0],
                  }),
              }}
            >
              <Popup>
                <strong>{user.name}</strong>
                <br />
                Distance: {user.distance?.toFixed(2) ?? "?"} km
                <br />
                Amount: ₹{user.amount}
              </Popup>
            </Marker>
          ))}

        {currentLocation && (
          <Marker position={[currentLocation.lat, currentLocation.lng]}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {currentLocation && destination && (
          <Routing from={currentLocation} to={destination} />
        )}
      </MapContainer>

      {destination && (
        <button
          onClick={() => setDestination(null)}
          className="absolute top-4 right-4 bg-white px-4 py-2 rounded shadow border"
        >
          Clear Route
        </button>
      )}
    </div>
  );
}
