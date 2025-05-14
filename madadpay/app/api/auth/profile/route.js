// app/api/user/profile/route.js
import { protect } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { user, error } = await protect(req);

  if (error) return error;

  return new NextResponse(
    JSON.stringify({
      success: true,
      data: user,
    }),
    { status: 200 }
  );
}
