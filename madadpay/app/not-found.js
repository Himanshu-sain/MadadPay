// app/not-found.js
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-16">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">
          404
        </h1>
        <div className="mt-4 mb-8">
          <div className="h-1 w-16 bg-blue-500 mx-auto"></div>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been
          moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Go Home
          </Link>
          <Link
            href="/help"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            Get Help
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
      </div>
    </div>
  );
}
