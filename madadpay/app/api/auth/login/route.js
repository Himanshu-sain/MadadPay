import connectDB from "@/lib/db";
import User from "@/models/User";
import { createSendToken } from "@/lib/auth";

export async function POST(req) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    // 1) Check if email and password exist
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "Please provide email and password",
        }),
        { status: 400 }
      );
    }

    // 2) Check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password, user.password))) {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "Incorrect email or password",
        }),
        { status: 401 }
      );
    }

    // 3) If everything ok, send token to client
    return createSendToken(user, 200);
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Something went wrong during login",
      }),
      { status: 500 }
    );
  }
}
