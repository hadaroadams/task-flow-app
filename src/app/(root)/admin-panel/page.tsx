import StatusOverview from "@/components/StatusOverview";
import { TaskAnalytics } from "@/components/TaskAnalytics";
import { UserManagementTable } from "@/components/UserManagementTable";
import { getCurrentUser } from "@/lib/auth";
import { getAllTasks } from "@/lib/task";
import { calculateTaskStats } from "@/lib/taskStatus";
import { getAllUsers } from "@/lib/user";
import React from "react";

async function page() {
  const task = await getAllTasks();
  const { users } = await getAllUsers();
  console.log(users);
  return (
    <main className="bg-gray-100 min-h-screen px-10 py-6 space-y-4">
      <StatusOverview {...calculateTaskStats(task.filteredTask)} />
      <TaskAnalytics />
      <UserManagementTable users={users} />
    </main>
  );
}

export default page;
