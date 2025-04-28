// // 'use client';
// // import ProtectedRoute from "@/components/ProtectRoute";
// // import React, { useState, useEffect } from "react";

// // const HomePage = () => {
// //   const [location, setLocation] = useState(null);
// //   const [locationStatus, setLocationStatus] = useState("idle");
// //   const [displayLocation, setDisplayLocation] = useState("");
// //   const [accuracy, setAccuracy] = useState(null);
// //   const [lastUpdated, setLastUpdated] = useState(null);

// //   const steps = [
// //     {
// //       title: "Find Nearby Users",
// //       description:
// //         "Quickly locate people around you who want to exchange cash.",
// //       icon: "📍",
// //     },
// //     {
// //       title: "Start a Chat",
// //       description:
// //         "Message instantly within the app to coordinate the exchange.",
// //       icon: "💬",
// //     },
// //     {
// //       title: "Complete Transaction",
// //       description: "Meet up, exchange cash, and rate each other for safety.",
// //       icon: "✅",
// //     },
// //   ];

// //   const getLocation = () => {
// //     setLocationStatus("loading");

// //     if (!navigator.geolocation) {
// //       setLocationStatus("error");
// //       return;
// //     }

// //     const options = {
// //       enableHighAccuracy: true,
// //       timeout: 10000,
// //       maximumAge: 0,
// //     };

// //     navigator.geolocation.getCurrentPosition(
// //       async (position) => {
// //         try {
// //           const { latitude, longitude, accuracy } = position.coords;
// //           setAccuracy(Math.round(accuracy));
// //           setLocation({ latitude, longitude });
// //           setDisplayLocation("Getting address...");

// //           try {
// //             const response = await fetch(
// //               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
// //             );

// //             if (response.ok) {
// //               const data = await response.json();
// //               const address = data.address;

// //               let displayParts = [];
// //               if (address.road) displayParts.push(address.road);
// //               if (address.suburb) displayParts.push(address.suburb);
// //               if (address.city_district)
// //                 displayParts.push(address.city_district);
// //               if (address.city) displayParts.push(address.city);

// //               const displayText =
// //                 displayParts.length > 0
// //                   ? displayParts.join(", ")
// //                   : "Nearby location";

// //               setLocation({
// //                 latitude,
// //                 longitude,
// //                 address: {
// //                   road: address.road,
// //                   suburb: address.suburb,
// //                   city: address.city,
// //                   state: address.state,
// //                   postcode: address.postcode,
// //                   country: address.country,
// //                 },
// //               });
// //               setDisplayLocation(displayText);
// //             } else {
// //               setDisplayLocation(
// //                 `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
// //               );
// //             }
// //           } catch (error) {
// //             console.error("Address lookup failed:", error);
// //             setDisplayLocation(
// //               `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
// //             );
// //           }

// //           setLocationStatus("success");
// //         } catch (error) {
// //           console.error("Error processing location:", error);
// //           setLocationStatus("error");
// //         }
// //       },
// //       (error) => {
// //         console.error("Error getting location:", error);
// //         let errorMessage = "Location access denied";

// //         switch (error.code) {
// //           case error.PERMISSION_DENIED:
// //             errorMessage =
// //               "Location permission denied. Please enable it in browser settings.";
// //             break;
// //           case error.POSITION_UNAVAILABLE:
// //             errorMessage = "Location information unavailable.";
// //             break;
// //           case error.TIMEOUT:
// //             errorMessage = "Location request timed out. Please try again.";
// //             break;
// //           default:
// //             errorMessage = "An unknown error occurred.";
// //         }

// //         setLocationStatus("error");
// //         setDisplayLocation(errorMessage);
// //       },
// //       options
// //     );
// //   };

// //   useEffect(() => {
// //     const checkLocationPermission = async () => {
// //       try {
// //         const permissionStatus = await navigator.permissions.query({
// //           name: "geolocation",
// //         });

// //         if (permissionStatus.state === "granted") {
// //           getLocation();
// //         }

