import { NextRequest, NextResponse } from "next/server";
import projects from "../../../../data/projects.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = await params.id;
  const project = projects.filter((proj) => proj.id === parseInt(id));
  if (!project)
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  return NextResponse.json({
    message: "Get request for project successful",
    project,
  });
}
