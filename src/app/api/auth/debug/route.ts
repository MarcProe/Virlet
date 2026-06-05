import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";

export async function GET() {
  // Check if debug token and account ID are configured
  const token = process.env.NEXT_PUBLIC_DEBUG_INSTAGRAM_TOKEN;
  const accountId = process.env.NEXT_PUBLIC_DEBUG_INSTAGRAM_ACCOUNT_ID;
  const secret = process.env.AUTH_SECRET;

  if (!token || !accountId || !secret) {
    return NextResponse.json(
      { available: false, error: "Debug token, account ID, or secret are not configured." },
      { status: 400 }
    );
  }

  return NextResponse.json({ available: true });
}

export async function POST() {
  try {
    const token = process.env.NEXT_PUBLIC_DEBUG_INSTAGRAM_TOKEN;
    const accountId = process.env.NEXT_PUBLIC_DEBUG_INSTAGRAM_ACCOUNT_ID;
    const secret = process.env.AUTH_SECRET;

    if (!token || !accountId) {
      return NextResponse.json(
        { error: "Debug token and account ID are not configured." },
        { status: 400 }
      );
    }

    if (!secret) {
      return NextResponse.json(
        { error: "AUTH_SECRET is not configured." },
        { status: 500 }
      );
    }

    // Create a user object with the provided account ID and token
    const user = {
      id: accountId,
      name: "Instagram User",
      email: `${accountId}@instagram.com`,
      picture: `https://www.instagram.com/p/${accountId}/`,
      bio: "Instagram user",
      followers: 0,
      following: 0,
      posts: 0,
      accessToken: token,
    };

    // Create a session token with the user object and secret
    const sessionToken = await encode({
      token: user,
      secret,
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
    console.error("Debug login error:", error);
    return NextResponse.json(
      { error: "An error occurred during debug login." },
      { status: 500 }
    );
  }
}