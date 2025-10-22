import { NextResponse, NextRequest } from "next/server";
import users from "../../../../data/users.json";
import { generateToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }
    const token = generateToken({ email: user.email, role: user.role });

    // console.log("Generated Token:", token);

    const response = NextResponse.json({
      message: "Login successful",
      user: { email: user.email, role: user.role },
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
