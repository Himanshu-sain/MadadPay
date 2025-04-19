"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-md bg-white sticky top-0 z-50">
      <div className="text-xl font-bold bg-blue-600 text-white px-3 py-1 rounded-lg shadow">
        MadadPay
      </div>
      <nav className="space-x-6 text-sm font-medium text-gray-800">
        <Link href="/matches" className="hover:text-blue-600 transition">
          Matches
        </Link>
        <Link href="/exchange" className="hover:text-blue-600 transition">
          Exchange
        </Link>
        <Link href="/confirm" className="hover:text-blue-600 transition">
          Confirm
        </Link>
        <Link href="/login" className="hover:text-blue-600 transition">
          Log in
        </Link>
        <Link href="/signup" className="hover:text-blue-600 transition">
          Sign up
        </Link>
      </nav>
    </header>
  );
}
