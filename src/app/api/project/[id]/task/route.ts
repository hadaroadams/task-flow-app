import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import tasks from "../../../../../data/tasks.json";
import projects from "../../../../../data/projects.json";
import { can } from "@/lib/permission";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const task = tasks.filter((t) => t.projectId === parseInt(id));

    return NextResponse.json({
      message: "Get Request Successful",
      tasks: task,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

// export async function POST(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const user = await getCurrentUser();
//   if (!user)
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//   const { title, assignedTo, status } = await request.json();
//   if (!title || !assignedTo)
//     return NextResponse.json({ message: "Missing fields" }, { status: 400 });
//   const project = projects.find((p) => p.id === parseInt(params.id));

//   const isAllowed = can("createTask", "task", user, {
//     projectOwner: project?.owner,
//   });
//   if (!isAllowed) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const taskId = tasks.length + 1;

//   const newTask = {
//     id: taskId,
//     projectId: parseInt(params.id),
//     title,
//     assignedTo,
//     status: status || "pending",
//   };
//   tasks.push(newTask);

//   return NextResponse.json({ message: "Task created", task: newTask });
// }
