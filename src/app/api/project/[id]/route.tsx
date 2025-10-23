import { NextRequest, NextResponse } from "next/server";
import projects from "../../../../data/projects.json";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = await params.id;
  const project = projects.find((proj) => proj.id === parseInt(id));
  if (!project)
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  return NextResponse.json({
    message: "Get request for project successful",
    data: project,
  });
}
