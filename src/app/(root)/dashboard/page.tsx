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
      {/* status */}
      <StatusOverview {...calculateTaskStats(tasks.filteredTask)} />
      {/* Projects */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-2">
        <ProjectSummaryCard />

        <Card className="bg-white p-6   min-w-[200px] space-y-1 flex flex-col">
          <CardHeader className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Recent Tasks</h2>
              <p className="text-sm text-gray-500">
                Showing {Math.min(tasks.filteredTask.length, 3)} of{" "}
                {tasks.filteredTask.length} Task(s)
              </p>
            </div>
            <Link href={"/task"}>View All</Link>
          </CardHeader>
          <div>
            {tasks.filteredTask.slice(0, 3).map((task: any, index: number) => {
              return (
                <div
                  key={index}
                  className="mt-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm">
                    {task.status === "done" ? (
                      <span className="text-green-400">Done</span>
                    ) : (
                      <>
                        Status: <span className="text-yellow-400">Pending</span>
                      </>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </main>
  );
}

export default page;
