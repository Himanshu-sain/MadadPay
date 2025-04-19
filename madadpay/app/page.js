// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function Home() {
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div
//       className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
//     >
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-8 py-4 shadow-md">
//         <div className="flex items-center space-x-2">
//           <span className="text-xl font-bold bg-blue-600 text-white px-3 py-1 rounded-lg">
//             MadadPay
//           </span>
//         </div>
//         <nav className="space-x-6 text-sm font-medium">
//           <Link href="/matches" className="hover:text-cyan-600">
//             Matches
//           </Link>
//           <Link href="/exchange" className="hover:text-cyan-600">
//             Exchange
//           </Link>
//           <Link href="/confirm" className="hover:text-cyan-600">
//             Confirm
//           </Link>
//           <Link href="/login" className="hover:text-cyan-600">
//             Log in
//           </Link>
//           <Link href="/signup" className="hover:text-cyan-600">
//             Sign up
//           </Link>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="ml-4 px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {darkMode ? "☀️" : "🌙"}
//           </button>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="relative px-8 py-20 overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-4xl mx-auto text-center"
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
//             Get Cash with UPI Nearby
//           </h1>
//           <p className="text-lg md:text-xl mb-8">
//             Exchange UPI balance with cash instantly and securely near you.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
//               Need Cash
//             </button>
//             <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold">
//               How It Works
//             </button>
//           </div>
//         </motion.div>

//         {/* Floating Cards */}
//         <motion.div
//           className="absolute top-10 left-0 w-32 h-32 bg-blue-500 opacity-20 rounded-3xl rotate-12 blur-2xl"
//           animate={{ y: [0, 20, 0] }}
//           transition={{ repeat: Infinity, duration: 4 }}
//         />
//         <motion.div
//           className="absolute bottom-10 right-0 w-40 h-40 bg-cyan-500 opacity-20 rounded-full rotate-45 blur-2xl"
//           animate={{ y: [0, -20, 0] }}
//           transition={{ repeat: Infinity, duration: 5 }}
//         />
//       </section>

//       {/* How It Works */}
//       <motion.section
//         className="px-8 py-16"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//       >
//         <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
//         <ol className="list-decimal list-inside text-lg space-y-2 max-w-xl mx-auto">
//           <li>Enter your UPI or cash need</li>
//           <li>Get matched with someone nearby</li>
//           <li>Meet and complete the exchange</li>
//         </ol>
//       </motion.section>
//     </div>
//   );
// }


// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="bg-white text-gray-900">
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-8 py-4 shadow-md">
//         <div className="flex items-center space-x-2">
//           <span className="text-xl font-bold bg-blue-600 text-white px-3 py-1 rounded-lg shadow">
//             MadadPay
//           </span>
//         </div>
//         <nav className="space-x-6 text-sm font-medium">
//           <Link href="/matches" className="hover:text-blue-600 transition">
//             Matches
//           </Link>
//           <Link href="/exchange" className="hover:text-blue-600 transition">
//             Exchange
//           </Link>
//           <Link href="/confirm" className="hover:text-blue-600 transition">
//             Confirm
//           </Link>
//           <Link href="/login" className="hover:text-blue-600 transition">
//             Log in
//           </Link>
//           <Link href="/signup" className="hover:text-blue-600 transition">
//             Sign up
//           </Link>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="relative px-8 py-20 overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-4xl mx-auto text-center"
//         >
//           <motion.h1
//             className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-700"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             Get Cash with UPI Nearby 💸
//           </motion.h1>
//           <motion.p
//             className="text-lg md:text-xl mb-8 text-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//           >
//             Exchange UPI balance for cash instantly and securely with people
//             around you.
//           </motion.p>
//           <div className="flex justify-center space-x-4">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
//             >
//               Need Cash
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition"
//             >
//               How It Works
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Floating Blobs */}
//         <motion.div
//           className="absolute top-10 left-0 w-32 h-32 bg-blue-500 opacity-20 rounded-3xl rotate-12 blur-2xl"
//           animate={{ y: [0, 20, 0] }}
//           transition={{ repeat: Infinity, duration: 4 }}
//         />
//         <motion.div
//           className="absolute bottom-10 right-0 w-40 h-40 bg-cyan-500 opacity-20 rounded-full rotate-45 blur-2xl"
//           animate={{ y: [0, -20, 0] }}
//           transition={{ repeat: Infinity, duration: 5 }}
//         />
//       </section>

//       {/* How It Works */}
//       <motion.section
//         className="px-8 py-16 bg-gray-50"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//       >
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           How It Works
//         </h2>
//         <ol className="list-decimal list-inside text-lg space-y-2 max-w-xl mx-auto text-gray-700">
//           <li>Enter your UPI or cash need</li>
//           <li>Get matched with someone nearby</li>
//           <li>Meet and complete the exchange</li>
//         </ol>
//       </motion.section>

//       {/* Footer */}
//       <footer className="bg-blue-50 text-gray-800 py-8 px-8 border-t">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0 text-center md:text-left">
//             <h3 className="text-xl font-bold mb-1">MadadPay</h3>
//             <p className="text-sm">Empowering local UPI cash exchanges 💡</p>
//           </div>
//           <div className="flex space-x-6">
//             <Link href="/privacy" className="hover:underline text-sm">
//               Privacy Policy
//             </Link>
//             <Link href="/terms" className="hover:underline text-sm">
//               Terms of Use
//             </Link>
//             <Link href="/contact" className="hover:underline text-sm">
//               Contact Us
//             </Link>
//           </div>
//         </div>
//         <div className="text-center text-xs text-gray-500 mt-4">
//           &copy; {new Date().getFullYear()} MadadPay. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#f5f7fa] via-[#dbeafe] to-[#e0f2fe] text-gray-800 min-h-screen">
      {/* 👻 Grain Effect Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[url('/grain.png')] opacity-[0.04] mix-blend-soft-light" />

      {/* 🎨 Background Gradient Blobs */}
      <div className="absolute -top-32 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full blur-[160px] opacity-40 -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-r from-cyan-400 to-sky-300 rounded-full blur-[140px] opacity-30 -z-10" />

      {/* 🌟 Hero Section */}
      <section className="relative z-10 px-6 md:px-12 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 drop-shadow"
        >
          💸 Instant UPI to Cash Near You
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          MadadPay connects you with people nearby to securely exchange UPI
          balance for real cash – anytime, anywhere.
        </motion.p>

        <motion.div
          className="mt-10 flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="bg-white/70 backdrop-blur-md hover:bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow-lg border border-blue-200 transition-all duration-300">
            🚀 Need Cash
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300">
            🔍 How It Works
          </button>
        </motion.div>
      </section>

      {/* 📘 How It Works Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/60 backdrop-blur-md border-t border-blue-100 py-16 px-8 rounded-t-3xl z-10 relative"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
          📲 How MadadPay Works
        </h2>
        <div className="max-w-2xl mx-auto text-lg text-gray-700 space-y-4">
          <p>1️⃣ Enter your UPI ID and amount.</p>
          <p>2️⃣ Get matched with verified people nearby.</p>
          <p>3️⃣ Meet & complete the exchange with safety tips.</p>
        </div>
      </motion.section>
    </div>
  );
}
