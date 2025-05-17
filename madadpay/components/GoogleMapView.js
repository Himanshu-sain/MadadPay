"use client";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

// Dummy user data as markers (replace with real user coords)
const USERS = [
  { id: 1, name: "Alex Johnson", lat: 28.61, lng: 77.23 },
  { id: 2, name: "Sarah Williams", lat: 28.62, lng: 77.21 },
  { id: 3, name: "Mike Chen", lat: 28.6, lng: 77.22 },
];

const containerStyle = {
  width: "100%",
  height: "500px",
};

export default function GoogleMapView() {
  const center = useMemo(() => ({ lat: 28.6139, lng: 77.209 }), []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Use .env
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      {USERS.map((user) => (
        <Marker key={user.id} position={{ lat: user.lat, lng: user.lng }} />
      ))}
    </GoogleMap>
  ) : (
    <p>Loading Map...</p>
  );
}
