// app/api/user/login/route.js
import connectDB from "@/lib/db";
import User from "@/models/User";
import { createSendToken } from "@/lib/auth";

export async function POST(req) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please provide email and password",
        }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");

    const isMatch =
      user && (await user.comparePassword(password, user.password));

    if (!isMatch) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Incorrect email or password",
        }),
        { status: 401 }
      );
    }

    return createSendToken(user, 200);
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong during login",
      }),
      { status: 500 }
    );
  }
}
