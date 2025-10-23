import StatusOverview from "@/components/StatusOverview";
import { TaskAnalytics } from "@/components/TaskAnalytics";
import { UserManagementTable } from "@/components/UserManagementTable";
import { calculateTaskStats } from "@/lib";
import { getCurrentUser } from "@/lib/auth";
import { getAllTasks } from "@/lib/task";

import { getAllUsers } from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const { data: tasks } = await getAllTasks();
  const { users } = await getAllUsers();
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    redirect("/dashboard");
  }
  return (
    <main className="bg-gray-100 min-h-screen px-10 py-6 space-y-4">
      <div>
        <h1 className="text-3xl font-bold ">Admin Panel</h1>
        <p>Welcome back, {currentUser?.email}</p>
      </div>
      <StatusOverview {...calculateTaskStats(tasks!)} />
      <TaskAnalytics {...calculateTaskStats(tasks!)} />
      <UserManagementTable users={users} />
    </main>
  );
}

export default page;
