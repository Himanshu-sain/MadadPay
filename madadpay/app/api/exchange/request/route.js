import connectDB from "@/lib/db";
import { protect } from "@/middleware/auth";
import ExchangeRequest from "@/models/ExchangeRequest";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  try {
    // Middleware to check authorization
    const authResponse = await protect(req);
    if (authResponse) return authResponse; // If the middleware returns a response, return it

    const { receiverId, amount, mode, message } = await req.json();

    // Check if the receiverId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Invalid receiver ID",
        }),
        { status: 400 }
      );
    }

    // Check if user is trying to send a request to themselves
    if (req.user._id.toString() === receiverId) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Cannot send request to yourself",
        }),
        { status: 400 }
      );
    }

    // Create the new exchange request
    const newRequest = new ExchangeRequest({
      sender: req.user._id,
      receiver: receiverId,
      amount,
      mode,
      message,
    });

    await newRequest.save();
    console.log(newRequest)

    // Return success response
    return new NextResponse(
      JSON.stringify({ success: true, data: newRequest }),
      { status: 201 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Caught error in POST /api/exchange:", error);

    // Return error response with status code 500 or specific error code
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: error.message || "Internal server error",
      }),
      { status: 500 }
    );
  }
}
