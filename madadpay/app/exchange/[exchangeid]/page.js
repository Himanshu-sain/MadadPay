

// pages/exchange/[id].js
'use client'// pages/exchange/[id].js
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function ExchangePage() {
  // Mock data for the exchange - in a real app, you would fetch this from an API
  const [exchange] = useState({
    id: 'EX12345678',
    createdAt: '2025-04-23',
    status: 'scheduled', // pending, scheduled, completed, cancelled
    type: 'cash', // cash or online
    amount: 5000,
    date: '2025-04-28',
    time: '14:30',
    location: {
      address: '123 Market Place, Sector 18, Noida',
      latitude: 28.5707,
      longitude: 77.3219
    },
    partner: {
      id: 'USR98765',
      name: 'Amit Sharma',
      rating: 4.8,
      profilePic: '/user-profile.jpg',
      completedExchanges: 32
    }
  });

  // Progress tracking based on status
  const getProgressPercentage = () => {
    switch(exchange.status) {
      case 'pending': return 25;
      case 'scheduled': return 50;
      case 'inProgress': return 75;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const getStatusBadgeColor = () => {
    switch(exchange.status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch(exchange.status) {
      case 'pending': return 'Pending';
      case 'scheduled': return 'Scheduled';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Exchange Details | CashConnect</title>
        <meta name="description" content="P2P cash exchange details" />
      </Head>

      {/* Header */}
    

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/dashboard">
          <span className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6 cursor-pointer">
            <i className="fas fa-arrow-left mr-2"></i> Back to Dashboard
          </span>
        </Link>

        {/* Exchange Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor()}`}
                >
                  {getStatusText()}
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                Exchange #{exchange.id}
              </h1>
              <p className="text-sm text-gray-500">
                Created on {exchange.createdAt}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <i className="fas fa-print mr-2"></i> Print
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                <i className="fas fa-edit mr-2"></i> Edit
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Partner Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Exchange Partner
            </h2>
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">AS</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  {exchange.partner.name}
                </h3>
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-yellow-400">
                    <i className="fas fa-star text-sm"></i>
                    <span className="ml-1 text-sm text-gray-600">
                      {exchange.partner.rating}
                    </span>
                  </div>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm text-gray-600">
                    {exchange.partner.completedExchanges} exchanges
                  </span>
                </div>
                <Link href={`/messages/`}>
                  <button className="mt-3 px-3 py-1 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">
                    <i className="fas fa-comment-alt mr-1"></i> Message
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Exchange Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Exchange Details
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Exchange Type</div>
                <div className="flex items-center mt-1">
                  <i
                    className={`fas ${
                      exchange.type === "cash"
                        ? "fa-money-bill-wave text-green-500"
                        : "fa-mobile-alt text-blue-500"
                    } mr-2`}
                  ></i>
                  <span className="font-medium">
                    {exchange.type === "cash"
                      ? "Cash Exchange"
                      : "Online Transfer"}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Amount</div>
                <div className="text-2xl font-bold text-gray-800 mt-1">
                  ₹{exchange.amount.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Date & Time</div>
                <div className="font-medium text-gray-800 mt-1">
                  {exchange.date} at {exchange.time}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Pending</span>
                  <span>Scheduled</span>
                  <span>In Progress</span>
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Meeting Location
            </h2>
            <div className="bg-gray-100 rounded-lg h-40 mb-4 flex items-center justify-center">
              <img
                src="/api/placeholder/400/160"
                alt="Map Location"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="text-gray-800 mb-3">{exchange.location.address}</p>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
                <i className="fas fa-directions mr-2"></i> Get Directions
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50">
                <i className="fas fa-map-marker-alt mr-2"></i> Share Location
              </button>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Safety Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  Meet in Public Places
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Always meet in well-lit, public areas with plenty of people
                  around.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                <i className="fas fa-eye"></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Check Currency</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Carefully verify all cash before completing the exchange.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                <i className="fas fa-user-friends"></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Bring a Friend</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Consider bringing someone with you for added security.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Stay Connected</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Let someone know where you&apos;re going and when you expect
                  to return.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button className="px-6 py-3 border border-red-600 text-red-600 font-medium rounded-md hover:bg-red-50">
            Cancel Exchange
          </button>

          <div className="space-x-3">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
              Reschedule
            </button>
            <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">
              Mark as Completed
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}