import { NextRequest, NextResponse } from "next/server";
import tasks from "../../../data/tasks.json";
import projects from "../../../data/projects.json";
import { getCurrentUser } from "@/lib/auth";
import { can } from "@/lib/permission";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "GET request received for tasks",
    tasks,
  });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { title, assignedTo, status, projectId } = await request.json();
  if (!title || !assignedTo || !status || !projectId) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const project = projects.find((p) => p.id === parseInt(projectId));
  console.log(project);
  const projectOwner = project?.owner;
  const isAllowed = can("createTask", "task", user, { projectOwner });
  console.log(isAllowed);
  if (!isAllowed) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const newTask = { id: Date.now(), title, assignedTo, status, projectId };
  tasks.push(newTask);
  return NextResponse.json({
    message: "Task created successfully",
    task: newTask,
  });
}

// Both admin and manager update and member mark as done in one api
export async function PUT(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id, title, assignedTo, status, projectId } = await request.json();
  if (!id || !title || !assignedTo || !status || !projectId) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
  if (taskIndex === -1) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  if (user.role === "member") {
    const task = tasks[taskIndex];
    const isMemberAllowed = can("markDone", "task", user, {
      taskAssignedTo: task.assignedTo,
    });

    if (!isMemberAllowed)
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    task.status = status;
    return NextResponse.json(
      { message: "status changed successfully", task },
      { status: 200 }
    );
  }

  const project = projects.find((p) => p.id === parseInt(projectId));
  const projectOwner = project?.owner;
  const isAllowed = can("editTask", "task", user, { projectOwner });
  if (!isAllowed) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  tasks[taskIndex] = { id: parseInt(id), title, assignedTo, status, projectId };
  return NextResponse.json({
    message: "Task updated successfully",
    task: tasks[taskIndex],
  });
}

export async function DELETE(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Missing task ID" }, { status: 400 });
  }

  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
  if (taskIndex === -1) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  const project = projects.find((p) => p.id === tasks[taskIndex].projectId);
  const projectOwner = project?.owner;
  console.log("projectowner:", projectOwner);
  const isAllowed = can("deleteTask", "task", user, { projectOwner });
  if (!isAllowed)
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  tasks.splice(taskIndex, 1);
  return NextResponse.json({ message: "Task Deleted Successfully" });
}
