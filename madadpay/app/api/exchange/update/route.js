import connectDB from "@/lib/db";
import { protect } from "@/middleware/auth";
import ExchangeRequest from "@/models/ExchangeRequest";

export async function PUT(req) {
  await connectDB();

  try {
    await protect(req);

    const { requestId, status } = await req.json();

    const request = await ExchangeRequest.findOne({
      _id: requestId,
      receiver: req.user._id,
    });

    if (!request) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Request not found or unauthorized",
        }),
        { status: 404 }
      );
    }

    if (request.status !== "pending") {
      return new Response(
        JSON.stringify({ success: false, error: "Request already processed" }),
        { status: 400 }
      );
    }

    request.status = status;
    await request.save();

    return new Response(JSON.stringify({ success: true, data: request }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: error.statusCode || 500 }
    );
  }
}