// //         permissionStatus.onchange = () => {
// //           if (permissionStatus.state === "granted") {
// //             getLocation();
// //           }
// //         };
// //       } catch (error) {
// //         console.log("Permission API not supported, will wait for user click");
// //       }
// //     };

// //     checkLocationPermission();
// //   }, []);

// //   useEffect(() => {
// //     if (locationStatus === "success") {
// //       setLastUpdated(new Date().toLocaleTimeString());
// //     }
// //   }, [locationStatus]);

// //   const renderLocationFeature = () => (
// //     <div className="mb-8 flex flex-col items-center">
// //       <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg max-w-md w-full">
// //         <h3 className="text-xl font-medium mb-4 flex items-center justify-center">
// //           <span className="mr-2 text-2xl">📍</span>
// //           Find Users Near You
// //         </h3>

// //         {locationStatus === "success" && (
// //           <div className="mb-4 py-3 px-4 bg-green-900/30 rounded-lg border border-green-800">
// //             <p className="text-green-400 font-medium text-lg">
// //               {displayLocation}
// //             </p>
// //             <div className="flex justify-between text-green-300 text-sm mt-1">
// //               <span>Accuracy: ~{accuracy} meters</span>
// //               {lastUpdated && <span>Updated: {lastUpdated}</span>}
// //             </div>
// //           </div>
// //         )}

// //         {locationStatus === "error" && (
// //           <div className="mb-4 py-3 px-4 bg-red-900/30 rounded-lg border border-red-800">
// //             <p className="text-red-400">
// //               {displayLocation || "Location error"}
// //             </p>
// //             <p className="text-red-300 text-sm mt-1">
// //               {displayLocation.includes("permission")
// //                 ? "Please check your browser settings"
// //                 : "Please try again later"}
// //             </p>
// //           </div>
// //         )}

// //         {locationStatus === "loading" && (
// //           <div className="mb-4 flex justify-center items-center py-3">
// //             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
// //             <span className="ml-2 text-blue-400">Locating you...</span>
// //           </div>
// //         )}

// //         <button
// //           onClick={getLocation}
// //           disabled={locationStatus === "loading"}
// //           className={`w-full mt-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center
// //             ${
// //               locationStatus === "loading"
// //                 ? "bg-gray-700 text-gray-300 cursor-not-allowed"
// //                 : locationStatus === "success"
// //                 ? "bg-green-700 hover:bg-green-600 text-white"
// //                 : "bg-blue-600 hover:bg-blue-500 text-white"
// //             }`}
// //         >
// //           {locationStatus === "success"
// //             ? "Refresh Location"
// //             : locationStatus === "loading"
// //             ? "Getting Location..."
// //             : "Share My Location"}
// //           {locationStatus !== "loading" && (
// //             <span className="ml-2 text-xl">📍</span>
// //           )}
// //         </button>

// //         {locationStatus === "success" && (
// //           <p className="text-xs text-gray-400 mt-2 text-center">
// //             Your location is only used to find nearby exchanges and is not
// //             stored permanently.
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <ProtectedRoute>
// //       <main className="bg-white text-gray-900">
// //         <section className="bg-black text-white py-24 px-6 text-center relative overflow-hidden">
// //           <div className="max-w-4xl mx-auto z-10 relative">
// //             <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
// //               Instant Cash Exchange, Anywhere
// //             </h1>
// //             <p className="text-lg md:text-xl mb-8 text-gray-300">
// //               Meet people nearby and trade cash quickly & securely with
// //               MadadPay.
// //             </p>

// //             {renderLocationFeature()}

// //             <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-white font-semibold transition duration-300 mt-8">
// //               Get Started
// //             </button>
// //           </div>
// //           <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-red-700 opacity-20 rounded-full blur-3xl z-0" />
// //         </section>

