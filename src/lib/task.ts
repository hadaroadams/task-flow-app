// src/lib/task.ts

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const fetchAPI = async (url: string, options?: RequestInit) => {
  const cookieHeader = (await cookies()).toString();
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
export const getAllTasks = async () => {
  const cookieHeader = (await cookies()).toString();
  try {
    const response = await fetch(`${BASE_URL}/api/task`, {
      method: "GET",

      headers: { Cookie: cookieHeader },
    });
    const tasks = await response.json();
    console.log(tasks);
    return tasks;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getProjects = async () => {
  const cookieHeader = (await cookies()).toString();
  try {
    const response = await fetch(`${BASE_URL}/api/project`, {
      method: "GET",
      //   cache: "no-store", // Ensures always fresh data
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
      fetch(`${BASE_URL}/api/project/${id}/task`, {
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
