import connectDB from "@/lib/db";
import User from "@/models/User";
import { createSendToken } from "@/lib/auth";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json(); // Get the full request body
    const { name, email, phone, password, passwordConfirm, location } = body;

    // Debugging location

    // 1) Check if passwords match
    if (password !== passwordConfirm) {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "Passwords do not match",
        }),
        { status: 400 }
      );
    }

    // 2) Check if user exists
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

    // 3) Validate if location coordinates exist and are correct
    if (!location || typeof location !== "string") {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "Location is required and must be a string",
        }),
        { status: 400 }
      );
    }

    console.log("Location received:", location); // To inspect the location

    // Trim the location and check for valid URL
    const trimmedLocation = location.trim();

    const isValidLocation =
      trimmedLocation.startsWith("https://www.google.com/maps?q=") ||
      trimmedLocation.startsWith("https://www.google.com/maps/@");

    if (!isValidLocation) {
      console.log("Validation failed with location:", trimmedLocation);
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "Invalid location URL format",
        }),
        { status: 400 }
      );
    }

    // 4) Create new user
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      location,
      isActive: true,
    });

    // 5) Generate token and send response
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
