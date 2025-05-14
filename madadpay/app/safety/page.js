"use client";

import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Shield,
  Users,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function SafetyPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Shield className="h-8 w-8 mr-3 text-blue-600" />
          <h1 className="text-3xl font-bold">Safety Tips</h1>
        </div>

        <p className="text-lg mb-8">
          At BookSwap, your safety is our priority. Please review these
          guidelines to ensure a secure and enjoyable experience when exchanging
          books with other members of our community.
        </p>

        {/* Safety Checklist */}
        <div className="bg-white shadow-sm border rounded-lg mb-8">
          <div className="p-6 bg-green-50 border-b rounded-t-lg">
            <h2 className="text-xl font-bold flex items-center text-green-700">
              <CheckCircle className="h-5 w-5 mr-2" />
              Safety Checklist
            </h2>
            <p className="text-gray-600">Essential steps for every exchange</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Verify User Profiles</h3>
                  <p className="text-gray-600">
                    Check ratings, reviews, and account age before agreeing to
                    an exchange.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Use Platform Messaging</h3>
                  <p className="text-gray-600">
                    Keep all communication within our platform to maintain a
                    record of interactions.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Meet in Public Places</h3>
                  <p className="text-gray-600">
                    Always arrange meetings in busy, well-lit public locations
                    like cafes or libraries.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                  4
                </div>
                <div>
                  <h3 className="font-medium">Inform Someone</h3>
                  <p className="text-gray-600">
                    Let a friend or family member know about your meeting plans,
                    including time and location.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                  5
                </div>
                <div>
                  <h3 className="font-medium">Use Secure Payment Methods</h3>
                  <p className="text-gray-600">
                    If your exchange involves payments, use our secure payment
                    system instead of cash.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Signs */}
        <div className="bg-white shadow-sm border rounded-lg mb-8">
          <div className="p-6 bg-red-50 border-b rounded-t-lg">
            <h2 className="text-xl font-bold flex items-center text-red-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Warning Signs
            </h2>
            <p className="text-gray-600">
              Be cautious if you notice these red flags
            </p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Refusing to Meet in Public
                </h3>
                <p className="text-gray-600">
                  If someone insists on meeting in an isolated or private
                  location, this is a major warning sign.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Requesting Payment Outside Platform
                </h3>
                <p className="text-gray-600">
                  Never agree to payment methods that bypass our secure system,
                  such as wire transfers or gift cards.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Pressuring for Personal Information
                </h3>
                <p className="text-gray-600">
                  Be wary of users who request unnecessary personal details like
                  your home address or financial information.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Deals Too Good to Be True
                </h3>
                <p className="text-gray-600">
                  If an offer seems unrealistic, such as rare books for very low
                  prices, proceed with caution.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Creating a Sense of Urgency
                </h3>
                <p className="text-gray-600">
                  Be suspicious if someone pressures you to complete an exchange
                  quickly &quot;before it&apos;s too late.&quot;
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Inconsistent Communication
                </h3>
                <p className="text-gray-600">
                  Watch out for users whose stories or details change throughout
                  your conversation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Practices */}
        <div className="bg-white shadow-sm border rounded-lg mb-8">
          <div className="p-6 bg-blue-50 border-b rounded-t-lg">
            <h2 className="text-xl font-bold flex items-center text-blue-700">
              <Users className="h-5 w-5 mr-2" />
              Recommended Practices
            </h2>
            <p className="text-gray-600">
              Best practices for a safe exchange experience
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-medium mb-2">For In-Person Exchanges</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Meet during daylight hours when possible</li>
                <li>Bring your phone with a full battery</li>
                <li>Consider bringing a friend to your first few exchanges</li>
                <li>Inspect books thoroughly before completing the exchange</li>
                <li>
                  Trust your instincts — if something feels wrong, leave the
                  situation
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">For Shipping Exchanges</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Always use tracking numbers and share them through our
                  platform
                </li>
                <li>
                  Package books carefully to prevent damage during transit
                </li>
                <li>
                  Take photos of books before shipping as proof of condition
                </li>
                <li>
                  Use our escrow service for valuable books to protect both
                  parties
                </li>
                <li>
                  Never send books before receiving payment through our platform
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">For Online Communication</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Be respectful and professional in all communications</li>
                <li>Keep conversations focused on the book exchange</li>
                <li>
                  Clearly communicate expectations about book condition and
                  meeting arrangements
                </li>
                <li>
                  Report any harassment or inappropriate messages immediately
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reporting Policy */}
        <div className="bg-white shadow-sm border rounded-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Reporting Policy</h2>
            <p className="text-gray-600">
              How to report safety concerns or violations
            </p>
          </div>
          <div className="p-6 space-y-4">
            <p>
              If you encounter any behavior that violates our community
              guidelines or makes you feel unsafe, please report it immediately
              through one of these channels:
            </p>

            <div className="bg-gray-50 p-4 rounded-md space-y-3">
              <div>
                <h3 className="font-medium">In-App Reporting</h3>
                <p className="text-sm text-gray-600">
                  Use the &quot;Report&quot; button on any user profile or message to flag
                  concerning behavior.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Emergency Support</h3>
                <p className="text-sm text-gray-600">
                  For urgent concerns, contact our safety team at{" "}
                  <span className="font-medium">safety@bookswap.com</span> or
                  call <span className="font-medium">1-800-BOOK-SAFE</span>.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Feedback Form</h3>
                <p className="text-sm text-gray-600">
                  For general safety suggestions, use our{" "}
                  <Link
                    href="/help"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    feedback form <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <h3 className="font-medium mb-2">Our Commitment</h3>
              <p>
                We&apos;re committed to investigating all reports within 24 hours and
                taking appropriate action. Depending on the severity of the
                violation, this may include issuing warnings, temporary
                suspension, or permanent banning of users from our platform.
              </p>
            </div>

            <div className="text-center mt-6">
              <p className="font-medium text-lg">
                Remember: Your safety is more important than any book exchange.
              </p>
              <p className="text-sm text-gray-600">
                Don&apos;t hesitate to cancel an exchange if you feel uncomfortable
                at any point.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
