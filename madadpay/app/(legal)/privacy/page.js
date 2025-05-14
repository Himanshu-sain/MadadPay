// app/legal/privacy/page.js
"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <div className="prose prose-blue max-w-none">
          <p className="text-lg mb-4">Last Updated: May 2, 2025</p>

          <p className="mb-6">
            We respect your privacy and are committed to protecting it through
            our compliance with this policy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            1. Information We Collect
          </h2>
          <h3 className="text-xl font-medium mt-6 mb-3">
            Personal Information
          </h3>
          <p>
            We may collect several types of information from and about users of
            our website, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Contact information such as name, email address, and phone number
            </li>
            <li className="mb-2">
              Account credentials such as username and password
            </li>
            <li className="mb-2">
              Profile information such as profile picture, bio, and preferences
            </li>
            <li className="mb-2">
              Transaction information when you engage in exchanges on our
              platform
            </li>
            <li className="mb-2">
              Communications and interactions with other users
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">Usage Data</h3>
          <p>
            We also collect information about how you access and use our
            website, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Device and browser information</li>
            <li className="mb-2">IP address and location data</li>
            <li className="mb-2">Pages you view and links you click</li>
            <li className="mb-2">
              Time spent on pages and navigation patterns
            </li>
            <li className="mb-2">Referral sources and search terms</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Provide, maintain, and improve our services
            </li>
            <li className="mb-2">
              Process transactions and send related information
            </li>
            <li className="mb-2">Create and maintain your account</li>
            <li className="mb-2">
              Send notifications and updates about our services
            </li>
            <li className="mb-2">
              Respond to your comments, questions, and requests
            </li>
            <li className="mb-2">
              Monitor and analyze trends, usage, and activities
            </li>
            <li className="mb-2">
              Protect against, identify, and prevent fraud and other illegal
              activity
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. Information Sharing
          </h2>
          <p>We may share your personal information with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Service providers who perform services on our behalf
            </li>
            <li className="mb-2">
              Other users as necessary to facilitate exchanges and interactions
            </li>
            <li className="mb-2">
              Legal authorities when required by law or to protect our rights
            </li>
            <li className="mb-2">
              Business partners in connection with mergers, acquisitions, or
              divestitures
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction. These measures include encryption, access controls, and
            regular security assessments.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Choices</h2>
          <p>
            You can access, update, or delete your personal information through
            your account settings. You can also opt out of receiving promotional
            emails by following the instructions in those emails.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Children&apos;s Privacy
          </h2>
          <p>
            Our services are not intended for children under 13, and we do not
            knowingly collect personal information from children under 13. If we
            learn we have collected personal information from a child under 13,
            we will delete that information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Changes to Our Privacy Policy
          </h2>
          <p>
            We may update our privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page
            and updating the &quot;Last Updated&quot; date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            8. Contact Information
          </h2>
          <p>
            If you have any questions about this privacy policy, please contact
            us at{" "}
            <a
              href="mailto:privacy@example.com"
              className="text-blue-600 hover:text-blue-800"
            >
              privacy@example.com
            </a>
            .
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            <Link
              href="/terms"
              className="text-blue-600 hover:text-blue-800"
            >
              Terms of Service
            </Link>{" "}
            |
            <Link
              href="/agreement"
              className="text-blue-600 hover:text-blue-800 ml-2"
            >
              User Agreement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
