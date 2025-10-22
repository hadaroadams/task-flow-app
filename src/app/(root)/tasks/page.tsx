import EditTaskForm from "@/components/EditTaskForm";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { getAllTasks } from "@/lib/task";
import React from "react";

async function page() {
  const tasks = await getAllTasks();
  const user = await getCurrentUser();
  console.log(user?.role)
  return (
    <main className="bg-gray-100 min-h-screen px-10 py-6">
      <section>
        <h1 className="text-3xl font-bold ">Tasks</h1>
        <p>Manage all your tasks</p>
      </section>
      <section>
        {tasks.filteredTask.map((task: any, index: number) => {
          return <TaskCard {...task} key={index} userRole={user?.role} />;
        })}
      </section>
    </main>
  );
}

export default page;
