import { NextRequest, NextResponse } from "next/server";
import tasks from "../../../data/tasks.json";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "GET request received for tasks",
    tasks,
  });
}
