// app/legal/terms/page.js
"use client";

import React from "react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>

        <div className="prose prose-blue max-w-none">
          <p className="text-lg mb-4">Last Updated: May 2, 2025</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using our services, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. If you do
            not agree with any of these terms, you are prohibited from using or
            accessing this site.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the
            materials on our website for personal, non-commercial transitory
            viewing only. This is the grant of a license, not a transfer of
            title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Modify or copy the materials</li>
            <li className="mb-2">
              Use the materials for any commercial purpose
            </li>
            <li className="mb-2">
              Attempt to decompile or reverse engineer any software contained on
              our website
            </li>
            <li className="mb-2">
              Remove any copyright or other proprietary notations from the
              materials
            </li>
            <li className="mb-2">
              Transfer the materials to another person or &quot;mirror&quot; the materials
              on any other server
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
          <p>
            The materials on our website are provided on an &apos;as is&apos; basis. We
            make no warranties, expressed or implied, and hereby disclaim and
            negate all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
          <p>
            In no event shall our company or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the materials on our website, even if we or an
            authorized representative has been notified orally or in writing of
            the possibility of such damage.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Revisions and Errata
          </h2>
          <p>
            The materials appearing on our website could include technical,
            typographical, or photographic errors. We do not warrant that any of
            the materials on our website are accurate, complete, or current. We
            may make changes to the materials contained on our website at any
            time without notice.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Links</h2>
          <p>
            We have not reviewed all of the sites linked to our website and are
            not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by us of the site.
            Use of any such linked website is at the user&apos;s own risk.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Modifications to Terms of Service
          </h2>
          <p>
            We may revise these terms of service for our website at any time
            without notice. By using this website, you are agreeing to be bound
            by the then current version of these terms of service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws and you irrevocably submit to the exclusive
            jurisdiction of the courts in that location.
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p>
              If you have any questions about these Terms of Service, please
              contact us at{" "}
              <a
                href="mailto:legal@example.com"
                className="text-blue-600 hover:text-blue-800"
              >
                legal@example.com
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            <Link
              href="/privacy"
              className="text-blue-600 hover:text-blue-800"
            >
              Privacy Policy
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
