import connectDB from "@/lib/db";
import User from "@/models/User";
import { createSendToken } from "@/lib/auth";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { name, email, phone, password, passwordConfirm, location } = body;

    if (password !== passwordConfirm) {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "Passwords do not match",
        }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "User already exists with this email or phone",
        }),
        { status: 400 }
      );
    }

    if (!location || typeof location !== "string") {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "Location is required and must be a string",
        }),
        { status: 400 }
      );
    }

    const trimmedLocation = location.trim();

    const isValidLocation =
      trimmedLocation.startsWith("https://www.google.com/maps?q=") ||
      trimmedLocation.startsWith("https://www.google.com/maps/@");

    if (!isValidLocation) {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "Invalid Google Maps location URL format",
        }),
        { status: 400 }
      );
    }

    // Extract coordinates from URL
    let lat, lng;

    if (trimmedLocation.includes("maps?q=")) {
      const match = trimmedLocation.match(/maps\?q=([-.\d]+),([-.\d]+)/);
      if (match) {
        lat = parseFloat(match[1]);
        lng = parseFloat(match[2]);
      }
    } else if (trimmedLocation.includes("maps/@")) {
      const match = trimmedLocation.match(/maps\/@([-.\d]+),([-.\d]+)/);
      if (match) {
        lat = parseFloat(match[1]);
        lng = parseFloat(match[2]);
      }
    }

    if (!lat || !lng) {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "Could not extract coordinates from URL",
        }),
        { status: 400 }
      );
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      location,
      isActive: true,
      lastKnownLocation: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });

    return createSendToken(newUser, 201);
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: error.message || "Something went wrong during signup",
      }),
      { status: 500 }
    );
  }
}
