import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();

  const url = new URL(req.url || "", "http://localhost");
  const lat = parseFloat(url.searchParams.get("lat"));
  const lng = parseFloat(url.searchParams.get("lng"));
  const maxDistanceKm = parseFloat(
    url.searchParams.get("maxDistanceKm") || "10"
  );

  if (isNaN(lat) || isNaN(lng)) {
    return Response.json({ error: "Coordinates required" }, { status: 400 });
  }

  const toRad = (deg) => deg * (Math.PI / 180);

  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const allUsers = await User.find({ isActive: true });

  const nearbyUsers = allUsers
    .map((user) => {
      const locMatch = user.location?.match(/q=([-.\d]+),([-.\d]+)/);
      if (!locMatch) {
        console.log("Invalid location:", user.location);
        return null;
      }

      const userLat = parseFloat(locMatch[1]);
      const userLng = parseFloat(locMatch[2]);
      const distance = haversine(lat, lng, userLat, userLng);

      console.log(`${user.name}: ${distance.toFixed(2)} km away`);

      if (distance <= maxDistanceKm) {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          location: user.location,
          distanceInKm: parseFloat(distance.toFixed(2)),
        };
      }

      return null;
    })
    .filter(Boolean);

  return Response.json(nearbyUsers);
}
