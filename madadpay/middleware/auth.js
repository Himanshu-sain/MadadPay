import jwt from "jsonwebtoken";
import User from "@/models/User";
import { NextResponse } from "next/server";

// Middleware to protect routes
export const protect = async (req) => {
  let token;

  // Check if authorization header exists and contains Bearer token
  if (req.headers.get("authorization")?.startsWith("Bearer")) {
    token = req.headers.get("authorization").split(" ")[1];
  }

  // If no token is found, respond with 401 Unauthorized
  if (!token) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Not authorized",
      }),
      { status: 401 }
    );
  }

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 401 }
      );
    }

    // Pass the user information forward in the request object
    req.user = user;
    return null; // Continue the request pipeline
  } catch (error) {
    // Handle errors during token verification
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Invalid or expired token",
      }),
      { status: 401 }
    );
  }
};
