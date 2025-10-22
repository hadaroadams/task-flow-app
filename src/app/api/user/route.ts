import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import users from "../../../data/users.json";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    console.log("herer", user?.role);
    if (!user || user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const usersData = users.map((user) => {
      return {
        email: user.email,
        role: user.role,
      };
    });
    return NextResponse.json({
      users: usersData,
      message: "Get request for users successful",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 501 });
  }
}

export async function PUT(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { email, role } = await request.json();
  const userData = users.find((user) => user?.email === email);
  if (!userData)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  userData.role = role;
  return NextResponse.json(
    { user: { email, role }, message: "Role Changes Successfully" },
    { status: 200 }
  );
}
