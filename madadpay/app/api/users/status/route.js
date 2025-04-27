import connectDB from "@/lib/db";
import { protect } from "@/lib/auth";
import User from "@/models/User";

export async function PATCH(req) {
  await connectDB();
  const authResponse = await protect(req);
  if (authResponse) return authResponse;

  try {
    const { isActive, needsCash, location } = await req.json();

    const updates = {};
    if (isActive !== undefined) updates.isActive = isActive;
    if (needsCash !== undefined) updates.needsCash = needsCash;
    if (location) {
      updates.location = {
        type: "Point",
        coordinates: [location.lng, location.lat],
      };
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    });

    return new Response(
      JSON.stringify({
        status: "success",
        data: { user },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to update status",
      }),
      { status: 500 }
    );
  }
}
