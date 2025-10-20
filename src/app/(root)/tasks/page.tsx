import { Button } from "@/components/ui/button";
import { getAllTasks } from "@/lib/task";
import React from "react";

async function page() {
  const tasks = await getAllTasks();
  return (
    <main className="bg-gray-100 min-h-screen px-10 py-6">
      <section>
        <h1 className="text-3xl font-bold ">Tasks</h1>
        <p>Manage all your tasks</p>
      </section>
      <section>
        {tasks.filteredTask.map((task: any, index: number) => {
          return (
            <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-4 flex justify-between items-center">
              <div>
                <h3 className="text-md font-bold">{task.title}</h3>
                <p className="text-sm text-gray-500">
                  Assigned to: {task.assignedTo}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {task.status === "done" ? (
                  <>
                    <p className="text-green-500 text-sm bg-green-100 px-3 py-1 rounded-lg">
                      done
                    </p>
                    <Button variant={"secondary"}>Redo</Button>
                  </>
                ) : (
                  <>
                    <p className="text-yellow-600 text-sm bg-yellow-100 px-3 py-1 rounded-lg">
                      pending
                    </p>
                    <Button>complete</Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default page;
