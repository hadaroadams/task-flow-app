import { NextResponse, NextRequest } from "next/server";
import users from "../../../data/users.json";

export async function POST(request: NextRequest, response: NextRequest) {
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
  return new Response(
    JSON.stringify({
      message: "Login successful",
      user: { email: user.email, role: user.role },
    }),
    { status: 200 }
  );
}
