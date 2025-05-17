import User from "@/models/User";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({
      isActive: true,
      lastKnownLocation: { $exists: true },
    }).select("_id name lastKnownLocation profileImage");

    const usersWithValidCoords = users.filter((user) => {
      const coords = user.lastKnownLocation?.coordinates;
      return (
        Array.isArray(coords) &&
        coords.length === 2 &&
        typeof coords[0] === "number" &&
        typeof coords[1] === "number"
      );
    });

    return Response.json(usersWithValidCoords);
  } catch (error) {
    console.error("Error fetching all users:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch all users",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
