'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Clock, CheckCircle, AlertCircle, MessageSquare, ChevronRight, Wallet, Users, Settings, Plus } from 'lucide-react';

// Mock data - in a real app would come from your API
const ACTIVE_EXCHANGES = [
  { id: 1, partner: { name: 'Sarah Williams', profileImage: '/api/placeholder/48/48' }, amount: 1200, status: 'pending', date: '2025-04-20' },
  { id: 2, partner: { name: 'Mike Chen', profileImage: '/api/placeholder/48/48' }, amount: 2000, status: 'confirmed', date: '2025-04-23' },
];

const RECENT_TRANSACTIONS = [
  { id: 1, partner: 'Emma Davis', amount: 1500, type: 'sent', status: 'completed', date: '2025-04-12' },
  { id: 2, partner: 'John Smith', amount: 2000, type: 'received', status: 'completed', date: '2025-03-28' },
  { id: 3, partner: 'Sarah Williams', amount: 1000, type: 'sent', status: 'completed', date: '2025-03-15' },
  { id: 4, partner: 'Alex Johnson', amount: 3000, type: 'received', status: 'completed', date: '2025-02-20' },
];

const NOTIFICATIONS = [
  { id: 1, text: 'Sarah Williams accepted your exchange request', time: '2 hours ago', read: false },
  { id: 2, text: 'Mike Chen sent you a message', time: '5 hours ago', read: false },
  { id: 3, text: 'New exchange opportunity near you', time: '1 day ago', read: true },
  { id: 4, text: 'Your account verification is complete', time: '3 days ago', read: true },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const unreadNotificationsCount = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b">
              <div className="relative w-10 h-10">
                <Image
                  src="/api/placeholder/64/64"
                  alt="User profile"
                  className="rounded-full"
                  fill
                />
              </div>
              <div>
                <h3 className="font-medium">Your Account</h3>
                <p className="text-sm text-gray-500">Balance: $5,000</p>
              </div>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center w-full p-3 rounded-md ${
                  activeTab === "dashboard"
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Wallet className="mr-3" size={18} />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab("exchanges")}
                className={`flex items-center w-full p-3 rounded-md ${
                  activeTab === "exchanges"
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Users className="mr-3" size={18} />
                <span>Exchanges</span>
              </button>

              <Link
                href="/messages"
                className="flex items-center w-full p-3 rounded-md hover:bg-gray-100"
              >
                <MessageSquare className="mr-3" size={18} />
                <span>Messages</span>
              </Link>

              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center w-full p-3 rounded-md ${
                  activeTab === "settings"
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Settings className="mr-3" size={18} />
                <span>Settings</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                >
                  <Bell size={20} />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {/* Notification dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
                    <div className="p-3 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {NOTIFICATIONS.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b last:border-b-0 hover:bg-gray-50 ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                        >
                          <p className="text-sm">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center border-t">
                      <button className="text-sm text-blue-500 hover:text-blue-700">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <Link
              href="/search"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 text-center"
            >
              <div className="flex flex-col items-center">
                <Users size={24} className="mb-2" />
                <span>Find Partners</span>
              </div>
            </Link>

            <Link
              href="/exchange/create"
              className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 text-center"
            >
              <div className="flex flex-col items-center">
                <Plus size={24} className="mb-2" />
                <span>New Exchange</span>
              </div>
            </Link>

            <Link
              href="/messages"
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-4 text-center"
            >
              <div className="flex flex-col items-center">
                <MessageSquare size={24} className="mb-2" />
                <span>Messages</span>
              </div>
            </Link>

            <button className="bg-gray-700 hover:bg-gray-800 text-white rounded-lg p-4 text-center">
              <div className="flex flex-col items-center">
                <Wallet size={24} className="mb-2" />
                <span>Add Funds</span>
              </div>
            </button>
          </div>

          {/* Active Exchanges */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Active Exchanges</h2>
              <Link
                href="/exchanges"
                className="text-blue-500 flex items-center text-sm hover:text-blue-700"
              >
                View all <ChevronRight size={16} />
              </Link>
            </div>

            {ACTIVE_EXCHANGES.length > 0 ? (
              <div className="space-y-4">
                {ACTIVE_EXCHANGES.map((exchange) => (
                  <div
                    key={exchange.id}
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 mr-3">
                          <Image
                            src={exchange.partner.profileImage}
                            alt={exchange.partner.name}
                            className="rounded-full"
                            fill
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {exchange.partner.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(exchange.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">
                          ${exchange.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center justify-end mt-1">
                          {exchange.status === "pending" ? (
                            <div className="flex items-center text-orange-500 text-sm">
                              <Clock size={14} className="mr-1" />
                              Pending
                            </div>
                          ) : (
                            <div className="flex items-center text-green-500 text-sm">
                              <CheckCircle size={14} className="mr-1" />
                              Confirmed
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-3">
                      <Link
                        href={`/messages/${exchange.id}`}
                        className="text-blue-500 text-sm mr-3"
                      >
                        Message
                      </Link>
                      <Link
                        href={`/exchanges/${exchange.id}`}
                        className="text-blue-500 text-sm"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">
                No active exchanges at the moment
              </p>
            )}
          </div>

          {/* Transaction History */}

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Transaction History</h2>
            <Link
              href="/transactions"
              className="text-blue-500 flex items-center text-sm hover:text-blue-700"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Partner</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_TRANSACTIONS.map((transaction) => (
                  <tr key={transaction.id} className="border-b last:border-b-0">
                    <td className="py-3">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3">{transaction.partner}</td>
                    <td className="py-3">
                      ${transaction.amount.toLocaleString()}
                    </td>
                    <td className="py-3 capitalize">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          transaction.type === "sent"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
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
        </div>
      </div>
    </div>
  );
}