//  "use client"
// import React, { useState, useEffect } from "react";

// const HomePage = () => {
//   const [location, setLocation] = useState(null);
//   const [locationStatus, setLocationStatus] = useState("idle"); // idle, loading, success, error
//   const [displayLocation, setDisplayLocation] = useState("");
//   const [accuracy, setAccuracy] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   // Other existing code (steps array, etc.) remains the same...
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
//       timeout: 10000, // 10 seconds
//       maximumAge: 0 // Don't use cached position
//     };

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const { latitude, longitude, accuracy } = position.coords;
//           setAccuracy(Math.round(accuracy));
//           setLastUpdated(new Date().toLocaleTimeString());

//           // First update with coordinates immediately
//           setLocation({ latitude, longitude });
//           setDisplayLocation("Getting address...");
          
//           // Try to get human-readable address
//           try {
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
//             );
            
//             if (response.ok) {
//               const data = await response.json();
//               const address = data.address;
              
//               // Build display address from available components
//               let displayParts = [];
//               if (address.road) displayParts.push(address.road);
//               if (address.suburb) displayParts.push(address.suburb);
//               if (address.city_district) displayParts.push(address.city_district);
//               if (address.city) displayParts.push(address.city);
              
//               const displayText = displayParts.length > 0 
//                 ? displayParts.join(", ")
//                 : "Nearby location";
              
//               setLocation({ 
//                 latitude, 
//                 longitude,
//                 address: {
//                   road: address.road,
//                   suburb: address.suburb,
//                   city: address.city,
//                   state: address.state,
//                   postcode: address.postcode,
//                   country: address.country
//                 }
//               });
//               setDisplayLocation(displayText);
//             } else {
//               // Fallback to coordinates if address fetch fails
//               setDisplayLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
//             }
//           } catch (error) {
//             console.error("Address lookup failed:", error);
//             setDisplayLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
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
        
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = "Location permission denied. Please enable it in browser settings.";
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

//   // Get location when component mounts (with user permission)
//   useEffect(() => {
//     const checkLocationPermission = async () => {
//       try {
//         // Check if we already have permission
//         const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        
//         if (permissionStatus.state === 'granted') {
//           getLocation();
//         } else if (permissionStatus.state === 'prompt') {
//           // We'll wait for user to click the button
//         }
        
//         permissionStatus.onchange = () => {
//           if (permissionStatus.state === 'granted') {
//             getLocation();
//           }
//         };
//       } catch (error) {
//         console.log("Permission API not supported, will wait for user click");
//       }
//     };
    
//     checkLocationPermission();
//   }, []);

//   // Updated Location Feature JSX
//   const renderLocationFeature = () => (
//     <div className="mb-8 flex flex-col items-center">
//       <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg max-w-md w-full">
//         <h3 className="text-xl font-medium mb-4 flex items-center justify-center">
//           <span className="mr-2 text-2xl">📍</span>
//           Find Users Near You
//         </h3>
        
//         {locationStatus === "success" && (
//           <div className="mb-4 py-3 px-4 bg-green-900/30 rounded-lg border border-green-800">
//             <p className="text-green-400 font-medium text-lg">{displayLocation}</p>
//             <div className="flex justify-between text-green-300 text-sm mt-1">
//               <span>Accuracy: ~{accuracy} meters</span>
//               <span>Updated: {lastUpdated}</span>
//             </div>
//           </div>
//         )}
        
//         {locationStatus === "error" && (
//           <div className="mb-4 py-3 px-4 bg-red-900/30 rounded-lg border border-red-800">
//             <p className="text-red-400">{displayLocation || "Location error"}</p>
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
//             ${locationStatus === "loading" 
//               ? "bg-gray-700 text-gray-300 cursor-not-allowed" 
//               : locationStatus === "success"
//                 ? "bg-green-700 hover:bg-green-600 text-white"
//                 : "bg-blue-600 hover:bg-blue-500 text-white"
//             }`}
//         >
//           {locationStatus === "success" 
//             ? "Refresh Location" 
//             : locationStatus === "loading"
//               ? "Getting Location..." 
//               : "Share My Location"}
//           {locationStatus !== "loading" && (
//             <span className="ml-2 text-xl">📍</span>
//           )}
//         </button>
        
//         {locationStatus === "success" && (
//           <p className="text-xs text-gray-400 mt-2 text-center">
//             Your location is only used to find nearby exchanges and is not stored permanently.
//           </p>
//         )}
//       </div>
//     </div>
//   );

//   // In your return statement, replace the old location feature with:
//   // {renderLocationFeature()}
  
//   // Rest of your component remains the same...

//    <section className="py-20 px-6 bg-gray-100">
//      <h2 className="text-4xl font-semibold text-center mb-12">
//        Customer Testimonials
//      </h2>
//      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
//        <div>
//          <p className="italic mb-2">
//            MadadPay helped me get cash when ATMs were down! Highly recommended.
//          </p>
//          <p className="font-medium">- Priya S., Delhi</p>
//        </div>
//        <div>
//          <p className="italic mb-2">
//            Smooth experience, connected to someone nearby in seconds.
//          </p>
//          <p className="font-medium">- Ravi M., Mumbai</p>
//        </div>
//      </div>
//    </section>;

   
//      /* CTA Section */
   
//    <section className="bg-black text-white py-24 px-6 text-center">
//      <h2 className="text-4xl font-bold mb-4">Join the MadadPay Community</h2>
//      <p className="mb-6 max-w-xl mx-auto">
//        Start exchanging cash with trusted users in your area.
//      </p>
//      <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-white font-semibold transition duration-300">
//        Sign Up Now
//      </button>
//    </section>;
// };

