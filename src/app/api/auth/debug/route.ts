import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";

// Mock user for debug login
const mockUser = {
  id: process.env.NEXT_PUBLIC_DEBUG_INSTAGRAM_ACCOUNT_ID || "debug_user_id",
  name: "Debug User",
  email: "debug@example.com",
  image: "https://via.placeholder.com/150",
  bio: "Debug account",
  followers: 0,
  following: 0,
  posts: 0,
  accessToken: process.env.NEXT_PUBLIC_DEBUG_INSTAGRAM_TOKEN,
};

export async function POST(request: Request) {
  try {
    const { token, accountId } = await request.json();

    if (!token || !accountId) {
      return NextResponse.json(
        { error: "Debug token and account ID are required." },
        { status: 400 }
      );
    }

    // Create a mock session token
    const sessionToken = await encode({
      token: {
        ...mockUser,
        accessToken: token,
        id: accountId,
      },
      user: mockUser,
    });

    // Set the session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("next-auth.session-token", sessionToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during debug login." },
      { status: 500 }
    );
  }
}