"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  HelpCircle,
  MessageSquare,
  FileText,
  AlertTriangle,
} from "lucide-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");

  const faqItems = [
    {
      question: "How do I start exchanging books?",
      answer:
        "To start exchanging books, navigate to the Exchange section, click on 'Create New Exchange', then follow the instructions to list your book and preferences.",
    },
    {
      question: "How does the rating system work?",
      answer:
        "Our rating system is based on a 5-star scale. After completing an exchange, both parties can rate each other based on communication, book condition, and overall experience.",
    },
    {
      question: "What if I don't receive a book or it's in poor condition?",
      answer:
        "If you encounter any issues with your exchange, please contact our support team through the Contact Support form on this page. We'll help resolve any disputes.",
    },
    {
      question: "Can I exchange digital books?",
      answer:
        "Currently, our platform is focused on physical book exchanges. We're working on implementing digital book exchanges in future updates.",
    },
    {
      question: "How do I cancel an exchange?",
      answer:
        "To cancel an exchange, go to the exchange details page and click the 'Cancel Exchange' button. Please note that cancellations may affect your user rating.",
    },
  ];

  const helpArticles = [
    {
      title: "Getting Started Guide",
      summary:
        "Learn the basics of using our platform and start your book exchange journey.",
    },
    {
      title: "How to Create a Perfect Book Listing",
      summary:
        "Tips and tricks for creating book listings that attract potential exchangers.",
    },
    {
      title: "Safe Meeting Practices",
      summary:
        "Essential guidelines for meeting safely when exchanging books in person.",
    },
    {
      title: "Understanding User Ratings",
      summary:
        "Learn how our rating system works and how to maintain a good reputation.",
    },
    {
      title: "Shipping Tips and Recommendations",
      summary:
        "Best practices for packaging and shipping books to ensure they arrive in good condition.",
    },
  ];

  const filteredFAQs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = helpArticles.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Help & Support Center</h1>

      <div className="relative mb-8">
        <div className="absolute left-3 top-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          className="w-full pl-10 pr-4 py-2 border rounded-md"
          placeholder="Search for help topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b">
          <button
            className={`flex items-center gap-2 py-2 px-4 ${
              activeTab === "faq"
                ? "border-b-2 border-blue-500 font-medium"
                : ""
            }`}
            onClick={() => setActiveTab("faq")}
          >
            <HelpCircle size={16} />
            <span>FAQ</span>
          </button>
          <button
            className={`flex items-center gap-2 py-2 px-4 ${
              activeTab === "articles"
                ? "border-b-2 border-blue-500 font-medium"
                : ""
            }`}
            onClick={() => setActiveTab("articles")}
          >
            <FileText size={16} />
            <span>Help Articles</span>
          </button>
          <button
            className={`flex items-center gap-2 py-2 px-4 ${
              activeTab === "contact"
                ? "border-b-2 border-blue-500 font-medium"
                : ""
            }`}
            onClick={() => setActiveTab("contact")}
          >
            <MessageSquare size={16} />
            <span>Contact Support</span>
          </button>
          <button
            className={`flex items-center gap-2 py-2 px-4 ${
              activeTab === "safety"
                ? "border-b-2 border-blue-500 font-medium"
                : ""
            }`}
            onClick={() => setActiveTab("safety")}
          >
            <AlertTriangle size={16} />
            <span>Safety Guidelines</span>
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      {activeTab === "faq" && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Find quick answers to common questions about our platform
            </p>
          </div>

          <div className="mt-6">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((item, index) => (
                  <details key={index} className="group border rounded-lg">
                    <summary className="flex justify-between items-center p-4 cursor-pointer font-medium">
                      {item.question}
                      <span className="text-gray-500 transition-transform">
                        +
                      </span>
                    </summary>
                    <div className="p-4 border-t">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <p>No results found. Try a different search term.</p>
            )}
          </div>
        </div>
      )}

      {/* Help Articles Section */}
      {activeTab === "articles" && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Help Articles</h2>
            <p className="text-gray-600">
              Detailed guides to help you make the most of our platform
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-500">{article.summary}</p>
                </div>
              ))
            ) : (
              <p className="col-span-2">
                No results found. Try a different search term.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Contact Support Form */}
      {activeTab === "contact" && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Contact Support</h2>
            <p className="text-gray-600">
              Need more help? Send us a message and we&apos;ll get back to you
            </p>
          </div>

          <form className="space-y-4 mt-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input
                id="name"
                className="w-full p-2 border rounded-md"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="Your email address"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="issue" className="block font-medium">
                Issue Type
              </label>
              <select id="issue" className="w-full p-2 border rounded-md">
                <option value="" disabled selected>
                  Select an issue type
                </option>
                <option value="account">Account Issues</option>
                <option value="exchange">Exchange Problems</option>
                <option value="technical">Technical Difficulties</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block font-medium">
                Message
              </label>
              <textarea
                id="message"
                className="w-full min-h-32 p-2 border rounded-md"
                placeholder="Describe your issue in detail"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Request
            </button>
          </form>
        </div>
      )}

      {/* Safety Guidelines */}
      {activeTab === "safety" && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Safety Guidelines</h2>
            <p className="text-gray-600">
              Important tips to ensure a safe exchange experience
            </p>
          </div>

          <div className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Meeting in Person</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Always meet in public, well-lit places like cafes or libraries
                </li>
                <li>Let a friend or family member know about your meeting</li>
                <li>
                  Consider bringing someone with you for the first exchange
                </li>
                <li>
                  Trust your instincts - if something feels off, cancel the
                  meeting
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Online Communication</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Keep communication within our platform when possible</li>
                <li>Be cautious about sharing personal information</li>
                <li>Report suspicious messages or behavior immediately</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Shipping Safety</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use tracking numbers for all shipped items</li>
                <li>
                  Don&apos;t include personal information beyond what&apos;s
                  needed for delivery
                </li>
                <li>
                  Consider using the platform&apos;s secure shipping options
                </li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                Remember
              </h3>
              <p>
                Your safety is our priority. Never hesitate to cancel an
                exchange if you feel uncomfortable, and always report any safety
                concerns to our support team.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
