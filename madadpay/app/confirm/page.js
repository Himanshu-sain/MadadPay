'use client'
import React from "react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

const ConfirmPage = () => {
  return (
    <motion.section
      className="p-6 max-w-lg mx-auto text-center"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold mb-4">Confirm Exchange</h1>
      <p className="mb-6 text-gray-700">
        You’re about to exchange <strong>₹500</strong> with{" "}
        <strong>Priya S.</strong>
      </p>
      <div className="space-x-4">
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Confirm
        </button>
        <button className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </motion.section>
  );
};

export default ConfirmPage;