// //         <section className="py-24 px-6 bg-gray-50 text-center">
// //           <h2 className="text-4xl font-semibold mb-14">How It Works</h2>
// //           <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
// //             {steps.map((step, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-white rounded-xl shadow-md p-8 transition hover:scale-105 hover:shadow-lg"
// //               >
// //                 <div className="text-4xl mb-4">{step.icon}</div>
// //                 <h3 className="text-xl font-bold mb-2">{step.title}</h3>
// //                 <p className="text-gray-600 text-sm">{step.description}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </section>

// //         <section className="py-20 px-6 bg-gray-100">
// //           <h2 className="text-4xl font-semibold text-center mb-12">
// //             Customer Testimonials
// //           </h2>
// //           <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
// //             <div>
// //               <p className="italic mb-2">
// //                 MadadPay helped me get cash when ATMs were down! Highly
// //                 recommended.
// //               </p>
// //               <p className="font-medium">- Priya S., Delhi</p>
// //             </div>
// //             <div>
// //               <p className="italic mb-2">
// //                 Smooth experience, connected to someone nearby in seconds.
// //               </p>
// //               <p className="font-medium">- Ravi M., Mumbai</p>
// //             </div>
// //           </div>
// //         </section>

// //         <section className="bg-black text-white py-24 px-6 text-center">
// //           <h2 className="text-4xl font-bold mb-4">
// //             Join the MadadPay Community
// //           </h2>
// //           <p className="mb-6 max-w-xl mx-auto">
// //             Start exchanging cash with trusted users in your area.
// //           </p>
// //           <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-white font-semibold transition duration-300">
// //             Sign Up Now
// //           </button>
// //         </section>
// //       </main>
// //     </ProtectedRoute>
// //   );
// // };

// // export default HomePage;


// "use client";
// import ProtectedRoute from "@/components/ProtectRoute";
// import React, { useState, useEffect } from "react";

// const HomePage = () => {
//   const [location, setLocation] = useState(null);
//   const [locationStatus, setLocationStatus] = useState("idle");
//   const [displayLocation, setDisplayLocation] = useState("");
//   const [accuracy, setAccuracy] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const steps = [
//     {
//       title: "Find Nearby Users",
//       description:
//         "Quickly locate people around you who want to exchange cash.",
//       icon: "📍",
//     },
//     {
//       title: "Start a Chat",
//       description:
//         "Message instantly within the app to coordinate the exchange.",
//       icon: "💬",
//     },
//     {
//       title: "Complete Transaction",
//       description: "Meet up, exchange cash, and rate each other for safety.",
//       icon: "✅",
//     },
//   ];

//   const getLocation = () => {
//     setLocationStatus("loading");

//     if (!navigator.geolocation) {
//       setLocationStatus("error");
//       return;
//     }

//     const options = {
//       enableHighAccuracy: true,
//       timeout: 10000,
//       maximumAge: 0,
//     };

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const { latitude, longitude, accuracy } = position.coords;
//           setAccuracy(Math.round(accuracy));
//           setLocation({ latitude, longitude });
//           setDisplayLocation("Getting address...");

//           try {
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
//             );

//             if (response.ok) {
//               const data = await response.json();
//               const address = data.address;

//               let displayParts = [];
//               if (address.road) displayParts.push(address.road);
//               if (address.suburb) displayParts.push(address.suburb);
//               if (address.city_district)
//                 displayParts.push(address.city_district);
//               if (address.city) displayParts.push(address.city);

//               const displayText =
//                 displayParts.length > 0
//                   ? displayParts.join(", ")
//                   : "Nearby location";

//               setLocation({
//                 latitude,
//                 longitude,
//                 address: {
//                   road: address.road,
//                   suburb: address.suburb,
//                   city: address.city,
//                   state: address.state,
//                   postcode: address.postcode,
//                   country: address.country,
//                 },
//               });
//               setDisplayLocation(displayText);
//             } else {
//               setDisplayLocation(
//                 `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
//               );
//             }
//           } catch (error) {
//             console.error("Address lookup failed:", error);
//             setDisplayLocation(
//               `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
//             );
//           }

