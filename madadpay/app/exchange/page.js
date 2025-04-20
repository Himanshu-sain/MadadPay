"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ExchangePage = () => {
  const searchParams = useSearchParams();
  const partnerName = searchParams.get("partner") || "Partner";
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    // Auto-start session on mount
    setSessionActive(true);
  }, []);

  return (
    <motion.section
      className="p-6 max-w-xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Exchange With {partnerName}
      </h1>

      <form className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div>
          <label className="block mb-1 font-medium">Matched With</label>
          <input
            type="text"
            value={partnerName}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Enter Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 500"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            className="w-full border p-2 rounded"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
          onClick={(e) => {
            e.preventDefault();
            alert(
              `Request sent to ${partnerName} for ₹${amount} via ${paymentMethod}`
            );
          }}
        >
          Confirm Exchange
        </button>
      </form>

      {sessionActive && (
        <div className="mt-6 text-center text-green-600 font-semibold">
          ✅ Exchange session active
        </div>
      )}
    </motion.section>
  );
};

export default ExchangePage;
