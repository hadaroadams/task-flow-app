// src/lib/task.ts

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";



export const getAllTasks = async (): Promise<ApiResponse<Task[]>> => {
  const cookieHeader = (await cookies()).toString();
  try {
    const response = await fetch(`${BASE_URL}/api/task`, {
      method: "GET",
      headers: { Cookie: cookieHeader },
    });
    const task = await response.json();
    console.log(task);
    return task;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getProjects = async (): Promise<ApiResponse<Project[]>> => {
  const cookieHeader = (await cookies()).toString();
  try {
    const response = await fetch(`${BASE_URL}/api/project`, {
      method: "GET",
      headers: { Cookie: cookieHeader },
    });
    const projects = await response.json();
    console.log(projects);
    return projects;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export async function getProjectData(id: string) {
  const cookieHeader = (await cookies()).toString();
  try {
    const [projectRes, tasksRes] = await Promise.all([
      fetch(`${BASE_URL}/api/project/${id}`, {
        credentials: "include",
        headers: { Cookie: cookieHeader },
      }),
      fetch(`${BASE_URL}/api/task/${id}`, {
        cache: "no-store",
        credentials: "include",
        headers: { Cookie: cookieHeader },
      }),
    ]);

    const project = await projectRes.json();
    const tasks = await tasksRes.json();
    return { project, tasks };
  } catch (error) {
    console.log(error);
  }
}
