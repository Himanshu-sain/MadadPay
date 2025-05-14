// app/legal/agreement/page.js
"use client";

import React from "react";
import Link from "next/link";

export default function UserAgreement() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          User Agreement
        </h1>

        <div className="prose prose-blue max-w-none">
          <p className="text-lg mb-4">Last Updated: May 2, 2025</p>

          <p className="mb-6">
            This User Agreement (&quot;Agreement&quot;) is a contract between you and our
            platform that governs your use of our services. By registering for
            an account and using our services, you acknowledge that you have
            read, understood, and agree to be bound by the terms of this
            Agreement.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            1. Account Registration and Requirements
          </h2>
          <p>To use our services, you must:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Be at least 18 years old</li>
            <li className="mb-2">Complete the registration process</li>
            <li className="mb-2">Provide accurate and complete information</li>
            <li className="mb-2">
              Maintain the security of your account credentials
            </li>
            <li className="mb-2">
              Notify us immediately of any unauthorized use of your account
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. Exchange Rules
          </h2>
          <p>When participating in exchanges on our platform, you agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Provide accurate descriptions of items or services being exchanged
            </li>
            <li className="mb-2">Honor commitments made to other users</li>
            <li className="mb-2">
              Meet exchange deadlines and communication requirements
            </li>
            <li className="mb-2">
              Complete exchanges as agreed upon with other users
            </li>
            <li className="mb-2">
              Follow our community guidelines for safe and respectful exchanges
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. Prohibited Activities
          </h2>
          <p>You may not use our services to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Violate any applicable laws or regulations</li>
            <li className="mb-2">
              Infringe on the intellectual property rights of others
            </li>
            <li className="mb-2">Harass, abuse, or harm another person</li>
            <li className="mb-2">
              Engage in fraudulent, deceptive, or misleading activities
            </li>
            <li className="mb-2">Exchange illegal or prohibited items</li>
            <li className="mb-2">
              Manipulate the platform&apos;s features or functionality
            </li>
            <li className="mb-2">
              Use automated methods to access or use the services
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Content</h2>
          <p>
            You retain ownership of the content you post on our platform, but
            you grant us a non-exclusive, worldwide, royalty-free license to
            use, display, and distribute your content in connection with our
            services. You are solely responsible for the content you submit and
            must ensure it doesn&apos;t violate any third-party rights.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Reviews and Feedback
          </h2>
          <p>
            After completing an exchange, you may have the opportunity to leave
            reviews and feedback for other users. All reviews must be honest,
            relevant, and based on actual experiences. We reserve the right to
            remove reviews that violate our guidelines.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Dispute Resolution
          </h2>
          <p>
            If a dispute arises between users, we encourage you to first attempt
            to resolve it directly with the other party. If that is
            unsuccessful, you may report the issue to our support team, who will
            review the situation according to our dispute resolution policy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account and access
            to our services at any time for violations of this Agreement or for
            any other reason at our discretion. You may also terminate your
            account at any time by following the account deletion process.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            8. Modifications to the Agreement
          </h2>
          <p>
            We may modify this Agreement at any time by posting the updated
            version on our website. Your continued use of our services after any
            changes constitutes your acceptance of the modified Agreement.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            9. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, we shall not be liable for
            any indirect, incidental, special, consequential, or punitive
            damages, or any loss of profits or revenue, whether incurred
            directly or indirectly, or any loss of data, use, goodwill, or other
            intangible losses resulting from your use of our services.
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p>
              By using our services, you acknowledge that you have read,
              understood, and agree to be bound by this User Agreement.
            </p>
            <p className="mt-4">
              If you have any questions about this Agreement, please contact us
              at{" "}
              <a
                href="mailto:support@example.com"
                className="text-blue-600 hover:text-blue-800"
              >
                support@example.com
              </a>
              .
            </p>
          </div>
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
              href="/privacy"
              className="text-blue-600 hover:text-blue-800 ml-2"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
