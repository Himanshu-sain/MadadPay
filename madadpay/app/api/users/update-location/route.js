import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret

    // ab yaha user ko identify kar sakta hai
    const { lat, lng } = await req.json();

    console.log("Authenticated user ID:", decoded.userId);

    // Save lat/lng to DB logic here...

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
