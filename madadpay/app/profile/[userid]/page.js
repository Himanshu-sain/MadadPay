"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Shield,
  CheckCircle,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";

// Mock data - in a real app this would come from your API
const getUserData = (userId) => ({
  id: userId,
  name: "Alex Johnson",
  rating: 4.9,
  reviewCount: 127,
  joinDate: "August 2023",
  profileImage: "/api/placeholder/128/128",
  location: "New York, NY",
  verifications: [
    { type: "ID", verified: true },
    { type: "Phone", verified: true },
    { type: "Email", verified: true },
    { type: "Payment", verified: true },
  ],
  transactionHistory: [
    {
      id: 1,
      date: "2025-04-12",
      amount: 1500,
      partner: "Emma Davis",
      status: "completed",
    },
    {
      id: 2,
      date: "2025-03-28",
      amount: 2000,
      partner: "John Smith",
      status: "completed",
    },
    {
      id: 3,
      date: "2025-03-15",
      amount: 1000,
      partner: "Sarah Williams",
      status: "completed",
    },
  ],
  reviews: [
    {
      id: 1,
      author: "Sarah Williams",
      rating: 5,
      date: "2025-04-15",
      text: "Great experience! Very reliable and professional.",
    },
    {
      id: 2,
      author: "Mike Chen",
      rating: 5,
      date: "2025-03-20",
      text: "Smooth transaction, would definitely exchange with Alex again.",
    },
    {
      id: 3,
      author: "Emma Davis",
      rating: 4,
      date: "2025-02-10",
      text: "Good communication and punctual.",
    },
  ],
});

export default function UserProfile({ params }) {
  const userData = getUserData(params.userId);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const displayedReviews = showAllReviews
    ? userData.reviews
    : userData.reviews.slice(0, 2);
  const displayedTransactions = showAllTransactions
    ? userData.transactionHistory
    : userData.transactionHistory.slice(0, 2);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative w-32 h-32">
            <Image
              src={userData.profileImage}
              alt={userData.name}
              className="rounded-full object-cover"
              fill
              priority
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{userData.name}</h1>

            <div className="flex items-center justify-center md:justify-start mt-2">
              <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                <Star size={16} className="mr-1" fill="currentColor" />
                <span className="font-medium">{userData.rating}</span>
                <span className="text-sm text-blue-600 ml-1">
                  ({userData.reviewCount})
                </span>
              </div>

              <div className="flex items-center ml-4 text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{userData.location}</span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <Clock size={14} className="inline mr-1" />
              Member since {userData.joinDate}
            </div>
          </div>

          <div className="md:self-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Verification Badges */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Verifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {userData.verifications.map((verification, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 flex items-center justify-center flex-col text-center"
            >
              {verification.verified ? (
                <CheckCircle size={24} className="text-green-500 mb-2" />
              ) : (
                <Shield size={24} className="text-gray-400 mb-2" />
              )}
              <span
                className={
                  verification.verified ? "font-medium" : "text-gray-400"
                }
              >
                {verification.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <div className="flex items-center">
            <Star
              size={18}
              className="text-yellow-500 mr-1"
              fill="currentColor"
            />
            <span className="font-medium">{userData.rating}</span>
            <span className="text-gray-500 ml-1">({userData.reviewCount})</span>
          </div>
        </div>

        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between">
                <span className="font-medium">{review.author}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }
                      fill="currentColor"
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    {review.date}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-gray-600">{review.text}</p>
            </div>
          ))}

          {userData.reviews.length > 2 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="flex items-center text-blue-500 hover:text-blue-600"
            >
              {showAllReviews ? "Show less" : "Show all reviews"}
              <ChevronDown
                size={16}
                className={`ml-1 transform ${
                  showAllReviews ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Date</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Partner</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b last:border-b-0">
                  <td className="py-3">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-3">{transaction.partner}</td>
                  <td className="py-3">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 capitalize">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {userData.transactionHistory.length > 2 && (
          <button
            onClick={() => setShowAllTransactions(!showAllTransactions)}
            className="flex items-center text-blue-500 hover:text-blue-600 mt-4"
          >
            {showAllTransactions ? "Show less" : "Show all transactions"}
            <ChevronDown
              size={16}
              className={`ml-1 transform ${
                showAllTransactions ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}
