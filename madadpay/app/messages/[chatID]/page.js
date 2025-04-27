"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Send,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  ChevronLeft,
  Paperclip,
  Info,
} from "lucide-react";

// Mock data - in a real app would come from your API
const getConversationData = (chatId) => ({
  id: chatId,
  partner: {
    id: 101,
    name: "Sarah Williams",
    profileImage: "/api/placeholder/48/48",
  },
  exchange: {
    id: 1,
    amount: 1200,
    status: "pending", // pending, confirmed, completed
    meetingLocation: "123 Main St, New York, NY",
    date: "2025-04-28T14:00:00",
  },
  messages: [
    {
      id: 1,
      sender: "partner",
      content: "Hi there! I saw your exchange offer and I'm interested.",
      timestamp: "2025-04-25T09:30:00",
    },
    {
      id: 2,
      sender: "user",
      content:
        "Hello! Great to hear from you. I can meet tomorrow at 2pm if that works for you?",
      timestamp: "2025-04-25T09:35:00",
    },
    {
      id: 3,
      sender: "partner",
      content: "That sounds perfect. Do you have a preferred meeting spot?",
      timestamp: "2025-04-25T09:40:00",
    },
    {
      id: 4,
      sender: "user",
      content: "How about the Bank of America branch at 123 Main St?",
      timestamp: "2025-04-25T09:45:00",
    },
    {
      id: 5,
      sender: "partner",
      content: "Yes, I can meet you at the bank tomorrow at 2pm.",
      timestamp: "2025-04-25T12:45:00",
    },
  ],
});

export default function ChatView({ params }) {
  const conversationData = getConversationData(params.chatId);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(conversationData.messages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  // Format date for header
  const meetingDate = new Date(conversationData.exchange.date);
  const formattedDate = meetingDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Chat header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto p-4 max-w-4xl">
          <div className="flex items-center">
            <Link href="/messages" className="mr-4">
              <ChevronLeft size={24} />
            </Link>

            <div className="flex items-center flex-1">
              <div className="relative w-10 h-10 mr-3">
                <Image
                  src={conversationData.partner.profileImage}
                  alt={conversationData.partner.name}
                  className="rounded-full"
                  fill
                />
              </div>

              <div>
                <Link
                  href={`/profile/${conversationData.partner.id}`}
                  className="font-medium hover:underline"
                >
                  {conversationData.partner.name}
                </Link>
              </div>
            </div>

            <Link
              href={`/exchanges/${conversationData.exchange.id}`}
              className="text-blue-500 text-sm"
            >
              View Exchange
            </Link>
          </div>
        </div>
      </div>

      {/* Exchange details card */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3 max-w-4xl">
          <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
                <DollarSign size={20} />
              </div>
              <div>
                <h3 className="font-medium">
                  Exchange: ${conversationData.exchange.amount.toLocaleString()}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock size={14} className="mr-1" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              {conversationData.exchange.status === "pending" ? (
                <span className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm">
                  <Clock size={14} className="mr-1" />
                  Pending
                </span>
              ) : conversationData.exchange.status === "confirmed" ? (
                <span className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                  <CheckCircle size={14} className="mr-1" />
                  Confirmed
                </span>
              ) : (
                <span className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                  <CheckCircle size={14} className="mr-1" />
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "partner" && (
                  <div className="relative w-8 h-8 mr-2 flex-shrink-0 self-end">
                    <Image
                      src={conversationData.partner.profileImage}
                      alt={conversationData.partner.name}
                      className="rounded-full"
                      fill
                    />
                  </div>
                )}

                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white border rounded-bl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Meeting location info */}
      {conversationData.exchange.meetingLocation && (
        <div className="bg-blue-50 border-t border-blue-100">
          <div className="container mx-auto px-4 py-3 max-w-4xl flex items-center">
            <MapPin size={16} className="text-blue-500 mr-2" />
            <span className="text-sm">
              Meeting at: {conversationData.exchange.meetingLocation}
            </span>
            <button className="ml-auto text-blue-500 text-sm">
              Share Location
            </button>
          </div>
        </div>
      )}

      {/* Message input */}
      <div className="bg-white border-t shadow-md">
        <div className="container mx-auto p-4 max-w-4xl">
          <form onSubmit={sendMessage} className="flex items-center">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Paperclip size={20} />
            </button>

            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-md py-2 px-3 mx-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
              disabled={!newMessage.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Action buttons for pending exchanges */}
      {conversationData.exchange.status === "pending" && (
        <div className="bg-gray-50 border-t">
          <div className="container mx-auto p-4 max-w-4xl flex justify-center gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex-1 max-w-xs">
              Confirm Exchange
            </button>
            <button className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md flex-1 max-w-xs">
              Propose Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
