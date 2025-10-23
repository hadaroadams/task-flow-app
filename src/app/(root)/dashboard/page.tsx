import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import { getAllTasks, getProjects } from "@/lib/task";
import { calculateTaskStats } from "@/lib/taskStatus";
import React from "react";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import ProjectSummaryCard from "@/components/ProjectSummaryCard";
import StatusOverview from "@/components/StatusOverview";
import RecentTaskCard from "@/components/TaskOverviewCard";
async function page() {
  const [user, tasks, projects] = await Promise.all([
    getCurrentUser(),
    getAllTasks(),
    getProjects(),
  ]);

  return (
    <main className="bg-gray-100 min-h-screen px-10 py-6">
      <div>
        <h1 className="text-3xl font-bold ">Dashboard</h1>
        <p>
          Welcome back, <span>{user?.email}</span>
        </p>
      </div>
      <StatusOverview {...calculateTaskStats(tasks.data!)} />
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-2">
        <ProjectSummaryCard projects={projects.data!} />
        <RecentTaskCard tasks={tasks.data!} />
      </section>
    </main>
  );
}

export default page;
