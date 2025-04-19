"use client";
import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/matches");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Nearby Matches</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h2>
              {user.verified && (
                <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-0.5 rounded-full">
                  ✔ Verified
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-1">
              Distance: <strong>{user.distance}</strong>
            </p>
            <p className="text-gray-600 mb-1">
              Cash Available: <strong>₹{user.cash}</strong>
            </p>
            <p className="text-yellow-500 mb-3">⭐ {user.rating}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
              Request Exchange
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
