"use client";
import { useState, useMemo } from "react";
import { MapPin, Grid, Map as MapIcon, Star, Sliders } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Simulated data
const USERS = [
  {
    id: 1,
    name: "Alex Johnson",
    rating: 4.9,
    amount: 1500,
    distance: 0.8,
    profileImage: "/api/placeholder/64/64",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Williams",
    rating: 4.7,
    amount: 2000,
    distance: 1.2,
    profileImage: "/api/placeholder/64/64",
    verified: true,
  },
  {
    id: 3,
    name: "Mike Chen",
    rating: 4.8,
    amount: 1000,
    distance: 1.5,
    profileImage: "/api/placeholder/64/64",
    verified: false,
  },
  {
    id: 4,
    name: "Emma Davis",
    rating: 4.5,
    amount: 3000,
    distance: 2.1,
    profileImage: "/api/placeholder/64/64",
    verified: true,
  },
  {
    id: 5,
    name: "John Smith",
    rating: 4.6,
    amount: 2500,
    distance: 0.5,
    profileImage: "/api/placeholder/64/64",
    verified: true,
  },
  {
    id: 6,
    name: "Priya Patel",
    rating: 4.9,
    amount: 1750,
    distance: 1.8,
    profileImage: "/api/placeholder/64/64",
    verified: false,
  },
];

export default function SearchPage() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'map'
  const [filters, setFilters] = useState({
    minAmount: 500,
    maxAmount: 5000,
    maxDistance: 5,
    minRating: 4,
  });
  const [sortBy, setSortBy] = useState("distance"); // distance, rating, amount
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  // Apply filters and sorting to users
  const filteredUsers = useMemo(() => {
    return USERS.filter(
      (user) =>
        user.amount >= filters.minAmount &&
        user.amount <= filters.maxAmount &&
        user.distance <= filters.maxDistance &&
        user.rating >= filters.minRating
    ).sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "amount") return b.amount - a.amount;
      return 0;
    });
  }, [filters, sortBy]);

  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header with view toggle */}
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

      {/* Main content area */}
      <div className="flex gap-4">
        {/* Filter panel */}
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

        {/* Content area */}
        <div className="flex-1">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
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
                        ${user.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg bg-gray-100 h-96 flex items-center justify-center">
              <div className="text-center">
                <MapIcon size={48} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">Interactive Map View</p>
                <p className="text-sm text-gray-400">
                  (Map integration would go here)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
