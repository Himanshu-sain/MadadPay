"use client";
import { useState, useMemo, useEffect } from "react";
import { MapPin, Grid, Map as MapIcon, Star, Sliders } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function getLatLngFromLocationUrl(locationUrl) {
  try {
    const url = new URL(locationUrl);
    const q = url.searchParams.get("q");
    if (!q) return null;
    const [latStr, lngStr] = q.split(",");
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
  } catch (e) {
    return null;
  }
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function SearchPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    minAmount: 0,
    maxAmount: 100000,
    maxDistance: 10,
    minRating: 0,
  });
  const [sortBy, setSortBy] = useState("distance");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userLocation = useSelector((state) => state.user.user.location);

  const parsedLocation = useMemo(() => {
    if (!userLocation) return null;
    return getLatLngFromLocationUrl(userLocation);
  }, [userLocation]);

  useEffect(() => {
    if (!parsedLocation) return;

    const fetchNearbyUsers = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          lat: parsedLocation.lat,
          lng: parsedLocation.lng,
          maxDistance: filters.maxDistance,
        });

        const response = await fetch(`/api/users/nearby?${params}`);
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyUsers();
  }, [parsedLocation, filters.maxDistance]);

  const filteredUsers = useMemo(() => {
    if (!parsedLocation) return [];

    return users
      .map((user) => {
        const userLatLng = getLatLngFromLocationUrl(user.location);
        if (!userLatLng) return null;

        const distance = getDistanceFromLatLonInKm(
          parsedLocation.lat,
          parsedLocation.lng,
          userLatLng.lat,
          userLatLng.lng
        );

        return {
          ...user,
          distance,
        };
      })
      .filter(
        (user) =>
          user &&
          (user.amount ?? 0) >= filters.minAmount &&
          (user.amount ?? 0) <= filters.maxAmount &&
          (user.rating ?? 0) >= filters.minRating &&
          user.distance <= filters.maxDistance
      )
      .sort((a, b) => {
        if (sortBy === "distance") return a.distance - b.distance;
        if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
        if (sortBy === "amount") return (b.amount ?? 0) - (a.amount ?? 0);
        return 0;
      });
  }, [users, filters, sortBy, parsedLocation]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (loading) return <div className="p-4">Loading users...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Find Exchange Partners</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            className="p-2 rounded-md border hover:bg-gray-100"
            aria-label="Toggle Filters"
          >
            <Sliders size={20} />
          </button>
          <div className="flex border rounded-md overflow-hidden">
            <button
              className={`p-2 ${
                viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
            >
              <Grid size={20} />
            </button>
            <button
              className={`p-2 ${
                viewMode === "map" ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => setViewMode("map")}
              aria-label="Map View"
            >
              <MapIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        {filterPanelOpen && (
          <aside className="w-64 border rounded-lg p-4 self-start sticky top-4">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            <div className="mb-4">
              <label className="block text-sm mb-1">Amount Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={0}
                  value={filters.minAmount}
                  onChange={(e) =>
                    handleFilterChange("minAmount", Number(e.target.value))
                  }
                  className="w-full border rounded p-2 text-sm"
                  aria-label="Minimum Amount"
                />
                <span>-</span>
                <input
                  type="number"
                  min={0}
                  value={filters.maxAmount}
                  onChange={(e) =>
                    handleFilterChange("maxAmount", Number(e.target.value))
                  }
                  className="w-full border rounded p-2 text-sm"
                  aria-label="Maximum Amount"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">
                Max Distance: {filters.maxDistance} km
              </label>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={filters.maxDistance}
                onChange={(e) =>
                  handleFilterChange("maxDistance", Number(e.target.value))
                }
                className="w-full"
                aria-label="Maximum Distance"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm mb-1">
                Min Rating: {filters.minRating}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={filters.minRating}
                onChange={(e) =>
                  handleFilterChange("minRating", Number(e.target.value))
                }
                className="w-full"
                aria-label="Minimum Rating"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border rounded p-2"
                aria-label="Sort By"
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
                <option value="amount">Amount</option>
              </select>
            </div>
          </aside>
        )}

        <main className="flex-1">
          {viewMode === "grid" ? (
            filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                  <Link
                    href={`/profile/${user._id}`}
                    key={user._id}
                    className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer block"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-xl font-semibold text-blue-700">
                        {user.name[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.phone}</p>
                      </div>
                    </div>
                    <div className="text-sm mb-1">
                      <strong>Amount:</strong> ₹{user.amount ?? "N/A"}
                    </div>
                    <div className="text-sm mb-1 flex items-center gap-1">
                      <Star size={14} className="text-yellow-500" />
                      {user.rating ?? "N/A"}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin size={14} />
                      {user.distance?.toFixed(2)} km away
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No users found with these filters.</p>
            )
          ) : isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "600px" }}
              center={parsedLocation}
              zoom={13}
            >
              {filteredUsers.map((user) => {
                const userLatLng = getLatLngFromLocationUrl(user.location);
                if (!userLatLng) return null;

                return (
                  <Marker
                    key={user._id}
                    position={userLatLng}
                    title={`${user.name} - ₹${user.amount ?? "N/A"}`}
                  />
                );
              })}
            </GoogleMap>
          ) : (
            <p>Loading map...</p>
          )}
        </main>
      </div>
    </div>
  );
}
