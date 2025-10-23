import AddTask from "@/components/AddTaskForm";
import ProjectHeader from "@/components/ProjectHeader";
import TaskCard from "@/components/TaskCard";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { getSingleProject } from "@/lib/project";
import { getTasksInSingleProject } from "@/lib/task";

import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const productId = (await params).id;
  const { data: project } = await getSingleProject(productId);
  const { data: tasks } = await getTasksInSingleProject(productId);

  const user = await getCurrentUser();

  return (
    <main className="bg-gray-100 min-h-screen px-10 py-6 space-y-10">
      <ProjectHeader project={project!} />
      <AddTask projectId={productId} />
      <section>
        <Card className="p-6">
          <CardHeader className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold ">Tasks</h2>
              <p>{tasks?.length} Task(s)</p>
            </div>
          </CardHeader>
          <CardDescription>
            {tasks?.map((task: any, index: number) => {
              return <TaskCard {...task} key={index} userRole={user?.role} />;
            })}
          </CardDescription>
        </Card>
      </section>
    </main>
  );
}

export default page;
