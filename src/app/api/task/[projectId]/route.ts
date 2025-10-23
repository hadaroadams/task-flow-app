import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import tasks from "../../../../data/tasks.json";
import projects from "../../../../data/projects.json";
import { can } from "@/lib/permission";

export async function GET(
  request: Request,
  { params }: { params: { projectId: string } }
): Promise<NextResponse<ApiResponse<Task[]>>> {
  try {
    const { projectId } = await params;
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const filteredTasks = tasks.filter(
      (t) => t.projectId === parseInt(projectId)
    ) as Task[];

    return NextResponse.json({
      message: "Get Request Successful",
      data: filteredTasks,
    });
  } catch (error) {
    console.error("GET /tasks error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { projectId: string } }
): Promise<NextResponse<ApiResponse<Task>>> {
  const { projectId } = await params;

  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { title, assignedTo, status } = await request.json();
  if (!title || !assignedTo)
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  const project = projects.find((p) => p.id === parseInt(projectId));

  const isAllowed = can("createTask", "task", user, {
    projectOwner: project?.owner,
  });
  if (!isAllowed) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const taskId = tasks.length + 1;

  const newTask = {
    id: taskId,
    projectId: parseInt(projectId),
    title,
    assignedTo,
    status: status || "pending",
  };
  tasks.unshift(newTask);

  return NextResponse.json({ message: "Task created", data: newTask });
}
