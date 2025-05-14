"use client";

import { useState, useEffect, useMemo } from "react";
import { MapPin, Grid, Map as MapIcon, Star, Sliders } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/leaflet"), {
  ssr: false,
});

export default function SearchPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    minAmount: 500,
    maxAmount: 5000,
    maxDistance: 5,
    minRating: 4,
  });
  const [sortBy, setSortBy] = useState("distance");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });

          // Update user location in MongoDB
          try {
            const token = localStorage.getItem("token");

            await fetch("/api/users/update-location", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                coordinates: [longitude, latitude],
              }),
            });
          } catch (error) {
            console.error("Failed to update location:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoading(false);
        }
      );
    }
  }, []);

  // Fetch nearby users from MongoDB
  useEffect(() => {
    if (!currentLocation) return;

    const fetchNearbyUsers = async () => {
      try {
        const response = await fetch(
          `/api/users/nearby?lat=${currentLocation.lat}&lng=${currentLocation.lng}&maxDistance=${filters.maxDistance}`
        );

        // Check if the response is successful (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if the response body is empty
        const text = await response.text();
        const data = text ? JSON.parse(text) : []; // Parse JSON only if not empty

        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyUsers();
  }, [currentLocation, filters.maxDistance]);

  const filteredUsers = useMemo(() => {
    return users
      .filter(
        (user) =>
          user.amount >= filters.minAmount &&
          user.amount <= filters.maxAmount &&
          user.rating >= filters.minRating
      )
      .sort((a, b) => {
        if (sortBy === "distance") return a.distance - b.distance;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "amount") return b.amount - a.amount;
        return 0;
      });
  }, [users, filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Find Exchange Partners</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            className="p-2 rounded-md border hover:bg-gray-100"
          >
            <Sliders size={20} />
          </button>
          <div className="flex border rounded-md overflow-hidden">
            <button
              className={`p-2 ${
                viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={20} />
            </button>
            <button
              className={`p-2 ${
                viewMode === "map" ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => setViewMode("map")}
            >
              <MapIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        {filterPanelOpen && (
          <div className="w-64 border rounded-lg p-4 self-start sticky top-4">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            <div className="mb-4">
              <label className="block text-sm mb-1">Amount Range</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={filters.minAmount}
                  onChange={(e) =>
                    handleFilterChange("minAmount", Number(e.target.value))
                  }
                  className="w-full border rounded p-2 text-sm"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={filters.maxAmount}
                  onChange={(e) =>
                    handleFilterChange("maxAmount", Number(e.target.value))
                  }
                  className="w-full border rounded p-2 text-sm"
                  placeholder="Max"
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
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1">
                Min Rating: {filters.minRating}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={filters.minRating}
                onChange={(e) =>
                  handleFilterChange("minRating", Number(e.target.value))
                }
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
                <option value="amount">Amount</option>
              </select>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Apply Filters
            </button>
          </div>
        )}

        <div className="flex-1">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                <div>Loading...</div>
              ) : (
                filteredUsers.map((user) => (
                  <Link href={`/profile/${user.id}`} key={user.id}>
                    <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                      <div className="flex gap-3">
                        <div className="relative w-16 h-16">
                          <Image
                            src={user.profileImage}
                            alt={user.name}
                            className="rounded-full object-cover"
                            fill
                          />
                          {user.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{user.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Star
                              size={14}
                              className="text-yellow-500 mr-1"
                              fill="currentColor"
                            />
                            <span>{user.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4 text-sm">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1 text-gray-500" />
                          <span>{user.distance} km</span>
                        </div>
                        <div className="font-medium">
                          ₹{user.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <LeafletMap users={filteredUsers} center={currentLocation} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
