"use client";

import React from "react";
import TaskCard from "./TaskCard";
import { Card, CardDescription, CardHeader } from "./ui/card";

type ProjectTasksProps = {
  tasks: Task[];
  userRole: UserRole;
};

export default function ProjectTasks({ tasks, userRole }: ProjectTasksProps) {
    console.log(tasks)
  return (
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
            tasks.map((task) => (
              <TaskCard key={task.id} {...task}   userRole={userRole} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-6">
              No tasks found for this project.
            </p>
          )}
        </CardDescription>
      </Card>
    </section>
  );
}
