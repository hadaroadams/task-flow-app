import { NextRequest, NextResponse } from "next/server";
import projects from "../../../../data/projects.json";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const project = projects.find((p) => p.id === id);

  if (!project)
    return NextResponse.json({ message: "Project not found" }, { status: 404 });

  return NextResponse.json({ message: "", data: project });
}
