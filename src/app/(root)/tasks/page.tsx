import EditTaskForm from "@/components/EditTaskForm";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { getAllTasks } from "@/lib/task";
import React from "react";
import Link from "next/link";

async function Page() {
  const user = await getCurrentUser();
  const { data: tasks } = await getAllTasks();

  if (!user) {
    return (
      <main className="bg-gray-100 min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-lg font-semibold mb-2">Unauthorized</h2>
          <p className="text-sm text-gray-500 mb-4">
            You must be logged in to view tasks.
          </p>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </Card>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen px-10 py-6">
      {/* Header */}
      <section className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
          <p className="text-gray-600">Manage all your tasks efficiently</p>
        </div>

        {user.role === "admin" && (
          <Link href="/project">
            <Button>Add Task</Button>
          </Link>
        )}
      </section>

      {/* Task List */}
      <section className="space-y-4">
        {tasks && tasks.length > 0 ? (
          tasks.map((task: any, index: number) => (
            <TaskCard {...task} key={index} userRole={user.role} />
          ))
        ) : (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No Tasks Found</h3>
            <p className="text-sm text-gray-500">
              You don’t have any tasks assigned yet.
            </p>
          </Card>
        )}
      </section>
    </main>
  );
}

export default Page;
