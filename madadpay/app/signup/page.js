"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Get user's geolocation and store it
 useEffect(() => {
   if ("geolocation" in navigator) {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         const { latitude, longitude } = position.coords;
         const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
         console.log("Fetched location:", mapsUrl); // Yeh line daal ke dekh, location aa rahi hai ya nahi
         setFormData((prev) => ({
           ...prev,
           location: mapsUrl, // URL save kar rahe ho
         }));
       },
       (error) => {
         console.error("Geolocation error:", error);
       },
       { enableHighAccuracy: true, timeout: 10000 }
     );
   }
 }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate phone number
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(formData.phone)) {
        throw new Error("Phone number must be exactly 10 digits.");
      }

      // Validate passwords match
      if (formData.password !== formData.passwordConfirm) {
        throw new Error("Passwords do not match.");
      }

      // ✅ Log the data before sending
      console.log("Submitting signup form with data:", formData);

      // Submit to API
      const response = await axios.post("/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      router.push("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Signup failed";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Create an Account
          </h1>
          <p className="text-gray-600 mt-2">Join us today</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: "name", type: "text", placeholder: "John Doe" },
            { id: "email", type: "email", placeholder: "your@email.com" },
            { id: "phone", type: "tel", placeholder: "9876543210" },
            { id: "password", type: "password", placeholder: "••••••••" },
            {
              id: "passwordConfirm",
              type: "password",
              placeholder: "••••••••",
            },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.id === "passwordConfirm"
                  ? "Confirm Password"
                  : field.id.charAt(0).toUpperCase() + field.id.slice(1)}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={formData[field.id]}
                onChange={handleChange}
                required
                minLength={field.id.includes("password") ? 8 : undefined}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading || !formData.location} // Jab tak location nahi hai, button disabled rahega
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-800">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
