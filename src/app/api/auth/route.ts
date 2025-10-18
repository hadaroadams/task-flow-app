import { NextResponse, NextRequest } from "next/server";
import users from "../../../data/users.json";
import { generateToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = users.find(
    (user: { email: string; password: string }) =>
      user.email === email && user.password === password
  );
  if (!user) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  }
  const token = generateToken({ email: user.email, role: user.role });
  console.log("Generated Token:", token);

  const response = NextResponse.json({
    message: "Login successful",
    user: { email: user.email, role: user.role },
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return response;
}
