import { NextResponse } from "next/server";

export async function GET() {
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

    if (!token || !accountId || !secret) {
      return NextResponse.json(
        { error: "Debug token, account ID, or secret are not configured." },
        { status: 400 }
      );
    }

    const user = {
      id: accountId,
      name: "Instagram User",
      email: `${accountId}@instagram.com`,
      image: `https://www.instagram.com/p/${accountId}/`,
      bio: "Instagram user",
      followers: 0,
      following: 0,
      posts: 0,
      accessToken: token,
    };

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Debug login error:", error);
    return NextResponse.json(
      { error: "An error occurred during debug login." },
      { status: 500 }
    );
  }
}