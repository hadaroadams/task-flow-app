import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProjectData } from "@/lib/task";
import { ArrowLeft } from "lucide-react";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const projectData = await getProjectData((await params).id);
  const { project, tasks } = projectData!;
  console.log(tasks);

  return (
    <main className="bg-gray-100 min-h-screen px-10 py-6 space-y-10">
      <section className="space-y-10">
        <Button variant={"outline"}>
          <ArrowLeft />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold ">{project.project[0].name}</h1>
          <p>{project.project[0].description}</p>
        </div>
      </section>
      <section>
        <Card className="p-6">
          <Label className="text-md font-black">Add Task</Label>
          <div className="flex gap-2">
            <Input name="title" placeholder="Task title" />
            <Input name="assignedTo" placeholder="Assign to (email)" />
            <Button>Add</Button>
          </div>
        </Card>
      </section>
      <section>
        <Card className="p-6">
          <CardHeader className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold ">Tasks</h2>
              <p>4 Task(s)</p>
            </div>
          </CardHeader>
          <CardDescription>
            {tasks.tasks.map((task: any, index: number) => {
              return (
                <Card className="bg-white p-4  mt-6 min-w-[200px] space-y-4 flex flex-row justify-between items-center">
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
                      </>
                    ) : (
                      <>
                        <p className="text-yellow-600 text-sm bg-yellow-100 px-3 py-1 rounded-lg">
                          pending
                        </p>
                      </>
                    )}
                    <Button variant={"destructive"}>Delete</Button>
                  </div>
                </Card>
              );
            })}
          </CardDescription>
        </Card>
      </section>
    </main>
  );
}

export default page;
