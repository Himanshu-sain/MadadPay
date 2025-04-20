'use client'
import React from "react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

const LoginPage = () => {
  return (
    <motion.section
      className="p-6 max-w-sm mx-auto"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Login to MadadPay</h1>
      <form className="space-y-4 bg-white p-6 shadow rounded-xl">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
          Login
        </button>
      </form>
    </motion.section>
  );
};

export default LoginPage;
