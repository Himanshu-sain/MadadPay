import { protect } from "@/lib/auth";
import User from "@/models/User";

export async function GET(req) {
  // Check authentication
  const authResponse = await protect(req);
  if (authResponse) return authResponse;

  try {
    const user = await User.findById(req.user._id);

    return new Response(
      JSON.stringify({
        status: "success",
        data: {
          user,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting user profile:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Error fetching user profile",
      }),
      { status: 500 }
    );
  }
}
