import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import projects from "../../../data/projects.json";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (user.role === "member")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  if (user.role === "manager") {
    const filteredProjects = projects.filter((p) => user.email === p.owner);
    return NextResponse.json(
      {
        message: "GET request received for Projects",
        projects: filteredProjects,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      message: "GET request received for Projects",
      projects,
    },
    { status: 200 }
  );
}
