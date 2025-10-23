import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import projects from "../../../data/projects.json";


export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<Project[]>>> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized", data: [] },
        { status: 401 }
      );
    }

    const accessibleProjects =
      user.role === "admin"
        ? projects
        : projects.filter((p) => p.owner === user.email);

    return NextResponse.json(
      {
        success: true,
        message: "Projects retrieved successfully",
        data: accessibleProjects,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET /projects error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", data: [] },
      { status: 500 }
    );
  }
}
