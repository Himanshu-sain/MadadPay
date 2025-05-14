import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/User";

// 1. Generate JWT Token
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Valid for 1 day
  });
};

// 2. Create and Send Token in Response
export const createSendToken = (user, statusCode) => {
  const token = signToken(user._id);

  // Remove sensitive fields
  user.password = undefined;

  // Send response
  return new NextResponse(
    JSON.stringify({
      success: true,
      token,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          location: user.location,
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

//// middleware
export const protect = async (req) => {
  let token;
  const authHeader = req.headers.get("authorization");
  console.log("authHeader:", authHeader); 

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return {
      error: new NextResponse(
        JSON.stringify({
          success: false,
          message: "Not authorized, no token provided",
        }),
        { status: 401 }
      ),
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return {
        error: new NextResponse(
          JSON.stringify({ success: false, message: "User not found" }),
          { status: 401 }
        ),
      };
    }

    return { user }; // ✅ return user instead of setting req.user
  } catch (error) {
    return {
      error: new NextResponse(
        JSON.stringify({
          success: false,
          message: "Invalid or expired token",
        }),
        { status: 401 }
      ),
    };
  }
};
