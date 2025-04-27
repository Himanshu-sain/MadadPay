// pages/exchange/create/page.js
"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function CreateExchange() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "cash",
    amount: "",
    currency: "INR",
    location: "",
    date: "",
    time: "",
    meetPublicPlace: true,
    verifyIdentity: true,
    maxDistance: 5,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("Form submitted:", formData);
    // For demo purposes, we'll just redirect to a success page
    // In a real app, you would redirect to the new exchange page
    window.location.href = "/exchange/EX12345678";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Create New Exchange | CashConnect</title>
        <meta name="description" content="Create a new P2P cash exchange" />
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
        <Link href="/dashboard">
          <span className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6 cursor-pointer">
            <i className="fas fa-arrow-left mr-2"></i> Back to Dashboard
          </span>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Create New Exchange
          </h1>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span
                className={`text-sm font-medium ${
                  step >= 1 ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                Exchange Details
              </span>
              <span
                className={`text-sm font-medium ${
                  step >= 2 ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                Location & Time
              </span>
              <span
                className={`text-sm font-medium ${
                  step >= 3 ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                Preferences
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Exchange Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exchange Type
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cash"
                        name="type"
                        value="cash"
                        checked={formData.type === "cash"}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="cash"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="online"
                        name="type"
                        value="online"
                        checked={formData.type === "online"}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="online"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Online Transfer
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Amount
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-r-md"
                      >
                        <option>INR</option>
                        <option>USD</option>
                        <option>EUR</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Location & Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Meeting Location
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter address or landmark"
                      required
                    />
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg h-40 mb-4 flex items-center justify-center">
                  <img
                    src="/api/placeholder/600/160"
                    alt="Map"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <i className="fas fa-arrow-left mr-1"></i> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Safety Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="meetPublicPlace"
                          name="meetPublicPlace"
                          type="checkbox"
                          checked={formData.meetPublicPlace}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="meetPublicPlace"
                          className="font-medium text-gray-700"
                        >
                          Meet in a public place
                        </label>
                        <p className="text-gray-500">
                          Ensure your safety by meeting in well-lit, public
                          areas with plenty of people around.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="verifyIdentity"
                          name="verifyIdentity"
                          type="checkbox"
                          checked={formData.verifyIdentity}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="verifyIdentity"
                          className="font-medium text-gray-700"
                        >
                          Verify partner&apos;s identity
                        </label>
                        <p className="text-gray-500">
                          Ask for verification before proceeding with the
                          exchange.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="maxDistance"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Maximum Distance (km)
                  </label>
                  <input
                    type="range"
                    name="maxDistance"
                    id="maxDistance"
                    min="1"
                    max="20"
                    value={formData.maxDistance}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 km</span>
                    <span>{formData.maxDistance} km</span>
                    <span>20 km</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <i className="fas fa-arrow-left mr-1"></i> Back
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Create Exchange <i className="fas fa-check ml-1"></i>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h3 className="text-blue-800 font-medium mb-2">Exchange Tips</h3>
          <ul className="text-blue-700 text-sm space-y-2">
            <li className="flex items-start">
              <i className="fas fa-info-circle mt-1 mr-2"></i>
              <span>
                Set a reasonable amount that aligns with local ATM withdrawal
                limits.
              </span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-info-circle mt-1 mr-2"></i>
              <span>
                Choose popular public locations like cafes or shopping malls for
                your meeting.
              </span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-info-circle mt-1 mr-2"></i>
              <span>
                Schedule exchanges during daylight hours when possible.
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
