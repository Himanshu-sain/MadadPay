// "use client";

// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <header className="flex justify-between items-center px-8 py-4 shadow-md bg-white sticky top-0 z-50">
//       <div className="text-xl font-bold bg-blue-600 text-white px-3 py-1 rounded-lg shadow">
//         MadadPay
//       </div>
//       <nav className="space-x-6 text-sm font-medium text-gray-800">
//         <Link href="/matches" className="hover:text-blue-600 transition">
//           Matches
//         </Link>
//         <Link href="/exchange" className="hover:text-blue-600 transition">
//           Exchange
//         </Link>
//         <Link href="/confirm" className="hover:text-blue-600 transition">
//           Confirm
//         </Link>
//         <Link href="/login" className="hover:text-blue-600 transition">
//           Log in
//         </Link>
//         <Link href="/signup" className="hover:text-blue-600 transition">
//           Sign up
//         </Link>
//       </nav>
//     </header>
//   );
// }

// components/Navbar.js
// "use client";
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         isScrolled ? "bg-white shadow-md" : "bg-white/70 backdrop-blur-md"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/">
//               <div className="flex items-center">
//                 <Image
//                   src="/logo.svg"
//                   alt="CashLoop Logo"
//                   width={40}
//                   height={40}
//                   className="mr-2"
//                 />
//                 <span className="text-2xl font-bold text-blue-600">
//                   CashLoop
//                 </span>
//               </div>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link
//               href="/"
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
//             >
//               Home
//             </Link>
//             <Link
//               href="/search"
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
//             >
//               Find Exchange
//             </Link>
//             <Link
//               href="/help"
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
//             >
//               Help
//             </Link>
//             <Link
//               href="/safety"
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
//             >
//               Safety Tips
//             </Link>
//           </div>

//           {/* Auth Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link
//               href="/login"
//               className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md font-medium"
//             >
//               Login
//             </Link>
//             <Link
//               href="/signup"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
//             >
//               Register
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
//               aria-expanded={isOpen}
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//               <svg
//                 className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div
//         className={`md:hidden ${
//           isOpen ? "block" : "hidden"
//         } bg-white shadow-lg`}
//       >
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <Link
//             href="/"
//             className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
//           >
//             Home
//           </Link>
//           <Link
//             href="/search"
//             className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
//           >
//             Find Exchange
//           </Link>
//           <Link
//             href="/help"
//             className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
//           >
//             Help
//           </Link>
//           <Link
//             href="/safety"
//             className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
//           >
//             Safety Tips
//           </Link>
//           <div className="pt-4 pb-3 border-t border-gray-200">
//             <Link
//               href="/auth/login"
//               className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-800"
//             >
//               Login
//             </Link>
//             <Link
//               href="/auth/register"
//               className="block mt-1 px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }




"use client";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/redux/slices/userSlice'; // adjust the path as needed

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

 useEffect(() => {
   const handleScroll = () => {
     setIsScrolled(window.scrollY > 10);
   };

   window.addEventListener("scroll", handleScroll);
   return () => window.removeEventListener("scroll", handleScroll);
 }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    dispatch(logoutUser());
    setShowProfileMenu(false);
    router.push("/login");
  };


  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="CashLoop Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-2xl font-bold text-blue-600">
                  CashLoop
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition duration-150 ease-in-out hover:bg-blue-50"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition duration-150 ease-in-out hover:bg-blue-50"
            >
              Find Exchange
            </Link>
            {isLoggedIn && (
              <Link
                href="/exchange/create"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition duration-150 ease-in-out hover:bg-blue-50"
              >
                Create Exchange
              </Link>
            )}
            <Link
              href="/help"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition duration-150 ease-in-out hover:bg-blue-50"
            >
              Help
            </Link>
            <Link
              href="/safety"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition duration-150 ease-in-out hover:bg-blue-50"
            >
              Safety Tips
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md font-medium border border-transparent hover:border-blue-200 transition duration-150 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium shadow-sm hover:shadow transition duration-150 ease-in-out"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <div className="flex items-center space-x-3">
                  {/* <Link
                    href="/exchange/create"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium shadow-sm hover:shadow transition duration-150 ease-in-out flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Create Exchange
                  </Link> */}
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center focus:outline-none"
                    aria-expanded={showProfileMenu}
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <span className="text-sm font-medium">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <svg
                      className="ml-1 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Dropdown menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/messages"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Messages
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Settings
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isLoggedIn && (
              <Link
                href="/exchange/create"
                className="mr-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded-md font-medium shadow-sm flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Create
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-white shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/search"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            onClick={() => setIsOpen(false)}
          >
            Find Exchange
          </Link>
          {isLoggedIn && (
            <Link
              href="/exchange/create"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
              Create Exchange
            </Link>
          )}
          <Link
            href="/help"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            onClick={() => setIsOpen(false)}
          >
            Help
          </Link>
          <Link
            href="/safety"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            onClick={() => setIsOpen(false)}
          >
            Safety Tips
          </Link>
          {isLoggedIn && (
            <>
              <div className="border-t border-gray-200 pt-4">
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/messages"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link
                href="/auth/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block mt-1 px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}