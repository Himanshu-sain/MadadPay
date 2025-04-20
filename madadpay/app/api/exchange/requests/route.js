import connectDB from "@/lib/db";
import { protect } from "@/middleware/auth";
import ExchangeRequest from "@/models/ExchangeRequest";

export async function GET(req) {
  await connectDB();

  try {
    await protect(req);

    const sentRequests = await ExchangeRequest.find({
      sender: req.user._id,
    }).populate("receiver", "name phone");

    const receivedRequests = await ExchangeRequest.find({
      receiver: req.user._id,
    }).populate("sender", "name phone");

    return new Response(
      JSON.stringify({
        success: true,
        data: { sentRequests, receivedRequests },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: error.statusCode || 500 }
    );
  }
}
