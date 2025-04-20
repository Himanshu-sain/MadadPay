import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Generate JWT Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Create and send token
export const createSendToken = (user, statusCode) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  return new NextResponse(
    JSON.stringify({
      status: "success",
      token,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isActive: user.isActive,
        },
      },
    }),
    {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// Authentication Middleware
export const protect = async (req) => {
  try {
    // 1) Get token and check if it exists
    let token;
    const authHeader = req.headers.get("authorization");

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return new NextResponse(
        JSON.stringify({
          status: "fail",
          message: "You are not logged in! Please log in to get access.",
        }),
        { status: 401 }
      );
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return new NextResponse(
        JSON.stringify({
          status: "fail",
          message: "The user belonging to this token does no longer exist.",
        }),
        { status: 401 }
      );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return new NextResponse(
        JSON.stringify({
          status: "fail",
          message: "User recently changed password! Please log in again.",
        }),
        { status: 401 }
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    return null; // No error, continue to route handler
  } catch (err) {
    console.error("Authentication error:", err);
    return new NextResponse(
      JSON.stringify({
        status: "fail",
        message: "Invalid token or authentication failed",
      }),
      { status: 401 }
    );
  }
};
