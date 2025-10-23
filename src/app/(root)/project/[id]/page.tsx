import AddTask from "@/components/AddTaskForm";
import ProjectHeader from "@/components/ProjectHeader";
import TaskCard from "@/components/TaskCard";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { getSingleProject } from "@/lib/project";
import { getTasksInSingleProject } from "@/lib/task";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  try {
    const projectId = (await params).id;

    // Fetch data
    const [{ data: project }, { data: tasks }, user] = await Promise.all([
      getSingleProject(projectId),
      getTasksInSingleProject(projectId),
      getCurrentUser(),
    ]);

    // Handle project not found
    if (!project) {
      return (
        <main className="bg-gray-100 min-h-screen px-10 py-6 flex justify-center items-center">
          <p className="text-lg font-medium text-gray-500">
            Project not found.
          </p>
        </main>
      );
    }

    return (
      <main className="bg-gray-100 min-h-screen px-10 py-6 space-y-10">
        <ProjectHeader project={project} />

        <AddTask projectId={projectId} />

        <section>
          <Card className="p-6">
            <CardHeader className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Tasks</h2>
                <p>{tasks?.length ?? 0} Task(s)</p>
              </div>
            </CardHeader>

            <CardDescription className="space-y-4">
              {tasks && tasks.length > 0 ? (
                tasks.map((task: any) => (
                  <TaskCard key={task.id} {...task} userRole={user?.role} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-6">
                  No tasks found for this project.
                </p>
              )}
            </CardDescription>
          </Card>
        </section>
      </main>
    );
  } catch (error: any) {
    return (
      <main className="bg-gray-100 min-h-screen px-10 py-6 flex justify-center items-center">
        <p className="text-lg font-medium text-red-500">
          {error.message || "Something went wrong."}
        </p>
      </main>
    );
  }
}

export default page;
