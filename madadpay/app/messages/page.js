"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight } from "lucide-react";

// Mock conversation data - in a real app would come from your API
const CONVERSATIONS = [
  {
    id: 1,
    partner: { name: "Sarah Williams", profileImage: "/api/placeholder/48/48" },
    lastMessage: "Yes, I can meet you at the bank tomorrow at 2pm.",
    timestamp: "12:45 PM",
    unread: true,
    exchangeAmount: 1200,
    exchangeType: "pending",
  },
  {
    id: 2,
    partner: { name: "Mike Chen", profileImage: "/api/placeholder/48/48" },
    lastMessage: "Great! Looking forward to it.",
    timestamp: "Yesterday",
    unread: false,
    exchangeAmount: 2000,
    exchangeType: "confirmed",
  },
  {
    id: 3,
    partner: { name: "Emma Davis", profileImage: "/api/placeholder/48/48" },
    lastMessage: "Thanks for the smooth transaction!",
    timestamp: "Apr 20",
    unread: false,
    exchangeAmount: 1500,
    exchangeType: "completed",
  },
  {
    id: 4,
    partner: { name: "John Smith", profileImage: "/api/placeholder/48/48" },
    lastMessage: "I noticed the rates changed. Should we adjust our deal?",
    timestamp: "Apr 18",
    unread: true,
    exchangeAmount: 3000,
    exchangeType: "pending",
  },
];

export default function MessageList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, pending, confirmed, completed

  // Filter conversations based on search term and filter type
  const filteredConversations = CONVERSATIONS.filter((convo) => {
    const matchesSearch = convo.partner.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || convo.exchangeType === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold mb-4">Messages</h1>

          {/* Search and filter row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-md ${
                  filter === "all"
                    ? "bg-blue-500 text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-3 py-1 rounded-md ${
                  filter === "pending"
                    ? "bg-blue-500 text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("confirmed")}
                className={`px-3 py-1 rounded-md ${
                  filter === "confirmed"
                    ? "bg-blue-500 text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                Confirmed
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-3 py-1 rounded-md ${
                  filter === "completed"
                    ? "bg-blue-500 text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        {/* Conversation list */}
        <div className="divide-y">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <Link href={`/messages/${conversation.id}`} key={conversation.id}>
                <div
                  className={`p-4 hover:bg-gray-50 transition ${
                    conversation.unread ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="relative w-12 h-12 mr-3">
                        <Image
                          src={conversation.partner.profileImage}
                          alt={conversation.partner.name}
                          className="rounded-full"
                          fill
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium truncate">
                            {conversation.partner.name}
                          </h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {conversation.timestamp}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm text-gray-600 truncate pr-8">
                            {conversation.lastMessage}
                          </p>

                          {conversation.unread && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex items-center">
                      <div className="mr-3">
                        <div className="text-sm font-medium">
                          ${conversation.exchangeAmount.toLocaleString()}
                        </div>
                        <div className="text-xs">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full capitalize
                            ${
                              conversation.exchangeType === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : conversation.exchangeType === "confirmed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {conversation.exchangeType}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-10 text-center text-gray-500">
              <p>No conversations found</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-blue-500 mt-2 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