//           setLocationStatus("success");
//         } catch (error) {
//           console.error("Error processing location:", error);
//           setLocationStatus("error");
//         }
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         let errorMessage = "Location access denied";

//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage =
//               "Location permission denied. Please enable it in browser settings.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = "Location information unavailable.";
//             break;
//           case error.TIMEOUT:
//             errorMessage = "Location request timed out. Please try again.";
//             break;
//           default:
//             errorMessage = "An unknown error occurred.";
//         }

//         setLocationStatus("error");
//         setDisplayLocation(errorMessage);
//       },
//       options
//     );
//   };

//   useEffect(() => {
//     const checkLocationPermission = async () => {
//       try {
//         const permissionStatus = await navigator.permissions.query({
//           name: "geolocation",
//         });

//         if (permissionStatus.state === "granted") {
//           getLocation();
//         }

//         permissionStatus.onchange = () => {
//           if (permissionStatus.state === "granted") {
//             getLocation();
//           }
//         };
//       } catch (error) {
//         console.log("Permission API not supported, will wait for user click");
//       }
//     };

//     checkLocationPermission();
//   }, []);

//   useEffect(() => {
//     if (locationStatus === "success") {
//       setLastUpdated(new Date().toLocaleTimeString());
//     }
//   }, [locationStatus]);

//   const renderLocationFeature = () => (
//     <div className="mb-8 flex flex-col items-center">
//       <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg max-w-md w-full">
//         <h3 className="text-xl font-medium mb-4 flex items-center justify-center">
//           <span className="mr-2 text-2xl">📍</span>
//           Find Users Near You
//         </h3>

//         {locationStatus === "success" && (
//           <div className="mb-4 py-3 px-4 bg-green-900/30 rounded-lg border border-green-800">
//             <p className="text-green-400 font-medium text-lg">
//               {displayLocation}
//             </p>
//             <div className="flex justify-between text-green-300 text-sm mt-1">
//               <span>Accuracy: ~{accuracy} meters</span>
//               {lastUpdated && <span>Updated: {lastUpdated}</span>}
//             </div>
//           </div>
//         )}

//         {locationStatus === "error" && (
//           <div className="mb-4 py-3 px-4 bg-red-900/30 rounded-lg border border-red-800">
//             <p className="text-red-400">
//               {displayLocation || "Location error"}
//             </p>
//             <p className="text-red-300 text-sm mt-1">
//               {displayLocation.includes("permission")
//                 ? "Please check your browser settings"
//                 : "Please try again later"}
//             </p>
//           </div>
//         )}

//         {locationStatus === "loading" && (
//           <div className="mb-4 flex justify-center items-center py-3">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//             <span className="ml-2 text-blue-400">Locating you...</span>
//           </div>
//         )}

//         <button
//           onClick={getLocation}
//           disabled={locationStatus === "loading"}
//           className={`w-full mt-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center
//             ${
//               locationStatus === "loading"
//                 ? "bg-gray-700 text-gray-300 cursor-not-allowed"
//                 : locationStatus === "success"
//                 ? "bg-green-700 hover:bg-green-600 text-white"
//                 : "bg-blue-600 hover:bg-blue-500 text-white"
//             }`}
//         >
//           {locationStatus === "success"
//             ? "Refresh Location"
//             : locationStatus === "loading"
//             ? "Getting Location..."
//             : "Share My Location"}
//           {locationStatus !== "loading" && (
//             <span className="ml-2 text-xl">📍</span>
//           )}
//         </button>

//         {locationStatus === "success" && (
//           <p className="text-xs text-gray-400 mt-2 text-center">
//             Your location is only used to find nearby exchanges and is not
//             stored permanently.
//           </p>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <ProtectedRoute>
//       <main className="bg-white text-gray-900">
//         <section className="bg-black text-white py-24 px-6 text-center relative overflow-hidden">
//           <div className="max-w-4xl mx-auto z-10 relative">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
//               Instant Cash Exchange, Anywhere
//             </h1>
//             <p className="text-lg md:text-xl mb-8 text-gray-300">
//               Meet people nearby and trade cash quickly & securely with
//               MadadPay.
//             </p>

