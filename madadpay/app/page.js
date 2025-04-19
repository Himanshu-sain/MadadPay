// export default function Home() {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
//         <div className="text-xl font-bold text-white bg-blue-700 px-4 py-2 rounded-lg">
//           MadadPay
//         </div>
//         <nav className="space-x-6 mr-10 text-gray-800 font-medium">
//           <a href="#" className="hover:text-cyan-600">Matches</a>
//           <a href="#" className="hover:text-cyan-600">Exchange</a>
//           <a href="#" className="hover:text-cyan-600">Confirm</a>
//           <a href="#" className="hover:text-cyan-600">Log in</a>
//           <a href="#" className="hover:text-cyan-600">Sign up</a>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="bg-blue-700 text-white px-8 py-12 rounded-b-3xl">
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <div>
//             <h1 className="text-4xl font-bold mb-4">Get Cash with UPI</h1>
//             <p className="text-lg mb-6">
//               Find someone nearby to exchange UPI for cash
//             </p>
//             <div className="flex space-x-4">
//               <button className="bg-cyan-600 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg">
//                 Need Cash
//               </button>
//               <button className="bg-white text-black hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg">
//                 How It Works
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             {/* Map Placeholder */}
//             <div className="bg-white p-6 rounded-2xl shadow-md">
//               <div className="w-40 h-40 bg-gray-100 rounded-2xl flex items-center justify-center">
//                 <div className="text-green-600 text-4xl">📍</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="px-8 py-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
//         <ol className="list-decimal list-inside text-lg text-gray-700 space-y-2">
//           <li>Get matched with an exchange request</li>
//           <li>Create an exchange in person</li>
//           <li>Meet to complete the exchange</li>
//         </ol>
//       </section>
//     </div>
//   );
// }

// // src/app/page.tsx
// 'use client';

// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
//         <div className="flex items-center space-x-2">
//           <img
//             src="/madadpay-logo.png"
//             alt="MadadPay Logo"
//             className="w-10 h-10"
//           />
//           <span className="text-xl font-bold text-blue-700">MadadPay</span>
//         </div>
//         <nav className="space-x-6 mr-10 text-gray-800 font-medium">
//           <Link href="/matches" className="hover:text-cyan-600">Matches</Link>
//           <Link href="/exchange" className="hover:text-cyan-600">Exchange</Link>
//           <Link href="/confirm" className="hover:text-cyan-600">Confirm</Link>
//           <Link href="/login" className="hover:text-cyan-600">Log in</Link>
//           <Link href="/signup" className="hover:text-cyan-600">Sign up</Link>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="bg-blue-700 text-white px-8 py-12 rounded-b-3xl">
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <div>
//             <h1 className="text-4xl font-bold mb-4">Get Cash with UPI</h1>
//             <p className="text-lg mb-6">
//               Find someone nearby to exchange UPI for cash
//             </p>
//             <div className="flex space-x-4">
//               <button className="bg-cyan-600 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg">
//                 Need Cash
//               </button>
//               <button className="bg-white text-black hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg">
//                 How It Works
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             {/* Map Placeholder */}
//             <div className="bg-white p-6 rounded-2xl shadow-md">
//               <div className="w-40 h-40 bg-gray-100 rounded-2xl flex items-center justify-center">
//                 <div className="text-green-600 text-4xl">📍</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="px-8 py-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
//         <ol className="list-decimal list-inside text-lg text-gray-700 space-y-2">
//           <li>Get matched with an exchange request</li>
//           <li>Create an exchange in person</li>
//           <li>Meet to complete the exchange</li>
//         </ol>
//       </section>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
    >
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-md">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-blue-600 text-white px-3 py-1 rounded-lg">
            MadadPay
          </span>
        </div>
        <nav className="space-x-6 text-sm font-medium">
          <Link href="/matches" className="hover:text-cyan-600">
            Matches
          </Link>
          <Link href="/exchange" className="hover:text-cyan-600">
            Exchange
          </Link>
          <Link href="/confirm" className="hover:text-cyan-600">
            Confirm
          </Link>
          <Link href="/login" className="hover:text-cyan-600">
            Log in
          </Link>
          <Link href="/signup" className="hover:text-cyan-600">
            Sign up
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-8 py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Get Cash with UPI Nearby
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Exchange UPI balance with cash instantly and securely near you.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
              Need Cash
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold">
              How It Works
            </button>
          </div>
        </motion.div>

        {/* Floating Cards */}
        <motion.div
          className="absolute top-10 left-0 w-32 h-32 bg-blue-500 opacity-20 rounded-3xl rotate-12 blur-2xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <motion.div
          className="absolute bottom-10 right-0 w-40 h-40 bg-cyan-500 opacity-20 rounded-full rotate-45 blur-2xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />
      </section>

      {/* How It Works */}
      <motion.section
        className="px-8 py-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
        <ol className="list-decimal list-inside text-lg space-y-2 max-w-xl mx-auto">
          <li>Enter your UPI or cash need</li>
          <li>Get matched with someone nearby</li>
          <li>Meet and complete the exchange</li>
        </ol>
      </motion.section>
    </div>
  );
}
