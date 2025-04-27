// pages/exchange/[exchangeId]/complete/page.js (continued)
"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CompleteExchange() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [checklist, setChecklist] = useState({
    fundsReceived: false,
    identityVerified: false,
    safetyMaintained: false,
  });

  // Mock exchange data - in a real app, you would fetch this from an API
  const exchange = {
    id: "EX12345678",
    amount: 5000,
    currency: "INR",
    partner: {
      name: "Amit Sharma",
      profilePic: "/user-profile.jpg",
      rating: 4.8,
    },
  };

  const handleVerification = (e) => {
    e.preventDefault();
    // In a real app, you would verify the code with your backend
    if (verificationCode === "123456" || verificationCode.length === 6) {
      setIsVerified(true);
    } else {
      alert("Invalid verification code. Please try again.");
    }
  };

  const handleChecklistChange = (e) => {
    setChecklist({
      ...checklist,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Review submitted:", {
      rating,
      review,
      exchangeId: exchange.id,
    });

    // Redirect to dashboard or confirmation page
    window.location.href = "/dashboard";
  };

  const allChecked = Object.values(checklist).every((item) => item === true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Complete Exchange | CashConnect</title>
        <meta name="description" content="Complete your P2P cash exchange" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="flex items-center cursor-pointer">
                <span className="text-indigo-600 font-bold text-xl">
                  CashConnect
                </span>
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <span className="text-gray-600 hover:text-indigo-600 cursor-pointer">
                  <i className="fas fa-tachometer-alt mr-1"></i> Dashboard
                </span>
              </Link>
              <Link href="/messages">
                <span className="text-gray-600 hover:text-indigo-600 cursor-pointer">
                  <i className="fas fa-envelope mr-1"></i> Messages
                </span>
              </Link>
              <div className="relative">
                <button className="flex items-center text-gray-600 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium">RK</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href={`/exchange/${exchange.id}`}>
          <span className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6 cursor-pointer">
            <i className="fas fa-arrow-left mr-2"></i> Back to Exchange Details
          </span>
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4">
              <h1 className="text-xl font-bold text-white">
                Complete Your Exchange
              </h1>
              <p className="text-indigo-100">Exchange #{exchange.id}</p>
            </div>

            <div className="p-6">
              {/* Partner Info */}
              <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600">AS</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    Exchange with {exchange.partner.name}
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
                      {exchange.currency} {exchange.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {isVerified ? (
                <>
                  {/* Transaction Completion Checklist */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">
                      Transaction Checklist
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="fundsReceived"
                            name="fundsReceived"
                            type="checkbox"
                            checked={checklist.fundsReceived}
                            onChange={handleChecklistChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="fundsReceived"
                            className="font-medium text-gray-700"
                          >
                            I have{" "}
                            {exchange.amount > 0 ? "received" : "provided"} the
                            correct amount
                          </label>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="identityVerified"
                            name="identityVerified"
                            type="checkbox"
                            checked={checklist.identityVerified}
                            onChange={handleChecklistChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="identityVerified"
                            className="font-medium text-gray-700"
                          >
                            I have verified the identity of my exchange partner
                          </label>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="safetyMaintained"
                            name="safetyMaintained"
                            type="checkbox"
                            checked={checklist.safetyMaintained}
                            onChange={handleChecklistChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="safetyMaintained"
                            className="font-medium text-gray-700"
                          >
                            The exchange was conducted safely and professionally
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rating and Review */}
                  <form onSubmit={handleSubmitReview}>
                    <h2 className="text-lg font-medium text-gray-800 mb-4">
                      Rate Your Experience
                    </h2>

                    <div className="mb-4">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="text-2xl focus:outline-none"
                          >
                            <i
                              className={`${
                                star <= rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              } fas fa-star`}
                            ></i>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="review"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Write a review (optional)
                      </label>
                      <textarea
                        id="review"
                        name="review"
                        rows={3}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Share your experience..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!allChecked}
                        className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                          allChecked
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-400 cursor-not-allowed"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                      >
                        Complete Exchange <i className="fas fa-check ml-1"></i>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  {/* Verification Code Entry */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                      <i className="fas fa-shield-alt text-2xl"></i>
                    </div>
                    <h2 className="text-xl font-medium text-gray-800 mb-2">
                      Verify Your Exchange
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Enter the 6-digit verification code shared by your
                      exchange partner
                    </p>

                    <form
                      onSubmit={handleVerification}
                      className="max-w-xs mx-auto"
                    >
                      <div className="mb-4">
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          maxLength={6}
                          placeholder="Enter code"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-center py-3 text-xl tracking-widest"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Verify Code
                      </button>
                    </form>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    <p>
                      Don&apos;t have a code? Ask your exchange partner to share
                      it with you.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <h3 className="text-yellow-800 font-medium mb-2">
              Important Reminders
            </h3>
            <ul className="text-yellow-700 text-sm space-y-2">
              <li className="flex items-start">
                <i className="fas fa-exclamation-triangle mt-1 mr-2"></i>
                <span>
                  Never share your verification code with anyone except your
                  exchange partner.
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-exclamation-triangle mt-1 mr-2"></i>
                <span>
                  Count and verify all cash before confirming the exchange.
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-exclamation-triangle mt-1 mr-2"></i>
                <span>
                  If anything seems suspicious, cancel the exchange and report
                  the issue.
                </span>
              </li>
            </ul>
          </div>

          {/* Report Issue */}
          <div className="text-center mt-6">
            <button className="text-red-600 hover:text-red-800 text-sm font-medium focus:outline-none">
              <i className="fas fa-flag mr-1"></i> Report an issue with this
              exchange
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-gray-500 text-sm">
                © 2025 CashConnect. All rights reserved.
              </span>
            </div>
            <div className="flex space-x-4">
              <Link href="/help">
                <span className="text-gray-500 hover:text-indigo-600 text-sm cursor-pointer">
                  Help Center
                </span>
              </Link>
              <Link href="/safety">
                <span className="text-gray-500 hover:text-indigo-600 text-sm cursor-pointer">
                  Safety Tips
                </span>
              </Link>
              <Link href="/legal/terms">
                <span className="text-gray-500 hover:text-indigo-600 text-sm cursor-pointer">
                  Terms of Service
                </span>
              </Link>
              <Link href="/legal/privacy">
                <span className="text-gray-500 hover:text-indigo-600 text-sm cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