//             {renderLocationFeature()}

//             <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-white font-semibold transition duration-300 mt-8">
//               Get Started
//             </button>
//           </div>
//           <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-red-700 opacity-20 rounded-full blur-3xl z-0" />
//         </section>

//         <section className="py-24 px-6 bg-gray-50 text-center">
//           <h2 className="text-4xl font-semibold mb-14">How It Works</h2>
//           <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//             {steps.map((step, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-md p-8 transition hover:scale-105 hover:shadow-lg"
//               >
//                 <div className="text-4xl mb-4">{step.icon}</div>
//                 <h3 className="text-xl font-bold mb-2">{step.title}</h3>
//                 <p className="text-gray-600 text-sm">{step.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="py-20 px-6 bg-gray-100">
//           <h2 className="text-4xl font-semibold text-center mb-12">
//             Customer Testimonials
//           </h2>
//           <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
//             <div>
//               <p className="italic mb-2">
//                 MadadPay helped me get cash when ATMs were down! Highly
//                 recommended.
//               </p>
//               <p className="font-medium">- Priya S., Delhi</p>
//             </div>
//             <div>
//               <p className="italic mb-2">
//                 Smooth experience, connected to someone nearby in seconds.
//               </p>
//               <p className="font-medium">- Ravi M., Mumbai</p>
//             </div>
//           </div>
//         </section>

//         <section className="bg-black text-white py-24 px-6 text-center">
//           <h2 className="text-4xl font-bold mb-4">
//             Join the MadadPay Community
//           </h2>
//           <p className="mb-6 max-w-xl mx-auto">
//             Start exchanging cash with trusted users in your area.
//           </p>
//           <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-white font-semibold transition duration-300">
//             Sign Up Now
//           </button>
//         </section>
//       </main>
//     </ProtectedRoute>
//   );
// };

// export default HomePage;


