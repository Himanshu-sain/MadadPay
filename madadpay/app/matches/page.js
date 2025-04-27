"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid"; // For demo userId generation
import io from "socket.io-client"; // Correctly import the client-side socket.io

// Fade animation
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function MatchesPage() {
  const router = useRouter();
  const [matchesList, setMatchesList] = useState([]);
  const [criteria, setCriteria] = useState({
    available: true,
    cashRequired: true,
  });

  // Initialize socket client
  const socket = io(process.env.NEXT_PUBLIC_SERVER_URL); // Replace with your server URL

  useEffect(() => {
    const userId = uuid(); // For demo. Use real user ID in production

    // Register the user with socket
    socket.emit("register", {
      userId,
      name: "User " + userId.slice(0, 4),
      location: "XYZ",
      available: true,
    });

    // Request to find a match
    socket.emit("find_match", criteria);

    // Handle match found event
    socket.on("match_found", ({ match }) => {
      toast.success(`🎯 Match found with ${match.name}`);
      setTimeout(() => {
        router.push(`/exchange?partner=${match.name}`);
      }, 2000); // wait before redirect
    });

    // Clean up the socket listener when component is unmounted
    return () => {
      socket.off("match_found");
    };
  }, [criteria, router]);

  // Fake matches list (to be replaced with dynamic data from the server)
  const mockList = [
    { name: "Ankit S.", distance: "300m away", status: "Available now" },
    { name: "Meena K.", distance: "500m away", status: "Available in 5 min" },
    { name: "Rahul J.", distance: "750m away", status: "Busy" },
  ];

  return (
    <motion.section
      className="p-6 max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold mb-6">Nearby Matches</h1>
      <ul className="space-y-4">
        {mockList.map((match, i) => (
          <motion.li
            key={i}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex items-center justify-between hover:shadow-xl transition"
            whileHover={{ scale: 1.03 }}
          >
            <div>
              <h2 className="text-lg font-bold">{match.name}</h2>
              <p className="text-sm text-gray-500">{match.distance}</p>
            </div>
            <span
              className={`text-sm font-medium ${
                match.status.includes("Available")
                  ? "text-green-600"
                  : "text-yellow-500"
              }`}
            >
              {match.status}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
