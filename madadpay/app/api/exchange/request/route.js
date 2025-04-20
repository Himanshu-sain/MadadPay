import connectDB from "@/lib/db";
import { protect } from "@/middleware/auth";
import ExchangeRequest from "@/models/ExchangeRequest";

export async function POST(req) {
  await connectDB();

  try {
    await protect(req);

    const { receiverId, amount, mode, message } = await req.json();

    if (req.user._id.toString() === receiverId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Cannot send request to yourself",
        }),
        { status: 400 }
      );
    }

    const newRequest = new ExchangeRequest({
      sender: req.user._id,
      receiver: receiverId,
      amount,
      mode,
      message,
    });

    await newRequest.save();

    return new Response(JSON.stringify({ success: true, data: newRequest }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: error.statusCode || 500 }
    );
  }
}