"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [displayLocation, setDisplayLocation] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [activeExchangeType, setActiveExchangeType] = useState("cash");
  const [amountToExchange, setAmountToExchange] = useState("");

  const steps = [
    {
      title: "Find Nearby Users",
      description:
        "Quickly locate people around you who want to exchange cash.",
      icon: "📍",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    {
      title: "Start a Chat",
      description:
        "Message instantly within the app to coordinate the exchange.",
      icon: "💬",
      color: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      title: "Complete Transaction",
      description: "Meet up, exchange cash, and rate each other for safety.",
      icon: "✅",
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
    },
  ];

  const popularExchanges = [
    {
      name: "Rahul K.",
      location: "Connaught Place",
      amount: "₹5,000",
      distance: "0.8 km",
      rating: 4.8,
      exchanges: 32,
      image: "https://i.pravatar.cc/150?img=11",
    },
    {
      name: "Priya S.",
      location: "Malad West",
      amount: "₹10,000",
      distance: "1.2 km",
      rating: 4.9,
      exchanges: 47,
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Amit R.",
      location: "Indiranagar",
      amount: "₹2,000",
      distance: "0.5 km",
      rating: 4.7,
      exchanges: 28,
      image: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const testimonials = [
    {
      quote:
        "CashConnect helped me get cash when ATMs were down! Highly recommended.",
      name: "Priya S.",
      location: "Delhi",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      quote: "Smooth experience, connected to someone nearby in seconds.",
      name: "Ravi M.",
      location: "Mumbai",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      quote: "Best way to avoid ATM queues, always have cash in my pocket.",
      name: "Anuj K.",
      location: "Jaipur",
      rating: 4.5,
      image: "https://i.pravatar.cc/150?img=8",
    },
  ];

  const exchangeAmounts = [
    {
      range: "₹500 - ₹5,000",
      icon: "💰",
      users: 120,
      color: "bg-gradient-to-br from-amber-400 to-amber-600",
    },
    {
      range: "₹5,000 - ₹10,000",
      icon: "💰💰",
      users: 85,
      color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    },
    {
      range: "₹10,000+",
      icon: "💰💰💰",
      users: 42,
      color: "bg-gradient-to-br from-violet-400 to-violet-600",
    },
  ];

  const getLocation = () => {
    setLocationStatus("loading");

    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          setAccuracy(Math.round(accuracy));
          setLocation({ latitude, longitude });
          setDisplayLocation("Getting address...");

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );

            if (response.ok) {
              const data = await response.json();
              const address = data.address;

              let displayParts = [];
              if (address.road) displayParts.push(address.road);
              if (address.suburb) displayParts.push(address.suburb);
              if (address.city_district)
                displayParts.push(address.city_district);
              if (address.city) displayParts.push(address.city);

              const displayText =
                displayParts.length > 0
                  ? displayParts.join(", ")
                  : "Nearby location";

              setLocation({
                latitude,
                longitude,
                address: {
                  road: address.road,
                  suburb: address.suburb,
                  city: address.city,
                  state: address.state,
                  postcode: address.postcode,
                  country: address.country,
                },
              });
              setDisplayLocation(displayText);
            } else {
              setDisplayLocation(
                `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
              );
            }
          } catch (error) {
            console.error("Address lookup failed:", error);
            setDisplayLocation(
              `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            );
          }

          setLocationStatus("success");
        } catch (error) {
          console.error("Error processing location:", error);
          setLocationStatus("error");
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Location access denied";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable it in browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }

        setLocationStatus("error");
        setDisplayLocation(errorMessage);
      },
      options
    );
  };

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permissionStatus.state === "granted") {
          getLocation();
        }

        permissionStatus.onchange = () => {
          if (permissionStatus.state === "granted") {
            getLocation();
          }
        };
      } catch (error) {
        console.log("Permission API not supported, will wait for user click");
      }
    };

    checkLocationPermission();
  }, []);

  useEffect(() => {
    if (locationStatus === "success") {
      setLastUpdated(new Date().toLocaleTimeString());
    }
  }, [locationStatus]);

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm font-medium text-gray-200">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const renderLocationFeature = () => (
    <div className="mb-12 flex flex-col items-center w-full">
      <div className="bg-indigo-900/80 backdrop-blur-lg p-8 rounded-2xl border border-indigo-700/50 shadow-xl max-w-3xl w-full">
        <h3 className="text-2xl font-semibold mb-6 text-center text-white">
          Find Cash Exchange Near You
        </h3>

        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-6">
            <button
              onClick={() => setActiveExchangeType("cash")}
              className={`px-5 py-3 rounded-lg font-medium transition-all ${
                activeExchangeType === "cash"
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-800/50 text-indigo-200 hover:bg-indigo-800"
              }`}
            >
              Cash → Online
            </button>
            <button
              onClick={() => setActiveExchangeType("online")}
              className={`px-5 py-3 rounded-lg font-medium transition-all ${
                activeExchangeType === "online"
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-800/50 text-indigo-200 hover:bg-indigo-800"
              }`}
            >
              Online → Cash
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-indigo-200 mb-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-300">
                  ₹
                </span>
                <input
                  type="text"
                  value={amountToExchange}
                  onChange={(e) => setAmountToExchange(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 bg-indigo-800/40 border border-indigo-600 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-indigo-200 mb-1">
                Location
              </label>
              <div className="relative">
                {locationStatus === "success" ? (
                  <div className="flex items-center w-full pl-4 pr-1 py-2 bg-indigo-800/40 border border-indigo-600 rounded-lg">
                    <div className="flex-1">
                      <p className="text-green-400 font-medium">
                        {displayLocation}
                      </p>
                      <div className="flex justify-between text-indigo-300 text-xs mt-1">
                        <span>Accuracy: ~{accuracy} meters</span>
                        {lastUpdated && <span>Updated: {lastUpdated}</span>}
                      </div>
                    </div>
                    <button
                      onClick={getLocation}
                      className="ml-2 p-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter your location"
                      className="flex-1 pl-4 pr-4 py-3 bg-indigo-800/40 border border-indigo-600 rounded-l-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={getLocation}
                      disabled={locationStatus === "loading"}
                      className={`px-4 rounded-r-lg font-medium transition-all flex items-center justify-center
                        ${
                          locationStatus === "loading"
                            ? "bg-indigo-700/50 text-indigo-300 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white"
                        }`}
                    >
                      {locationStatus === "loading" ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      ) : (
                        "Locate Me"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
          Find Exchange Partners
        </button>

        {locationStatus === "error" && (
          <div className="mt-4 py-3 px-4 bg-red-900/30 rounded-lg border border-red-800">
            <p className="text-red-400">
              {displayLocation || "Location error"}
            </p>
            <p className="text-red-300 text-sm mt-1">
              {displayLocation.includes("permission")
                ? "Please check your browser settings"
                : "Please try again later"}
            </p>
          </div>
        )}

        {locationStatus === "success" && (
          <p className="text-xs text-indigo-300 mt-3 text-center">
            Your location is only used to find nearby exchanges and is not
            stored permanently.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section with Gradient Background */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        {/* Animated Circles */}
        <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-indigo-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-600 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-[20rem] h-[20rem] bg-blue-600 opacity-10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            Cash Exchange, Simplified
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-indigo-100 max-w-2xl mx-auto">
            Meet people nearby and trade cash quickly & securely with
            CashConnect.
          </p>

          {renderLocationFeature()}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {exchangeAmounts.map((item, index) => (
              <div
                key={index}
                className={`${item.color} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="text-xl font-bold mb-1">{item.range}</h3>
                <p className="text-sm opacity-90">
                  {item.users} users available
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-xl text-gray-600 mb-14 max-w-xl mx-auto">
          Three simple steps to exchange cash with users near you
        </p>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${step.color} text-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl transform hover:scale-[1.03]`}
            >
              <div className="text-5xl mb-6 bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/80">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Exchanges Near You */}
      <section className="py-24 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-4">
          Popular Exchanges Near You
        </h2>
        <p className="text-xl text-gray-600 text-center mb-14 max-w-xl mx-auto">
          Connect with trusted users in your area
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {popularExchanges.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-indigo-200"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover mr-4 border-2 border-indigo-500"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {user.location} • {user.distance}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="text-sm text-gray-500">
                      Amount Available
                    </div>
                    <div className="text-xl font-bold text-indigo-700">
                      {user.amount}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Rating</div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(user.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm font-medium">
                        {user.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.exchanges} exchanges
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                    Message
                  </button>
                  <button className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold rounded-lg transition-colors">
            View All Nearby Exchanges
          </button>
        </div>
      </section>

      {/* Testimonials Section with Gradient Cards */}
      <section className="py-24 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-4">
          What Our Users Say
        </h2>
        <p className="text-xl text-gray-600 text-center mb-14 max-w-xl mx-auto">
          Thousands of satisfied users across India
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-1 rounded-xl shadow-lg"
            >
              <div className="bg-white text-gray-800 p-6 rounded-lg h-full flex flex-col">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`inline-block w-5 h-5 ${
                        i < Math.floor(testimonial.rating)
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="italic text-lg mb-6 flex-grow">
                  {testimonial.quote}
                </p>

                <div className="flex items-center mt-auto">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48} // w-12 = 48px
                    height={48} // h-12 = 48px
                    className="rounded-full object-cover mr-4 border-2 border-indigo-500"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section with Gradient Background */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="max-w-4xl mx-auto z-10 relative">
          <h2 className="text-5xl font-bold mb-6">
            Join the CashConnect Community
          </h2>
          <p className="text-xl mb-10 max-w-xl mx-auto">
            Start exchanging cash with trusted users in your area today. Sign up
            in less than a minute.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full text-white font-bold transition duration-300 transform hover:scale-105 shadow-lg">
              Create Account
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;


