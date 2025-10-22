import React from "react";
import { Card, CardDescription, CardHeader } from "./ui/card";
import { getProjects } from "@/lib/task";
import Link from "next/link";

async function ProjectSummaryCard() {
  const { projects } = await getProjects();
  console.log(projects);
  return (
    <Card className="p-6  min-w-[200px]">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold ">Your Projects</h2>
          <p className="text-sm">{projects.length} Projects(s)</p>
        </div>
        <Link href={"/project"}>View All</Link>
      </CardHeader>
      <CardDescription>
        {projects.map((project: any, index: number) => {
          return (
            <Link
              href={`/project/${project.id}`}
              className="mt-4 p-4 border border-gray-200 rounded-lg duration-100 hover:bg-gray-100 cursor-pointer flex flex-col"
            >
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-sm">{project.description}</p>
            </Link>
          );
        })}
      </CardDescription>
    </Card>
  );
}

export default ProjectSummaryCard;
