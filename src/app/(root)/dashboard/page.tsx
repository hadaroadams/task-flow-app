import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import { getAllTasks, getProjects } from "@/lib/task";
import { calculateTaskStats } from "@/lib/taskStatus";
import React from "react";
import projects from "../../../data/projects.json";
import Link from "next/link";
async function page() {
  const user = await getCurrentUser();
  const tasks = await getAllTasks();
  const { projects } = await getProjects();
  console.log(projects);
  const { completed, pending, completionRate, total } = calculateTaskStats(
    tasks.filteredTask
  );

  return (
    <main className="bg-gray-100 min-h-screen px-10 py-6">
      <div>
        <h1 className="text-3xl font-bold ">Dashboard</h1>
        <p>
          Welcome back, <span>{user?.email}</span>
        </p>
      </div>

      {/* status */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2  ">
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-4 flex flex-col">
          <p>Total Tasks</p>
          <h2 className="text-3xl font-bold">{total}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-4 flex flex-col">
          <p>Completed</p>
          <h2 className="text-3xl font-bold text-green-400">{completed}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-4 flex flex-col">
          <p>Pending</p>
          <h2 className="text-3xl font-bold text-yellow-400">{pending}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-4 flex flex-col">
          <p>Completion Rate</p>
          <h2 className="text-3xl font-bold text-primary">{completionRate}%</h2>
        </div>
      </section>
      {/* Projects */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-1 flex flex-col">
          <h2 className="text-xl font-bold ">Your Projects</h2>
          <p className="text-sm">{projects.length} Projects(s)</p>
          <div>
            {projects.map((project: any, index: number) => {
              return (
                <Link
                  href={`/project/${project.id}`}
                  className="mt-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer flex flex-col"
                >
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-sm">{project.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-1 flex flex-col">
          <h2 className="text-xl font-bold ">Recent Tasks</h2>
          <p>{total} Task(s)</p>
          <div>
            {tasks.filteredTask.map((task: any, index: number) => {
              return (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm">
                    {task.status === "done" ? (
                      <span className="text-green-400">Done</span>
                    ) : (
                      <p className="text-sm">
                        Staus: <span className="text-yellow-400">Pending</span>
                      </p>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
