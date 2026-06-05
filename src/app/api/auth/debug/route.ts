import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";

export async function POST(request: Request) {
  try {
    const { token, accountId } = await request.json();

    if (!token || !accountId) {
      return NextResponse.json(
        { error: "Debug token and account ID are required." },
        { status: 400 }
      );
    }

    // Fetch real user data from Instagram API using the debug token
    const instagramResponse = await fetch(
      `https://graph.instagram.com/${accountId}?fields=id,username,account_type,media_count&access_token=${token}`
    );

    if (!instagramResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user data from Instagram." },
        { status: 400 }
      );
    }

    const instagramData = await instagramResponse.json();

    // Create a user object with real data
    const user = {
      id: accountId,
      name: instagramData.username,
      email: `${accountId}@instagram.com`, // Mock email (Instagram doesn't provide emails)
      picture: `https://www.instagram.com/${instagramData.username}/?__a=1`, // Profile picture URL
      bio: "Instagram user", // Placeholder, as bio isn't available in this endpoint
      followers: 0, // Placeholder
      following: 0, // Placeholder
      posts: instagramData.media_count || 0,
      accessToken: token,
    };

    // Create a session token
    const sessionToken = await encode({
      token: user,
      user: user,
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