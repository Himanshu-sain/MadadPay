import User from "@/models/User";
import connectDB from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const { lat, lng, maxDistance = 5 } = req.query;

    const users = await User.find({
      lastKnownLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseFloat(maxDistance) * 1000, // Convert km to meters
        },
      },
    }).select("-password");

    // Add distance to each user
    const usersWithDistance = users.map((user) => ({
      ...user._doc,
      distance: calculateDistance(
        parseFloat(lat),
        parseFloat(lng),
        user.lastKnownLocation.coordinates[1],
        user.lastKnownLocation.coordinates[0]
      ),
    }));

    res.status(200).json(usersWithDistance);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch nearby users" });
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}