// export default HomePage;


"use client"
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [displayLocation, setDisplayLocation] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const steps = [
    {
      title: "Find Nearby Users",
      description: "Quickly locate people around you who want to exchange cash.",
      icon: "📍",
    },
    {
      title: "Start a Chat",
      description: "Message instantly within the app to coordinate the exchange.",
      icon: "💬",
    },
    {
      title: "Complete Transaction",
      description: "Meet up, exchange cash, and rate each other for safety.",
      icon: "✅",
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
      timeout: 10000, // 10 seconds
      maximumAge: 0 // Don't use cached position
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          setAccuracy(Math.round(accuracy));
          setLastUpdated(new Date().toLocaleTimeString());

          // First update with coordinates immediately
          setLocation({ latitude, longitude });
          setDisplayLocation("Getting address...");
          
          // Try to get human-readable address
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            
            if (response.ok) {
              const data = await response.json();
              const address = data.address;
              
              // Build display address from available components
              let displayParts = [];
              if (address.road) displayParts.push(address.road);
              if (address.suburb) displayParts.push(address.suburb);
              if (address.city_district) displayParts.push(address.city_district);
              if (address.city) displayParts.push(address.city);
              
              const displayText = displayParts.length > 0 
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
                  country: address.country
                }
              });
              setDisplayLocation(displayText);
            } else {
              // Fallback to coordinates if address fetch fails
              setDisplayLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            }
          } catch (error) {
            console.error("Address lookup failed:", error);
            setDisplayLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
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
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable it in browser settings.";
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

  // Get location when component mounts (with user permission)
  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        // Check if we already have permission
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        
        if (permissionStatus.state === 'granted') {
          getLocation();
        } else if (permissionStatus.state === 'prompt') {
          // We'll wait for user to click the button
        }
        
        permissionStatus.onchange = () => {
          if (permissionStatus.state === 'granted') {
            getLocation();
          }
        };
      } catch (error) {
        console.log("Permission API not supported, will wait for user click");
      }
    };
    
    checkLocationPermission();
  }, []);

  // Updated Location Feature JSX
  const renderLocationFeature = () => (
    <div className="mb-8 flex flex-col items-center">
      <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg max-w-md w-full">
        <h3 className="text-xl font-medium mb-4 flex items-center justify-center">
          <span className="mr-2 text-2xl">📍</span>
          Find Users Near You
        </h3>
        
        {locationStatus === "success" && (
          <div className="mb-4 py-3 px-4 bg-green-900/30 rounded-lg border border-green-800">
            <p className="text-green-400 font-medium text-lg">{displayLocation}</p>
            <div className="flex justify-between text-green-300 text-sm mt-1">
              <span>Accuracy: ~{accuracy} meters</span>
              <span>Updated: {lastUpdated}</span>
            </div>
          </div>
        )}
        
        {locationStatus === "error" && (
          <div className="mb-4 py-3 px-4 bg-red-900/30 rounded-lg border border-red-800">
            <p className="text-red-400">{displayLocation || "Location error"}</p>
            <p className="text-red-300 text-sm mt-1">
              {displayLocation.includes("permission") 
                ? "Please check your browser settings"
                : "Please try again later"}
            </p>
          </div>
        )}
        
        {locationStatus === "loading" && (
          <div className="mb-4 flex justify-center items-center py-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-blue-400">Locating you...</span>
          </div>
        )}
        
        <button 
          onClick={getLocation}
          disabled={locationStatus === "loading"}
          className={`w-full mt-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center
            ${locationStatus === "loading" 
              ? "bg-gray-700 text-gray-300 cursor-not-allowed" 
              : locationStatus === "success"
                ? "bg-green-700 hover:bg-green-600 text-white"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
        >
          {locationStatus === "success" 
            ? "Refresh Location" 
            : locationStatus === "loading"
              ? "Getting Location..." 
              : "Share My Location"}
          {locationStatus !== "loading" && (
            <span className="ml-2 text-xl">📍</span>
          )}
        </button>
        
        {locationStatus === "success" && (
          <p className="text-xs text-gray-400 mt-2 text-center">
            Your location is only used to find nearby exchanges and is not stored permanently.
          </p>
        )}
      </div>
    </div>
  );
  // ... (keep all your existing functions: getLocation, renderLocationFeature, etc.)
  // ... (keep your useEffect hook)

  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Instant Cash Exchange, Anywhere
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Meet people nearby and trade cash quickly & securely with MadadPay.
          </p>
          
          {renderLocationFeature()}
          
          <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-white font-semibold transition duration-300 mt-8">
            Get Started
          </button>
        </div>
        <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-red-700 opacity-20 rounded-full blur-3xl z-0" />
      </section>

      {/* Steps Section */}
      <section className="py-24 px-6 bg-gray-50 text-center">
        <h2 className="text-4xl font-semibold mb-14">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 transition hover:scale-105 hover:shadow-lg"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Customer Testimonials
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <p className="italic mb-2">
              MadadPay helped me get cash when ATMs were down! Highly recommended.
            </p>
            <p className="font-medium">- Priya S., Delhi</p>
          </div>
          <div>
            <p className="italic mb-2">
              Smooth experience, connected to someone nearby in seconds.
            </p>
            <p className="font-medium">- Ravi M., Mumbai</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Join the MadadPay Community</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Start exchanging cash with trusted users in your area.
        </p>
        <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-white font-semibold transition duration-300">
          Sign Up Now
        </button>
      </section>
    </main>
  );
};

export default HomePage;