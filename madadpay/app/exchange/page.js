"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ExchangePage() {
  const [amount, setAmount] = useState("");
  const [upi, setUpi] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-10 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          💸 Need Instant Cash?
        </h1>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter your UPI ID"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition">
            🔍 Find a Match
          </button>
        </div>
      </motion.div>
    </div>
  );
}
