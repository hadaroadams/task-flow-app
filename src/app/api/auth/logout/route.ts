import { NextResponse } from "next/server";

export async function POST() {
  // Create a response message
  const response = NextResponse.json({
    message: "Logout successful",
  });

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0), // Expire immediately
    path: "/",
  });

  return response;
}
