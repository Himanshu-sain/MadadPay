"use client";

import { useState } from "react";

export default function ThemeWrapper({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="border px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
      <div className="transition duration-300 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        {children}
      </div>
    </div>
  );
}
