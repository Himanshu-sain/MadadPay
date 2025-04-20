import User from "@/models/User";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get("lat"));
    const lng = parseFloat(searchParams.get("lng"));
    const radius = parseFloat(searchParams.get("radius")) || 5000; // meters

    if (!lat || !lng) {
      return new Response(
        JSON.stringify({ error: "Latitude and longitude required" }),
        { status: 400 }
      );
    }

    const users = await User.find({
      isActive: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat], // MongoDB uses [longitude, latitude]
          },
          $maxDistance: radius,
        },
      },
    }).select("-password");

    // Add distance calculation
    const usersWithDistance = users.map((user) => {
      const distance = calculateDistance(
        lat,
        lng,
        user.location.coordinates[1],
        user.location.coordinates[0]
      );
      return { ...user.toObject(), distance };
    });

    return new Response(JSON.stringify(usersWithDistance), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// Haversine formula for distance calculation
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance.toFixed(2); // Round to 2 decimal places
}
