// app/error.js
"use client";

import React from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="inline-flex rounded-full bg-red-100 p-4">
          <div className="rounded-full bg-red-200 p-4">
            <svg
              className="h-8 w-8 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1 className="mt-5 text-3xl font-bold text-gray-800">
          Something went wrong!
        </h1>
        <p className="mt-4 text-gray-600">
          We apologize for the inconvenience. An unexpected error has occurred.
          Our team has been notified and is working to fix the issue.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            Return Home
          </Link>
        </div>

        <div className="mt-8 text-gray-500">
          <p>
            Need assistance?{" "}
            <Link href="/help" className="text-blue-600 hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-gray-800 text-white rounded-lg text-left overflow-auto">
            <h3 className="text-lg font-semibold mb-2">Error Details:</h3>
            <p className="font-mono text-sm">{error.message}</p>
            <p className="font-mono text-sm mt-2">{error.stack}</p>
          </div>
        )}
      </div>
    </div>
  );
}
